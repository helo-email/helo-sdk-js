import { ApiError } from "./api-error.js";

export interface ClientConfig {
  baseUrl: string;
  apiKey: string | (() => string);
  fetch?: typeof fetch;
  /** Product token and version, e.g. "helo-email-sdk/1.2.3". */
  userAgent?: string;
  /** Retries after a network failure, timeout, 408, 429 or 5xx; 0 disables them. Defaults to 2. */
  maxRetries?: number;
  /** Seconds each attempt may take before it is abandoned (and retried); 0 disables it. Defaults to 30. */
  timeout?: number;
}

// The same retry policy as every Helo SDK (Helo::SdkGeneratorCommon::Retries in
// helo-sdk-generator); keep these numbers in step with it.
export const DEFAULT_MAX_RETRIES = 2;
// fetch has no timeout of its own (Node waits 300s for headers, browsers forever).
// 30s per attempt, as the Python and PHP SDKs.
export const DEFAULT_TIMEOUT = 30;
const INITIAL_RETRY_DELAY = 0.5;
const MAX_RETRY_DELAY = 8;
const RETRY_STATUSES = new Set([408, 429, 500, 502, 503, 504]);
const IDEMPOTENT_METHODS = new Set(["GET", "HEAD", "OPTIONS", "PUT", "DELETE"]);

/** A random UUID, for an idempotency key the caller didn't supply. */
export function idempotencyKey(): string {
  return globalThis.crypto.randomUUID();
}

/** Exponential backoff with full jitter, in seconds. */
function backoffDelay(attempt: number): number {
  return (
    Math.random() *
    Math.min(MAX_RETRY_DELAY, INITIAL_RETRY_DELAY * 2 ** attempt)
  );
}

/** Retry-After as seconds, from either a number or an HTTP date. */
function retryAfterSeconds(response: Response): number | null {
  const value = response.headers.get("retry-after");
  if (!value) return null;
  if (/^\d+(\.\d+)?$/.test(value)) return Number(value);
  const date = Date.parse(value);
  if (Number.isNaN(date)) return null;
  const delay = (date - Date.now()) / 1000;
  return delay > 0 ? delay : null;
}

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

/**
 * Names the JS runtime the SDK is running on. Browsers are reported without a
 * version: they forbid a script from setting User-Agent at all, so the header
 * is dropped there anyway and there is nothing to be gained from sniffing.
 */
function runtimeDescription(): string {
  const g = globalThis as Record<string, any>;

  if (g.Deno?.version?.deno) return `deno ${g.Deno.version.deno}`;
  if (g.Bun?.version) return `bun ${g.Bun.version}`;

  const node = g.process?.versions?.node;
  if (node) {
    const platform = g.process.platform ?? "unknown";
    const arch = g.process.arch ?? "unknown";
    return `node ${node}; ${platform}/${arch}`;
  }

  return "browser";
}

/**
 * HTTP client for API communication.
 *
 * A request is retried (up to maxRetries times, with jittered backoff) after a
 * network failure or a 408, 429 or 5xx response, but only when repeating it
 * cannot do anything twice: its method is idempotent, or it carries an
 * idempotency key. A 429 is retried regardless, since the server refused it
 * without acting on it. A Retry-After longer than the SDK waits is not retried
 * early; the error goes to the caller.
 */
export class Client {
  private _config: ClientConfig;

  constructor(config: ClientConfig) {
    this._config = config;
  }

  async request(
    method: string,
    path: string,
    {
      params,
      body,
      headers: extraHeaders,
    }: {
      params?: Record<string, unknown>;
      body?: unknown;
      headers?: Record<string, string | undefined>;
    } = {},
  ): Promise<Response> {
    const url = new URL(path, this._config.baseUrl);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) {
          url.searchParams.set(key, value.join(","));
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const token =
      typeof this._config.apiKey === "function"
        ? this._config.apiKey()
        : this._config.apiKey;

    if (!token) {
      throw new ApiError("No API key provided");
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (this._config.userAgent) {
      headers["User-Agent"] =
        `${this._config.userAgent} (${runtimeDescription()})`;
    }

    if (extraHeaders) {
      for (const [key, value] of Object.entries(extraHeaders)) {
        if (value === undefined || value === null) continue;
        headers[key] = value;
      }
    }

    const fetchOptions: RequestInit = { method: method.toUpperCase(), headers };

    if (body !== undefined && body !== null) {
      headers["Content-Type"] = "application/json";
      fetchOptions.body = JSON.stringify(body);
    }

    const maxRetries = this._config.maxRetries ?? DEFAULT_MAX_RETRIES;
    const canRepeat =
      IDEMPOTENT_METHODS.has(fetchOptions.method as string) ||
      Object.keys(headers).some((name) =>
        name.toLowerCase().endsWith("idempotency-key"),
      );
    const fetchFn = this._config.fetch || globalThis.fetch;
    const timeout = this._config.timeout ?? DEFAULT_TIMEOUT;

    let response: Response;
    for (let attempt = 0; ; attempt++) {
      try {
        // A fresh signal per attempt, so each retry gets the whole timeout.
        const signal =
          timeout > 0 ? AbortSignal.timeout(timeout * 1000) : undefined;
        response = await fetchFn(url.toString(), { ...fetchOptions, signal });
      } catch (err) {
        if (canRepeat && attempt < maxRetries) {
          await sleep(backoffDelay(attempt));
          continue;
        }
        const timedOut = err instanceof Error && err.name === "TimeoutError";
        const detail =
          err instanceof Error
            ? (err.cause as Error | undefined)?.message || err.message
            : String(err);
        throw new ApiError(
          timedOut
            ? `Request timed out after ${timeout}s`
            : `Connection failed: ${detail}`,
          null,
          null,
          null,
          err instanceof Error ? err : undefined,
        );
      }

      const delay = this.retryDelay(response, attempt, maxRetries, canRepeat);
      if (delay === null) break;
      await sleep(delay);
    }

    if (!response.ok) {
      let responseBody: Record<string, unknown> | null;
      try {
        responseBody = await response.json();
      } catch {
        responseBody = null;
      }

      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
        responseBody,
        Object.fromEntries(response.headers.entries()),
      );
    }

    return response;
  }

  /** How long to wait before retrying this response, or null not to retry it. */
  private retryDelay(
    response: Response,
    attempt: number,
    maxRetries: number,
    canRepeat: boolean,
  ): number | null {
    if (attempt >= maxRetries || !RETRY_STATUSES.has(response.status))
      return null;
    if (response.status !== 429 && !canRepeat) return null;

    const retryAfter = retryAfterSeconds(response);
    if (retryAfter === null) return backoffDelay(attempt);
    return retryAfter <= MAX_RETRY_DELAY ? retryAfter : null;
  }
}

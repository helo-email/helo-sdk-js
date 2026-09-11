import { ApiError } from "./api-error.js";

export interface ClientConfig {
  baseUrl: string;
  apiKey: string | (() => string);
  fetch?: typeof fetch;
  /** Product token and version, e.g. "helo-email-sdk/1.2.3". */
  userAgent?: string;
}

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

    let response: Response;
    try {
      const fetchFn = this._config.fetch || globalThis.fetch;
      response = await fetchFn(url.toString(), fetchOptions);
    } catch (err) {
      const detail =
        err instanceof Error
          ? (err.cause as Error | undefined)?.message || err.message
          : String(err);
      throw new ApiError(
        `Connection failed: ${detail}`,
        null,
        null,
        null,
        err instanceof Error ? err : undefined,
      );
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
}

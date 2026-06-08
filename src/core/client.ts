import { ApiError } from "./api-error.js";

export interface ClientConfig {
  baseUrl: string;
  apiKey: string | (() => string);
  fetch?: typeof fetch;
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
    { params, body }: { params?: Record<string, unknown>; body?: unknown } = {},
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
      throw new ApiError("No access token provided");
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

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

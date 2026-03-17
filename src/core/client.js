import { ApiError } from "./api-error.js";

/**
 * HTTP client for API communication.
 */
export class Client {
  constructor(config) {
    this._config = config;
  }

  async request(method, path, { params, body } = {}) {
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

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const token =
      typeof this._config.accessToken === "function"
        ? this._config.accessToken()
        : this._config.accessToken;

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const fetchOptions = { method: method.toUpperCase(), headers };

    if (body !== undefined && body !== null) {
      fetchOptions.body = JSON.stringify(body);
    }

    let response;
    try {
      const fetchFn = this._config.fetch || globalThis.fetch;
      response = await fetchFn(url.toString(), fetchOptions);
    } catch (err) {
      throw new ApiError(`Connection failed: ${err.message}`);
    }

    if (!response.ok) {
      let responseBody;
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

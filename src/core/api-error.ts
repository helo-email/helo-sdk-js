/**
 * Error class for API request failures.
 */
export class ApiError extends Error {
  readonly code: number | null;
  readonly responseBody: Record<string, unknown> | null;
  readonly responseHeaders: Record<string, string> | null;

  constructor(
    message: string,
    code: number | null = null,
    responseBody: Record<string, unknown> | null = null,
    responseHeaders: Record<string, string> | null = null,
    cause?: Error,
  ) {
    super(message, cause ? { cause } : undefined);
    this.name = "ApiError";
    this.code = code;
    this.responseBody = responseBody;
    this.responseHeaders = responseHeaders;
  }

  get detail(): string {
    if (this.responseBody && typeof this.responseBody.detail === "string") {
      return this.responseBody.detail;
    }
    return [this.message, this.code].filter(Boolean).join(" - ");
  }

  get errors(): Record<string, unknown> {
    if (
      this.responseBody &&
      typeof this.responseBody.errors === "object" &&
      this.responseBody.errors !== null
    ) {
      return this.responseBody.errors as Record<string, unknown>;
    }
    return {};
  }
}

/**
 * Error class for API request failures.
 */
export class ApiError extends Error {
  constructor(
    message,
    code = null,
    responseBody = null,
    responseHeaders = null,
    cause = null,
  ) {
    super(message, cause ? { cause } : undefined);
    this.name = "ApiError";
    this.code = code;
    this.responseBody = responseBody;
    this.responseHeaders = responseHeaders;
  }

  get detail() {
    if (this.responseBody && this.responseBody.detail) {
      return this.responseBody.detail;
    }
    return [this.message, this.code].filter(Boolean).join(" - ");
  }

  get errors() {
    if (this.responseBody && this.responseBody.errors) {
      return this.responseBody.errors;
    }
    return {};
  }
}

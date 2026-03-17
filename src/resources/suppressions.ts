import { Client } from "../core/client.js";
import type {
  CreateSuppressionsRequest,
  CreateSuppressionsResponse,
  PaginatedResponseOfSuppressionResponse,
  RemoveSuppressionsRequest,
  RemoveSuppressionsResponse,
} from "../types.js";
import type { MailType, SuppressionReason } from "../enums.js";

/**
 * Suppressions resource.
 */
export class Suppressions {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List suppressions
   */
  async list(params: {
    channelId: string;
    mailType: MailType;
    reason?: SuppressionReason;
    email?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponseOfSuppressionResponse> {
    const response = await this._client.request("get", `/suppressions`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * Create suppressions
   */
  async create(
    params: CreateSuppressionsRequest,
  ): Promise<CreateSuppressionsResponse> {
    const response = await this._client.request("post", `/suppressions`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Remove suppressions
   */
  async remove(
    params: RemoveSuppressionsRequest,
  ): Promise<RemoveSuppressionsResponse> {
    const response = await this._client.request(
      "post",
      `/suppressions/remove`,
      { body: params },
    );
    return response.json();
  }
}

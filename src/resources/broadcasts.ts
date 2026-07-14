import { Client } from "../core/client.js";
import type {
  BroadcastDetailsResponse,
  PaginatedResponseOfBroadcast,
  PaginatedResponseOfBroadcastFailure,
  PaginatedResponseOfBroadcastSuppression,
} from "../types.js";
import type { BroadcastStatus } from "../enums.js";

/**
 * Broadcasts resource.
 */
export class Broadcasts {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List broadcasts
   */
  async list(params: {
    channelId: string;
    status?: BroadcastStatus;
    subject?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponseOfBroadcast> {
    const response = await this._client.request("get", `/broadcasts`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * Retrieve a broadcast
   */
  async retrieve(id: string): Promise<BroadcastDetailsResponse> {
    const response = await this._client.request("get", `/broadcasts/${id}`);
    return response.json();
  }

  /**
   * List failed broadcast messages
   */
  async listFailures(
    id: string,
    params: { limit?: number; offset?: number } = {},
  ): Promise<PaginatedResponseOfBroadcastFailure> {
    const response = await this._client.request(
      "get",
      `/broadcasts/${id}/failures`,
      { params: params as Record<string, unknown> },
    );
    return response.json();
  }

  /**
   * List broadcast suppressed recipients
   */
  async listSuppressions(
    id: string,
    params: { limit?: number; offset?: number } = {},
  ): Promise<PaginatedResponseOfBroadcastSuppression> {
    const response = await this._client.request(
      "get",
      `/broadcasts/${id}/suppressions`,
      { params: params as Record<string, unknown> },
    );
    return response.json();
  }
}

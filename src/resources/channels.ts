import { Client } from "../core/client.js";
import type {
  ChannelDetailsResponse,
  CreateChannelRequest,
  PaginationResultOfChannelBasicResponse,
  UpdateChannelRequest,
} from "../types.js";

/**
 * Channels resource.
 */
export class Channels {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all channels
   */
  async list(
    params: {
      limit?: number;
      offset?: number;
      name?: string;
      channelIds?: string[];
      deliveryType?: "live" | "sandbox";
    } = {},
  ): Promise<PaginationResultOfChannelBasicResponse> {
    const response = await this._client.request("get", `/channels`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * Create a channel
   */
  async create(params: CreateChannelRequest): Promise<ChannelDetailsResponse> {
    const response = await this._client.request("post", `/channels`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Retrieve a channel
   */
  async retrieve(id: string): Promise<ChannelDetailsResponse> {
    const response = await this._client.request("get", `/channels/${id}`);
    return response.json();
  }

  /**
   * Update a channel
   */
  async update(
    id: string,
    params: UpdateChannelRequest,
  ): Promise<ChannelDetailsResponse> {
    const response = await this._client.request("patch", `/channels/${id}`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Delete a channel
   */
  async del(id: string): Promise<null> {
    const response = await this._client.request("delete", `/channels/${id}`);
    return null;
  }
}

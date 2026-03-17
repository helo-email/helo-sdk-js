import { Client } from "../core/client.js";
import type {
  CreateWebhookEndpointRequest,
  PaginationResultOfWebhookEndpointResponse,
  UpdateWebhookEndpointRequest,
  WebhookEndpointResponse,
} from "../types.js";

/**
 * WebhookEndpoints resource.
 */
export class WebhookEndpoints {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all webhook endpoints
   */
  async list(
    params: { limit?: number; offset?: number; channelIds?: string[] } = {},
  ): Promise<PaginationResultOfWebhookEndpointResponse> {
    const response = await this._client.request("get", `/webhook-endpoints`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * Create a webhook endpoint
   */
  async create(
    params: CreateWebhookEndpointRequest,
  ): Promise<WebhookEndpointResponse> {
    const response = await this._client.request("post", `/webhook-endpoints`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Retrieve a webhook endpoint
   */
  async retrieve(id: string): Promise<WebhookEndpointResponse> {
    const response = await this._client.request(
      "get",
      `/webhook-endpoints/${id}`,
    );
    return response.json();
  }

  /**
   * Update a webhook endpoint
   */
  async update(
    id: string,
    params: UpdateWebhookEndpointRequest,
  ): Promise<WebhookEndpointResponse> {
    const response = await this._client.request(
      "patch",
      `/webhook-endpoints/${id}`,
      { body: params },
    );
    return response.json();
  }

  /**
   * Delete a webhook endpoint
   */
  async del(id: string): Promise<null> {
    const response = await this._client.request(
      "delete",
      `/webhook-endpoints/${id}`,
    );
    return null;
  }

  /**
   * Regenerate webhook signing key
   */
  async regenerateSigningKey(id: string): Promise<WebhookEndpointResponse> {
    const response = await this._client.request(
      "post",
      `/webhook-endpoints/${id}/regenerate-signing-key`,
    );
    return response.json();
  }
}

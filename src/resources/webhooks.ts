import { Client } from "../core/client.js";
import type {
  CreateWebhookRequest,
  PaginationResultOfWebhookResponse,
  UpdateWebhookRequest,
  WebhookResponse,
} from "../types.js";

/**
 * Webhooks resource.
 */
export class Webhooks {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all webhooks
   */
  async list(
    params: { limit?: number; offset?: number; channelIds?: string[] } = {},
  ): Promise<PaginationResultOfWebhookResponse> {
    const response = await this._client.request("get", `/webhooks`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * Create a webhook
   */
  async create(params: CreateWebhookRequest): Promise<WebhookResponse> {
    const response = await this._client.request("post", `/webhooks`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Retrieve a webhook
   */
  async retrieve(id: string): Promise<WebhookResponse> {
    const response = await this._client.request("get", `/webhooks/${id}`);
    return response.json();
  }

  /**
   * Update a webhook
   */
  async update(
    id: string,
    params: UpdateWebhookRequest,
  ): Promise<WebhookResponse> {
    const response = await this._client.request("patch", `/webhooks/${id}`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Delete a webhook
   */
  async del(id: string): Promise<null> {
    const response = await this._client.request("delete", `/webhooks/${id}`);
    return null;
  }

  /**
   * Regenerate webhook signing key
   */
  async regenerateSigningKey(id: string): Promise<WebhookResponse> {
    const response = await this._client.request(
      "post",
      `/webhooks/${id}/regenerate-signing-key`,
    );
    return response.json();
  }
}

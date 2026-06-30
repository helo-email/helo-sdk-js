import { Client } from "../core/client.js";
import type {
  CreateWebhookRequest,
  PaginationResultOfWebhookResponse,
  UpdateWebhookRequest,
  WebhookResponse,
  WebhooksResponse,
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
   * listForChannel operation
   */
  async listForChannel(id: string): Promise<WebhooksResponse> {
    const response = await this._client.request(
      "get",
      `/app/channels/${id}/webhooks`,
    );
    return response.json();
  }

  /**
   * list operation
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
   * create operation
   */
  async create(params: CreateWebhookRequest): Promise<WebhookResponse> {
    const response = await this._client.request("post", `/webhooks`, {
      body: params,
    });
    return response.json();
  }

  /**
   * retrieve operation
   */
  async retrieve(id: string): Promise<WebhookResponse> {
    const response = await this._client.request("get", `/webhooks/${id}`);
    return response.json();
  }

  /**
   * update operation
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
   * del operation
   */
  async del(id: string): Promise<null> {
    const response = await this._client.request("delete", `/webhooks/${id}`);
    return null;
  }

  /**
   * regenerateSigningKey operation
   */
  async regenerateSigningKey(id: string): Promise<WebhookResponse> {
    const response = await this._client.request(
      "post",
      `/webhooks/${id}/regenerate-signing-key`,
    );
    return response.json();
  }
}

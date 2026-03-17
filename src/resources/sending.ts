import { Client } from "../core/client.js";
import type {
  SendBroadcastRequest,
  SendBroadcastResponse,
  SendMessageAcceptedResponse,
  SendMessageBatchRequest,
  SendMessageBatchResponse,
  SendMessageRequest,
} from "../types.js";

/**
 * Sending resource.
 */
export class Sending {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Send a transactional email
   */
  async transactional(
    params: SendMessageRequest,
  ): Promise<SendMessageAcceptedResponse> {
    const response = await this._client.request("post", `/send/transactional`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Send transactional emails in batch
   */
  async transactionalBatch(
    params: SendMessageBatchRequest,
  ): Promise<SendMessageBatchResponse> {
    const response = await this._client.request(
      "post",
      `/send/transactional/batch`,
      { body: params },
    );
    return response.json();
  }

  /**
   * Send a broadcast email
   */
  async broadcast(
    params: SendBroadcastRequest,
  ): Promise<SendBroadcastResponse> {
    const response = await this._client.request("post", `/send/broadcast`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Send a single broadcast email
   */
  async broadcastMessage(
    params: SendMessageRequest,
  ): Promise<SendMessageAcceptedResponse> {
    const response = await this._client.request(
      "post",
      `/send/broadcast/message`,
      { body: params },
    );
    return response.json();
  }
}

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
    options: { channelId?: string; idempotencyKey?: string } = {},
  ): Promise<SendMessageAcceptedResponse> {
    const response = await this._client.request("post", `/send/transactional`, {
      body: params,
      headers: {
        "X-Helo-Channel-Id": options.channelId,
        "X-Helo-Idempotency-Key": options.idempotencyKey,
      },
    });
    return response.json();
  }

  /**
   * Send transactional emails in batch
   */
  async transactionalBatch(
    params: SendMessageBatchRequest,
    options: { channelId?: string; idempotencyKey?: string } = {},
  ): Promise<SendMessageBatchResponse> {
    const response = await this._client.request(
      "post",
      `/send/transactional/batch`,
      {
        body: params,
        headers: {
          "X-Helo-Channel-Id": options.channelId,
          "X-Helo-Idempotency-Key": options.idempotencyKey,
        },
      },
    );
    return response.json();
  }

  /**
   * Send a broadcast email
   */
  async broadcast(
    params: SendBroadcastRequest,
    options: { channelId?: string; idempotencyKey?: string } = {},
  ): Promise<SendBroadcastResponse> {
    const response = await this._client.request("post", `/send/broadcast`, {
      body: params,
      headers: {
        "X-Helo-Channel-Id": options.channelId,
        "X-Helo-Idempotency-Key": options.idempotencyKey,
      },
    });
    return response.json();
  }

  /**
   * Send a single broadcast email
   */
  async broadcastMessage(
    params: SendMessageRequest,
    options: { channelId?: string; idempotencyKey?: string } = {},
  ): Promise<SendMessageAcceptedResponse> {
    const response = await this._client.request(
      "post",
      `/send/broadcast/message`,
      {
        body: params,
        headers: {
          "X-Helo-Channel-Id": options.channelId,
          "X-Helo-Idempotency-Key": options.idempotencyKey,
        },
      },
    );
    return response.json();
  }
}

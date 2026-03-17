import { Client } from "../core/client.js";
import type {
  MessageDetailsResponse,
  MessagesResponse,
  PaginatedEventsResponse,
} from "../types.js";
import type { EventType } from "../enums.js";

/**
 * Activity resource.
 */
export class Activity {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List activity events
   */
  async listEvents(
    params: {
      channelId?: string;
      messageId?: string;
      after?: number;
      startDate?: string;
      endDate?: string;
      limit?: number;
      recipient?: string;
      subject?: string;
      tags?: string[];
      eventTypes?: EventType[];
    } = {},
  ): Promise<PaginatedEventsResponse> {
    const response = await this._client.request("get", `/activity/events`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * List messages
   */
  async listMessages(
    params: {
      channelId?: string;
      after?: number;
      startDate?: string;
      endDate?: string;
      limit?: number;
      recipient?: string;
      subject?: string;
      tag?: string;
      status?: "sent" | "queued";
    } = {},
  ): Promise<MessagesResponse> {
    const response = await this._client.request("get", `/activity/messages`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * Retrieve message details
   */
  async retrieveMessage(id: string): Promise<MessageDetailsResponse> {
    const response = await this._client.request(
      "get",
      `/activity/messages/${id}`,
    );
    return response.json();
  }
}

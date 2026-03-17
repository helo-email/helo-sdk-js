/**
 * Activity resource.
 */
export class Activity {
  constructor(client) {
    this._client = client;
  }

  /**
   * List activity events
   */
  async listEvents({
    channelId,
    messageId,
    after,
    startDate,
    endDate,
    limit,
    recipient,
    subject,
    tags,
    eventTypes,
  } = {}) {
    const response = await this._client.request("get", `/activity/events`, {
      params: {
        channelId,
        messageId,
        after,
        startDate,
        endDate,
        limit,
        recipient,
        subject,
        tags,
        eventTypes,
      },
    });
    return response.json();
  }

  /**
   * List messages
   */
  async listMessages({
    channelId,
    after,
    startDate,
    endDate,
    limit,
    recipient,
    subject,
    tag,
    status,
  } = {}) {
    const response = await this._client.request("get", `/activity/messages`, {
      params: {
        channelId,
        after,
        startDate,
        endDate,
        limit,
        recipient,
        subject,
        tag,
        status,
      },
    });
    return response.json();
  }

  /**
   * Retrieve message details
   */
  async retrieveMessage(id) {
    const response = await this._client.request(
      "get",
      `/activity/messages/${id}`,
    );
    return response.json();
  }
}

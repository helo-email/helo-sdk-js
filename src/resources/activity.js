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
  async listEvents({ channelId, messageId, after, startDate, endDate, limit, recipient, subject, tags, eventTypes } = {}) {
    const query = {};
    if (channelId !== undefined) query.channelId = channelId;
    if (messageId !== undefined) query.messageId = messageId;
    if (after !== undefined) query.after = after;
    if (startDate !== undefined) query.startDate = startDate;
    if (endDate !== undefined) query.endDate = endDate;
    if (limit !== undefined) query.limit = limit;
    if (recipient !== undefined) query.recipient = recipient;
    if (subject !== undefined) query.subject = subject;
    if (tags !== undefined) query.tags = tags;
    if (eventTypes !== undefined) query.eventTypes = eventTypes;
    const response = await this._client.request("get", `/activity/events`, { params: query });
    return response.json();
  }

  /**
   * List messages
   */
  async listMessages({ channelId, after, startDate, endDate, limit, recipient, subject, tag, status } = {}) {
    const query = {};
    if (channelId !== undefined) query.channelId = channelId;
    if (after !== undefined) query.after = after;
    if (startDate !== undefined) query.startDate = startDate;
    if (endDate !== undefined) query.endDate = endDate;
    if (limit !== undefined) query.limit = limit;
    if (recipient !== undefined) query.recipient = recipient;
    if (subject !== undefined) query.subject = subject;
    if (tag !== undefined) query.tag = tag;
    if (status !== undefined) query.status = status;
    const response = await this._client.request("get", `/activity/messages`, { params: query });
    return response.json();
  }

  /**
   * Retrieve message details
   */
  async retrieveMessage({ id }) {
    const response = await this._client.request("get", `/activity/messages/${id}`);
    return response.json();
  }
}

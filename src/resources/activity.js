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
  async listEvents(params = {}) {
    const query = {};
    if (params.channelId !== undefined) query.channelId = params.channelId;
    if (params.messageId !== undefined) query.messageId = params.messageId;
    if (params.after !== undefined) query.after = params.after;
    if (params.startDate !== undefined) query.startDate = params.startDate;
    if (params.endDate !== undefined) query.endDate = params.endDate;
    if (params.limit !== undefined) query.limit = params.limit;
    if (params.recipient !== undefined) query.recipient = params.recipient;
    if (params.subject !== undefined) query.subject = params.subject;
    if (params.tags !== undefined) query.tags = params.tags;
    if (params.eventTypes !== undefined) query.eventTypes = params.eventTypes;
    const response = await this._client.request("get", `/activity/events`, { params: query });
    return response.json();
  }

  /**
   * List messages
   */
  async listMessages(params = {}) {
    const query = {};
    if (params.channelId !== undefined) query.channelId = params.channelId;
    if (params.after !== undefined) query.after = params.after;
    if (params.startDate !== undefined) query.startDate = params.startDate;
    if (params.endDate !== undefined) query.endDate = params.endDate;
    if (params.limit !== undefined) query.limit = params.limit;
    if (params.recipient !== undefined) query.recipient = params.recipient;
    if (params.subject !== undefined) query.subject = params.subject;
    if (params.tag !== undefined) query.tag = params.tag;
    if (params.status !== undefined) query.status = params.status;
    const response = await this._client.request("get", `/activity/messages`, { params: query });
    return response.json();
  }

  /**
   * Retrieve message details
   */
  async retrieveMessage(id) {
    const response = await this._client.request("get", `/activity/messages/${id}`);
    return response.json();
  }
}

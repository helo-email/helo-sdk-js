/**
 * WebhookEndpoints resource.
 */
export class WebhookEndpoints {
  constructor(client) {
    this._client = client;
  }

  /**
   * List all webhook endpoints
   */
  async list({ limit, offset, channelIds } = {}) {
    const query = {};
    if (limit !== undefined) query.limit = limit;
    if (offset !== undefined) query.offset = offset;
    if (channelIds !== undefined) query.channelIds = channelIds;
    const response = await this._client.request("get", `/webhook-endpoints`, { params: query });
    return response.json();
  }

  /**
   * Create a webhook endpoint
   */
  async create({ url, events, channelId, additionalHeaders, enabled }) {
    const response = await this._client.request("post", `/webhook-endpoints`, { body: { url, events, channelId, additionalHeaders, enabled } });
    return response.json();
  }

  /**
   * Retrieve a webhook endpoint
   */
  async retrieve({ id }) {
    const response = await this._client.request("get", `/webhook-endpoints/${id}`);
    return response.json();
  }

  /**
   * Update a webhook endpoint
   */
  async update({ id, url, events, channelId, additionalHeaders, enabled }) {
    const response = await this._client.request("patch", `/webhook-endpoints/${id}`, { body: { url, events, channelId, additionalHeaders, enabled } });
    return response.json();
  }

  /**
   * Delete a webhook endpoint
   */
  async del({ id }) {
    const response = await this._client.request("delete", `/webhook-endpoints/${id}`);
    return null;
  }

  /**
   * Regenerate webhook signing key
   */
  async regenerateSigningKey({ id }) {
    const response = await this._client.request("post", `/webhook-endpoints/${id}/regenerate-signing-key`);
    return response.json();
  }
}

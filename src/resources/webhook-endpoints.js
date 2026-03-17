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
  async list(params = {}) {
    const query = {};
    if (params.limit !== undefined) query.limit = params.limit;
    if (params.offset !== undefined) query.offset = params.offset;
    if (params.channelIds !== undefined) query.channelIds = params.channelIds;
    const response = await this._client.request("get", `/webhook-endpoints`, { params: query });
    return response.json();
  }

  /**
   * Create a webhook endpoint
   */
  async create(params) {
    const response = await this._client.request("post", `/webhook-endpoints`, { body: params });
    return response.json();
  }

  /**
   * Retrieve a webhook endpoint
   */
  async retrieve(id) {
    const response = await this._client.request("get", `/webhook-endpoints/${id}`);
    return response.json();
  }

  /**
   * Update a webhook endpoint
   */
  async update(id, params) {
    const response = await this._client.request("patch", `/webhook-endpoints/${id}`, { body: params });
    return response.json();
  }

  /**
   * Delete a webhook endpoint
   */
  async del(id) {
    const response = await this._client.request("delete", `/webhook-endpoints/${id}`);
    return null;
  }

  /**
   * Regenerate webhook signing key
   */
  async regenerateSigningKey(id) {
    const response = await this._client.request("post", `/webhook-endpoints/${id}/regenerate-signing-key`);
    return response.json();
  }
}

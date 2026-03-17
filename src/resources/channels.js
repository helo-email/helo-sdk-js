/**
 * Channels resource.
 */
export class Channels {
  constructor(client) {
    this._client = client;
  }

  /**
   * List all channels
   */
  async list(params = {}) {
    const query = {};
    if (params.limit !== undefined) query.limit = params.limit;
    if (params.offset !== undefined) query.offset = params.offset;
    if (params.name !== undefined) query.name = params.name;
    if (params.channelIds !== undefined) query.channelIds = params.channelIds;
    if (params.deliveryType !== undefined) query.deliveryType = params.deliveryType;
    const response = await this._client.request("get", `/channels`, { params: query });
    return response.json();
  }

  /**
   * Create a channel
   */
  async create(params) {
    const response = await this._client.request("post", `/channels`, { body: params });
    return response.json();
  }

  /**
   * Retrieve a channel
   */
  async retrieve(id) {
    const response = await this._client.request("get", `/channels/${id}`);
    return response.json();
  }

  /**
   * Update a channel
   */
  async update(id, params) {
    const response = await this._client.request("patch", `/channels/${id}`, { body: params });
    return response.json();
  }

  /**
   * Delete a channel
   */
  async del(id) {
    const response = await this._client.request("delete", `/channels/${id}`);
    return null;
  }
}

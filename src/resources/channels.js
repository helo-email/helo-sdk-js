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
  async list({ limit, offset, name, channelIds, deliveryType } = {}) {
    const query = {};
    if (limit !== undefined) query.limit = limit;
    if (offset !== undefined) query.offset = offset;
    if (name !== undefined) query.name = name;
    if (channelIds !== undefined) query.channelIds = channelIds;
    if (deliveryType !== undefined) query.deliveryType = deliveryType;
    const response = await this._client.request("get", `/channels`, { params: query });
    return response.json();
  }

  /**
   * Create a channel
   */
  async create({ name, deliveryType, trackLinks, trackOpens }) {
    const response = await this._client.request("post", `/channels`, { body: { name, deliveryType, trackLinks, trackOpens } });
    return response.json();
  }

  /**
   * Retrieve a channel
   */
  async retrieve({ id }) {
    const response = await this._client.request("get", `/channels/${id}`);
    return response.json();
  }

  /**
   * Update a channel
   */
  async update({ id, name, deliveryType, trackLinks, trackOpens }) {
    const response = await this._client.request("patch", `/channels/${id}`, { body: { name, deliveryType, trackLinks, trackOpens } });
    return response.json();
  }

  /**
   * Delete a channel
   */
  async del({ id }) {
    const response = await this._client.request("delete", `/channels/${id}`);
    return null;
  }
}

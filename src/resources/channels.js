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
    const response = await this._client.request("get", `/channels`, {
      params: { limit, offset, name, channelIds, deliveryType },
    });
    return response.json();
  }

  /**
   * Create a channel
   */
  async create({ name, deliveryType, trackLinks, trackOpens }) {
    const response = await this._client.request("post", `/channels`, {
      body: { name, deliveryType, trackLinks, trackOpens },
    });
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
  async update(id, { name, deliveryType, trackLinks, trackOpens }) {
    const response = await this._client.request("patch", `/channels/${id}`, {
      body: { name, deliveryType, trackLinks, trackOpens },
    });
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

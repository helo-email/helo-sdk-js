/**
 * Domains resource.
 */
export class Domains {
  constructor(client) {
    this._client = client;
  }

  /**
   * List all domains
   */
  async list({ limit, offset, name, channelIds } = {}) {
    const query = {};
    if (limit !== undefined) query.limit = limit;
    if (offset !== undefined) query.offset = offset;
    if (name !== undefined) query.name = name;
    if (channelIds !== undefined) query.channelIds = channelIds;
    const response = await this._client.request("get", `/domains`, { params: query });
    return response.json();
  }

  /**
   * Create a domain
   */
  async create({ name, channelIds }) {
    const response = await this._client.request("post", `/domains`, { body: { name, channelIds } });
    return response.json();
  }

  /**
   * Retrieve a domain
   */
  async retrieve({ id }) {
    const response = await this._client.request("get", `/domains/${id}`);
    return response.json();
  }

  /**
   * Update a domain
   */
  async update({ id, channelIds }) {
    const response = await this._client.request("patch", `/domains/${id}`, { body: { channelIds } });
    return response.json();
  }

  /**
   * Delete a domain
   */
  async del({ id }) {
    const response = await this._client.request("delete", `/domains/${id}`);
    return null;
  }

  /**
   * Verify a domain
   */
  async verify({ id }) {
    const response = await this._client.request("post", `/domains/${id}/verify`);
    return response.json();
  }

  /**
   * Rotate a domain key
   */
  async rotateKey({ id }) {
    const response = await this._client.request("post", `/domains/${id}/rotate-key`);
    return response.json();
  }
}

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
  async list(params = {}) {
    const query = {};
    if (params.limit !== undefined) query.limit = params.limit;
    if (params.offset !== undefined) query.offset = params.offset;
    if (params.name !== undefined) query.name = params.name;
    if (params.channelIds !== undefined) query.channelIds = params.channelIds;
    const response = await this._client.request("get", `/domains`, { params: query });
    return response.json();
  }

  /**
   * Create a domain
   */
  async create(params) {
    const response = await this._client.request("post", `/domains`, { body: params });
    return response.json();
  }

  /**
   * Retrieve a domain
   */
  async retrieve(id) {
    const response = await this._client.request("get", `/domains/${id}`);
    return response.json();
  }

  /**
   * Update a domain
   */
  async update(id, params) {
    const response = await this._client.request("patch", `/domains/${id}`, { body: params });
    return response.json();
  }

  /**
   * Delete a domain
   */
  async del(id) {
    const response = await this._client.request("delete", `/domains/${id}`);
    return null;
  }

  /**
   * Verify a domain
   */
  async verify(id) {
    const response = await this._client.request("post", `/domains/${id}/verify`);
    return response.json();
  }

  /**
   * Rotate a domain key
   */
  async rotateKey(id) {
    const response = await this._client.request("post", `/domains/${id}/rotate-key`);
    return response.json();
  }
}

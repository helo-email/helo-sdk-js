/**
 * Suppressions resource.
 */
export class Suppressions {
  constructor(client) {
    this._client = client;
  }

  /**
   * List suppressions
   */
  async list(params = {}) {
    const query = {};
    if (params.channelId !== undefined) query.channelId = params.channelId;
    if (params.mailType !== undefined) query.mailType = params.mailType;
    if (params.reason !== undefined) query.reason = params.reason;
    if (params.email !== undefined) query.email = params.email;
    if (params.limit !== undefined) query.limit = params.limit;
    if (params.offset !== undefined) query.offset = params.offset;
    const response = await this._client.request("get", `/suppressions`, { params: query });
    return response.json();
  }

  /**
   * Create suppressions
   */
  async create(params) {
    const response = await this._client.request("post", `/suppressions`, { body: params });
    return response.json();
  }

  /**
   * Remove suppressions
   */
  async remove(params) {
    const response = await this._client.request("post", `/suppressions/remove`, { body: params });
    return response.json();
  }
}

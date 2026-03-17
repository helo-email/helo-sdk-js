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
  async list({ channelId, mailType, reason, email, limit, offset } = {}) {
    const query = {};
    if (channelId !== undefined) query.channelId = channelId;
    if (mailType !== undefined) query.mailType = mailType;
    if (reason !== undefined) query.reason = reason;
    if (email !== undefined) query.email = email;
    if (limit !== undefined) query.limit = limit;
    if (offset !== undefined) query.offset = offset;
    const response = await this._client.request("get", `/suppressions`, { params: query });
    return response.json();
  }

  /**
   * Create suppressions
   */
  async create({ channelId, mailType, emails }) {
    const response = await this._client.request("post", `/suppressions`, { body: { channelId, mailType, emails } });
    return response.json();
  }

  /**
   * Remove suppressions
   */
  async remove({ channelId, mailType, emails }) {
    const response = await this._client.request("post", `/suppressions/remove`, { body: { channelId, mailType, emails } });
    return response.json();
  }
}

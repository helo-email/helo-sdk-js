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
    const response = await this._client.request("get", `/suppressions`, {
      params: { channelId, mailType, reason, email, limit, offset },
    });
    return response.json();
  }

  /**
   * Create suppressions
   */
  async create({ channelId, mailType, emails }) {
    const response = await this._client.request("post", `/suppressions`, {
      body: { channelId, mailType, emails },
    });
    return response.json();
  }

  /**
   * Remove suppressions
   */
  async remove({ channelId, mailType, emails }) {
    const response = await this._client.request(
      "post",
      `/suppressions/remove`,
      { body: { channelId, mailType, emails } },
    );
    return response.json();
  }
}

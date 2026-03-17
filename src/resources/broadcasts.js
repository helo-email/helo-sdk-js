/**
 * Broadcasts resource.
 */
export class Broadcasts {
  constructor(client) {
    this._client = client;
  }

  /**
   * List broadcasts
   */
  async list({ channelId, status, subject, limit, offset } = {}) {
    const response = await this._client.request("get", `/broadcasts`, {
      params: { channelId, status, subject, limit, offset },
    });
    return response.json();
  }

  /**
   * Retrieve a broadcast
   */
  async retrieve(id) {
    const response = await this._client.request("get", `/broadcasts/${id}`);
    return response.json();
  }

  /**
   * List broadcast failures
   */
  async listFailures(id) {
    const response = await this._client.request(
      "get",
      `/broadcasts/${id}/failures`,
    );
    return response.json();
  }

  /**
   * List broadcast suppressions
   */
  async listSuppressions(id) {
    const response = await this._client.request(
      "get",
      `/broadcasts/${id}/suppressions`,
    );
    return response.json();
  }
}

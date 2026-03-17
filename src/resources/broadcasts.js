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
    const query = {};
    if (channelId !== undefined) query.channelId = channelId;
    if (status !== undefined) query.status = status;
    if (subject !== undefined) query.subject = subject;
    if (limit !== undefined) query.limit = limit;
    if (offset !== undefined) query.offset = offset;
    const response = await this._client.request("get", `/broadcasts`, { params: query });
    return response.json();
  }

  /**
   * Retrieve a broadcast
   */
  async retrieve({ id }) {
    const response = await this._client.request("get", `/broadcasts/${id}`);
    return response.json();
  }

  /**
   * List broadcast failures
   */
  async listFailures({ id }) {
    const response = await this._client.request("get", `/broadcasts/${id}/failures`);
    return response.json();
  }

  /**
   * List broadcast suppressions
   */
  async listSuppressions({ id }) {
    const response = await this._client.request("get", `/broadcasts/${id}/suppressions`);
    return response.json();
  }
}

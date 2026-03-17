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
  async list(params = {}) {
    const query = {};
    if (params.channelId !== undefined) query.channelId = params.channelId;
    if (params.status !== undefined) query.status = params.status;
    if (params.subject !== undefined) query.subject = params.subject;
    if (params.limit !== undefined) query.limit = params.limit;
    if (params.offset !== undefined) query.offset = params.offset;
    const response = await this._client.request("get", `/broadcasts`, { params: query });
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
    const response = await this._client.request("get", `/broadcasts/${id}/failures`);
    return response.json();
  }

  /**
   * List broadcast suppressions
   */
  async listSuppressions(id) {
    const response = await this._client.request("get", `/broadcasts/${id}/suppressions`);
    return response.json();
  }
}

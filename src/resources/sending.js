/**
 * Sending resource.
 */
export class Sending {
  constructor(client) {
    this._client = client;
  }

  /**
   * Send a transactional email
   */
  async transactional(params) {
    const response = await this._client.request("post", `/send/transactional`, { body: params });
    return response.json();
  }

  /**
   * Send transactional emails in batch
   */
  async transactionalBatch(params) {
    const response = await this._client.request("post", `/send/transactional/batch`, { body: params });
    return response.json();
  }

  /**
   * Send a broadcast email
   */
  async broadcast(params) {
    const response = await this._client.request("post", `/send/broadcast`, { body: params });
    return response.json();
  }

  /**
   * Send a single broadcast email
   */
  async broadcastMessage(params) {
    const response = await this._client.request("post", `/send/broadcast/message`, { body: params });
    return response.json();
  }
}

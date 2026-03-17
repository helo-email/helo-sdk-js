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
  async transactional({ from, to, cc, bcc, replyTo, subject, html, text, template, tracking, attachments, tags, headers, metadata }) {
    const response = await this._client.request("post", `/send/transactional`, { body: { from, to, cc, bcc, replyTo, subject, html, text, template, tracking, attachments, tags, headers, metadata } });
    return response.json();
  }

  /**
   * Send transactional emails in batch
   */
  async transactionalBatch({ requests }) {
    const response = await this._client.request("post", `/send/transactional/batch`, { body: { requests } });
    return response.json();
  }

  /**
   * Send a broadcast email
   */
  async broadcast({ from, replyTo, template, tracking, attachments, tags, headers, metadata, messages }) {
    const response = await this._client.request("post", `/send/broadcast`, { body: { from, replyTo, template, tracking, attachments, tags, headers, metadata, messages } });
    return response.json();
  }

  /**
   * Send a single broadcast email
   */
  async broadcastMessage({ from, to, cc, bcc, replyTo, subject, html, text, template, tracking, attachments, tags, headers, metadata }) {
    const response = await this._client.request("post", `/send/broadcast/message`, { body: { from, to, cc, bcc, replyTo, subject, html, text, template, tracking, attachments, tags, headers, metadata } });
    return response.json();
  }
}

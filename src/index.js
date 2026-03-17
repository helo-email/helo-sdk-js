import { Client } from "./core/client.js";
import { ApiError } from "./core/api-error.js";
import { Channels } from "./resources/channels.js";
import { Activity } from "./resources/activity.js";
import { Domains } from "./resources/domains.js";
import { Sending } from "./resources/sending.js";
import { Broadcasts } from "./resources/broadcasts.js";
import { Statistics } from "./resources/statistics.js";
import { Suppressions } from "./resources/suppressions.js";
import { WebhookEndpoints } from "./resources/webhook-endpoints.js";
import { MailType } from "./enums.js";
import { DeliveryType } from "./enums.js";
import { EventType } from "./enums.js";
import { DnsRecordStatus } from "./enums.js";
import { DnsRecordType } from "./enums.js";
import { BroadcastStatus } from "./enums.js";
import { AttachmentDisposition } from "./enums.js";
import { SuppressionReason } from "./enums.js";
import { WebhookEvent } from "./enums.js";

class Helo {
  /**
   * @param {string} accessToken - Bearer token for authentication
   * @param {Object} [options]
   * @param {string} [options.baseUrl] - API base URL
   * @param {Function} [options.fetch] - Custom fetch implementation
   */
  constructor(accessToken, options = {}) {
    if (!accessToken) {
      throw new Error(
        'Helo requires an access token. Pass it as the first argument: new Helo("your-token")',
      );
    }

    this._client = new Client({
      accessToken,
      baseUrl: options.baseUrl || "http://localhost:8002/",
      fetch: options.fetch || undefined,
    });

    this.channels = new Channels(this._client);
    this.activity = new Activity(this._client);
    this.domains = new Domains(this._client);
    this.sending = new Sending(this._client);
    this.broadcasts = new Broadcasts(this._client);
    this.statistics = new Statistics(this._client);
    this.suppressions = new Suppressions(this._client);
    this.webhookEndpoints = new WebhookEndpoints(this._client);
  }
}

Helo.ApiError = ApiError;
Helo.MailType = MailType;
Helo.DeliveryType = DeliveryType;
Helo.EventType = EventType;
Helo.DnsRecordStatus = DnsRecordStatus;
Helo.DnsRecordType = DnsRecordType;
Helo.BroadcastStatus = BroadcastStatus;
Helo.AttachmentDisposition = AttachmentDisposition;
Helo.SuppressionReason = SuppressionReason;
Helo.WebhookEvent = WebhookEvent;

export default Helo;

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

export type { ClientConfig } from "./core/client.js";
export { ApiError } from "./core/api-error.js";
export * from "./types.js";
export * from "./enums.js";

interface HeloOptions {
  baseUrl?: string;
  fetch?: typeof fetch;
}

class Helo {
  readonly channels: Channels;
  readonly activity: Activity;
  readonly domains: Domains;
  readonly sending: Sending;
  readonly broadcasts: Broadcasts;
  readonly statistics: Statistics;
  readonly suppressions: Suppressions;
  readonly webhookEndpoints: WebhookEndpoints;

  /**
   * @param apiKey - API key for authentication
   * @param options - Configuration options
   */
  constructor(apiKey: string, options: HeloOptions = {}) {
    if (!apiKey) {
      throw new Error(
        'Helo requires an access token. Pass it as the first argument: new Helo("your-token")',
      );
    }

    const client = new Client({
      apiKey,
      baseUrl: options.baseUrl || "https://api.helohq.com",
      fetch: options.fetch,
    });

    this.channels = new Channels(client);
    this.activity = new Activity(client);
    this.domains = new Domains(client);
    this.sending = new Sending(client);
    this.broadcasts = new Broadcasts(client);
    this.statistics = new Statistics(client);
    this.suppressions = new Suppressions(client);
    this.webhookEndpoints = new WebhookEndpoints(client);
  }

  static ApiError = ApiError;
  static MailType = MailType;
  static DeliveryType = DeliveryType;
  static EventType = EventType;
  static DnsRecordStatus = DnsRecordStatus;
  static DnsRecordType = DnsRecordType;
  static BroadcastStatus = BroadcastStatus;
  static AttachmentDisposition = AttachmentDisposition;
  static SuppressionReason = SuppressionReason;
  static WebhookEvent = WebhookEvent;
}

export default Helo;

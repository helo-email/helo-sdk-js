export const MailType = {
  TRANSACTIONAL: "transactional",
  BROADCAST: "broadcast",
} as const;

export type MailType = (typeof MailType)[keyof typeof MailType];

export const DeliveryType = {
  LIVE: "live",
  SANDBOX: "sandbox",
} as const;

export type DeliveryType = (typeof DeliveryType)[keyof typeof DeliveryType];

export const EventType = {
  ACCEPTED: "accepted",
  PROCESSED: "processed",
  DELIVERED: "delivered",
  BOUNCED: "bounced",
  OPENED: "opened",
  CLICKED: "clicked",
  COMPLAINED: "complained",
  UNSUBSCRIBED: "unsubscribed",
  RESUBSCRIBED: "resubscribed",
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

export const MessageStatus = {
  QUEUED: "queued",
  SENT: "sent",
} as const;

export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];

export const DnsRecordStatus = {
  PENDING: "pending",
  VERIFIED: "verified",
  FAILING: "failing",
  FAILED: "failed",
} as const;

export type DnsRecordStatus =
  (typeof DnsRecordStatus)[keyof typeof DnsRecordStatus];

export const DnsRecordType = {
  TXT: "txt",
  CNAME: "cname",
} as const;

export type DnsRecordType = (typeof DnsRecordType)[keyof typeof DnsRecordType];

export const BroadcastStatus = {
  ACCEPTED: "accepted",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELED: "canceled",
} as const;

export type BroadcastStatus =
  (typeof BroadcastStatus)[keyof typeof BroadcastStatus];

export const AttachmentDisposition = {
  ATTACHMENT: "attachment",
  INLINE: "inline",
} as const;

export type AttachmentDisposition =
  (typeof AttachmentDisposition)[keyof typeof AttachmentDisposition];

export const SuppressionReason = {
  BOUNCE: "bounce",
  COMPLAINT: "complaint",
  UNSUBSCRIBE: "unsubscribe",
  MANUAL: "manual",
} as const;

export type SuppressionReason =
  (typeof SuppressionReason)[keyof typeof SuppressionReason];

export const WebhookEvent = {
  ACCEPTED: "accepted",
  PROCESSED: "processed",
  BOUNCED: "bounced",
  DELIVERED: "delivered",
  OPENED: "opened",
  CLICKED: "clicked",
  COMPLAINED: "complained",
  UNSUBSCRIBED: "unsubscribed",
  RESUBSCRIBED: "resubscribed",
  DOMAIN_KEY_VERIFIED: "domain-key-verified",
  DOMAIN_KEY_VERIFICATION_FAILED: "domain-key-verification-failed",
  RETURN_PATH_DOMAIN_VERIFIED: "return-path-domain-verified",
  RETURN_PATH_DOMAIN_VERIFICATION_FAILED:
    "return-path-domain-verification-failed",
} as const;

export type WebhookEvent = (typeof WebhookEvent)[keyof typeof WebhookEvent];

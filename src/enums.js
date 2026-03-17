export const MailType = Object.freeze({
  TRANSACTIONAL: "transactional",
  BROADCAST: "broadcast",
});

export const DeliveryType = Object.freeze({
  LIVE: "live",
  SANDBOX: "sandbox",
});

export const EventType = Object.freeze({
  ACCEPTED: "accepted",
  PROCESSED: "processed",
  DELIVERED: "delivered",
  BOUNCED: "bounced",
  OPENED: "opened",
  CLICKED: "clicked",
  COMPLAINED: "complained",
  UNSUBSCRIBED: "unsubscribed",
});

export const DnsRecordStatus = Object.freeze({
  PENDING: "pending",
  VERIFIED: "verified",
  FAILING: "failing",
  FAILED: "failed",
});

export const DnsRecordType = Object.freeze({
  TXT: "txt",
  CNAME: "cname",
});

export const BroadcastStatus = Object.freeze({
  ACCEPTED: "accepted",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

export const AttachmentDisposition = Object.freeze({
  ATTACHMENT: "attachment",
  INLINE: "inline",
});

export const SuppressionReason = Object.freeze({
  BOUNCE: "bounce",
  COMPLAINT: "complaint",
  UNSUBSCRIBE: "unsubscribe",
  MANUAL: "manual",
});

export const WebhookEvent = Object.freeze({
  ACCEPTED: "accepted",
  PROCESSED: "processed",
  BOUNCED: "bounced",
  DELIVERED: "delivered",
  OPENED: "opened",
  CLICKED: "clicked",
  COMPLAINED: "complained",
  UNSUBSCRIBED: "unsubscribed",
  RESUBSCRIBED: "resubscribed",
});

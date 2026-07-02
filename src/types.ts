import type {
  MailType,
  DeliveryType,
  EventType,
  DnsRecordStatus,
  DnsRecordType,
  BroadcastStatus,
  AttachmentDisposition,
  SuppressionReason,
  WebhookEvent,
} from "./enums.js";

export interface ChannelDetailsResponse {
  id?: string;
  name?: string;
  deliveryType?: DeliveryType;
  createdAt?: string;
  updatedAt?: string;
  tracking?: ChannelTracking;
}

export interface ChannelBasicResponse {
  id?: string;
  name?: string;
  deliveryType?: DeliveryType;
  createdAt?: string;
}

export interface ChannelTracking {
  links: boolean;
  opens: boolean;
}

export interface CreateChannelRequest {
  name: string;
  deliveryType: DeliveryType;
  tracking?: CreateChannelTracking;
}

export interface CreateChannelTracking {
  links?: boolean;
  opens?: boolean;
}

export interface ValidationError {
  message: string;
}

export interface ErrorResponse {
  type?: string;
  title?: string;
  instance?: string;
  status?: number;
  code?: string;
  detail?: string;
  requestId?: string;
  errors?: Record<string, unknown>;
}

export interface PaginationResultOfChannelBasicResponse {
  results: ChannelBasicResponse[];
  totalCount: number;
}

export interface UpdateChannelRequest {
  name?: string;
  deliveryType?: DeliveryType;
  tracking?: UpdateChannelTracking;
}

export interface UpdateChannelTracking {
  links?: boolean;
  opens?: boolean;
}

export interface ActivityMailAddress {
  email: string;
  name?: string;
}

export interface ActivityEvent {
  messageId: string;
  channelId: string;
  mailType: "transactional" | "broadcast";
  mailSource?: "api" | "smtp";
  eventType: EventType;
  timestamp: string;
  subject: string;
  recipients: string[];
  tags?: string[];
  metadata?: Record<string, unknown>;
  details?: Record<string, unknown>;
}

export interface PaginatedEventsResponse {
  after?: number;
  totalCount: number;
  results: ActivityEvent[];
}

export interface PaginatedMessagesResponse {
  after?: number;
  totalCount: number;
  results: Message[];
}

export interface Message {
  messageId: string;
  channelId: string;
  timestamp: string;
  mailType: "transactional" | "broadcast";
  mailSource: "api" | "smtp";
  deliveryType: "live" | "sandbox";
  status: "queued" | "sent";
  subject: string;
  recipients: string[];
}

export interface MessageDetailsResponse {
  messageId: string;
  channelId: string;
  timestamp: string;
  mailType: "transactional" | "broadcast";
  mailSource: "api" | "smtp";
  deliveryType: "live" | "sandbox";
  status: "queued" | "sent";
  subject: string;
  from: ActivityMailAddress;
  to: ActivityMailAddress[];
  cc?: ActivityMailAddress[];
  bcc?: ActivityMailAddress[];
  replyTo?: ActivityMailAddress[];
  text?: string;
  html?: string;
  body?: string;
  tags?: string[];
  headers?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  attachments?: {
    fileName?: string;
    disposition?: "inline" | "attachment";
    size?: number;
  }[];
  tracking: { links?: boolean; opens?: boolean };
  events: {
    eventType?: EventType;
    timestamp?: string;
    recipients?: string[];
    details?: Record<string, unknown>;
  }[];
}

export interface CreateDomainRequest {
  name: string;
  channelIds?: string[];
}

export interface DnsRecordResponse {
  type?: DnsRecordType;
  host?: string;
  value?: string;
  status?: DnsRecordStatus;
  lastCheckedAt?: string;
}

export interface DnsRecordsResponse {
  domainKeyActive?: DnsRecordResponse;
  domainKeyPending?: DnsRecordResponse;
  returnPath?: DnsRecordResponse[];
  tracking?: DnsRecordResponse;
  unsubscribe?: DnsRecordResponse;
}

export interface DomainChannelResponse {
  id: string;
  name: string;
  deliveryType: DeliveryType;
  deleted?: boolean;
}

export interface DomainResponse {
  id: string;
  createdAt: string;
  name: string;
  verified: boolean;
  channels?: DomainChannelResponse[];
}

export interface DomainWithDnsResponse {
  id: string;
  createdAt: string;
  name: string;
  verified: boolean;
  channels?: DomainChannelResponse[];
  dnsRecords: DnsRecordsResponse;
}

export interface PaginatedResponseOfDomainResponse {
  totalCount: number;
  results: DomainResponse[];
}

export interface UpdateDomainRequest {
  channelIds?: string[];
}

export interface MailAddress {
  email: string;
  name?: string;
}

export interface Attachment {
  content: string;
  contentId?: string;
  contentType?: string;
  fileName: string;
  disposition: AttachmentDisposition;
}

export interface SendBroadcastRequest {
  from: MailAddress;
  replyTo?: MailAddress[];
  template: {
    subject?: string;
    html?: string;
    text?: string;
    inlineStyles?: boolean;
    data?: Record<string, unknown>;
  };
  tracking?: { opens?: boolean; links?: boolean };
  attachments?: Attachment[];
  tags?: string[];
  headers?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  messages: {
    to?: MailAddress[];
    cc?: MailAddress[];
    bcc?: MailAddress[];
    tags?: string[];
    headers?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    data?: Record<string, unknown>;
  }[];
}

export interface SendBroadcastResponse {
  status?: string;
  broadcastId?: string;
}

export interface SendMessageRequest {
  from: MailAddress;
  to: MailAddress[];
  cc?: MailAddress[];
  bcc?: MailAddress[];
  replyTo?: MailAddress[];
  subject?: string;
  html?: string;
  text?: string;
  template?: {
    subject?: string;
    html?: string;
    text?: string;
    inlineStyles?: boolean;
    data?: Record<string, unknown>;
  };
  tracking?: { opens?: boolean; links?: boolean };
  attachments?: Attachment[];
  tags?: string[];
  headers?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SendMessageResponse {}

export interface SendMessageAcceptedResponse {
  status?: string;
  messageId?: string;
  suppressions?: string[];
}

export interface SendMessageFailedResponse {
  status: string;
  errorCode: string;
  errorMessage: string;
}

export interface SendMessageBatchRequest {
  requests: SendMessageRequest[];
}

export interface SendMessageBatchResponse {
  responses: SendMessageResponse[];
}

export interface BroadcastResponse {
  id: string;
  createdAt: string;
  status: BroadcastStatus;
  subject: string;
  completion: string;
  messages: number;
}

export interface BroadcastDetailsResponse {
  id: string;
  createdAt: string;
  status: BroadcastStatus;
  subject: string;
  completion: string;
  messages: number;
  failed: number;
  suppressed: number;
  content: BroadcastContent;
  tracking: BroadcastTracking;
  statistics: BroadcastStatistics;
}

export interface BroadcastContent {
  from?: MailAddress;
  replyTo?: MailAddress[];
  template?: { subject?: string; html?: string; text?: string };
  attachments?: {
    fileName?: string;
    disposition?: AttachmentDisposition;
    size?: number;
  }[];
  tags?: string[];
  headers?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface BroadcastTracking {
  opens: boolean;
  links: boolean;
}

export interface BroadcastStatistics {
  sent: number;
  delivered: number;
  bounced: number;
  opened: number;
  clicked: number;
  complained: number;
  unsubscribed: number;
}

export interface BroadcastFailureResponse {
  recipients: RecipientHeaders;
  messageIndex: number;
  errorCode: string;
  errorMessage: string;
}

export interface RecipientHeaders {
  to: MailAddress[];
  cc?: MailAddress[];
  bcc?: MailAddress[];
}

export interface PaginatedResponseOfBroadcast {
  totalCount: number;
  results: BroadcastResponse[];
}

export interface PaginatedResponseOfBroadcastFailure {
  totalCount: number;
  results: BroadcastFailureResponse[];
}

export interface PaginatedResponseOfBroadcastSuppression {
  totalCount: number;
  results: string[];
}

export interface DeliveryStats {
  sent?: number;
  delivered?: number;
  opened?: number;
  clicked?: number;
  bounced?: number;
  unsubscribed?: number;
  complained?: number;
}

export interface StatisticsTotalsResponse {
  transactional?: DeliveryStats;
  broadcast?: DeliveryStats;
}

export interface StatisticsDailyResponse {
  results?: {
    timestamp?: string;
    transactional?: DeliveryStats;
    broadcast?: DeliveryStats;
  }[];
}

export interface StatisticsHourlyResponse {
  results?: {
    timestamp?: string;
    transactional?: DeliveryStats;
    broadcast?: DeliveryStats;
  }[];
}

export interface PaginatedResponseOfSuppressionResponse {
  totalCount: number;
  results: SuppressionResponse[];
}

export interface SuppressionResponse {
  email: string;
  reason: SuppressionReason;
  createdAt: string;
}

export interface CreateSuppressionsRequest {
  channelId: string;
  mailType: MailType;
  emails: string[];
}

export interface CreateSuppressionsResponse {
  results: SuppressionResult[];
}

export interface SuppressionResult {
  email: string;
  success: boolean;
  message?: string;
}

export interface RemoveSuppressionsRequest {
  channelId: string;
  mailType: MailType;
  emails: string[];
}

export interface RemoveSuppressionsResponse {
  results: RemoveSuppressionResult[];
}

export interface RemoveSuppressionResult {
  email: string;
  success: boolean;
  message?: string;
}

export interface CreateWebhookRequest {
  url: string;
  events: WebhookEvent[];
  channelId?: string;
  additionalHeaders?: WebhookHeader[];
  enabled?: boolean;
}

export interface WebhookHeader {
  name: string;
  value: string;
}

export interface PaginationResultOfWebhookResponse {
  results: WebhookResponse[];
  totalCount: number;
}

export interface UpdateWebhookRequest {
  url?: string;
  events?: WebhookEvent[];
  channelId?: string;
  additionalHeaders?: WebhookHeader[];
  enabled?: boolean;
}

export interface WebhookResponse {
  id?: string;
  channelId?: string;
  url?: string;
  payloadSigningKey?: string;
  enabled?: boolean;
  additionalHeaders?: WebhookHeader[];
  events?: WebhookEvent[];
  lastResponse?: WebhookLastResponse;
}

export interface WebhookLastResponse {
  statusCode?: number;
  error?: string;
  at?: string;
}

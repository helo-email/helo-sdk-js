# Helo.sending

| Method                                                          | HTTP request                       | Description                        |
| --------------------------------------------------------------- | ---------------------------------- | ---------------------------------- |
| [**sendTransactional**](Sending.md#sendTransactional)           | **POST** /send/transactional       | Send a transactional email         |
| [**sendTransactionalBatch**](Sending.md#sendTransactionalBatch) | **POST** /send/transactional/batch | Send transactional emails in batch |
| [**sendBroadcast**](Sending.md#sendBroadcast)                   | **POST** /send/broadcast           | sendBroadcast operation            |
| [**sendBroadcastMessage**](Sending.md#sendBroadcastMessage)     | **POST** /send/broadcast/message   | Send a single broadcast email      |

## sendTransactional

> sendTransactional({ ... }, { channelId, idempotencyKey }) → Object

Send a transactional email

Sends a single transactional email such as receipts, confirmations, or notifications.

### Example

```javascript Sending_sendTransactional
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.sending.sendTransactional(
  {
    from: { email: "from@yourdomain.com", name: "From name" },
    to: [{ email: "to@example.com", name: "To name" }],
    cc: [{ email: "cc@example.com", name: "Cc name" }],
    bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
    replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
    subject: "Hello from Helo",
    html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
    text: "This is a test message, delivered with <3 by Helo.",
    template: {
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      inlineStyles: true,
      data: {},
    },
    tracking: { opens: true, links: true },
    attachments: [
      {
        content: "test-content",
        contentId: "test-contentId",
        contentType: "test-contentType",
        fileName: "test-fileName",
        disposition: Helo.AttachmentDisposition.ATTACHMENT,
      },
    ],
    tags: ["welcome", "onboarding"],
    headers: {},
    metadata: {},
  },
  {
    channelId: "550e8400-e29b-41d4-a716-446655440000",
    idempotencyKey: "example",
  },
);
```

## sendTransactionalBatch

> sendTransactionalBatch({ ... }, { channelId, idempotencyKey }) → Object

Send transactional emails in batch

Sends multiple transactional emails in a single API request for better performance.

### Example

```javascript Sending_sendTransactionalBatch
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.sending.sendTransactionalBatch(
  {
    requests: [
      {
        from: { email: "from@yourdomain.com", name: "From name" },
        to: [{ email: "to@example.com", name: "To name" }],
        cc: [{ email: "cc@example.com", name: "Cc name" }],
        bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
        replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
        subject: "Hello from Helo",
        html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
        text: "This is a test message, delivered with <3 by Helo.",
        template: {
          subject: "test-subject",
          html: "test-html",
          text: "test-text",
          inlineStyles: true,
          data: {},
        },
        tracking: { opens: true, links: true },
        attachments: [
          {
            content: "test-content",
            contentId: "test-contentId",
            contentType: "test-contentType",
            fileName: "test-fileName",
            disposition: Helo.AttachmentDisposition.ATTACHMENT,
          },
        ],
        tags: ["welcome", "onboarding"],
        headers: {},
        metadata: {},
      },
    ],
  },
  {
    channelId: "550e8400-e29b-41d4-a716-446655440000",
    idempotencyKey: "example",
  },
);
```

## sendBroadcast

> sendBroadcast({ ... }, { channelId, idempotencyKey }) → Object

sendBroadcast operation

### Example

```javascript Sending_sendBroadcast
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.sending.sendBroadcast(
  {
    from: { email: "test@example.com", name: "test-name" },
    replyTo: [{ email: "test@example.com", name: "test-name" }],
    template: {
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      inlineStyles: true,
      data: {},
    },
    tracking: { opens: true, links: true },
    attachments: [
      {
        content: "test-content",
        contentId: "test-contentId",
        contentType: "test-contentType",
        fileName: "test-fileName",
        disposition: Helo.AttachmentDisposition.ATTACHMENT,
      },
    ],
    tags: ["example1", "example2"],
    headers: {},
    metadata: {},
    messages: [
      {
        to: [{ email: "test@example.com", name: "test-name" }],
        cc: [{ email: "test@example.com", name: "test-name" }],
        bcc: [{ email: "test@example.com", name: "test-name" }],
        tags: ["example1", "example2"],
        headers: {},
        metadata: {},
        data: {},
      },
    ],
  },
  {
    channelId: "550e8400-e29b-41d4-a716-446655440000",
    idempotencyKey: "example",
  },
);
```

## sendBroadcastMessage

> sendBroadcastMessage({ ... }, { channelId, idempotencyKey }) → Object

Send a single broadcast email

Sends a single broadcast email message.

### Example

```javascript Sending_sendBroadcastMessage
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.sending.sendBroadcastMessage(
  {
    from: { email: "from@yourdomain.com", name: "From name" },
    to: [{ email: "to@example.com", name: "To name" }],
    cc: [{ email: "cc@example.com", name: "Cc name" }],
    bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
    replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
    subject: "Hello from Helo",
    html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
    text: "This is a test message, delivered with <3 by Helo.",
    template: {
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      inlineStyles: true,
      data: {},
    },
    tracking: { opens: true, links: true },
    attachments: [
      {
        content: "test-content",
        contentId: "test-contentId",
        contentType: "test-contentType",
        fileName: "test-fileName",
        disposition: Helo.AttachmentDisposition.ATTACHMENT,
      },
    ],
    tags: ["welcome", "onboarding"],
    headers: {},
    metadata: {},
  },
  {
    channelId: "550e8400-e29b-41d4-a716-446655440000",
    idempotencyKey: "example",
  },
);
```

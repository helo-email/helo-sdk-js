# Helo.sending

| Method                                                  | HTTP request                       | Description                        |
| ------------------------------------------------------- | ---------------------------------- | ---------------------------------- |
| [**transactional**](Sending.md#transactional)           | **POST** /send/transactional       | Send a transactional email         |
| [**transactionalBatch**](Sending.md#transactionalBatch) | **POST** /send/transactional/batch | Send transactional emails in batch |
| [**broadcast**](Sending.md#broadcast)                   | **POST** /send/broadcast           | Send a broadcast email             |
| [**broadcastMessage**](Sending.md#broadcastMessage)     | **POST** /send/broadcast/message   | Send a single broadcast email      |

## transactional

> transactional({ ... }, { channelId, idempotencyKey }) → Object

Send a transactional email

Sends a single transactional email such as receipts, confirmations, or notifications.

### Example

```javascript Sending_transactional
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.sending.transactional(
  {
    from: { email: "test@example.com", name: "test-name" },
    to: [{ email: "test@example.com", name: "test-name" }],
    cc: [{ email: "test@example.com", name: "test-name" }],
    bcc: [{ email: "test@example.com", name: "test-name" }],
    replyTo: [{ email: "test@example.com", name: "test-name" }],
    subject: "test-subject",
    html: "test-html",
    text: "test-text",
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
  },
  {
    channelId: "550e8400-e29b-41d4-a716-446655440000",
    idempotencyKey: "example",
  },
);
```

## transactionalBatch

> transactionalBatch({ ... }, { channelId, idempotencyKey }) → Object

Send transactional emails in batch

Sends multiple transactional emails in a single API request for better performance.

### Example

```javascript Sending_transactionalBatch
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.sending.transactionalBatch(
  {
    requests: [
      {
        from: { email: "test@example.com", name: "test-name" },
        to: [{ email: "test@example.com", name: "test-name" }],
        cc: [{ email: "test@example.com", name: "test-name" }],
        bcc: [{ email: "test@example.com", name: "test-name" }],
        replyTo: [{ email: "test@example.com", name: "test-name" }],
        subject: "test-subject",
        html: "test-html",
        text: "test-text",
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
      },
    ],
  },
  {
    channelId: "550e8400-e29b-41d4-a716-446655440000",
    idempotencyKey: "example",
  },
);
```

## broadcast

> broadcast({ ... }, { channelId, idempotencyKey }) → Object

Send a broadcast email

Sends a broadcast email to multiple recipients for marketing or announcement purposes.

### Example

```javascript Sending_broadcast
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.sending.broadcast(
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

## broadcastMessage

> broadcastMessage({ ... }, { channelId, idempotencyKey }) → Object

Send a single broadcast email

Sends a single broadcast email message.

### Example

```javascript Sending_broadcastMessage
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.sending.broadcastMessage(
  {
    from: { email: "test@example.com", name: "test-name" },
    to: [{ email: "test@example.com", name: "test-name" }],
    cc: [{ email: "test@example.com", name: "test-name" }],
    bcc: [{ email: "test@example.com", name: "test-name" }],
    replyTo: [{ email: "test@example.com", name: "test-name" }],
    subject: "test-subject",
    html: "test-html",
    text: "test-text",
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
  },
  {
    channelId: "550e8400-e29b-41d4-a716-446655440000",
    idempotencyKey: "example",
  },
);
```

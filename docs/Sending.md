# Helo.sending

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**transactional**](Sending.md#transactional) | **POST** /send/transactional | Send a transactional email |
| [**transactionalBatch**](Sending.md#transactionalBatch) | **POST** /send/transactional/batch | Send transactional emails in batch |
| [**broadcast**](Sending.md#broadcast) | **POST** /send/broadcast | Send a broadcast email |
| [**broadcastMessage**](Sending.md#broadcastMessage) | **POST** /send/broadcast/message | Send a single broadcast email |


## transactional

> transactional({ ... }) → Object

Send a transactional email

Sends a single transactional email such as receipts, confirmations, or notifications.

### Example

```javascript Sending_transactional
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.sending.transactional({
  to: [],
  cc: [],
  bcc: [],
  replyTo: [],
  subject: "test-subject",
  html: "test-html",
  text: "test-text",
  template: {},
  tracking: {},
  attachments: [],
  tags: ["example1", "example2"],
  headers: {},
  metadata: {}
});
```


## transactionalBatch

> transactionalBatch({ ... }) → Object

Send transactional emails in batch

Sends multiple transactional emails in a single API request for better performance.

### Example

```javascript Sending_transactionalBatch
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.sending.transactionalBatch({
  requests: []
});
```


## broadcast

> broadcast({ ... }) → Object

Send a broadcast email

Sends a broadcast email to multiple recipients for marketing or announcement purposes.

### Example

```javascript Sending_broadcast
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.sending.broadcast({
  replyTo: [],
  template: {},
  tracking: {},
  attachments: [],
  tags: ["example1", "example2"],
  headers: {},
  metadata: {},
  messages: []
});
```


## broadcastMessage

> broadcastMessage({ ... }) → Object

Send a single broadcast email

Sends a single broadcast email message.

### Example

```javascript Sending_broadcastMessage
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.sending.broadcastMessage({
  to: [],
  cc: [],
  bcc: [],
  replyTo: [],
  subject: "test-subject",
  html: "test-html",
  text: "test-text",
  template: {},
  tracking: {},
  attachments: [],
  tags: ["example1", "example2"],
  headers: {},
  metadata: {}
});
```


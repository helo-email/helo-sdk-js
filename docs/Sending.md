# Helo.sending

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**transactional**](Sending.md#transactional) | **POST** /send/transactional | Send a transactional email |
| [**transactionalBatch**](Sending.md#transactionalBatch) | **POST** /send/transactional/batch | Send transactional emails in batch |
| [**broadcast**](Sending.md#broadcast) | **POST** /send/broadcast | Send a broadcast email |
| [**broadcastMessage**](Sending.md#broadcastMessage) | **POST** /send/broadcast/message | Send a single broadcast email |


## transactional

> transactional(params) → Object

Send a transactional email

Sends a single transactional email such as receipts, confirmations, or notifications.

### Example

```javascript Sending_transactional
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const params = {
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
};
const result = await helo.sending.transactional(params);
```


## transactionalBatch

> transactionalBatch(params) → Object

Send transactional emails in batch

Sends multiple transactional emails in a single API request for better performance.

### Example

```javascript Sending_transactionalBatch
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const params = {
  requests: []
};
const result = await helo.sending.transactionalBatch(params);
```


## broadcast

> broadcast(params) → Object

Send a broadcast email

Sends a broadcast email to multiple recipients for marketing or announcement purposes.

### Example

```javascript Sending_broadcast
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const params = {
  replyTo: [],
  template: {},
  tracking: {},
  attachments: [],
  tags: ["example1", "example2"],
  headers: {},
  metadata: {},
  messages: []
};
const result = await helo.sending.broadcast(params);
```


## broadcastMessage

> broadcastMessage(params) → Object

Send a single broadcast email

Sends a single broadcast email message.

### Example

```javascript Sending_broadcastMessage
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const params = {
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
};
const result = await helo.sending.broadcastMessage(params);
```


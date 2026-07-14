# Helo.webhooks

| Method                                                       | HTTP request                                   | Description                    |
| ------------------------------------------------------------ | ---------------------------------------------- | ------------------------------ |
| [**list**](Webhooks.md#list)                                 | **GET** /webhooks                              | List all webhooks              |
| [**create**](Webhooks.md#create)                             | **POST** /webhooks                             | Create a webhook               |
| [**retrieve**](Webhooks.md#retrieve)                         | **GET** /webhooks/{id}                         | Retrieve a webhook             |
| [**update**](Webhooks.md#update)                             | **PATCH** /webhooks/{id}                       | Update a webhook               |
| [**del**](Webhooks.md#del)                                   | **DELETE** /webhooks/{id}                      | Delete a webhook               |
| [**regenerateSigningKey**](Webhooks.md#regenerateSigningKey) | **POST** /webhooks/{id}/regenerate-signing-key | Regenerate webhook signing key |

## list

> list({ ... }) → Object

List all webhooks

Retrieves all webhooks configured for the account.

### Example

```javascript Webhooks_list
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhooks.list({
  limit: 10,
  offset: 10,
  channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
});
```

## create

> create({ ... }) → Object

Create a webhook

Registers a new webhook to receive event notifications.

### Example

```javascript Webhooks_create
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhooks.create({
  url: "test-url",
  events: [Helo.WebhookEvent.ACCEPTED, Helo.WebhookEvent.PROCESSED],
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  additionalHeaders: [{ name: "test-name", value: "test-value" }],
  enabled: true,
});
```

## retrieve

> retrieve(id) → Object

Retrieve a webhook

Fetches the details and configuration of a specific webhook.

### Example

```javascript Webhooks_retrieve
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhooks.retrieve(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## update

> update(id, { ... }) → Object

Update a webhook

Modifies an existing webhook by ID.

### Example

```javascript Webhooks_update
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhooks.update(
  "550e8400-e29b-41d4-a716-446655440000",
  {
    url: "test-url",
    events: [Helo.WebhookEvent.ACCEPTED, Helo.WebhookEvent.PROCESSED],
    channelId: "550e8400-e29b-41d4-a716-446655440000",
    additionalHeaders: [{ name: "test-name", value: "test-value" }],
    enabled: true,
  },
);
```

## del

> del(id) → null

Delete a webhook

Permanently removes a webhook.

### Example

```javascript Webhooks_delete
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

await helo.webhooks.del("550e8400-e29b-41d4-a716-446655440000");
```

## regenerateSigningKey

> regenerateSigningKey(id) → Object

Regenerate webhook signing key

Regenerate the signing key used for the webhook signature. This operation replaces the old key.

### Example

```javascript Webhooks_regenerateSigningKey
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhooks.regenerateSigningKey(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

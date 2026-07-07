# Helo.webhooks

| Method                                                       | HTTP request                                   | Description                    |
| ------------------------------------------------------------ | ---------------------------------------------- | ------------------------------ |
| [**list**](Webhooks.md#list)                                 | **GET** /webhooks                              | list operation                 |
| [**create**](Webhooks.md#create)                             | **POST** /webhooks                             | create operation               |
| [**retrieve**](Webhooks.md#retrieve)                         | **GET** /webhooks/{id}                         | retrieve operation             |
| [**update**](Webhooks.md#update)                             | **PATCH** /webhooks/{id}                       | update operation               |
| [**del**](Webhooks.md#del)                                   | **DELETE** /webhooks/{id}                      | del operation                  |
| [**regenerateSigningKey**](Webhooks.md#regenerateSigningKey) | **POST** /webhooks/{id}/regenerate-signing-key | regenerateSigningKey operation |

## list

> list({ ... }) → Object

list operation

List webhooks.

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

create operation

Create a new webhook.

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

retrieve operation

Retrieve a single webhook by ID.

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

update operation

Update an existing webhook.

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

del operation

Delete a webhook by ID.

### Example

```javascript Webhooks_delete
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

await helo.webhooks.del("550e8400-e29b-41d4-a716-446655440000");
```

## regenerateSigningKey

> regenerateSigningKey(id) → Object

regenerateSigningKey operation

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

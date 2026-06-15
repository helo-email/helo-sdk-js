# Helo.webhookEndpoints

| Method                                                               | HTTP request                                            | Description                    |
| -------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------ |
| [**list**](WebhookEndpoints.md#list)                                 | **GET** /webhook-endpoints                              | List all webhook endpoints     |
| [**create**](WebhookEndpoints.md#create)                             | **POST** /webhook-endpoints                             | Create a webhook endpoint      |
| [**retrieve**](WebhookEndpoints.md#retrieve)                         | **GET** /webhook-endpoints/{id}                         | Retrieve a webhook endpoint    |
| [**update**](WebhookEndpoints.md#update)                             | **PATCH** /webhook-endpoints/{id}                       | Update a webhook endpoint      |
| [**del**](WebhookEndpoints.md#del)                                   | **DELETE** /webhook-endpoints/{id}                      | Delete a webhook endpoint      |
| [**regenerateSigningKey**](WebhookEndpoints.md#regenerateSigningKey) | **POST** /webhook-endpoints/{id}/regenerate-signing-key | Regenerate webhook signing key |

## list

> list({ ... }) → Object

List all webhook endpoints

Retrieves all webhook endpoints configured for the account.

### Example

```javascript WebhookEndpoints_list
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhookEndpoints.list({
  limit: 10,
  offset: 10,
  channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
});
```

## create

> create({ ... }) → Object

Create a webhook endpoint

Registers a new webhook endpoint to receive event notifications.

### Example

```javascript WebhookEndpoints_create
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhookEndpoints.create({
  url: "test-url",
  events: [Helo.WebhookEvent.ACCEPTED, Helo.WebhookEvent.PROCESSED],
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  additionalHeaders: [{ name: "test-name", value: "test-value" }],
  enabled: true,
});
```

## retrieve

> retrieve(id) → Object

Retrieve a webhook endpoint

Fetches the details and configuration of a specific webhook endpoint.

### Example

```javascript WebhookEndpoints_retrieve
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhookEndpoints.retrieve(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## update

> update(id, { ... }) → Object

Update a webhook endpoint

Modifies the configuration of an existing webhook endpoint.

### Example

```javascript WebhookEndpoints_update
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhookEndpoints.update(
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

Delete a webhook endpoint

Permanently removes a webhook endpoint.

### Example

```javascript WebhookEndpoints_delete
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

await helo.webhookEndpoints.del("550e8400-e29b-41d4-a716-446655440000");
```

## regenerateSigningKey

> regenerateSigningKey(id) → Object

Regenerate webhook signing key

Generates a new signing key for webhook payload verification.

### Example

```javascript WebhookEndpoints_regenerateSigningKey
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.webhookEndpoints.regenerateSigningKey(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

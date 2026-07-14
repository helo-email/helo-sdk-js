# Helo.broadcasts

| Method                                                 | HTTP request                          | Description                          |
| ------------------------------------------------------ | ------------------------------------- | ------------------------------------ |
| [**list**](Broadcasts.md#list)                         | **GET** /broadcasts                   | List broadcasts                      |
| [**retrieve**](Broadcasts.md#retrieve)                 | **GET** /broadcasts/{id}              | Retrieve a broadcast                 |
| [**listFailures**](Broadcasts.md#listFailures)         | **GET** /broadcasts/{id}/failures     | List failed broadcast messages       |
| [**listSuppressions**](Broadcasts.md#listSuppressions) | **GET** /broadcasts/{id}/suppressions | List broadcast suppressed recipients |

## list

> list({ ... }) → Object

List broadcasts

Retrieves a paginated list of sent broadcasts with summary statistics.

### Example

```javascript Broadcasts_list
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.broadcasts.list({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  status: Helo.BroadcastStatus.ACCEPTED,
  subject: "example",
  limit: 10,
  offset: 10,
});
```

## retrieve

> retrieve(id) → Object

Retrieve a broadcast

Fetches details and statistics for a specific broadcast.

### Example

```javascript Broadcasts_retrieve
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.broadcasts.retrieve(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## listFailures

> listFailures(id, { ... }) → Object

List failed broadcast messages

Returns messages that could not be delivered due to permanent errors (e.g. invalid addresses, domain issues). Transient errors that were retried successfully do not appear here.

### Example

```javascript Broadcasts_listFailures
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.broadcasts.listFailures(
  "550e8400-e29b-41d4-a716-446655440000",
  {
    limit: 10,
    offset: 10,
  },
);
```

## listSuppressions

> listSuppressions(id, { ... }) → Object

List broadcast suppressed recipients

Returns recipients that were skipped because they appear on a suppression list (e.g. previous bounces or unsubscribes).

### Example

```javascript Broadcasts_listSuppressions
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.broadcasts.listSuppressions(
  "550e8400-e29b-41d4-a716-446655440000",
  {
    limit: 10,
    offset: 10,
  },
);
```

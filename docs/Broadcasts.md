# Helo.broadcasts

| Method                                                 | HTTP request                          | Description                 |
| ------------------------------------------------------ | ------------------------------------- | --------------------------- |
| [**list**](Broadcasts.md#list)                         | **GET** /broadcasts                   | List broadcasts             |
| [**retrieve**](Broadcasts.md#retrieve)                 | **GET** /broadcasts/{id}              | Retrieve a broadcast        |
| [**listFailures**](Broadcasts.md#listFailures)         | **GET** /broadcasts/{id}/failures     | List broadcast failures     |
| [**listSuppressions**](Broadcasts.md#listSuppressions) | **GET** /broadcasts/{id}/suppressions | List broadcast suppressions |

## list

> list({ ... }) → Object

List broadcasts

Retrieves a paginated list of sent broadcasts with summary statistics.

### Example

```javascript Broadcasts_list
import Helo from "helo";

const helo = new Helo("YOUR_API_KEY");

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
import Helo from "helo";

const helo = new Helo("YOUR_API_KEY");

const result = await helo.broadcasts.retrieve(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## listFailures

> listFailures(id) → Object

List broadcast failures

Retrieves a list of failed messages for a specific broadcast.

### Example

```javascript Broadcasts_listFailures
import Helo from "helo";

const helo = new Helo("YOUR_API_KEY");

const result = await helo.broadcasts.listFailures(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## listSuppressions

> listSuppressions(id) → Object

List broadcast suppressions

Retrieves a list of suppressed recipients for a specific broadcast.

### Example

```javascript Broadcasts_listSuppressions
import Helo from "helo";

const helo = new Helo("YOUR_API_KEY");

const result = await helo.broadcasts.listSuppressions(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

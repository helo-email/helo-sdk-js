# Helo.broadcasts

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**list**](Broadcasts.md#list) | **GET** /broadcasts | List broadcasts |
| [**retrieve**](Broadcasts.md#retrieve) | **GET** /broadcasts/{id} | Retrieve a broadcast |
| [**listFailures**](Broadcasts.md#listFailures) | **GET** /broadcasts/{id}/failures | List broadcast failures |
| [**listSuppressions**](Broadcasts.md#listSuppressions) | **GET** /broadcasts/{id}/suppressions | List broadcast suppressions |


## list

> list(params) → Object

List broadcasts

Retrieves a paginated list of sent broadcasts with summary statistics.

### Example

```javascript Broadcasts_list
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const params = {
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  status: "accepted",
  subject: "example",
  limit: 10,
  offset: 10
};
const result = await helo.broadcasts.list(params);
```


## retrieve

> retrieve(id) → Object

Retrieve a broadcast

Fetches details and statistics for a specific broadcast.

### Example

```javascript Broadcasts_retrieve
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const id = "550e8400-e29b-41d4-a716-446655440000";
const result = await helo.broadcasts.retrieve(id);
```


## listFailures

> listFailures(id) → Object

List broadcast failures

Retrieves a list of failed messages for a specific broadcast.

### Example

```javascript Broadcasts_listFailures
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const id = "550e8400-e29b-41d4-a716-446655440000";
const result = await helo.broadcasts.listFailures(id);
```


## listSuppressions

> listSuppressions(id) → Object

List broadcast suppressions

Retrieves a list of suppressed recipients for a specific broadcast.

### Example

```javascript Broadcasts_listSuppressions
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const id = "550e8400-e29b-41d4-a716-446655440000";
const result = await helo.broadcasts.listSuppressions(id);
```


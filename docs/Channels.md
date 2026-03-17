# Helo.channels

| Method                               | HTTP request              | Description        |
| ------------------------------------ | ------------------------- | ------------------ |
| [**list**](Channels.md#list)         | **GET** /channels         | List all channels  |
| [**create**](Channels.md#create)     | **POST** /channels        | Create a channel   |
| [**retrieve**](Channels.md#retrieve) | **GET** /channels/{id}    | Retrieve a channel |
| [**update**](Channels.md#update)     | **PATCH** /channels/{id}  | Update a channel   |
| [**del**](Channels.md#del)           | **DELETE** /channels/{id} | Delete a channel   |

## list

> list({ ... }) → Object

List all channels

Retrieves a list of all channels accessible to the current user.

### Example

```javascript Channels_list
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.channels.list({
  limit: 10,
  offset: 10,
  name: "example",
  channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
  deliveryType: "live",
});
```

## create

> create({ ... }) → Object

Create a channel

Creates a new communication channel for organizing and routing messages.

### Example

```javascript Channels_create
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.channels.create({
  name: "test-name",
  deliveryType: "live",
  trackLinks: true,
  trackOpens: true,
});
```

## retrieve

> retrieve(id) → Object

Retrieve a channel

Fetches the details and configuration of a specific channel.

### Example

```javascript Channels_retrieve
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.channels.retrieve(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## update

> update(id, { ... }) → Object

Update a channel

Modifies the settings and configuration of an existing channel.

### Example

```javascript Channels_update
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.channels.update(
  "550e8400-e29b-41d4-a716-446655440000",
  {
    name: "test-name",
    deliveryType: "live",
    trackLinks: true,
    trackOpens: true,
  },
);
```

## del

> del(id) → null

Delete a channel

Permanently removes a channel and all associated data.

### Example

```javascript Channels_delete
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

await helo.channels.del("550e8400-e29b-41d4-a716-446655440000");
```

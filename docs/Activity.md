# Helo.activity

| Method                                             | HTTP request                    | Description              |
| -------------------------------------------------- | ------------------------------- | ------------------------ |
| [**listEvents**](Activity.md#listEvents)           | **GET** /activity/events        | List activity events     |
| [**listMessages**](Activity.md#listMessages)       | **GET** /activity/messages      | List messages            |
| [**retrieveMessage**](Activity.md#retrieveMessage) | **GET** /activity/messages/{id} | Retrieve message details |

## listEvents

> listEvents({ ... }) → Object

List activity events

Retrieves activity events for messages, including delivery status, opens, clicks, bounces, unsubscribes and complaints.

### Example

```javascript Activity_listEvents
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.activity.listEvents({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  messageId: "550e8400-e29b-41d4-a716-446655440000",
  after: 10,
  startDate: "2024-01-01T00:00:00Z",
  endDate: "2024-01-01T00:00:00Z",
  limit: 10,
  recipient: "example",
  subject: "example",
  tags: ["example1", "example2"],
  mailType: "transactional",
  eventTypes: [Helo.EventType.ACCEPTED, Helo.EventType.PROCESSED],
});
```

## listMessages

> listMessages({ ... }) → Object

List messages

Retrieves a paginated list of sent messages with basic tracking information.

### Example

```javascript Activity_listMessages
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.activity.listMessages({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  after: 10,
  startDate: "2024-01-01T00:00:00Z",
  endDate: "2024-01-01T00:00:00Z",
  limit: 10,
  recipient: "example",
  subject: "example",
  tags: ["example1", "example2"],
  mailType: "transactional",
  status: "sent",
});
```

## retrieveMessage

> retrieveMessage(id) → Object

Retrieve message details

Fetches detailed tracking information for a specific message, including all associated events.

### Example

```javascript Activity_retrieveMessage
import Helo from "helo";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.activity.retrieveMessage(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

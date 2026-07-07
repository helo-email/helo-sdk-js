# Helo.statistics

| Method                                             | HTTP request                        | Description                  |
| -------------------------------------------------- | ----------------------------------- | ---------------------------- |
| [**retrieveHourly**](Statistics.md#retrieveHourly) | **GET** /activity/statistics/hourly | Retrieve hourly statistics   |
| [**retrieveDaily**](Statistics.md#retrieveDaily)   | **GET** /activity/statistics/daily  | Retrieve daily statistics    |
| [**retrieveTotals**](Statistics.md#retrieveTotals) | **GET** /activity/statistics/totals | Retrieve all time statistics |

## retrieveHourly

> retrieveHourly({ ... }) → Object

Retrieve hourly statistics

Fetches hourly aggregated statistics.

### Example

```javascript Statistics_retrieveHourly
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.statistics.retrieveHourly({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  from: "2024-01-01T00:00:00Z",
  to: "2024-01-01T00:00:00Z",
  tags: ["example1", "example2"],
});
```

## retrieveDaily

> retrieveDaily({ ... }) → Object

Retrieve daily statistics

Fetches daily aggregated statistics.

### Example

```javascript Statistics_retrieveDaily
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.statistics.retrieveDaily({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  from: "2024-01-01",
  to: "2024-01-01",
  tags: ["example1", "example2"],
  timezone: "America/New_York",
});
```

## retrieveTotals

> retrieveTotals({ ... }) → Object

Retrieve all time statistics

Fetches cumulative statistics.

### Example

```javascript Statistics_retrieveTotals
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.statistics.retrieveTotals({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  from: "2024-01-01T00:00:00Z",
  to: "2024-01-01T00:00:00Z",
  tags: ["example1", "example2"],
});
```

# Helo.suppressions

| Method                               | HTTP request                  | Description         |
| ------------------------------------ | ----------------------------- | ------------------- |
| [**list**](Suppressions.md#list)     | **GET** /suppressions         | List suppressions   |
| [**create**](Suppressions.md#create) | **POST** /suppressions        | Create suppressions |
| [**remove**](Suppressions.md#remove) | **POST** /suppressions/remove | Remove suppressions |

## list

> list({ ... }) → Object

List suppressions

Retrieves a list of suppressed email addresses for a channel.

### Example

```javascript Suppressions_list
import Helo from "helo";

const helo = new Helo("YOUR_API_KEY");

const result = await helo.suppressions.list({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  mailType: Helo.MailType.TRANSACTIONAL,
  reason: Helo.SuppressionReason.BOUNCE,
  email: "test@example.com",
  limit: 10,
  offset: 10,
});
```

## create

> create({ ... }) → Object

Create suppressions

Adds email addresses to the suppression list to prevent future sends.

### Example

```javascript Suppressions_create
import Helo from "helo";

const helo = new Helo("YOUR_API_KEY");

const result = await helo.suppressions.create({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  mailType: Helo.MailType.TRANSACTIONAL,
  emails: ["example1", "example2"],
});
```

## remove

> remove({ ... }) → Object

Remove suppressions

Removes email addresses from the suppression list to allow future sends.

### Example

```javascript Suppressions_remove
import Helo from "helo";

const helo = new Helo("YOUR_API_KEY");

const result = await helo.suppressions.remove({
  channelId: "550e8400-e29b-41d4-a716-446655440000",
  mailType: Helo.MailType.TRANSACTIONAL,
  emails: ["example1", "example2"],
});
```

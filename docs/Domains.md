# Helo.domains

| Method                                | HTTP request                      | Description         |
| ------------------------------------- | --------------------------------- | ------------------- |
| [**list**](Domains.md#list)           | **GET** /domains                  | List all domains    |
| [**create**](Domains.md#create)       | **POST** /domains                 | Create a domain     |
| [**retrieve**](Domains.md#retrieve)   | **GET** /domains/{id}             | Retrieve a domain   |
| [**update**](Domains.md#update)       | **PATCH** /domains/{id}           | Update a domain     |
| [**del**](Domains.md#del)             | **DELETE** /domains/{id}          | Delete a domain     |
| [**verify**](Domains.md#verify)       | **POST** /domains/{id}/verify     | Verify a domain     |
| [**rotateKey**](Domains.md#rotateKey) | **POST** /domains/{id}/rotate-key | Rotate a domain key |

## list

> list({ ... }) → Object

List all domains

Retrieves all domains associated with the current account, including their verification status.

### Example

```javascript Domains_list
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.domains.list({
  limit: 10,
  offset: 10,
  name: "example",
  channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
});
```

## create

> create({ ... }) → Object

Create a domain

Registers a new domain for sending emails. The domain must be verified before it can be used.

### Example

```javascript Domains_create
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.domains.create({
  name: "test-name",
  channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
});
```

## retrieve

> retrieve(id) → Object

Retrieve a domain

Gets detailed information about a specific domain, including verification status and configuration.

### Example

```javascript Domains_retrieve
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.domains.retrieve(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## update

> update(id, { ... }) → Object

Update a domain

Modifies the configuration settings of an existing domain.

### Example

```javascript Domains_update
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.domains.update(
  "550e8400-e29b-41d4-a716-446655440000",
  {
    channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
  },
);
```

## del

> del(id) → null

Delete a domain

Removes a domain from the account. This will stop all email sending from this domain.

### Example

```javascript Domains_delete
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

await helo.domains.del("550e8400-e29b-41d4-a716-446655440000");
```

## verify

> verify(id) → Object

Verify a domain

Initiates the domain verification process by checking DNS records.

### Example

```javascript Domains_verify
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.domains.verify(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## rotateKey

> rotateKey(id) → Object

Rotate a domain key

Generates new DKIM keys for the domain. This is recommended for security best practices.

### Example

```javascript Domains_rotateKey
import Helo from "helo";

const helo = new Helo("YOUR_ACCESS_TOKEN");

const result = await helo.domains.rotateKey(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

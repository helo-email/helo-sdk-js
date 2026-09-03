# @helo-email/sdk

Helo API

## Installation

```bash
npm install @helo-email/sdk
```

## Usage

Create a client with your API key, then call resources as properties. Requests and responses
are plain objects, fully typed.

```ts
import Helo from "@helo-email/sdk";

const helo = new Helo(process.env.HELO_API_KEY!);

const result = await helo.channels.list();
```

Every resource method is `async` and returns a typed object. See the [resource
docs](#resources) for the full list, with a runnable example per method.

### Configuration

```ts
const helo = new Helo(process.env.HELO_API_KEY!, {
  baseUrl: "https://api.helohq.com", // override the default host
  fetch: myCustomFetch, // inject your own fetch (proxies, tests, non-Node runtimes)
});
```

### Errors

Failed requests throw `ApiError`:

```ts
import Helo, { ApiError } from "@helo-email/sdk";

try {
  await helo.channels.list();
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.code); // HTTP status
    console.error(error.detail); // human-readable detail from the API
    console.error(error.errors); // field-level validation errors, when present
  }
  throw error;
}
```

## Webhook signature verification

Webhook deliveries are signed with the endpoint's signing key. Verify every delivery before
acting on it, against the **raw** request body — parsing and re-serializing the JSON changes
the bytes and the signature will not match.

```ts
import { verifyWebhookSignature, WebhookSignatureError } from "@helo-email/sdk";

app.post(
  "/webhooks/helo",
  express.raw({ type: "application/json" }),
  (req, res) => {
    try {
      verifyWebhookSignature(
        req.header("X-Helo-Webhook-Signature"),
        req.body, // Buffer or string, exactly as received
        process.env.HELO_WEBHOOK_SIGNING_KEY!,
      );
    } catch (error) {
      if (error instanceof WebhookSignatureError) {
        return res.status(400).send("invalid signature");
      }
      throw error;
    }

    const event = JSON.parse(req.body.toString("utf8"));
    // ... handle the event, then acknowledge quickly
    res.sendStatus(204);
  },
);
```

`verifyWebhookSignature` returns normally when the signature is valid and throws
`WebhookSignatureError` otherwise. Its `code` says why, so a stale delivery can be treated
differently from a genuinely bad one:

| `error.code`          | Meaning                                                                             |
| --------------------- | ----------------------------------------------------------------------------------- |
| `malformed_header`    | The header was not in the expected format                                           |
| `unsupported_version` | The delivery used a signing scheme this SDK version cannot verify — upgrade the SDK |
| `timestamp_skew`      | Correctly signed, but too old to accept — possible replay, or clock drift           |
| `signature_mismatch`  | Wrong signing key, or the body was modified in transit                              |

The signature header may carry several versions at once
(`t=...,v1=...,v2=...`) while a new signing scheme is being rolled out. This SDK verifies
against the newest version it supports (`SUPPORTED_WEBHOOK_SIGNATURE_VERSIONS`) and ignores
elements it does not recognize, so a rollout will not break this integration.

To compute a signature yourself — signing a fixture in tests, for example — use
`getWebhookSignature(payload, signingKey, timestamp)`.

## Resources

- [Helo.channels](docs/Channels.md)
- [Helo.activity](docs/Activity.md)
- [Helo.domains](docs/Domains.md)
- [Helo.sending](docs/Sending.md)
- [Helo.broadcasts](docs/Broadcasts.md)
- [Helo.statistics](docs/Statistics.md)
- [Helo.suppressions](docs/Suppressions.md)
- [Helo.webhooks](docs/Webhooks.md)

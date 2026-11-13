# Changelog

## 1.3.0

- Added automatic retries. A request that fails with a network error, a timeout, or a
  `408`, `429` or `5xx` response is retried up to 2 times with backoff, but only when sending it
  again can't do anything twice. Pass `maxRetries` to the `Helo` constructor to change how many,
  or `0` to disable them.
- Added a timeout: each attempt is abandoned after 30 seconds and retried. Before, a stalled
  request waited as long as the runtime allowed (5 minutes in Node, indefinitely in browsers).
  Pass `timeout` (in seconds) to change it, or `0` to disable it.
- `sendTransactional`, `sendTransactionalBatch`, `sendBroadcast` and `sendBroadcastMessage` now
  generate an idempotency key when you don't pass `idempotencyKey`, and send the same key on
  every retry, so a send whose response was lost is never sent twice.
- Fields the API lets you clear are now typed `| null`: `html`, `mjml`, `text` and `channelIds`
  in `templates.update`, and `channelId` and `additionalHeaders` in `webhooks.update`. Send
  `null` to clear one; leave it out to leave it as it is.

## 1.2.0

- Added sending template management
- Added support for custom tracking domains

## 1.1.0

- Added `id` to the `template` of transactional and broadcast send requests, to send a stored template
  instead of an inline `subject`, `html` and `text`.

## 1.0.2

- Release pipeline updates

## 1.0.1

- Initial release

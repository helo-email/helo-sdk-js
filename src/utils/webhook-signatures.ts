import { createHmac, timingSafeEqual } from "node:crypto";

const TIMESTAMP_VALUE_REGEX = /^\d+$/;
const SIGNATURE_KEY_REGEX = /^v(\d+)$/;
const HEX_SIGNATURE_REGEX = /^[a-f0-9]+$/;
const MAX_TIMESTAMP_SKEW_SECONDS = 300; // 5 minutes

/**
 * Signing schemes this SDK can verify. The signature header may carry several
 * versions at once (`t=...,v1=...,v2=...`) so that a new scheme can be rolled
 * out while receivers upgrade; verification uses the newest version present
 * that appears in this list, and ignores the rest.
 */
export const SUPPORTED_WEBHOOK_SIGNATURE_VERSIONS: readonly number[] = [1];

/**
 * Why a webhook signature was rejected.
 *
 * - `malformed_header` - the header was not in the documented
 *   `t={timestamp},v{version}={signature}` form
 * - `unsupported_version` - the header carried only signing schemes this SDK
 *   does not know how to verify; upgrading the SDK is the fix
 * - `timestamp_skew` - the signature was correctly formed but its timestamp is
 *   too far from the current time, so it may be a replay
 * - `signature_mismatch` - the signature did not match the body, either because
 *   the body was tampered with or the signing key is wrong
 */
export type WebhookSignatureErrorCode =
  | "malformed_header"
  | "unsupported_version"
  | "timestamp_skew"
  | "signature_mismatch";

/**
 * Thrown by {@link verifyWebhookSignature} when a webhook cannot be trusted.
 */
export class WebhookSignatureError extends Error {
  readonly code: WebhookSignatureErrorCode;

  constructor(code: WebhookSignatureErrorCode, message: string) {
    super(message);
    this.name = "WebhookSignatureError";
    this.code = code;
  }
}

/**
 * Verify a webhook signature header against the raw request body. Returns
 * normally when the signature is valid, and otherwise throws a
 * {@link WebhookSignatureError} whose `code` says why it was rejected.
 *
 * @param signatureHeader - Value of the signature header sent with the webhook
 * @param requestBody - Raw (unparsed) request body
 * @param signingKey - Signing key for the webhook endpoint
 * @throws {WebhookSignatureError}
 */
export function verifyWebhookSignature(
  signatureHeader: string,
  requestBody: string | Buffer,
  signingKey: string,
): void {
  const { timestamp, signatures } = parseSignatureHeader(signatureHeader);

  const version = newestSupportedVersion(signatures);
  if (version === undefined) {
    const present = [...signatures.keys()]
      .sort((a, b) => a - b)
      .map((v) => `v${v}`)
      .join(", ");
    throw new WebhookSignatureError(
      "unsupported_version",
      `Unsupported webhook signature version: header carries only ${present}`,
    );
  }

  const skewSeconds = Math.abs(
    Math.floor(Date.now() / 1000) - Number(timestamp),
  );
  if (skewSeconds > MAX_TIMESTAMP_SKEW_SECONDS) {
    throw new WebhookSignatureError(
      "timestamp_skew",
      `Webhook signature timestamp outside tolerance: off by ${skewSeconds}s, tolerance is ${MAX_TIMESTAMP_SKEW_SECONDS}s`,
    );
  }

  const payload = Buffer.isBuffer(requestBody)
    ? requestBody.toString("utf8")
    : requestBody;
  const computedSignature = signatureForVersion(
    version,
    payload,
    signingKey,
    timestamp,
  );

  const matched = (signatures.get(version) ?? []).some((signature) =>
    safeCompare(computedSignature, signature),
  );
  if (!matched) {
    throw new WebhookSignatureError(
      "signature_mismatch",
      "Webhook signature mismatch",
    );
  }
}

/**
 * Compute the hex-encoded HMAC-SHA256 signature for a webhook payload, using
 * the v1 signing scheme.
 *
 * @param payload - Raw (unparsed) request body
 * @param key - Signing key for the webhook endpoint
 * @param timestamp - Unix timestamp in seconds, as sent in the signature header
 */
export function getWebhookSignature(
  payload: string,
  key: string,
  timestamp: string,
): string {
  const hashContent = `${timestamp}.${payload}`;
  return createHmac("sha256", key).update(hashContent, "utf8").digest("hex");
}

/**
 * Compute the signature for one signing scheme. This is the single place a new
 * scheme needs to be added.
 */
function signatureForVersion(
  version: number,
  payload: string,
  key: string,
  timestamp: string,
): string {
  switch (version) {
    case 1:
      return getWebhookSignature(payload, key, timestamp);
    default:
      throw new WebhookSignatureError(
        "unsupported_version",
        `Unsupported webhook signature version: v${version}`,
      );
  }
}

/**
 * Split the header into its timestamp and its signatures keyed by version.
 * Elements that are not recognized are ignored, so that a sender adding new
 * elements does not break verification here.
 */
function parseSignatureHeader(signatureHeader: string): {
  timestamp: string;
  signatures: Map<number, string[]>;
} {
  const malformed = () =>
    new WebhookSignatureError(
      "malformed_header",
      "Malformed webhook signature header",
    );

  let timestamp: string | undefined;
  const signatures = new Map<number, string[]>();

  for (const element of String(signatureHeader ?? "").split(",")) {
    const separator = element.indexOf("=");
    if (separator === -1) {
      continue;
    }

    const key = element.slice(0, separator).trim();
    const value = element.slice(separator + 1).trim();

    if (key === "t") {
      if (!TIMESTAMP_VALUE_REGEX.test(value)) {
        throw malformed();
      }
      timestamp = value;
      continue;
    }

    const match = key.match(SIGNATURE_KEY_REGEX);
    if (!match) {
      continue;
    }

    const version = Number(match[1]);

    // Only versions this SDK verifies have a signature format it can insist
    // on; anything else is recorded but left unchecked.
    if (
      SUPPORTED_WEBHOOK_SIGNATURE_VERSIONS.includes(version) &&
      !HEX_SIGNATURE_REGEX.test(value)
    ) {
      throw malformed();
    }

    signatures.set(version, [...(signatures.get(version) ?? []), value]);
  }

  if (timestamp === undefined || signatures.size === 0) {
    throw malformed();
  }

  return { timestamp, signatures };
}

/**
 * Pick the highest version present that this SDK can verify, so that once a
 * sender emits a newer scheme the older one stops being honored here.
 */
function newestSupportedVersion(
  signatures: Map<number, string[]>,
): number | undefined {
  const supported = [...signatures.keys()].filter((version) =>
    SUPPORTED_WEBHOOK_SIGNATURE_VERSIONS.includes(version),
  );
  return supported.length === 0 ? undefined : Math.max(...supported);
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

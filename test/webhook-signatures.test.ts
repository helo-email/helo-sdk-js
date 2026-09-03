import { describe, expect, it } from "vitest";
import {
  WebhookSignatureError,
  getWebhookSignature,
  verifyWebhookSignature,
} from "../src/utils/webhook-signatures.js";

const key = "whsec_test";
const body = '{"event":"message.delivered"}';
const now = () => String(Math.floor(Date.now() / 1000));
const validHeader = (timestamp = now()) =>
  `t=${timestamp},v1=${getWebhookSignature(body, key, timestamp)}`;

function expectRejection(
  header: string,
  requestBody: string | Buffer,
  signingKey: string,
  code: string,
) {
  try {
    verifyWebhookSignature(header, requestBody, signingKey);
  } catch (error) {
    expect(error).toBeInstanceOf(WebhookSignatureError);
    expect((error as WebhookSignatureError).code).toBe(code);
    return;
  }
  throw new Error(`expected ${header} to be rejected with ${code}`);
}

describe("verifyWebhookSignature", () => {
  it("accepts a valid header", () => {
    const header = validHeader();
    expect(() => verifyWebhookSignature(header, body, key)).not.toThrow();
    expect(() =>
      verifyWebhookSignature(header, Buffer.from(body), key),
    ).not.toThrow();
  });

  // A sender rolling out a new signing scheme emits every version at once.
  // This SDK must keep verifying the versions it knows and ignore the rest,
  // otherwise the rollout breaks every receiver that has not upgraded yet.
  it("ignores unknown versions and elements", () => {
    const timestamp = now();
    const signature = getWebhookSignature(body, key, timestamp);

    const headers = [
      `t=${timestamp},v1=${signature},v2=8badf00d`,
      `t=${timestamp},v2=8badf00d,v1=${signature}`,
      `t=${timestamp},v1=${signature},alg=sha512`,
      `t=${timestamp}, v1=${signature}`,
      `v1=${signature},t=${timestamp}`,
      `t=${timestamp},v1=8badf00d,v1=${signature}`,
    ];

    for (const header of headers) {
      expect(() => verifyWebhookSignature(header, body, key)).not.toThrow();
    }
  });

  it("rejects a signature from a different key", () => {
    expectRejection(validHeader(), body, "wrong-key", "signature_mismatch");
  });

  it("rejects a tampered body", () => {
    expectRejection(
      validHeader(),
      '{"event":"message.bounced"}',
      key,
      "signature_mismatch",
    );
  });

  it("rejects a stale timestamp", () => {
    const timestamp = String(Number(now()) - 600);
    expectRejection(validHeader(timestamp), body, key, "timestamp_skew");
  });

  it("rejects a header carrying only unknown versions", () => {
    const timestamp = now();
    const signature = getWebhookSignature(body, key, timestamp);
    expectRejection(
      `t=${timestamp},v2=${signature}`,
      body,
      key,
      "unsupported_version",
    );
  });

  it("rejects malformed headers", () => {
    const timestamp = now();
    const signature = getWebhookSignature(body, key, timestamp);

    for (const header of [
      "garbage",
      "",
      `t=${timestamp},v1=ABCDEF`,
      `t=${timestamp}`,
      `v1=${signature}`,
      `t=yesterday,v1=${signature}`,
    ]) {
      expectRejection(header, body, key, "malformed_header");
    }

    expectRejection(`t=${timestamp},v1=abc`, body, key, "signature_mismatch");
  });
});

import { describe, expect, it, vi } from "vitest";
import { Client, idempotencyKey } from "../src/core/client.js";
import { ApiError } from "../src/core/api-error.js";

// The retry policy every Helo SDK shares.

type Reply = { status: number; headers?: Record<string, string> } | Error;

function stubbed(replies: Reply[], maxRetries?: number) {
  const requests: { method: string; headers: Record<string, string> }[] = [];
  const fetch = vi.fn(
    async (_url: string | URL | Request, init?: RequestInit) => {
      requests.push({
        method: init!.method!,
        headers: init!.headers as Record<string, string>,
      });
      const reply = replies.shift()!;
      if (reply instanceof Error) throw reply;
      return new Response(reply.status === 204 ? null : "{}", {
        status: reply.status,
        headers: { "Content-Type": "application/json", ...reply.headers },
      });
    },
  );
  const client = new Client({
    baseUrl: "http://localhost:8002",
    apiKey: "test-key",
    fetch,
    maxRetries,
  });
  return { client, requests };
}

const retryNow = { "Retry-After": "0" };

describe("retries", () => {
  it("retries an idempotent request", async () => {
    const { client, requests } = stubbed([
      { status: 503, headers: retryNow },
      { status: 200 },
    ]);

    expect((await client.request("get", "/things")).status).toBe(200);
    expect(requests).toHaveLength(2);
  });

  it("retries a post carrying an idempotency key, with the same key", async () => {
    const { client, requests } = stubbed([
      { status: 502, headers: retryNow },
      { status: 204 },
    ]);

    await client.request("post", "/things", {
      body: {},
      headers: { "X-Example-Idempotency-Key": "key-1" },
    });

    expect(requests.map((r) => r.headers["X-Example-Idempotency-Key"])).toEqual(
      ["key-1", "key-1"],
    );
  });

  // Without a key, the server may have acted on the first attempt before failing.
  it("does not retry a post without an idempotency key", async () => {
    const { client, requests } = stubbed([{ status: 503, headers: retryNow }]);

    await expect(
      client.request("post", "/things", { body: {} }),
    ).rejects.toMatchObject({ code: 503 });
    expect(requests).toHaveLength(1);
  });

  it("does not retry a post without a key after a network error", async () => {
    const { client, requests } = stubbed([new TypeError("fetch failed")]);

    await expect(
      client.request("post", "/things", { body: {} }),
    ).rejects.toBeInstanceOf(ApiError);
    expect(requests).toHaveLength(1);
  });

  it("retries a network error on an idempotent request", async () => {
    const { client } = stubbed([
      new TypeError("fetch failed"),
      { status: 200 },
    ]);

    expect((await client.request("get", "/things")).status).toBe(200);
  });

  // A 429 means the server refused the request without acting on it.
  it("retries a rate-limited post even without a key", async () => {
    const { client } = stubbed([
      { status: 429, headers: retryNow },
      { status: 204 },
    ]);

    expect((await client.request("post", "/things", { body: {} })).status).toBe(
      204,
    );
  });

  it("does not retry early when Retry-After is longer than it waits", async () => {
    const { client, requests } = stubbed([
      { status: 429, headers: { "Retry-After": "60" } },
    ]);

    await expect(client.request("get", "/things")).rejects.toMatchObject({
      code: 429,
    });
    expect(requests).toHaveLength(1);
  });

  it("gives up after maxRetries", async () => {
    const { client, requests } = stubbed(
      [
        { status: 500, headers: retryNow },
        { status: 500, headers: retryNow },
      ],
      1,
    );

    await expect(client.request("get", "/things")).rejects.toMatchObject({
      code: 500,
    });
    expect(requests).toHaveLength(2);
  });

  it("maxRetries 0 disables retries", async () => {
    const { client, requests } = stubbed(
      [{ status: 503, headers: retryNow }],
      0,
    );

    await expect(client.request("get", "/things")).rejects.toMatchObject({
      code: 503,
    });
    expect(requests).toHaveLength(1);
  });

  it("generates random UUID idempotency keys", () => {
    expect(idempotencyKey()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(idempotencyKey()).not.toBe(idempotencyKey());
  });

  describe("timeout", () => {
    // A fetch that never answers, rejecting only when its signal aborts, as fetch does.
    function hanging() {
      const calls: (AbortSignal | undefined)[] = [];
      const fetch = vi.fn(
        (_url: string | URL | Request, init?: RequestInit) => {
          calls.push(init?.signal ?? undefined);
          return new Promise<Response>((_resolve, reject) =>
            init?.signal?.addEventListener("abort", () =>
              reject(init.signal!.reason),
            ),
          );
        },
      );
      return { fetch, calls };
    }

    it("abandons an attempt that takes too long, retrying it", async () => {
      const { fetch, calls } = hanging();
      const client = new Client({
        baseUrl: "http://localhost:8002",
        apiKey: "k",
        fetch,
        maxRetries: 1,
        timeout: 0.05,
      });

      await expect(client.request("get", "/things")).rejects.toThrow(
        "Request timed out after 0.05s",
      );
      expect(calls).toHaveLength(2);
      expect(calls[0]).not.toBe(calls[1]);
    });

    it("can be disabled", async () => {
      const { fetch, calls } = hanging();
      void new Client({
        baseUrl: "http://localhost:8002",
        apiKey: "k",
        fetch,
        timeout: 0,
      }).request("get", "/things");
      await Promise.resolve();

      expect(calls).toEqual([undefined]);
    });
  });
});

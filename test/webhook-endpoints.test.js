import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("webhookEndpoints", () => {
  let client;
  let lastRequest;

  beforeEach(() => {
    lastRequest = null;

    client = new Helo("test-token-123", {
      baseUrl: "http://localhost:8002",
      fetch: async (url, options) => {
        lastRequest = { url, ...options };
        return {
          ok: true,
          status: 200,
          headers: new Headers({ "Content-Type": "application/json" }),
          json: async () => ({}),
        };
      },
    });
  });

  it("list", async () => {
    const result = await client.webhookEndpoints.list({
      limit: 10,
      offset: 10,
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const url = new URL(lastRequest.url);
    expect(url.searchParams.get("limit")).toBe(String(10));
    expect(url.searchParams.get("offset")).toBe(String(10));
    expect(url.searchParams.get("channelIds")).toBe(
      String(["550e8400-e29b-41d4-a716-446655440000"]),
    );
  });

  it("create", async () => {
    const result = await client.webhookEndpoints.create({
      url: "test-url",
      events: ["accepted", "processed"],
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      additionalHeaders: [],
      enabled: true,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.url).toEqual("test-url");
    expect(body.events).toEqual(["accepted", "processed"]);
    expect(body.channelId).toEqual("550e8400-e29b-41d4-a716-446655440000");
    expect(body.additionalHeaders).toEqual([]);
    expect(body.enabled).toEqual(true);
  });

  it("retrieve", async () => {
    const result = await client.webhookEndpoints.retrieve(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/webhook-endpoints/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("update", async () => {
    const result = await client.webhookEndpoints.update(
      "550e8400-e29b-41d4-a716-446655440000",
      {
        url: "test-url",
        events: ["accepted", "processed"],
        channelId: "550e8400-e29b-41d4-a716-446655440000",
        additionalHeaders: [],
        enabled: true,
      },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("PATCH");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.url).toEqual("test-url");
    expect(body.events).toEqual(["accepted", "processed"]);
    expect(body.channelId).toEqual("550e8400-e29b-41d4-a716-446655440000");
    expect(body.additionalHeaders).toEqual([]);
    expect(body.enabled).toEqual(true);
    expect(lastRequest.url).toContain(
      "/webhook-endpoints/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("del", async () => {
    const result = await client.webhookEndpoints.del(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeNull();
    expect(lastRequest.method).toBe("DELETE");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/webhook-endpoints/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("regenerateSigningKey", async () => {
    const result = await client.webhookEndpoints.regenerateSigningKey(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/webhook-endpoints/550e8400-e29b-41d4-a716-446655440000/regenerate-signing-key",
    );
  });
});

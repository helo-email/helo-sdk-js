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
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"]
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("create", async () => {
    const result = await client.webhookEndpoints.create({
      url: "test-url",
      events: ["accepted", "processed"],
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      additionalHeaders: [],
      enabled: true
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

  it("retrieve", async () => {
    const result = await client.webhookEndpoints.retrieve({
      id: "550e8400-e29b-41d4-a716-446655440000"
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("update", async () => {
    const result = await client.webhookEndpoints.update({
      id: "550e8400-e29b-41d4-a716-446655440000",
      url: "test-url",
      events: ["accepted", "processed"],
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      additionalHeaders: [],
      enabled: true
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("PATCH");
  });

  it("del", async () => {
    const result = await client.webhookEndpoints.del({
      id: "550e8400-e29b-41d4-a716-446655440000"
    });

    expect(result).toBeNull();
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("DELETE");
  });

  it("regenerateSigningKey", async () => {
    const result = await client.webhookEndpoints.regenerateSigningKey({
      id: "550e8400-e29b-41d4-a716-446655440000"
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

});

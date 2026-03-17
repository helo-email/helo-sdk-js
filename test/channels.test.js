import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("channels", () => {
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
    const params = { limit: 10, offset: 10, name: "example", channelIds: ["550e8400-e29b-41d4-a716-446655440000"], deliveryType: "live" };

    const result = await client.channels.list(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("create", async () => {
    const params = { name: "test-name", deliveryType: "live", trackLinks: true, trackOpens: true };

    const result = await client.channels.create(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

  it("retrieve", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";

    const result = await client.channels.retrieve(id);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("update", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";
    const params = { name: "test-name", deliveryType: "live", trackLinks: true, trackOpens: true };

    const result = await client.channels.update(id, params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("PATCH");
  });

  it("del", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";

    const result = await client.channels.del(id);

    expect(result).toBeNull();
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("DELETE");
  });

});

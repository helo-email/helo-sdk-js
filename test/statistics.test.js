import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("statistics", () => {
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

  it("retrieveHourly", async () => {
    const result = await client.statistics.retrieveHourly({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      from: "2024-01-01T00:00:00Z",
      to: "2024-01-01T00:00:00Z",
      tag: "example"
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("retrieveDaily", async () => {
    const result = await client.statistics.retrieveDaily({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      from: "2024-01-01",
      to: "2024-01-01",
      tag: "example",
      timezone: "example"
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("retrieveTotals", async () => {
    const result = await client.statistics.retrieveTotals({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      from: "2024-01-01T00:00:00Z",
      to: "2024-01-01T00:00:00Z",
      tag: "example"
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

});

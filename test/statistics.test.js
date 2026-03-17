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
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", from: "2024-01-01T00:00:00Z", to: "2024-01-01T00:00:00Z", tag: "example" };

    const result = await client.statistics.retrieveHourly(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("retrieveDaily", async () => {
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", from: "2024-01-01", to: "2024-01-01", tag: "example", timezone: "example" };

    const result = await client.statistics.retrieveDaily(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("retrieveTotals", async () => {
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", from: "2024-01-01T00:00:00Z", to: "2024-01-01T00:00:00Z", tag: "example" };

    const result = await client.statistics.retrieveTotals(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

});

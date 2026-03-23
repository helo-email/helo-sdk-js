import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("statistics", () => {
  let client: InstanceType<typeof Helo>;
  let lastRequest: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
  };

  beforeEach(() => {
    lastRequest = null!;

    client = new Helo("test-token-123", {
      baseUrl: "http://localhost:8002",
      fetch: async (url, options) => {
        lastRequest = { url: url as string, ...options } as typeof lastRequest;
        return {
          ok: true,
          status: 200,
          headers: new Headers({ "Content-Type": "application/json" }),
          json: async () => ({}),
        } as Response;
      },
    });
  });

  it("retrieveHourly", async () => {
    const result = await client.statistics.retrieveHourly({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      from: "2024-01-01T00:00:00Z",
      to: "2024-01-01T00:00:00Z",
      tags: ["example1", "example2"],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const url = new URL(lastRequest.url);
    expect(url.searchParams.get("channelId")).toBe(
      String("550e8400-e29b-41d4-a716-446655440000"),
    );
    expect(url.searchParams.get("from")).toBe(String("2024-01-01T00:00:00Z"));
    expect(url.searchParams.get("to")).toBe(String("2024-01-01T00:00:00Z"));
    expect(url.searchParams.get("tags")).toBe(String(["example1", "example2"]));
  });

  it("retrieveDaily", async () => {
    const result = await client.statistics.retrieveDaily({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      from: "2024-01-01",
      to: "2024-01-01",
      tags: ["example1", "example2"],
      timezone: "America/New_York",
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const url = new URL(lastRequest.url);
    expect(url.searchParams.get("channelId")).toBe(
      String("550e8400-e29b-41d4-a716-446655440000"),
    );
    expect(url.searchParams.get("from")).toBe(String("2024-01-01"));
    expect(url.searchParams.get("to")).toBe(String("2024-01-01"));
    expect(url.searchParams.get("tags")).toBe(String(["example1", "example2"]));
    expect(url.searchParams.get("timezone")).toBe(String("America/New_York"));
  });

  it("retrieveTotals", async () => {
    const result = await client.statistics.retrieveTotals({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      from: "2024-01-01T00:00:00Z",
      to: "2024-01-01T00:00:00Z",
      tags: ["example1", "example2"],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const url = new URL(lastRequest.url);
    expect(url.searchParams.get("channelId")).toBe(
      String("550e8400-e29b-41d4-a716-446655440000"),
    );
    expect(url.searchParams.get("from")).toBe(String("2024-01-01T00:00:00Z"));
    expect(url.searchParams.get("to")).toBe(String("2024-01-01T00:00:00Z"));
    expect(url.searchParams.get("tags")).toBe(String(["example1", "example2"]));
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("broadcasts", () => {
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
    const result = await client.broadcasts.list({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      status: Helo.BroadcastStatus.ACCEPTED,
      subject: "example",
      limit: 10,
      offset: 10,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const url = new URL(lastRequest.url);
    expect(url.searchParams.get("channelId")).toBe(
      String("550e8400-e29b-41d4-a716-446655440000"),
    );
    expect(url.searchParams.get("status")).toBe(
      String(Helo.BroadcastStatus.ACCEPTED),
    );
    expect(url.searchParams.get("subject")).toBe(String("example"));
    expect(url.searchParams.get("limit")).toBe(String(10));
    expect(url.searchParams.get("offset")).toBe(String(10));
  });

  it("retrieve", async () => {
    const result = await client.broadcasts.retrieve(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/broadcasts/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("listFailures", async () => {
    const result = await client.broadcasts.listFailures(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/broadcasts/550e8400-e29b-41d4-a716-446655440000/failures",
    );
  });

  it("listSuppressions", async () => {
    const result = await client.broadcasts.listSuppressions(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/broadcasts/550e8400-e29b-41d4-a716-446655440000/suppressions",
    );
  });
});

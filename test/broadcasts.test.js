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
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", status: "accepted", subject: "example", limit: 10, offset: 10 };

    const result = await client.broadcasts.list(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("retrieve", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";

    const result = await client.broadcasts.retrieve(id);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("listFailures", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";

    const result = await client.broadcasts.listFailures(id);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("listSuppressions", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";

    const result = await client.broadcasts.listSuppressions(id);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

});

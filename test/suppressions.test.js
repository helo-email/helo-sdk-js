import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("suppressions", () => {
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
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", mailType: "transactional", reason: "bounce", email: "example", limit: 10, offset: 10 };

    const result = await client.suppressions.list(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("create", async () => {
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", mailType: "transactional", emails: ["example1", "example2"] };

    const result = await client.suppressions.create(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

  it("remove", async () => {
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", mailType: "transactional", emails: ["example1", "example2"] };

    const result = await client.suppressions.remove(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

});

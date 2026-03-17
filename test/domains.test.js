import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("domains", () => {
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
    const result = await client.domains.list({
      limit: 10,
      offset: 10,
      name: "example",
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"]
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("create", async () => {
    const result = await client.domains.create({
      name: "test-name",
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"]
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

  it("retrieve", async () => {
    const result = await client.domains.retrieve({
      id: "550e8400-e29b-41d4-a716-446655440000"
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("update", async () => {
    const result = await client.domains.update({
      id: "550e8400-e29b-41d4-a716-446655440000",
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"]
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("PATCH");
  });

  it("del", async () => {
    const result = await client.domains.del({
      id: "550e8400-e29b-41d4-a716-446655440000"
    });

    expect(result).toBeNull();
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("DELETE");
  });

  it("verify", async () => {
    const result = await client.domains.verify({
      id: "550e8400-e29b-41d4-a716-446655440000"
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

  it("rotateKey", async () => {
    const result = await client.domains.rotateKey({
      id: "550e8400-e29b-41d4-a716-446655440000"
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

});

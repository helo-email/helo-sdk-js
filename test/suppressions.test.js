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
    const result = await client.suppressions.list({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      mailType: "transactional",
      reason: "bounce",
      email: "example",
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
    expect(url.searchParams.get("mailType")).toBe(String("transactional"));
    expect(url.searchParams.get("reason")).toBe(String("bounce"));
    expect(url.searchParams.get("email")).toBe(String("example"));
    expect(url.searchParams.get("limit")).toBe(String(10));
    expect(url.searchParams.get("offset")).toBe(String(10));
  });

  it("create", async () => {
    const result = await client.suppressions.create({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      mailType: "transactional",
      emails: ["example1", "example2"],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.channelId).toEqual("550e8400-e29b-41d4-a716-446655440000");
    expect(body.mailType).toEqual("transactional");
    expect(body.emails).toEqual(["example1", "example2"]);
  });

  it("remove", async () => {
    const result = await client.suppressions.remove({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      mailType: "transactional",
      emails: ["example1", "example2"],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.channelId).toEqual("550e8400-e29b-41d4-a716-446655440000");
    expect(body.mailType).toEqual("transactional");
    expect(body.emails).toEqual(["example1", "example2"]);
  });
});

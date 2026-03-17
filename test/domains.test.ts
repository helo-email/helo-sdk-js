import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("domains", () => {
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

  it("list", async () => {
    const result = await client.domains.list({
      limit: 10,
      offset: 10,
      name: "example",
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const url = new URL(lastRequest.url);
    expect(url.searchParams.get("limit")).toBe(String(10));
    expect(url.searchParams.get("offset")).toBe(String(10));
    expect(url.searchParams.get("name")).toBe(String("example"));
    expect(url.searchParams.get("channelIds")).toBe(
      String(["550e8400-e29b-41d4-a716-446655440000"]),
    );
  });

  it("create", async () => {
    const result = await client.domains.create({
      name: "test-name",
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body!);
    expect(body.name).toEqual("test-name");
    expect(body.channelIds).toEqual(["550e8400-e29b-41d4-a716-446655440000"]);
  });

  it("retrieve", async () => {
    const result = await client.domains.retrieve(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/domains/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("update", async () => {
    const result = await client.domains.update(
      "550e8400-e29b-41d4-a716-446655440000",
      { channelIds: ["550e8400-e29b-41d4-a716-446655440000"] },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("PATCH");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body!);
    expect(body.channelIds).toEqual(["550e8400-e29b-41d4-a716-446655440000"]);
    expect(lastRequest.url).toContain(
      "/domains/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("del", async () => {
    const result = await client.domains.del(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeNull();
    expect(lastRequest.method).toBe("DELETE");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/domains/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("verify", async () => {
    const result = await client.domains.verify(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/domains/550e8400-e29b-41d4-a716-446655440000/verify",
    );
  });

  it("rotateKey", async () => {
    const result = await client.domains.rotateKey(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/domains/550e8400-e29b-41d4-a716-446655440000/rotate-key",
    );
  });
});

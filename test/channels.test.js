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
    const result = await client.channels.list({
      limit: 10,
      offset: 10,
      name: "example",
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
      deliveryType: "live",
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
    expect(url.searchParams.get("deliveryType")).toBe(String("live"));
  });

  it("create", async () => {
    const result = await client.channels.create({
      name: "test-name",
      deliveryType: Helo.DeliveryType.LIVE,
      trackLinks: true,
      trackOpens: true,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.name).toEqual("test-name");
    expect(body.deliveryType).toEqual(Helo.DeliveryType.LIVE);
    expect(body.trackLinks).toEqual(true);
    expect(body.trackOpens).toEqual(true);
  });

  it("retrieve", async () => {
    const result = await client.channels.retrieve(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/channels/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("update", async () => {
    const result = await client.channels.update(
      "550e8400-e29b-41d4-a716-446655440000",
      {
        name: "test-name",
        deliveryType: Helo.DeliveryType.LIVE,
        trackLinks: true,
        trackOpens: true,
      },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("PATCH");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.name).toEqual("test-name");
    expect(body.deliveryType).toEqual(Helo.DeliveryType.LIVE);
    expect(body.trackLinks).toEqual(true);
    expect(body.trackOpens).toEqual(true);
    expect(lastRequest.url).toContain(
      "/channels/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("del", async () => {
    const result = await client.channels.del(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeNull();
    expect(lastRequest.method).toBe("DELETE");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/channels/550e8400-e29b-41d4-a716-446655440000",
    );
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("activity", () => {
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

  it("listEvents", async () => {
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", messageId: "550e8400-e29b-41d4-a716-446655440000", after: 10, startDate: "2024-01-01T00:00:00Z", endDate: "2024-01-01T00:00:00Z", limit: 10, recipient: "example", subject: "example", tags: ["example1", "example2"], eventTypes: ["accepted", "processed"] };

    const result = await client.activity.listEvents(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("listMessages", async () => {
    const params = { channelId: "550e8400-e29b-41d4-a716-446655440000", after: 10, startDate: "2024-01-01T00:00:00Z", endDate: "2024-01-01T00:00:00Z", limit: 10, recipient: "example", subject: "example", tag: "example", status: "sent" };

    const result = await client.activity.listMessages(params);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

  it("retrieveMessage", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";

    const result = await client.activity.retrieveMessage(id);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("GET");
  });

});

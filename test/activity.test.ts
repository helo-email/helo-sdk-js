import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("activity", () => {
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

  it("listEvents", async () => {
    const result = await client.activity.listEvents({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      messageId: "550e8400-e29b-41d4-a716-446655440000",
      after: 10,
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-01T00:00:00Z",
      limit: 10,
      recipient: "example",
      subject: "example",
      tags: ["example1", "example2"],
      mailType: "transactional",
      eventTypes: [Helo.EventType.ACCEPTED, Helo.EventType.PROCESSED],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const url = new URL(lastRequest.url);
    expect(url.searchParams.get("channelId")).toBe(
      String("550e8400-e29b-41d4-a716-446655440000"),
    );
    expect(url.searchParams.get("messageId")).toBe(
      String("550e8400-e29b-41d4-a716-446655440000"),
    );
    expect(url.searchParams.get("after")).toBe(String(10));
    expect(url.searchParams.get("startDate")).toBe(
      String("2024-01-01T00:00:00Z"),
    );
    expect(url.searchParams.get("endDate")).toBe(
      String("2024-01-01T00:00:00Z"),
    );
    expect(url.searchParams.get("limit")).toBe(String(10));
    expect(url.searchParams.get("recipient")).toBe(String("example"));
    expect(url.searchParams.get("subject")).toBe(String("example"));
    expect(url.searchParams.get("tags")).toBe(String(["example1", "example2"]));
    expect(url.searchParams.get("mailType")).toBe(String("transactional"));
    expect(url.searchParams.get("eventTypes")).toBe(
      String([Helo.EventType.ACCEPTED, Helo.EventType.PROCESSED]),
    );
  });

  it("listMessages", async () => {
    const result = await client.activity.listMessages({
      channelId: "550e8400-e29b-41d4-a716-446655440000",
      after: 10,
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-01T00:00:00Z",
      limit: 10,
      recipient: "example",
      subject: "example",
      tags: ["example1", "example2"],
      mailType: "transactional",
      status: "sent",
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const url = new URL(lastRequest.url);
    expect(url.searchParams.get("channelId")).toBe(
      String("550e8400-e29b-41d4-a716-446655440000"),
    );
    expect(url.searchParams.get("after")).toBe(String(10));
    expect(url.searchParams.get("startDate")).toBe(
      String("2024-01-01T00:00:00Z"),
    );
    expect(url.searchParams.get("endDate")).toBe(
      String("2024-01-01T00:00:00Z"),
    );
    expect(url.searchParams.get("limit")).toBe(String(10));
    expect(url.searchParams.get("recipient")).toBe(String("example"));
    expect(url.searchParams.get("subject")).toBe(String("example"));
    expect(url.searchParams.get("tags")).toBe(String(["example1", "example2"]));
    expect(url.searchParams.get("mailType")).toBe(String("transactional"));
    expect(url.searchParams.get("status")).toBe(String("sent"));
  });

  it("retrieveMessage", async () => {
    const result = await client.activity.retrieveMessage(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/activity/messages/550e8400-e29b-41d4-a716-446655440000",
    );
  });
});

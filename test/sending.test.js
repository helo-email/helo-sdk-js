import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("sending", () => {
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

  it("transactional", async () => {
    const result = await client.sending.transactional({
      to: [],
      cc: [],
      bcc: [],
      replyTo: [],
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      template: {},
      tracking: {},
      attachments: [],
      tags: ["example1", "example2"],
      headers: {},
      metadata: {}
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

  it("transactionalBatch", async () => {
    const result = await client.sending.transactionalBatch({
      requests: []
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

  it("broadcast", async () => {
    const result = await client.sending.broadcast({
      replyTo: [],
      template: {},
      tracking: {},
      attachments: [],
      tags: ["example1", "example2"],
      headers: {},
      metadata: {},
      messages: []
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

  it("broadcastMessage", async () => {
    const result = await client.sending.broadcastMessage({
      to: [],
      cc: [],
      bcc: [],
      replyTo: [],
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      template: {},
      tracking: {},
      attachments: [],
      tags: ["example1", "example2"],
      headers: {},
      metadata: {}
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.method).toBe("POST");
  });

});

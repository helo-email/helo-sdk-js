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
      metadata: {},
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.to).toEqual([]);
    expect(body.cc).toEqual([]);
    expect(body.bcc).toEqual([]);
    expect(body.replyTo).toEqual([]);
    expect(body.subject).toEqual("test-subject");
    expect(body.html).toEqual("test-html");
    expect(body.text).toEqual("test-text");
    expect(body.template).toEqual({});
    expect(body.tracking).toEqual({});
    expect(body.attachments).toEqual([]);
    expect(body.tags).toEqual(["example1", "example2"]);
    expect(body.headers).toEqual({});
    expect(body.metadata).toEqual({});
  });

  it("transactionalBatch", async () => {
    const result = await client.sending.transactionalBatch({ requests: [] });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.requests).toEqual([]);
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
      messages: [],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.replyTo).toEqual([]);
    expect(body.template).toEqual({});
    expect(body.tracking).toEqual({});
    expect(body.attachments).toEqual([]);
    expect(body.tags).toEqual(["example1", "example2"]);
    expect(body.headers).toEqual({});
    expect(body.metadata).toEqual({});
    expect(body.messages).toEqual([]);
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
      metadata: {},
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.to).toEqual([]);
    expect(body.cc).toEqual([]);
    expect(body.bcc).toEqual([]);
    expect(body.replyTo).toEqual([]);
    expect(body.subject).toEqual("test-subject");
    expect(body.html).toEqual("test-html");
    expect(body.text).toEqual("test-text");
    expect(body.template).toEqual({});
    expect(body.tracking).toEqual({});
    expect(body.attachments).toEqual([]);
    expect(body.tags).toEqual(["example1", "example2"]);
    expect(body.headers).toEqual({});
    expect(body.metadata).toEqual({});
  });
});

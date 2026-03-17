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
      from: { email: "test@example.com", name: "test-name" },
      to: [{ email: "test@example.com", name: "test-name" }],
      cc: [{ email: "test@example.com", name: "test-name" }],
      bcc: [{ email: "test@example.com", name: "test-name" }],
      replyTo: [{ email: "test@example.com", name: "test-name" }],
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      template: {
        id: "test-id",
        subject: "test-subject",
        html: "test-html",
        text: "test-text",
        inlineStyles: true,
        data: {},
      },
      tracking: { opens: true, links: true },
      attachments: [
        {
          content: "test-content",
          contentId: "test-contentId",
          contentType: "test-contentType",
          fileName: "test-fileName",
          disposition: Helo.AttachmentDisposition.ATTACHMENT,
        },
      ],
      tags: ["example1", "example2"],
      headers: {},
      metadata: {},
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.from).toEqual({ email: "test@example.com", name: "test-name" });
    expect(body.to).toEqual([{ email: "test@example.com", name: "test-name" }]);
    expect(body.cc).toEqual([{ email: "test@example.com", name: "test-name" }]);
    expect(body.bcc).toEqual([
      { email: "test@example.com", name: "test-name" },
    ]);
    expect(body.replyTo).toEqual([
      { email: "test@example.com", name: "test-name" },
    ]);
    expect(body.subject).toEqual("test-subject");
    expect(body.html).toEqual("test-html");
    expect(body.text).toEqual("test-text");
    expect(body.template).toEqual({
      id: "test-id",
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      inlineStyles: true,
      data: {},
    });
    expect(body.tracking).toEqual({ opens: true, links: true });
    expect(body.attachments).toEqual([
      {
        content: "test-content",
        contentId: "test-contentId",
        contentType: "test-contentType",
        fileName: "test-fileName",
        disposition: Helo.AttachmentDisposition.ATTACHMENT,
      },
    ]);
    expect(body.tags).toEqual(["example1", "example2"]);
    expect(body.headers).toEqual({});
    expect(body.metadata).toEqual({});
  });

  it("transactionalBatch", async () => {
    const result = await client.sending.transactionalBatch({
      requests: [
        {
          from: { email: "test@example.com", name: "test-name" },
          to: [{ email: "test@example.com", name: "test-name" }],
          cc: [{ email: "test@example.com", name: "test-name" }],
          bcc: [{ email: "test@example.com", name: "test-name" }],
          replyTo: [{ email: "test@example.com", name: "test-name" }],
          subject: "test-subject",
          html: "test-html",
          text: "test-text",
          template: {
            id: "test-id",
            subject: "test-subject",
            html: "test-html",
            text: "test-text",
            inlineStyles: true,
            data: {},
          },
          tracking: { opens: true, links: true },
          attachments: [
            {
              content: "test-content",
              contentId: "test-contentId",
              contentType: "test-contentType",
              fileName: "test-fileName",
              disposition: Helo.AttachmentDisposition.ATTACHMENT,
            },
          ],
          tags: ["example1", "example2"],
          headers: {},
          metadata: {},
        },
      ],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.requests).toEqual([
      {
        from: { email: "test@example.com", name: "test-name" },
        to: [{ email: "test@example.com", name: "test-name" }],
        cc: [{ email: "test@example.com", name: "test-name" }],
        bcc: [{ email: "test@example.com", name: "test-name" }],
        replyTo: [{ email: "test@example.com", name: "test-name" }],
        subject: "test-subject",
        html: "test-html",
        text: "test-text",
        template: {
          id: "test-id",
          subject: "test-subject",
          html: "test-html",
          text: "test-text",
          inlineStyles: true,
          data: {},
        },
        tracking: { opens: true, links: true },
        attachments: [
          {
            content: "test-content",
            contentId: "test-contentId",
            contentType: "test-contentType",
            fileName: "test-fileName",
            disposition: Helo.AttachmentDisposition.ATTACHMENT,
          },
        ],
        tags: ["example1", "example2"],
        headers: {},
        metadata: {},
      },
    ]);
  });

  it("broadcast", async () => {
    const result = await client.sending.broadcast({
      from: { email: "test@example.com", name: "test-name" },
      replyTo: [{ email: "test@example.com", name: "test-name" }],
      template: {
        id: "test-id",
        subject: "test-subject",
        html: "test-html",
        text: "test-text",
        inlineStyles: true,
        data: {},
      },
      tracking: { opens: true, links: true },
      attachments: [
        {
          content: "test-content",
          contentId: "test-contentId",
          contentType: "test-contentType",
          fileName: "test-fileName",
          disposition: Helo.AttachmentDisposition.ATTACHMENT,
        },
      ],
      tags: ["example1", "example2"],
      headers: {},
      metadata: {},
      messages: [
        {
          to: [{ email: "test@example.com", name: "test-name" }],
          cc: [{ email: "test@example.com", name: "test-name" }],
          bcc: [{ email: "test@example.com", name: "test-name" }],
          tags: ["example1", "example2"],
          headers: {},
          metadata: {},
          data: {},
        },
      ],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.from).toEqual({ email: "test@example.com", name: "test-name" });
    expect(body.replyTo).toEqual([
      { email: "test@example.com", name: "test-name" },
    ]);
    expect(body.template).toEqual({
      id: "test-id",
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      inlineStyles: true,
      data: {},
    });
    expect(body.tracking).toEqual({ opens: true, links: true });
    expect(body.attachments).toEqual([
      {
        content: "test-content",
        contentId: "test-contentId",
        contentType: "test-contentType",
        fileName: "test-fileName",
        disposition: Helo.AttachmentDisposition.ATTACHMENT,
      },
    ]);
    expect(body.tags).toEqual(["example1", "example2"]);
    expect(body.headers).toEqual({});
    expect(body.metadata).toEqual({});
    expect(body.messages).toEqual([
      {
        to: [{ email: "test@example.com", name: "test-name" }],
        cc: [{ email: "test@example.com", name: "test-name" }],
        bcc: [{ email: "test@example.com", name: "test-name" }],
        tags: ["example1", "example2"],
        headers: {},
        metadata: {},
        data: {},
      },
    ]);
  });

  it("broadcastMessage", async () => {
    const result = await client.sending.broadcastMessage({
      from: { email: "test@example.com", name: "test-name" },
      to: [{ email: "test@example.com", name: "test-name" }],
      cc: [{ email: "test@example.com", name: "test-name" }],
      bcc: [{ email: "test@example.com", name: "test-name" }],
      replyTo: [{ email: "test@example.com", name: "test-name" }],
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      template: {
        id: "test-id",
        subject: "test-subject",
        html: "test-html",
        text: "test-text",
        inlineStyles: true,
        data: {},
      },
      tracking: { opens: true, links: true },
      attachments: [
        {
          content: "test-content",
          contentId: "test-contentId",
          contentType: "test-contentType",
          fileName: "test-fileName",
          disposition: Helo.AttachmentDisposition.ATTACHMENT,
        },
      ],
      tags: ["example1", "example2"],
      headers: {},
      metadata: {},
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body);
    expect(body.from).toEqual({ email: "test@example.com", name: "test-name" });
    expect(body.to).toEqual([{ email: "test@example.com", name: "test-name" }]);
    expect(body.cc).toEqual([{ email: "test@example.com", name: "test-name" }]);
    expect(body.bcc).toEqual([
      { email: "test@example.com", name: "test-name" },
    ]);
    expect(body.replyTo).toEqual([
      { email: "test@example.com", name: "test-name" },
    ]);
    expect(body.subject).toEqual("test-subject");
    expect(body.html).toEqual("test-html");
    expect(body.text).toEqual("test-text");
    expect(body.template).toEqual({
      id: "test-id",
      subject: "test-subject",
      html: "test-html",
      text: "test-text",
      inlineStyles: true,
      data: {},
    });
    expect(body.tracking).toEqual({ opens: true, links: true });
    expect(body.attachments).toEqual([
      {
        content: "test-content",
        contentId: "test-contentId",
        contentType: "test-contentType",
        fileName: "test-fileName",
        disposition: Helo.AttachmentDisposition.ATTACHMENT,
      },
    ]);
    expect(body.tags).toEqual(["example1", "example2"]);
    expect(body.headers).toEqual({});
    expect(body.metadata).toEqual({});
  });
});

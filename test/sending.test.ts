import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("sending", () => {
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

  it("sendTransactional", async () => {
    const result = await client.sending.sendTransactional(
      {
        from: { email: "from@yourdomain.com", name: "From name" },
        to: [{ email: "to@example.com", name: "To name" }],
        cc: [{ email: "cc@example.com", name: "Cc name" }],
        bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
        replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
        subject: "Hello from Helo",
        html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
        text: "This is a test message, delivered with <3 by Helo.",
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
        tags: ["welcome", "onboarding"],
        headers: {},
        metadata: {},
      },
      {
        channelId: "550e8400-e29b-41d4-a716-446655440000",
        idempotencyKey: "example",
      },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.headers["X-Helo-Channel-Id"]).toBe(
      "550e8400-e29b-41d4-a716-446655440000",
    );
    expect(lastRequest.headers["X-Helo-Idempotency-Key"]).toBe("example");
    const body = JSON.parse(lastRequest.body!);
    expect(body.from).toEqual({
      email: "from@yourdomain.com",
      name: "From name",
    });
    expect(body.to).toEqual([{ email: "to@example.com", name: "To name" }]);
    expect(body.cc).toEqual([{ email: "cc@example.com", name: "Cc name" }]);
    expect(body.bcc).toEqual([{ email: "bcc@example.com", name: "Bcc name" }]);
    expect(body.replyTo).toEqual([
      { email: "reply-to@example.com", name: "Reply-To name" },
    ]);
    expect(body.subject).toEqual("Hello from Helo");
    expect(body.html).toEqual(
      "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
    );
    expect(body.text).toEqual(
      "This is a test message, delivered with <3 by Helo.",
    );
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
    expect(body.tags).toEqual(["welcome", "onboarding"]);
    expect(body.headers).toEqual({});
    expect(body.metadata).toEqual({});
  });

  // A send whose response is lost must not be sent twice: the retry reuses the key the SDK generated.
  it("sendTransactional generates one idempotency key per call", async () => {
    const keys: string[] = [];
    const replies = [503, 200];
    const retrying = new Helo("test-token-123", {
      baseUrl: "http://localhost:8002",
      fetch: async (_url, options) => {
        keys.push(
          (options!.headers as Record<string, string>)[
            "X-Helo-Idempotency-Key"
          ],
        );
        return new Response("{}", {
          status: replies.shift()!,
          headers: { "Retry-After": "0" },
        });
      },
    });

    await retrying.sending.sendTransactional(
      {
        from: { email: "from@yourdomain.com", name: "From name" },
        to: [{ email: "to@example.com", name: "To name" }],
        cc: [{ email: "cc@example.com", name: "Cc name" }],
        bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
        replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
        subject: "Hello from Helo",
        html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
        text: "This is a test message, delivered with <3 by Helo.",
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
        tags: ["welcome", "onboarding"],
        headers: {},
        metadata: {},
      },
      { channelId: "550e8400-e29b-41d4-a716-446655440000" },
    );

    expect(keys).toHaveLength(2);
    expect(keys[0]).toBe(keys[1]);
    expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("sendTransactionalBatch", async () => {
    const result = await client.sending.sendTransactionalBatch(
      {
        requests: [
          {
            from: { email: "from@yourdomain.com", name: "From name" },
            to: [{ email: "to@example.com", name: "To name" }],
            cc: [{ email: "cc@example.com", name: "Cc name" }],
            bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
            replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
            subject: "Hello from Helo",
            html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
            text: "This is a test message, delivered with <3 by Helo.",
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
            tags: ["welcome", "onboarding"],
            headers: {},
            metadata: {},
          },
        ],
      },
      {
        channelId: "550e8400-e29b-41d4-a716-446655440000",
        idempotencyKey: "example",
      },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.headers["X-Helo-Channel-Id"]).toBe(
      "550e8400-e29b-41d4-a716-446655440000",
    );
    expect(lastRequest.headers["X-Helo-Idempotency-Key"]).toBe("example");
    const body = JSON.parse(lastRequest.body!);
    expect(body.requests).toEqual([
      {
        from: { email: "from@yourdomain.com", name: "From name" },
        to: [{ email: "to@example.com", name: "To name" }],
        cc: [{ email: "cc@example.com", name: "Cc name" }],
        bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
        replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
        subject: "Hello from Helo",
        html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
        text: "This is a test message, delivered with <3 by Helo.",
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
        tags: ["welcome", "onboarding"],
        headers: {},
        metadata: {},
      },
    ]);
  });

  // A send whose response is lost must not be sent twice: the retry reuses the key the SDK generated.
  it("sendTransactionalBatch generates one idempotency key per call", async () => {
    const keys: string[] = [];
    const replies = [503, 200];
    const retrying = new Helo("test-token-123", {
      baseUrl: "http://localhost:8002",
      fetch: async (_url, options) => {
        keys.push(
          (options!.headers as Record<string, string>)[
            "X-Helo-Idempotency-Key"
          ],
        );
        return new Response("{}", {
          status: replies.shift()!,
          headers: { "Retry-After": "0" },
        });
      },
    });

    await retrying.sending.sendTransactionalBatch(
      {
        requests: [
          {
            from: { email: "from@yourdomain.com", name: "From name" },
            to: [{ email: "to@example.com", name: "To name" }],
            cc: [{ email: "cc@example.com", name: "Cc name" }],
            bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
            replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
            subject: "Hello from Helo",
            html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
            text: "This is a test message, delivered with <3 by Helo.",
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
            tags: ["welcome", "onboarding"],
            headers: {},
            metadata: {},
          },
        ],
      },
      { channelId: "550e8400-e29b-41d4-a716-446655440000" },
    );

    expect(keys).toHaveLength(2);
    expect(keys[0]).toBe(keys[1]);
    expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("sendBroadcast", async () => {
    const result = await client.sending.sendBroadcast(
      {
        from: { email: "test@example.com", name: "test-name" },
        replyTo: [{ email: "test@example.com", name: "test-name" }],
        template: {
          subject: "Hello, {{name}}",
          html: "<html><body><h1>Hi {{name}}.</h1><p>This is a broadcast, delivered with <3 by Helo.</p></body></html>",
          text: "Hi {{name}}. This is a broadcast, delivered with <3 by Helo.",
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
      },
      {
        channelId: "550e8400-e29b-41d4-a716-446655440000",
        idempotencyKey: "example",
      },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.headers["X-Helo-Channel-Id"]).toBe(
      "550e8400-e29b-41d4-a716-446655440000",
    );
    expect(lastRequest.headers["X-Helo-Idempotency-Key"]).toBe("example");
    const body = JSON.parse(lastRequest.body!);
    expect(body.from).toEqual({ email: "test@example.com", name: "test-name" });
    expect(body.replyTo).toEqual([
      { email: "test@example.com", name: "test-name" },
    ]);
    expect(body.template).toEqual({
      subject: "Hello, {{name}}",
      html: "<html><body><h1>Hi {{name}}.</h1><p>This is a broadcast, delivered with <3 by Helo.</p></body></html>",
      text: "Hi {{name}}. This is a broadcast, delivered with <3 by Helo.",
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

  // A send whose response is lost must not be sent twice: the retry reuses the key the SDK generated.
  it("sendBroadcast generates one idempotency key per call", async () => {
    const keys: string[] = [];
    const replies = [503, 200];
    const retrying = new Helo("test-token-123", {
      baseUrl: "http://localhost:8002",
      fetch: async (_url, options) => {
        keys.push(
          (options!.headers as Record<string, string>)[
            "X-Helo-Idempotency-Key"
          ],
        );
        return new Response("{}", {
          status: replies.shift()!,
          headers: { "Retry-After": "0" },
        });
      },
    });

    await retrying.sending.sendBroadcast(
      {
        from: { email: "test@example.com", name: "test-name" },
        replyTo: [{ email: "test@example.com", name: "test-name" }],
        template: {
          subject: "Hello, {{name}}",
          html: "<html><body><h1>Hi {{name}}.</h1><p>This is a broadcast, delivered with <3 by Helo.</p></body></html>",
          text: "Hi {{name}}. This is a broadcast, delivered with <3 by Helo.",
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
      },
      { channelId: "550e8400-e29b-41d4-a716-446655440000" },
    );

    expect(keys).toHaveLength(2);
    expect(keys[0]).toBe(keys[1]);
    expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("sendBroadcastMessage", async () => {
    const result = await client.sending.sendBroadcastMessage(
      {
        from: { email: "from@yourdomain.com", name: "From name" },
        to: [{ email: "to@example.com", name: "To name" }],
        cc: [{ email: "cc@example.com", name: "Cc name" }],
        bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
        replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
        subject: "Hello from Helo",
        html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
        text: "This is a test message, delivered with <3 by Helo.",
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
        tags: ["welcome", "onboarding"],
        headers: {},
        metadata: {},
      },
      {
        channelId: "550e8400-e29b-41d4-a716-446655440000",
        idempotencyKey: "example",
      },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.headers["X-Helo-Channel-Id"]).toBe(
      "550e8400-e29b-41d4-a716-446655440000",
    );
    expect(lastRequest.headers["X-Helo-Idempotency-Key"]).toBe("example");
    const body = JSON.parse(lastRequest.body!);
    expect(body.from).toEqual({
      email: "from@yourdomain.com",
      name: "From name",
    });
    expect(body.to).toEqual([{ email: "to@example.com", name: "To name" }]);
    expect(body.cc).toEqual([{ email: "cc@example.com", name: "Cc name" }]);
    expect(body.bcc).toEqual([{ email: "bcc@example.com", name: "Bcc name" }]);
    expect(body.replyTo).toEqual([
      { email: "reply-to@example.com", name: "Reply-To name" },
    ]);
    expect(body.subject).toEqual("Hello from Helo");
    expect(body.html).toEqual(
      "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
    );
    expect(body.text).toEqual(
      "This is a test message, delivered with <3 by Helo.",
    );
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
    expect(body.tags).toEqual(["welcome", "onboarding"]);
    expect(body.headers).toEqual({});
    expect(body.metadata).toEqual({});
  });

  // A send whose response is lost must not be sent twice: the retry reuses the key the SDK generated.
  it("sendBroadcastMessage generates one idempotency key per call", async () => {
    const keys: string[] = [];
    const replies = [503, 200];
    const retrying = new Helo("test-token-123", {
      baseUrl: "http://localhost:8002",
      fetch: async (_url, options) => {
        keys.push(
          (options!.headers as Record<string, string>)[
            "X-Helo-Idempotency-Key"
          ],
        );
        return new Response("{}", {
          status: replies.shift()!,
          headers: { "Retry-After": "0" },
        });
      },
    });

    await retrying.sending.sendBroadcastMessage(
      {
        from: { email: "from@yourdomain.com", name: "From name" },
        to: [{ email: "to@example.com", name: "To name" }],
        cc: [{ email: "cc@example.com", name: "Cc name" }],
        bcc: [{ email: "bcc@example.com", name: "Bcc name" }],
        replyTo: [{ email: "reply-to@example.com", name: "Reply-To name" }],
        subject: "Hello from Helo",
        html: "<html><body><h1>Hi there, new friend.</h1><p>This is a test message, delivered with <3 by Helo. </p></body></html>",
        text: "This is a test message, delivered with <3 by Helo.",
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
        tags: ["welcome", "onboarding"],
        headers: {},
        metadata: {},
      },
      { channelId: "550e8400-e29b-41d4-a716-446655440000" },
    );

    expect(keys).toHaveLength(2);
    expect(keys[0]).toBe(keys[1]);
    expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import Helo from "../src/index.js";

describe("templates", () => {
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
    const result = await client.templates.list({
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
    const result = await client.templates.create({
      name: "test-name",
      subject: "test-subject",
      html: "test-html",
      mjml: "test-mjml",
      text: "test-text",
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body!);
    expect(body.name).toEqual("test-name");
    expect(body.subject).toEqual("test-subject");
    expect(body.html).toEqual("test-html");
    expect(body.mjml).toEqual("test-mjml");
    expect(body.text).toEqual("test-text");
    expect(body.channelIds).toEqual(["550e8400-e29b-41d4-a716-446655440000"]);
  });

  it("renderDraft", async () => {
    const result = await client.templates.renderDraft({
      subject: "test-subject",
      html: "test-html",
      mjml: "test-mjml",
      text: "test-text",
      inlineStyles: true,
      data: {},
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body!);
    expect(body.subject).toEqual("test-subject");
    expect(body.html).toEqual("test-html");
    expect(body.mjml).toEqual("test-mjml");
    expect(body.text).toEqual("test-text");
    expect(body.inlineStyles).toEqual(true);
    expect(body.data).toEqual({});
  });

  it("retrieve", async () => {
    const result = await client.templates.retrieve(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("GET");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/templates/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("update", async () => {
    const result = await client.templates.update(
      "550e8400-e29b-41d4-a716-446655440000",
      {
        name: "test-name",
        subject: "test-subject",
        html: "test-html",
        mjml: "test-mjml",
        text: "test-text",
        channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
        version: 123,
      },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("PATCH");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body!);
    expect(body.name).toEqual("test-name");
    expect(body.subject).toEqual("test-subject");
    expect(body.html).toEqual("test-html");
    expect(body.mjml).toEqual("test-mjml");
    expect(body.text).toEqual("test-text");
    expect(body.channelIds).toEqual(["550e8400-e29b-41d4-a716-446655440000"]);
    expect(body.version).toEqual(123);
    expect(lastRequest.url).toContain(
      "/templates/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  // Leaving a field out leaves it as it is; null clears it.
  it("update sends null to clear a field", async () => {
    await client.templates.update("550e8400-e29b-41d4-a716-446655440000", {
      name: "test-name",
      subject: "test-subject",
      mjml: "test-mjml",
      text: "test-text",
      channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
      version: 123,
      html: null,
    });

    expect(JSON.parse(lastRequest.body!).html).toBeNull();
  });

  it("del", async () => {
    const result = await client.templates.del(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toBeNull();
    expect(lastRequest.method).toBe("DELETE");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    expect(lastRequest.url).toContain(
      "/templates/550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("render", async () => {
    const result = await client.templates.render(
      "550e8400-e29b-41d4-a716-446655440000",
      { inlineStyles: true, data: {} },
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(lastRequest.method).toBe("POST");
    expect(lastRequest.headers["Authorization"]).toBe("Bearer test-token-123");
    const body = JSON.parse(lastRequest.body!);
    expect(body.inlineStyles).toEqual(true);
    expect(body.data).toEqual({});
    expect(lastRequest.url).toContain(
      "/templates/550e8400-e29b-41d4-a716-446655440000/render",
    );
  });
});

import { Client } from "../core/client.js";
import type {
  CreateTemplateRequest,
  PaginatedResponseOfTemplateSummaryResponse,
  RenderDraftRequest,
  RenderTemplateRequest,
  RenderTemplateResponse,
  TemplateResponse,
  UpdateTemplateRequest,
} from "../types.js";

/**
 * Templates resource.
 */
export class Templates {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all templates
   */
  async list(
    params: {
      limit?: number;
      offset?: number;
      name?: string;
      channelIds?: string[];
    } = {},
  ): Promise<PaginatedResponseOfTemplateSummaryResponse> {
    const response = await this._client.request("get", `/templates`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * Create a template
   */
  async create(params: CreateTemplateRequest): Promise<TemplateResponse> {
    const response = await this._client.request("post", `/templates`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Render template content
   */
  async renderDraft(
    params: RenderDraftRequest,
  ): Promise<RenderTemplateResponse> {
    const response = await this._client.request("post", `/templates/render`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Retrieve a template
   */
  async retrieve(id: string): Promise<TemplateResponse> {
    const response = await this._client.request("get", `/templates/${id}`);
    return response.json();
  }

  /**
   * Update a template
   */
  async update(
    id: string,
    params: UpdateTemplateRequest,
  ): Promise<TemplateResponse> {
    const response = await this._client.request("patch", `/templates/${id}`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Delete a template
   */
  async del(id: string): Promise<null> {
    const response = await this._client.request("delete", `/templates/${id}`);
    return null;
  }

  /**
   * Render a template
   */
  async render(
    id: string,
    params: RenderTemplateRequest,
  ): Promise<RenderTemplateResponse> {
    const response = await this._client.request(
      "post",
      `/templates/${id}/render`,
      { body: params },
    );
    return response.json();
  }
}

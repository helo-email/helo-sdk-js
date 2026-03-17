import { Client } from "../core/client.js";
import type {
  CreateDomainRequest,
  DnsRecordResponse,
  DnsRecordsResponse,
  DomainResponse,
  DomainWithDnsResponse,
  PaginatedResponseOfDomainResponse,
  UpdateDomainRequest,
} from "../types.js";

/**
 * Domains resource.
 */
export class Domains {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List all domains
   */
  async list(
    params: {
      limit?: number;
      offset?: number;
      name?: string;
      channelIds?: string[];
    } = {},
  ): Promise<PaginatedResponseOfDomainResponse> {
    const response = await this._client.request("get", `/domains`, {
      params: params as Record<string, unknown>,
    });
    return response.json();
  }

  /**
   * Create a domain
   */
  async create(params: CreateDomainRequest): Promise<DomainWithDnsResponse> {
    const response = await this._client.request("post", `/domains`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Retrieve a domain
   */
  async retrieve(id: string): Promise<DomainWithDnsResponse> {
    const response = await this._client.request("get", `/domains/${id}`);
    return response.json();
  }

  /**
   * Update a domain
   */
  async update(
    id: string,
    params: UpdateDomainRequest,
  ): Promise<DomainResponse> {
    const response = await this._client.request("patch", `/domains/${id}`, {
      body: params,
    });
    return response.json();
  }

  /**
   * Delete a domain
   */
  async del(id: string): Promise<null> {
    const response = await this._client.request("delete", `/domains/${id}`);
    return null;
  }

  /**
   * Verify a domain
   */
  async verify(id: string): Promise<DnsRecordsResponse> {
    const response = await this._client.request(
      "post",
      `/domains/${id}/verify`,
    );
    return response.json();
  }

  /**
   * Rotate a domain key
   */
  async rotateKey(id: string): Promise<DnsRecordResponse> {
    const response = await this._client.request(
      "post",
      `/domains/${id}/rotate-key`,
    );
    return response.json();
  }
}

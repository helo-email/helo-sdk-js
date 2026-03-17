import { Client } from "../core/client.js";
import type {
  StatisticsDailyResponse,
  StatisticsHourlyResponse,
  StatisticsTotalsResponse,
} from "../types.js";

/**
 * Statistics resource.
 */
export class Statistics {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Retrieve hourly statistics
   */
  async retrieveHourly(params: {
    channelId?: string;
    from: string;
    to: string;
    tag?: string;
  }): Promise<StatisticsHourlyResponse> {
    const response = await this._client.request(
      "get",
      `/activity/statistics/hourly`,
      { params: params as Record<string, unknown> },
    );
    return response.json();
  }

  /**
   * Retrieve daily statistics
   */
  async retrieveDaily(params: {
    channelId?: string;
    from: string;
    to: string;
    tag?: string;
    timezone: string;
  }): Promise<StatisticsDailyResponse> {
    const response = await this._client.request(
      "get",
      `/activity/statistics/daily`,
      { params: params as Record<string, unknown> },
    );
    return response.json();
  }

  /**
   * Retrieve all time statistics
   */
  async retrieveTotals(params: {
    channelId?: string;
    from: string;
    to: string;
    tag?: string;
  }): Promise<StatisticsTotalsResponse> {
    const response = await this._client.request(
      "get",
      `/activity/statistics/totals`,
      { params: params as Record<string, unknown> },
    );
    return response.json();
  }
}

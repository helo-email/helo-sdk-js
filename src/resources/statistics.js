/**
 * Statistics resource.
 */
export class Statistics {
  constructor(client) {
    this._client = client;
  }

  /**
   * Retrieve hourly statistics
   */
  async retrieveHourly({ channelId, from, to, tag } = {}) {
    const response = await this._client.request(
      "get",
      `/activity/statistics/hourly`,
      { params: { channelId, from, to, tag } },
    );
    return response.json();
  }

  /**
   * Retrieve daily statistics
   */
  async retrieveDaily({ channelId, from, to, tag, timezone } = {}) {
    const response = await this._client.request(
      "get",
      `/activity/statistics/daily`,
      { params: { channelId, from, to, tag, timezone } },
    );
    return response.json();
  }

  /**
   * Retrieve all time statistics
   */
  async retrieveTotals({ channelId, from, to, tag } = {}) {
    const response = await this._client.request(
      "get",
      `/activity/statistics/totals`,
      { params: { channelId, from, to, tag } },
    );
    return response.json();
  }
}

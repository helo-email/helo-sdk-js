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
  async retrieveHourly(params = {}) {
    const query = {};
    if (params.channelId !== undefined) query.channelId = params.channelId;
    if (params.from !== undefined) query.from = params.from;
    if (params.to !== undefined) query.to = params.to;
    if (params.tag !== undefined) query.tag = params.tag;
    const response = await this._client.request("get", `/activity/statistics/hourly`, { params: query });
    return response.json();
  }

  /**
   * Retrieve daily statistics
   */
  async retrieveDaily(params = {}) {
    const query = {};
    if (params.channelId !== undefined) query.channelId = params.channelId;
    if (params.from !== undefined) query.from = params.from;
    if (params.to !== undefined) query.to = params.to;
    if (params.tag !== undefined) query.tag = params.tag;
    if (params.timezone !== undefined) query.timezone = params.timezone;
    const response = await this._client.request("get", `/activity/statistics/daily`, { params: query });
    return response.json();
  }

  /**
   * Retrieve all time statistics
   */
  async retrieveTotals(params = {}) {
    const query = {};
    if (params.channelId !== undefined) query.channelId = params.channelId;
    if (params.from !== undefined) query.from = params.from;
    if (params.to !== undefined) query.to = params.to;
    if (params.tag !== undefined) query.tag = params.tag;
    const response = await this._client.request("get", `/activity/statistics/totals`, { params: query });
    return response.json();
  }
}

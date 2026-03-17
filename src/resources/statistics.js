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
    const query = {};
    if (channelId !== undefined) query.channelId = channelId;
    if (from !== undefined) query.from = from;
    if (to !== undefined) query.to = to;
    if (tag !== undefined) query.tag = tag;
    const response = await this._client.request("get", `/activity/statistics/hourly`, { params: query });
    return response.json();
  }

  /**
   * Retrieve daily statistics
   */
  async retrieveDaily({ channelId, from, to, tag, timezone } = {}) {
    const query = {};
    if (channelId !== undefined) query.channelId = channelId;
    if (from !== undefined) query.from = from;
    if (to !== undefined) query.to = to;
    if (tag !== undefined) query.tag = tag;
    if (timezone !== undefined) query.timezone = timezone;
    const response = await this._client.request("get", `/activity/statistics/daily`, { params: query });
    return response.json();
  }

  /**
   * Retrieve all time statistics
   */
  async retrieveTotals({ channelId, from, to, tag } = {}) {
    const query = {};
    if (channelId !== undefined) query.channelId = channelId;
    if (from !== undefined) query.from = from;
    if (to !== undefined) query.to = to;
    if (tag !== undefined) query.tag = tag;
    const response = await this._client.request("get", `/activity/statistics/totals`, { params: query });
    return response.json();
  }
}

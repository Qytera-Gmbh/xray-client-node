import type { Xray } from "../../../models/index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the Xray server test endpoints.
 */
export class TestApi extends BaseApi {
  /**
   * To export tests to JSON, you need to specify the keys, the ID of the filter or JQL query of the
   * issues you want to export. At least one query parameter has to be specified, but all 3 can be
   * sent at the same time.
   *
   * @param query the query
   * @returns JSON with the exported tests
   *
   * @see https://docs.getxray.app/display/XRAY/Tests+-+REST
   */
  public async getTests(query?: {
    /**
     * Jira ID of the filter.
     */
    filter?: number;
    /**
     * A JQL query.
     */
    jql?: string;
    /**
     * List of keys of the tests.
     */
    keys?: string[];
  }): Promise<Xray.Test.Test[]> {
    const response = await this.client.send("rest/raven/1.0/api/test", {
      expectedStatus: 200,
      method: "GET",
      query: {
        ...query,
        keys: query?.keys?.join(";"),
      },
    });
    return (await response.json()) as Xray.Test.Test[];
  }
}

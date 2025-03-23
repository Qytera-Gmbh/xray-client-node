import { BaseApi } from "../../base-api.js";

/**
 * Models the dataset endpoints.
 */
export class DatasetApi extends BaseApi {
  /**
   * Returns the CSV file with the requested dataset for the input issue ids.
   *
   * One of `testIssueId` or `testIssueKey` is required. If both are provided, `testIssueId` is
   * used. Both `contextIssueId` and `contextIssueKey` are optional. If both `contextIssueId` and
   * `contextIssueKey` are provided, `contextIssueId` is used. The `resolved` flag is only relevant
   * when requesting the dataset of a test with a context issue.
   *
   * The returned dataset is provided with all the iterations generated.
   *
   * @param query the query parameters
   * @returns the dataset's CSV content
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Exporting+datasets+-+REST+v2
   */
  public async export(query?: {
    /**
     * The id of the context issue (Test Plan or Test Execution).
     */
    contextIssueId?: string;
    /**
     * The key of the context issue (Test Plan or Test Execution).
     */
    contextIssueKey?: string;
    /**
     * A flag indicating of the dataset must be resolved or not for a given level (true by default).
     */
    resolved?: boolean;
    /**
     * The id of the test issue.
     */
    testIssueId?: string;
    /**
     * The key of the test issue.
     */
    testIssueKey?: string;
  }): Promise<string> {
    const response = await this.client.send("api/v2/dataset/export", {
      expectedStatus: 200,
      method: "GET",
      query: query,
    });
    return await response.text();
  }
}

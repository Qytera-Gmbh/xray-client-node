import { BaseApi } from "../../../base-api.js";

/**
 * Models the test run status endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Status
 */
export class StatusApi extends BaseApi {
  /**
   * Return JSON that contains the test run status.
   *
   * @param testRunId the ID of the test run
   * @returns the test run status
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Status
   */
  public async getStatus(testRunId: number): Promise<string> {
    const response = await this.client.send(
      `rest/raven/1.0/api/testrun/${testRunId.toString()}/status`,
      {
        expectedStatus: 200,
        method: "GET",
      }
    );
    return await response.text();
  }

  /**
   * Updates the test run status.
   *
   * @param testRunId the ID of the test run
   * @param query the query parameters
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Status
   */
  public async updateStatus(
    testRunId: number,
    query: {
      /**
       * The new status of the test run.
       *
       * @example "PASS"
       */
      status: string;
    }
  ): Promise<void> {
    await this.client.send(`rest/raven/1.0/api/testrun/${testRunId.toString()}/status`, {
      expectedStatus: 200,
      method: "PUT",
      query,
    });
  }
}

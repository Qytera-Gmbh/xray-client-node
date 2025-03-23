import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the test run execution defect endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionDefects
 */
export class ExecutionDefectApi extends BaseApi {
  /**
   * Return all the defects the test run has.
   *
   * @param testRunId the ID of the test run
   * @returns the defects
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionDefects
   */
  public async getDefects(testRunId: number): Promise<Xray.TestRun.Defect[]> {
    const response = await this.client.send(
      `rest/raven/1.0/api/testrun/${testRunId.toString()}/defect`,
      {
        expectedStatus: 200,
        method: "GET",
      }
    );
    return (await response.json()) as Xray.TestRun.Defect[];
  }
}

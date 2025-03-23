import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the test run execution defect endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionDefects
 */
export class ExecutionDefectApi extends BaseApi {
  /**
   * Add new defects to the Test Run.
   *
   * @param testRunId the ID of the test run
   * @param body the request body
   * @returns the defects
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionDefects
   */
  public async addDefects(testRunId: number, body: string[]): Promise<void> {
    await this.client.send(`rest/raven/1.0/api/testrun/${testRunId.toString()}/defect`, {
      body: JSON.stringify(body),
      expectedStatus: 200,
      headers: { ["Content-Type"]: "application/json" },
      method: "POST",
    });
  }

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

  /**
   * Removes a defect from a test run.
   *
   * @param testRunId the ID of the test run
   * @param issueIdOrKey the issue ID or key of the defect
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionDefects
   */
  public async removeDefect(testRunId: number, issueIdOrKey: number | string): Promise<void> {
    await this.client.send(
      `rest/raven/1.0/api/testrun/${testRunId.toString()}/defect/${issueIdOrKey.toString()}`,
      {
        expectedStatus: 200,
        method: "DELETE",
      }
    );
  }
}

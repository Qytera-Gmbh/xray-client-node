import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the test run status endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Comment
 */
export class CommentApi extends BaseApi {
  /**
   * Return the test run comment in raw and rendered state.
   *
   * @param testRunId the ID of the test run
   * @returns the test run comment
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Comment
   */
  public async getComment(testRunId: number): Promise<Xray.TestRun.Comment> {
    const response = await this.client.send(
      `rest/raven/1.0/api/testrun/${testRunId.toString()}/comment `,
      {
        expectedStatus: 200,
        method: "GET",
      }
    );
    return (await response.json()) as Xray.TestRun.Comment;
  }

  /**
   * Updates the test run status.
   *
   * @param testRunId the ID of the test run
   * @param body the new comment
   * @returns the updated test run comment in raw and rendered state
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Comment
   */
  public async updateComment(testRunId: number, body: string): Promise<void> {
    await this.client.send(`rest/raven/1.0/api/testrun/${testRunId.toString()}/comment`, {
      body,
      expectedStatus: 200,
      headers: { ["Content-Type"]: "application/json" },
      method: "PUT",
    });
  }
}

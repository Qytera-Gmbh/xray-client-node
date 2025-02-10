import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the execution evidence endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
 */
export class ExecutionEvidenceApi extends BaseApi {
  /**
   * Add new evidence to a test run.
   *
   * @param testRunId the ID of the test run
   * @param body the evidence to add
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  public async addEvidence(
    testRunId: string,
    body: {
      /**
       * The Content-Type representation header is used to indicate the original media type of the
       * resource.
       */
      contentType: string;
      /**
       * The attachment data encoded in base64.
       */
      data: string;
      /**
       * The file name for the attachment.
       */
      filename: string;
    }
  ): Promise<void> {
    await this.client.send(`/testrun/${testRunId}/attachment`, {
      body: JSON.stringify(body),
      expectedStatus: 201,
      headers: { ["Content-Type"]: "application/json" },
      method: "POST",
    });
  }

  /**
   * Remove the evidence with the given attachment id.
   *
   * @param testRunId the ID of the test run
   * @param attachmentId the ID of the attachment to delete
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  public async deleteEvidenceById(testRunId: string, attachmentId: number): Promise<void> {
    await this.client.send(`/testrun/${testRunId}/attachment/${attachmentId.toString()}`, {
      expectedStatus: 204,
      method: "DELETE",
    });
  }

  /**
   * Removes all evidence with the same filename from the test run.
   *
   * @param testRunId the ID of the test run
   * @param filename the file to remove from the test run evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  public async deleteEvidenceByName(testRunId: string, filename: string): Promise<void> {
    await this.client.send(`/testrun/${testRunId}/attachment`, {
      body: filename,
      expectedStatus: 204,
      headers: { ["Content-Type"]: "application/json" },
      method: "DELETE",
    });
  }

  /**
   * Return a JSON that contains an array with all the execution evidence the test run has.
   *
   * @param testRunId the ID of the test run
   * @returns the the execution evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  public async getEvidence(testRunId: string): Promise<Xray.TestRun.GetExecutionEvidenceResponse> {
    const response = await this.client.send(`/testrun/${testRunId}/attachment`, {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as Xray.TestRun.GetExecutionEvidenceResponse;
  }
}

import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the execution evidence endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
 */
interface ExecutionEvidenceApi {
  /**
   * Add new evidence to a test run.
   *
   * @param testRunId the ID of the test run
   * @param body the evidence to add
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  addEvidence(
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
  ): Promise<void>;

  /**
   * Remove the evidence with the given attachment id.
   *
   * @param testRunId the ID of the test run
   * @param attachmentId the ID of the attachment to delete
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  deleteEvidenceById(testRunId: string, attachmentId: number): Promise<void>;

  /**
   * Removes all evidence with the same filename from the test run.
   *
   * @param testRunId the ID of the test run
   * @param filename the file to remove from the test run evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  deleteEvidenceByName(testRunId: string, filename: string): Promise<void>;

  /**
   * Return a JSON that contains an array with all the execution evidence the test run has.
   *
   * @param testRunId the ID of the test run
   * @returns the the execution evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  getEvidence(testRunId: string): Promise<Xray.TestRun.GetExecutionEvidenceResponse>;
}

/**
 * Models the V2 execution evidence endpoints.
 */
export class ExecutionEvidenceApiV1 extends BaseApi implements ExecutionEvidenceApi {
  public async addEvidence(
    ...[testRunId, body]: Parameters<ExecutionEvidenceApi["addEvidence"]>
  ): Promise<void> {
    await this.client.send(`${this.path}/testrun/${testRunId}/attachment`, {
      body: JSON.stringify(body),
      expectedStatus: 200,
      headers: { ["Content-Type"]: "application/json" },
      method: "POST",
    });
  }

  public async deleteEvidenceById(
    ...[testRunId, attachmentId]: Parameters<ExecutionEvidenceApi["deleteEvidenceById"]>
  ): Promise<void> {
    await this.client.send(
      `${this.path}/testrun/${testRunId}/attachment/${attachmentId.toString()}`,
      {
        expectedStatus: 200,
        method: "DELETE",
      }
    );
  }

  public async deleteEvidenceByName(
    ...[testRunId, filename]: Parameters<ExecutionEvidenceApi["deleteEvidenceByName"]>
  ): Promise<void> {
    await this.client.send(`${this.path}/testrun/${testRunId}/attachment`, {
      body: filename,
      expectedStatus: 200,
      headers: { ["Content-Type"]: "application/json" },
      method: "DELETE",
    });
  }

  public async getEvidence(
    ...[testRunId]: Parameters<ExecutionEvidenceApi["getEvidence"]>
  ): Promise<Xray.TestRun.GetExecutionEvidenceResponse> {
    const response = await this.client.send(`${this.path}/testrun/${testRunId}/attachment`, {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as Xray.TestRun.GetExecutionEvidenceResponse;
  }
}

/**
 * Models the V2 execution evidence endpoints. They differ from V1 in terms of response status.
 */
export class ExecutionEvidenceApiV2 extends BaseApi implements ExecutionEvidenceApi {
  public async addEvidence(
    ...[testRunId, body]: Parameters<ExecutionEvidenceApi["addEvidence"]>
  ): Promise<void> {
    await this.client.send(`${this.path}/testrun/${testRunId}/attachment`, {
      body: JSON.stringify(body),
      expectedStatus: 201,
      headers: { ["Content-Type"]: "application/json" },
      method: "POST",
    });
  }

  public async deleteEvidenceById(
    ...[testRunId, attachmentId]: Parameters<ExecutionEvidenceApi["deleteEvidenceById"]>
  ): Promise<void> {
    await this.client.send(
      `${this.path}/testrun/${testRunId}/attachment/${attachmentId.toString()}`,
      {
        expectedStatus: 204,
        method: "DELETE",
      }
    );
  }

  public async deleteEvidenceByName(
    ...[testRunId, filename]: Parameters<ExecutionEvidenceApi["deleteEvidenceByName"]>
  ): Promise<void> {
    await this.client.send(`${this.path}/testrun/${testRunId}/attachment`, {
      body: filename,
      expectedStatus: 204,
      headers: { ["Content-Type"]: "application/json" },
      method: "DELETE",
    });
  }

  public async getEvidence(
    ...[testRunId]: Parameters<ExecutionEvidenceApi["getEvidence"]>
  ): Promise<Xray.TestRun.GetExecutionEvidenceResponse> {
    const response = await this.client.send(`${this.path}/testrun/${testRunId}/attachment`, {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as Xray.TestRun.GetExecutionEvidenceResponse;
  }
}

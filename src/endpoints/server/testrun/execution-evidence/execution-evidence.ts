import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the execution evidence endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
 */
export class ExecutionEvidenceApi extends BaseApi {
  private readonly processor = {
    addEvidence: async (url: string, body: EvidencePayload, expectedStatus: number) => {
      await this.client.send(url, {
        body: JSON.stringify(body),
        expectedStatus: expectedStatus,
        headers: { ["Content-Type"]: "application/json" },
        method: "POST",
      });
    },
    deleteEvidenceById: async (url: string, expectedStatus: number) => {
      await this.client.send(url, {
        expectedStatus: expectedStatus,
        method: "DELETE",
      });
    },
    deleteEvidenceByName: async (url: string, filename: string, expectedStatus: number) => {
      await this.client.send(url, {
        body: filename,
        expectedStatus: expectedStatus,
        headers: { ["Content-Type"]: "application/json" },
        method: "DELETE",
      });
    },
    getEvidence: async (url: string) => {
      const response = await this.client.send(url, {
        expectedStatus: 200,
        method: "GET",
      });
      return (await response.json()) as Xray.Attachment.FileAttachment[];
    },
  };

  public readonly v1 = {
    /**
     * Add new evidence to a test run.
     *
     * @param testRunId the ID of the test run
     * @param body the evidence to add
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
     */
    addEvidence: async (testRunId: number, body: EvidencePayload): Promise<void> => {
      await this.processor.addEvidence(
        `rest/raven/1.0/api/testrun/${testRunId.toString()}/attachment`,
        body,
        200
      );
    },

    /**
     * Remove the evidence with the given attachment ID.
     *
     * @param testRunId the ID of the test run
     * @param attachmentId the ID of the attachment to delete
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
     */
    deleteEvidenceById: async (testRunId: number, attachmentId: number): Promise<void> => {
      await this.processor.deleteEvidenceById(
        `rest/raven/1.0/api/testrun/${testRunId.toString()}/attachment/${attachmentId.toString()}`,
        200
      );
    },

    /**
     * Removes all evidence with the same filename from the test run.
     *
     * @param testRunId the ID of the test run
     * @param filename the file to remove from the test run evidence
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
     */
    deleteEvidenceByName: async (testRunId: number, filename: string): Promise<void> => {
      await this.processor.deleteEvidenceByName(
        `rest/raven/1.0/api/testrun/${testRunId.toString()}/attachment`,
        filename,
        200
      );
    },

    /**
     * Return a JSON that contains an array with all the execution evidence the test run has.
     *
     * @param testRunId the ID of the test run
     * @returns the the execution evidence
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
     */
    getEvidence: async (testRunId: number): Promise<Xray.Attachment.FileAttachment[]> => {
      return await this.processor.getEvidence(
        `rest/raven/1.0/api/testrun/${testRunId.toString()}/attachment`
      );
    },
  };

  /**
   * Add new evidence to a test run.
   *
   * @param testRunId the ID of the test run
   * @param body the evidence to add
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  public async addEvidence(testRunId: number, body: EvidencePayload): Promise<void> {
    await this.processor.addEvidence(
      `rest/raven/2.0/api/testrun/${testRunId.toString()}/attachment`,
      body,
      201
    );
  }

  /**
   * Remove the evidence with the given attachment ID.
   *
   * @param testRunId the ID of the test run
   * @param attachmentId the ID of the attachment to delete
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  public async deleteEvidenceById(testRunId: number, attachmentId: number): Promise<void> {
    return this.processor.deleteEvidenceById(
      `rest/raven/2.0/api/testrun/${testRunId.toString()}/attachment/${attachmentId.toString()}`,
      204
    );
  }

  /**
   * Removes all evidence with the same filename from the test run.
   *
   * @param testRunId the ID of the test run
   * @param filename the file to remove from the test run evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  public async deleteEvidenceByName(testRunId: number, filename: string): Promise<void> {
    return this.processor.deleteEvidenceByName(
      `rest/raven/2.0/api/testrun/${testRunId.toString()}/attachment`,
      filename,
      204
    );
  }

  /**
   * Return a JSON that contains an array with all the execution evidence the test run has.
   *
   * @param testRunId the ID of the test run
   * @returns the the execution evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  public async getEvidence(testRunId: number): Promise<Xray.Attachment.FileAttachment[]> {
    return this.processor.getEvidence(
      `rest/raven/2.0/api/testrun/${testRunId.toString()}/attachment`
    );
  }
}

interface EvidencePayload {
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

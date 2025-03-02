import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

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

interface AddEvidence {
  /**
   * Add new evidence to a test run.
   *
   * @param testRunId the ID of the test run
   * @param body the evidence to add
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  addEvidence(testRunId: number, body: EvidencePayload): Promise<void>;
  v1: {
    /**
     * Add new evidence to a test run.
     *
     * @param testRunId the ID of the test run
     * @param body the evidence to add
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
     */
    addEvidence(testRunId: number, body: EvidencePayload): Promise<void>;
  };
}

interface DeleteEvidenceById {
  /**
   * Remove the evidence with the given attachment id.
   *
   * @param testRunId the ID of the test run
   * @param attachmentId the ID of the attachment to delete
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  deleteEvidenceById(testRunId: number, attachmentId: number): Promise<void>;
  v1: {
    /**
     * Remove the evidence with the given attachment id.
     *
     * @param testRunId the ID of the test run
     * @param attachmentId the ID of the attachment to delete
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
     */
    deleteEvidenceById(testRunId: number, attachmentId: number): Promise<void>;
  };
}

interface DeleteEvidenceByName {
  /**
   * Removes all evidence with the same filename from the test run.
   *
   * @param testRunId the ID of the test run
   * @param filename the file to remove from the test run evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  deleteEvidenceByName(testRunId: number, filename: string): Promise<void>;
  v1: {
    /**
     * Removes all evidence with the same filename from the test run.
     *
     * @param testRunId the ID of the test run
     * @param filename the file to remove from the test run evidence
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
     */
    deleteEvidenceByName(testRunId: number, filename: string): Promise<void>;
  };
}

interface GetEvidence {
  /**
   * Return a JSON that contains an array with all the execution evidence the test run has.
   *
   * @param testRunId the ID of the test run
   * @returns the the execution evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  getEvidence(testRunId: number): Promise<Xray.Attachment.FileAttachment[]>;
  v1: {
    /**
     * Return a JSON that contains an array with all the execution evidence the test run has.
     *
     * @param testRunId the ID of the test run
     * @returns the the execution evidence
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
     */
    getEvidence(testRunId: number): Promise<Xray.Attachment.FileAttachment[]>;
  };
}

/**
 * Models the execution evidence endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
 */
export class ExecutionEvidenceApi
  extends BaseApi
  implements AddEvidence, GetEvidence, DeleteEvidenceById, DeleteEvidenceByName
{
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

  public readonly v1: AddEvidence["v1"] &
    GetEvidence["v1"] &
    DeleteEvidenceById["v1"] &
    DeleteEvidenceByName["v1"] = this.bind((self) => ({
    addEvidence(testRunId, body) {
      return self.processor.addEvidence(
        `rest/raven/1.0/api/testrun/${testRunId.toString()}/attachment`,
        body,
        200
      );
    },
    deleteEvidenceById(testRunId, attachmentId) {
      return self.processor.deleteEvidenceById(
        `rest/raven/1.0/api/testrun/${testRunId.toString()}/attachment/${attachmentId.toString()}`,
        200
      );
    },
    deleteEvidenceByName(testRunId, filename) {
      return self.processor.deleteEvidenceByName(
        `rest/raven/1.0/api/testrun/${testRunId.toString()}/attachment`,
        filename,
        200
      );
    },
    getEvidence(testRunId) {
      return self.processor.getEvidence(
        `rest/raven/1.0/api/testrun/${testRunId.toString()}/attachment`
      );
    },
  }));

  public async addEvidence(testRunId: number, body: EvidencePayload): Promise<void> {
    return this.processor.addEvidence(
      `rest/raven/2.0/api/testrun/${testRunId.toString()}/attachment`,
      body,
      201
    );
  }

  public async deleteEvidenceById(testRunId: number, attachmentId: number): Promise<void> {
    return this.processor.deleteEvidenceById(
      `rest/raven/2.0/api/testrun/${testRunId.toString()}/attachment/${attachmentId.toString()}`,
      204
    );
  }

  public async deleteEvidenceByName(testRunId: number, filename: string): Promise<void> {
    return this.processor.deleteEvidenceByName(
      `rest/raven/2.0/api/testrun/${testRunId.toString()}/attachment`,
      filename,
      204
    );
  }

  public async getEvidence(testRunId: number): Promise<Xray.Attachment.FileAttachment[]> {
    return this.processor.getEvidence(
      `rest/raven/2.0/api/testrun/${testRunId.toString()}/attachment`
    );
  }
}

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
  (testRunId: string, body: EvidencePayload): Promise<void>;
  /**
   * Add new evidence to a test run.
   *
   * @param testRunId the ID of the test run
   * @param body the evidence to add
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  v1: (testRunId: string, body: EvidencePayload) => Promise<void>;
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
  (testRunId: string, attachmentId: number): Promise<void>;
  /**
   * Remove the evidence with the given attachment id.
   *
   * @param testRunId the ID of the test run
   * @param attachmentId the ID of the attachment to delete
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  v1: (testRunId: string, attachmentId: number) => Promise<void>;
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
  (testRunId: string, filename: string): Promise<void>;
  /**
   * Removes all evidence with the same filename from the test run.
   *
   * @param testRunId the ID of the test run
   * @param filename the file to remove from the test run evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  v1: (testRunId: string, filename: string) => Promise<void>;
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
  (testRunId: string): Promise<Xray.TestRun.GetExecutionEvidenceResponse>;
  /**
   * Return a JSON that contains an array with all the execution evidence the test run has.
   *
   * @param testRunId the ID of the test run
   * @returns the the execution evidence
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
   */
  v1: (testRunId: string) => Promise<Xray.TestRun.GetExecutionEvidenceResponse>;
}

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
      return (await response.json()) as Xray.TestRun.GetExecutionEvidenceResponse;
    },
  };

  public readonly addEvidence: AddEvidence = Object.assign(
    async (...[testRunId, body]: Parameters<AddEvidence>): ReturnType<AddEvidence> => {
      return this.processor.addEvidence(
        `reset/raven/api/2.0/testrun/${testRunId}/attachment`,
        body,
        201
      );
    },
    {
      v1: async (
        ...[testRunId, body]: Parameters<AddEvidence["v1"]>
      ): ReturnType<AddEvidence["v1"]> => {
        return this.processor.addEvidence(
          `reset/raven/api/1.0/testrun/${testRunId}/attachment`,
          body,
          200
        );
      },
    }
  );

  public readonly deleteEvidenceById: DeleteEvidenceById = Object.assign(
    async (
      ...[testRunId, attachmentId]: Parameters<DeleteEvidenceById>
    ): ReturnType<DeleteEvidenceById> => {
      return this.processor.deleteEvidenceById(
        `reset/raven/api/2.0/testrun/${testRunId}/attachment/${attachmentId.toString()}`,
        204
      );
    },
    {
      v1: async (
        ...[testRunId, attachmentId]: Parameters<DeleteEvidenceById["v1"]>
      ): ReturnType<DeleteEvidenceById["v1"]> => {
        return this.processor.deleteEvidenceById(
          `reset/raven/api/1.0/testrun/${testRunId}/attachment/${attachmentId.toString()}`,
          200
        );
      },
    }
  );

  public readonly deleteEvidenceByName: DeleteEvidenceByName = Object.assign(
    async (
      ...[testRunId, filename]: Parameters<DeleteEvidenceByName>
    ): ReturnType<DeleteEvidenceByName> => {
      return this.processor.deleteEvidenceByName(
        `reset/raven/api/2.0/testrun/${testRunId}/attachment`,
        filename,
        204
      );
    },
    {
      v1: async (
        ...[testRunId, filename]: Parameters<DeleteEvidenceByName["v1"]>
      ): ReturnType<DeleteEvidenceByName["v1"]> => {
        return this.processor.deleteEvidenceByName(
          `reset/raven/api/1.0/testrun/${testRunId}/attachment`,
          filename,
          200
        );
      },
    }
  );

  public readonly getEvidence: GetEvidence = Object.assign(
    async (...[testRunId]: Parameters<GetEvidence>): ReturnType<GetEvidence> => {
      return this.processor.getEvidence(`reset/raven/api/2.0/testrun/${testRunId}/attachment`);
    },
    {
      v1: async (...[testRunId]: Parameters<GetEvidence["v1"]>): ReturnType<GetEvidence["v1"]> => {
        return this.processor.getEvidence(`reset/raven/api/1.0/testrun/${testRunId}/attachment`);
      },
    }
  );
}

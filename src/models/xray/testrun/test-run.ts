/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
 */
export type GetExecutionEvidenceResponse = {
  author: string;
  created: string;
  fileName: string;
  fileSize: string;
  ["fileURL"]: string;
  id: number;
}[];

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-TestRun
 */
export interface GetTestRunResponse {
  archived: false;
  assignee: string;
  color: string;
  comment: string;
  customFields: { id: string; value: unknown }[];
  defects: {
    id: number;
    key: string;
    status: string;
    summary: string;
  }[];
  duration: number;
  environments: string[];
  evidences: {
    author: string;
    created: string;
    fileName: string;
    fileSize: string;
    ["fileURL"]: string;
    id: number;
  }[];
  examples: {
    id: number;
    rank: number;
    status: string;
    statusDescription: string;
    values: string[];
  }[];
  fixVersions: { name: string }[];
  id: number;
  startedOn: string;
  startedOnIso: string;
  status: string;
  steps: {
    actualResult: { rendered: string };
    comment: { rendered: string };
    defects: {
      id: number;
      key: string;
      status: string;
      summary: string;
    }[];
    evidences: {
      author: string;
      created: string;
      fileName: string;
      fileSize: string;
      ["fileURL"]: string;
      id: number;
    }[];
    fields: {
      ["Action"]: { type: string; value: { raw: string; rendered: string } };
      ["Data"]: { type: string; value: { raw: string; rendered: string } };
      ["Expected Result"]: { type: string; value: { raw: string; rendered: string } };
    };
    id: number;
    index: number;
    status: string;
  }[];
  testEnvironments: string[];
  testExecKey: string;
  testKey: string;
  testVersion: string;
}

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-TestRun
 */
export interface UpdateTestRunResponse {
  evidenceIds: number[];
  id: number;
  stepResults: { evidenceIds: number[]; id: number; warnings: string[] }[];
  warnings: string[];
}

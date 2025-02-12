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
  assignee: string;
  color: string;
  comment: string;
  customFields: {
    id: number;
    name: string;
    value: string;
  }[];
  defects: string[];
  duration: number;
  evidences: {
    author: string;
    authorFullName: string;
    created: string;
    createdDate: number;
    fileIcon: string;
    fileIconAlt: string;
    fileName: string;
    filePath: string;
    fileSize: string;
    ["fileURL"]: string;
    id: number;
    mimeType: string;
    numericalFileSize: string;
  }[];
  executedBy: string;
  finishedOn: string;
  finishedOnIso: string;
  fixVersions: {
    description: string;
    id: string;
    isArchived: true;
    isReleased: false;
    name: string;
  }[];
  id: number;
  iterations?: {
    color: string;
    id: number;
    parameters: [
      {
        name: string;
        value: string;
      },
    ];
    status: string;
  }[];
  parameters?: {
    name: string;
    value: string;
  }[];
  startedOn: string;
  startedOnIso: string;
  status: string;
  steps?: {
    actualResult: {
      rendered: string;
    };
    attachments: [
      {
        author: string;
        authorFullName: string;
        created: string;
        createdDate: number;
        fileIcon: string;
        fileIconAlt: string;
        fileName: string;
        filePath: string;
        fileSize: string;
        ["fileURL"]: string;
        id: number;
        mimeType: string;
        numericalFileSize: string;
      },
    ];
    comment: {
      rendered: string;
    };
    defects: string[];
    evidences: [
      {
        author: string;
        authorFullName: string;
        created: string;
        createdDate: number;
        fileIcon: string;
        fileIconAlt: string;
        fileName: string;
        filePath: string;
        fileSize: string;
        ["fileURL"]: string;
        id: number;
        mimeType: string;
        numericalFileSize: string;
      },
    ];
    fields: {
      ["Action"]: {
        type: string;
        value: {
          raw: string;
          rendered: string;
        };
      };
      ["Toggle"]: {
        type: string;
        value: string;
      };
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

import type { Xray } from "../../index.js";

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-TestRun
 */
export interface TestRun {
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
  evidences: Xray.Attachment.FileAttachment[];
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
    attachments: Xray.Attachment.FileAttachment[];
    comment: {
      rendered: string;
    };
    defects: string[];
    evidences: Xray.Attachment.FileAttachment[];
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

import type { Xray } from "../../../../index.js";

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-TestRun
 */
export interface Details {
  assignee: string;
  color: string;
  comment: string;
  customFields: {
    id: number;
    name: string;
    value: string;
  }[];
  defects: Xray.TestRun.Defect[];
  duration: number;
  evidences: Xray.Attachment.FileAttachment[];
  examples?: {
    id: number;
    rank: number;
    status: string;
    values: string[];
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
  scenarioOutline?: string;
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

export interface Defect {
  iconUrl: string;
  id: number;
  key: string;
  status: string;
  statusColor: string;
  summary: string;
}

export interface Comment {
  raw: string;
  rendered: string;
}

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Examples
 */
export interface CucumberExample {
  backgrounds: CucumberElement[];
  /**
   * @example "0 millisec"
   */
  duration: string;
  hooks: CucumberElement[];
  /**
   * @example 5068
   */
  id: number;
  /**
   * @example 1
   */
  rank: number;
  /**
   * @example "PASS"
   */
  status: string;
  steps: CucumberElement[];
  /**
   * @example ["1", "factorial", "1"]
   */
  values: string[];
}

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Examples
 */
export interface CucumberElement {
  /**
   * @example "0 millisec"
   */
  duration: string;
  /**
   * @example 1337
   */
  id: number;
  /**
   * @example "Given "
   */
  keyword: string;
  /**
   * @example "AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: 123 !== 456"
   */
  logError?: string;
  /**
   * @example "a calculator I just turned on"
   */
  name: string;
  /**
   * @example 1
   */
  rank: number;
  /**
   * @example "PASS"
   */
  status: string;
  /**
   * @example "background"
   */
  type: string;
}

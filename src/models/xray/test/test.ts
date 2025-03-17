import type { Xray } from "../../../../index.js";

export type * as Step from "./step/step.js";

/**
 * @see https://docs.getxray.app/display/XRAY/Tests+-+REST#TestsREST-ExportingTests
 */
export interface Details {
  /**
   * @example false
   */
  archived: boolean;
  /**
   * @example "admin"
   */
  assignee: string;
  definition:
    | {
        steps: Xray.Test.Step.DetailsV1[];
      }
    | string;
  /**
   * @example 25712
   */
  id: number;
  /**
   * @example "PER-1098"
   */
  key: string;
  precondition: Xray.Test.Precondition[];
  /**
   * @example "admin"
   */
  reporter: string;
  /**
   * @example "http://yourserver/rest/api/2/issue/15798"
   */
  self: string;
  /**
   * @example "EXECUTING"
   */
  status: string;
  /**
   * @example "Manual"
   */
  type: string;
}

/**
 * @see https://docs.getxray.app/display/XRAY/Tests+-+REST#TestsREST-ExportingTestPre-Conditions
 */
export interface Precondition {
  assignee: string;
  condition: string;
  id: number;
  key: string;
  rank: number;
  reporter: string;
  self: string;
  type: string;
}

/**
 * @see https://docs.getxray.app/display/XRAY/Tests+-+REST#TestsREST-ExportingTestSets
 */
export interface TestSet {
  environments: string[];
  id: number;
  key: string;
  self: string;
  summary: string;
}

/**
 * @see https://docs.getxray.app/display/XRAY/Tests+-+REST#TestsREST-ExportingTestExecutions
 */
export interface TestExecution {
  archived: false;
  id: number;
  key: string;
  self: string;
  summary: string;
  testEnvironments: string[];
}

/**
 * @see https://docs.getxray.app/display/XRAY/Tests+-+REST#TestsREST-ExportingTestPlans
 */
export interface TestPlan {
  archived: false;
  id: number;
  key: string;
  self: string;
  summary: string;
}

import type { Xray } from "../../../../index.js";

export type * as Step from "./step/step.js";

export interface Details {
  archived: boolean;
  assignee: string;
  definition:
    | {
        steps: Xray.Test.Step.DetailsV1[];
      }
    | string;
  id: number;
  key: string;
  precondition: Xray.Test.Precondition[];
  reporter: string;
  self: string;
  status: string;
  type: string;
}

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

export interface TestSet {
  environments: string[];
  id: number;
  key: string;
  self: string;
  summary: string;
}

export interface TestExecution {
  archived: false;
  id: number;
  key: string;
  self: string;
  summary: string;
  testEnvironments: string[];
}

export interface TestPlan {
  archived: false;
  id: number;
  key: string;
  self: string;
  summary: string;
}

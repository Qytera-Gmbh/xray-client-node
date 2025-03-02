import type { Xray } from "../../index.js";

export interface Test {
  archived: boolean;
  assignee: string;
  definition:
    | {
        steps: TestStep[];
      }
    | string;
  id: number;
  key: string;
  precondition: {
    assignee: string;
    condition: string;
    preconditionKey: string;
    reporter: string;
    self: string;
    type: string;
  }[];
  reporter: string;
  self: string;
  status: string;
  type: string;
}

export interface TestStep {
  attachments: Xray.Attachment.FileAttachment[];
  data: {
    raw: string;
    rendered: string;
  };
  id: number;
  index: number;
  result: {
    raw: string;
    rendered: string;
  };
  step: {
    raw: string;
    rendered: string;
  };
}

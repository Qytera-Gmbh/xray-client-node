import type { Xray } from "../../index.js";

/**
 * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
 */
export interface Details {
  /**
   * @example false
   */
  archived: boolean;
  /**
   * @example "TEST-4"
   */
  preconditionKey: string;
  /**
   * @example 0
   */
  rank: number;
  /**
   * @see "admin"
   */
  reporter: string;
  /**
   * @example "http://localhost:6080/rest/api/2/issue/19705"
   */
  self: string;
  /**
   * @example "Cucumber"
   */
  type: string;
}

/**
 * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
 */
export interface Test {
  /**
   * @example false
   */
  archived: false;
  definition: {
    steps: string | Xray.Test.Step.DetailsV1[];
  };
  /**
   * @example 25712
   */
  id: number;
  /**
   * @example "XCNODE-9"
   */
  key: string;
  precondition: Xray.Precondition.Details[];
  /**
   * @example "admin"
   */
  reporter: string;
  /**
   * @example "http://localhost:6080/rest/api/2/issue/19701"
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

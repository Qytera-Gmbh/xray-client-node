import type { Xray } from "../../../../../index.js";

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
 */
export interface DetailsV1 {
  attachments: Xray.Attachment.FileAttachment[];
  data: {
    /**
     * @example "(1 + 1) * 2"
     */
    raw: string;
    /**
     * @example "<p>(1 + 1) * 2</p>"
     */
    rendered: string;
  };
  /**
   * @example 85778
   */
  id: number;
  /**
   * @example 1
   */
  index: number;
  result: {
    /**
     * @example "The expected result is *4*"
     */
    raw: string;
    /**
     * @example "<p>The expected result is <b>4</b></p>"
     */
    rendered: string;
  };
  step: {
    /**
     * @example "Enter the following operation on screen"
     */
    raw: string;
    /**
     * @example "<p>Enter the following operation on screen</p>"
     */
    rendered: string;
  };
}

/**
 * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step/get_test__testKey__steps__stepId_
 */
export type DetailsV2 =
  | {
      attachments: Xray.Attachment.FileAttachment[];
      /**
       * @example
       *
       * ```ts
       * {
       *   Action: {
       *     type: "Wiki",
       *     value: {
       *       raw: "This is a step action",
       *       rendered: "<p>This is a step action</p>"
       *     }
       *   },
       *   Toggle: {
       *     type: "Data",
       *     value: "false"
       *   }
       * }
       * ```
       */
      fields: Record<
        string,
        Xray.Test.Step.DataField | Xray.Test.Step.OptionField | Xray.Test.Step.WikiField
      >;
      /**
       * @example 85778
       */
      id: number;
      /**
       * @example 1
       */
      index: number;
      testCallStep?: false;
    }
  | CalledStep;

export interface CalledStep {
  /**
   * @example "XRAY-5000"
   */
  calledTestIssueKey: string;
  /**
   * @example 85769
   */
  id: number;
  /**
   * @example 2
   */
  index: number;
  /**
   * @example true
   */
  testCallStep: true;
}

export interface DataField {
  /**
   * @example "Data"
   */
  type: string;
  /**
   * @example "false"
   */
  value: string;
}

export interface OptionField {
  type: string;
  value: {
    id: number;
    value: string;
  }[];
}

export interface WikiField {
  /**
   * @example "Wiki"
   */
  type: string;
  value: {
    /**
     * @example "This is a step action"
     */
    raw: string;
    /**
     * @example "<p>This is a step action</p>"
     */
    rendered: string;
  };
}

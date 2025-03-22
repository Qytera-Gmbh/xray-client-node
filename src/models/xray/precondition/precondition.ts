/**
 * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
 */
export interface Details {
  /**
   * @example false
   */
  archived: boolean;
  /**
   * "admin"
   */
  assignee?: string;
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

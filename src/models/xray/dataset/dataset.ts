/**
 * The dataset export query parameters for Xray cloud.
 *
 * @see https://docs.getxray.app/display/XRAYCLOUD/Exporting+datasets+-+REST+v2
 */
export interface DatasetExportQueryCloud {
  /**
   * The id of the context issue (Test Plan or Test Execution).
   */
  contextIssueId?: string;
  /**
   * The key of the context issue (Test Plan or Test Execution).
   */
  contextIssueKey?: string;
  /**
   * A flag indicating of the dataset must be resolved or not for a given level (true by default).
   */
  resolved?: boolean;
  /**
   * The id of the test issue.
   */
  testIssueId?: string;
  /**
   * The key of the test issue.
   */
  testIssueKey?: string;
}

/**
 * The dataset export query parameters for Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/v2.0#/Dataset/get_dataset_export
 */
export type DatasetExportQueryServer = DatasetExportQueryCloud & {
  /**
   * A test version.
   */
  testVersion?: string;
};

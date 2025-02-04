/**
 * Taken from:
 *
 * Xray Server: https://docs.getxray.app/display/XRAY/Import+Execution+Results
 *
 * Xray Cloud: https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results
 *
 * Schemes transformed into TypeScript using https://github.com/bcherny/json-schema-to-typescript.
 */
export interface TestExecutionResults {
  /**
   * The info object for creating new test execution issues.
   */
  info?: TestExecutionInfo;
  /**
   * The test execution key where to import the execution results.
   */
  testExecutionKey?: string;
  /**
   * The test run result details.
   */
  tests?: [Test, ...Test[]];
}

/**
 * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results#ImportExecutionResults-%22info%22object-TestExecutionissue
 * @see https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results#UsingXrayJSONformattoimportexecutionresults-%22info%22object-TestExecutionissue
 */
export interface TestExecutionInfo {
  /**
   * The description for the test execution issue.
   */
  description?: string;
  /**
   * The finish date for the test execution issue.
   */
  finishDate?: string;
  /**
   * The project key where the test execution will be created.
   */
  project?: string;
  /**
   * A revision for the revision custom field.
   */
  revision?: string;
  /**
   * The start date for the test execution issue.
   */
  startDate?: string;
  /**
   * The summary for the test execution issue.
   */
  summary?: string;
  /**
   * The test environments for the test execution issue.
   */
  testEnvironments?: string[];
  /**
   * The test plan key for associating the test execution issue.
   */
  testPlanKey?: string;
  /**
   * The username for the Jira user who executed the tests.
   */
  user?: string;
  /**
   * The version name for the fix version field of the test execution issue.
   */
  version?: string;
}

export interface Test {
  /**
   * The user id for the assignee of the test run.
   */
  assignee?: string;
  /**
   * The comment for the test run.
   */
  comment?: string;
  /**
   * An array of custom fields for the test run.
   */
  customFields?: CustomField[];
  /**
   * An array of defect issue keys to associate with the test run.
   */
  defects?: string[];
  /**
   * An array of evidence items of the test run.
   */
  evidence?: EvidenceItem[];
  /**
   * The example results for BDD tests.
   */
  examples?: (XrayExamplesTypeCloud | XrayExamplesTypeServer)[];
  /**
   * The user id who executed the test run.
   */
  executedBy?: string;
  /**
   * The finish date for the test run.
   */
  finish?: string;
  /**
   * The iteration containing data-driven test results.
   */
  iterations?: IterationResult[];
  /**
   * The start date for the test run.
   */
  start?: string;
  /**
   * The test run status.
   */
  status: string;
  /**
   * The step results.
   */
  steps?: ManualTestStepResult[];
  /**
   * The test info element.
   */
  testInfo?: TestInfo;
  /**
   * The test issue key.
   */
  testKey?: string;
}
/**
 * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results#ImportExecutionResults-%22tests%22object-TestRundetails
 */
export type XrayExamplesTypeServer = "EXECUTING" | "FAIL" | "PASS" | "TODO";
/**
 * @see https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results#UsingXrayJSONformattoimportexecutionresults-%22test%22object-TestRundetails
 */
export type XrayExamplesTypeCloud = "EXECUTING" | "FAILED" | "PASSED" | "TODO";

export interface TestInfo {
  /**
   * The generic test definition.
   */
  definition?: string;
  /**
   * The test issue labels.
   */
  labels?: string[];
  /**
   * The project key where the test issue will be created.
   */
  projectKey: string;
  /**
   * An array of requirement issue keys to associate with the test.
   */
  requirementKeys?: string[];
  /**
   * The BDD scenario.
   */
  scenario?: string;
  /**
   * An array of test steps (for manual tests).
   */
  steps?: {
    /**
     * The step action.
     */
    action: string;
    /**
     * The step data.
     */
    data?: string;
    /**
     * The step expected result.
     */
    result?: string;
  }[];
  /**
   * The summary for the test issue.
   */
  summary: string;
}
/**
 * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results#ImportExecutionResults-%22testInfo%22object-CreatingTestissues
 */
export interface TestInfoServer extends TestInfo {
  /**
   * The description of the test issue.
   */
  description?: string;
  /**
   * The BDD scenario type (scenario or scenario outline).
   */
  scenarioType?: string;
  /**
   * The test type (e.g. Manual, Cucumber, Generic).
   */
  testType: string;
}
/**
 * @see https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results#UsingXrayJSONformattoimportexecutionresults-%22testInfo%22object-CreatingTestissues
 */
export interface TestInfoCloud extends TestInfo {
  /**
   * An array of test steps (for manual tests).
   */
  steps?: {
    /**
     * Any other step custom fields.
     */
    [k: string]: NonNullable<unknown>;
    /**
     * The step action.
     */
    action: string;
  }[];
  /**
   * The test type (e.g. Manual, Cucumber, Generic).
   */
  type: string;
}

export interface ManualTestStepResult {
  /**
   * The actual result field for the step result.
   */
  actualResult?: string;
  /**
   * The comment for the step result.
   */
  comment?: string;
  /**
   * An array of defect issue keys to associate with the test run.
   */
  defects?: string[];
  /**
   * The status for the test step.
   */
  status: string;
}
export interface ManualTestStepResultServer extends ManualTestStepResult {
  /**
   * An array of evidence items of the test run.
   */
  evidences?: EvidenceItem[];
}
/**
 * @see https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results#UsingXrayJSONformattoimportexecutionresults-%22stepresult%22object-stepresults
 */
export interface ManualTestStepResultCloud extends ManualTestStepResult {
  /**
   * An array of evidence items of the test run.
   */
  evidence?: EvidenceItem[];
}
/**
 * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results#ImportExecutionResults-%22evidence%22object-embeddedattachments
 * @see https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results#UsingXrayJSONformattoimportexecutionresults-%22evidence%22object-embeddedattachments
 */
export interface EvidenceItem {
  /**
   * The Content-Type representation header is used to indicate the original
   * media type of the resource.
   */
  contentType?: string;
  /**
   * The attachment data encoded in base64.
   */
  data: Base64String;
  /**
   * The file name for the attachment.
   */
  filename: string;
}

export interface IterationResult {
  /**
   * An array of parameters along with their values.
   */
  parameters?: {
    /**
     * The parameter value.
     */
    value?: string;
  }[];
  /**
   * The status for the iteration.
   */
  status: string;
  /**
   * An array of step results (for manual tests).
   */
  steps?: ManualTestStepResult[];
}
/**
 * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results#ImportExecutionResults-%22iterations%22object-Data-driventestresults
 */
export interface IterationResultServer extends IterationResult {
  /**
   * An array of parameters along with their values.
   */
  parameters?: {
    /**
     * The parameter name.
     */
    name?: string;
    /**
     * The parameter value.
     */
    value?: string;
  }[];
}
/**
 * @see https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results#UsingXrayJSONformattoimportexecutionresults-%22iteration%22object-Data-driventestresults
 */
export interface IterationResultCloud extends IterationResult {
  /**
   * A duration for the iteration.
   */
  duration?: string;
  /**
   * The log for the iteration.
   */
  log?: string;
  /**
   * The iteration name.
   */
  name?: string;
  /**
   * An array of parameters along with their values.
   */
  parameters?: {
    /**
     * The parameter name.
     */
    name: string;
    /**
     * The parameter value.
     */
    value?: string;
  }[];
}
/**
 * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results#ImportExecutionResults-%22customFields%22object-storetestruncustomfields
 */
export interface CustomField {
  /**
   * The test run custom field ID.
   */
  id: string;
  /**
   * The test run custom field value.
   */
  value: unknown;
}
/**
 * @see https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results#UsingXrayJSONformattoimportexecutionresults-%22customField%22object-storetestruncustomfields
 */
export interface CustomFieldCloud extends CustomField {
  /**
   * The test run custom field name.
   */
  name: string;
}

// Small utility type to better express meaning.
export type Base64String = string;

/**
 * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results+-+REST
 */
export interface ResponseServer {
  testExecIssue: {
    id: string;
    key: string;
    name: string;
  };
}

/**
 * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST
 */
export interface ResponseCloud {
  id: string;
  key: string;
  self: string;
}

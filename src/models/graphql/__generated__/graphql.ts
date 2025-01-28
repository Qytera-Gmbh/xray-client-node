/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type ActionFolderResult = {
  __typename?: 'ActionFolderResult';
  /** Folder updated during the operation. */
  folder?: Maybe<SimpleFolderResults>;
  /** Warning generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Added Defects Result Type */
export type AddDefectsResult = {
  __typename?: 'AddDefectsResult';
  /** Ids of the added Defects. */
  addedDefects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Add Evidence Result Type */
export type AddEvidenceResult = {
  __typename?: 'AddEvidenceResult';
  /** Ids of the added Evidence. */
  addedEvidence?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Add Preconditions Result type */
export type AddPreconditionsResult = {
  __typename?: 'AddPreconditionsResult';
  /** Issue ids of the added Preconditions. */
  addedPreconditions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warning generated during the operation. */
  warning?: Maybe<Scalars['String']['output']>;
};

/** Add Test Environments Result type */
export type AddTestEnvironmentsResult = {
  __typename?: 'AddTestEnvironmentsResult';
  /** Test Environments that were associated. */
  associatedTestEnvironments?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Test Environments that were created. */
  createdTestEnvironments?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warning generated during the operation. */
  warning?: Maybe<Scalars['String']['output']>;
};

/** Add Test Executions Result type */
export type AddTestExecutionsResult = {
  __typename?: 'AddTestExecutionsResult';
  /** Issue ids of the added Test Executions. */
  addedTestExecutions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warning generated during the operation. */
  warning?: Maybe<Scalars['String']['output']>;
};

/** Add Test Plans Result type */
export type AddTestPlansResult = {
  __typename?: 'AddTestPlansResult';
  /** Issue ids of the added Test Plans. */
  addedTestPlans?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warning generated during the operation. */
  warning?: Maybe<Scalars['String']['output']>;
};

/** Add Test Sets Result type */
export type AddTestSetsResult = {
  __typename?: 'AddTestSetsResult';
  /** Issue ids of the added Test Set. */
  addedTestSets?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warning generated during the operation. */
  warning?: Maybe<Scalars['String']['output']>;
};

/** Add Tests Result type */
export type AddTestsResult = {
  __typename?: 'AddTestsResult';
  /** Issue Ids of the added Tests. */
  addedTests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warning generated during the operation. */
  warning?: Maybe<Scalars['String']['output']>;
};

/** Step Attachment type */
export type Attachment = {
  __typename?: 'Attachment';
  /** Download link of the attachment. */
  downloadLink?: Maybe<Scalars['String']['output']>;
  /** Filename of the attachment. */
  filename?: Maybe<Scalars['String']['output']>;
  /** Id of the attachment. */
  id?: Maybe<Scalars['String']['output']>;
  /** If the file is stored in Jira. */
  storedInJira?: Maybe<Scalars['Boolean']['output']>;
};

/** Attachment Data Input */
export type AttachmentDataInput = {
  /** Id of an attachment. */
  attachmentId?: InputMaybe<Scalars['String']['input']>;
  /** Data of the attachment. Base64 format. */
  data?: InputMaybe<Scalars['String']['input']>;
  /**
   *  A valid <b>AttachmentDataInput</b> must have the properties <b>filename</b>, <b>mimeType</b> and <b>data</b> defined.
   * In alternative, the <b>attachmentId</b> property can be used alone.
   * If both <b>attachmentId</b> and other properties are defined, <b>attachmentId</b> takes precedence and will be used as if it was defined alone.
   *
   *
   * Filename of the attachment.
   */
  filename?: InputMaybe<Scalars['String']['input']>;
  /** Content Type of the attachment. */
  mimeType?: InputMaybe<Scalars['String']['input']>;
};

/** Attachment input */
export type AttachmentInput = {
  /** Data of the attachment. This data should be in base64. */
  data?: InputMaybe<Scalars['String']['input']>;
  /** Filename of the attachment. */
  filename?: InputMaybe<Scalars['String']['input']>;
  /** Content Type of the attachment. */
  mimeType?: InputMaybe<Scalars['String']['input']>;
};

/** Attachment Operations Input */
export type AttachmentOperationsInput = {
  /** Attachments to add to the Step. */
  add?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  /** Filenames of the attachments to remove from the Step. */
  removeFilenames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Ids of the attachments to remove from the Step. */
  removeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Xray History Changes type */
export type Changes = {
  __typename?: 'Changes';
  /** Change details. */
  change?: Maybe<Scalars['String']['output']>;
  /** Field the change refers to. */
  field?: Maybe<Scalars['String']['output']>;
};

export type CoverableIssue = {
  __typename?: 'CoverableIssue';
  /** Issue id of the Coverable Issue Issue. */
  issueId?: Maybe<Scalars['String']['output']>;
  /**
   * Extra Jira information of the Coverable issue.
   *
   * Arguments
   * fields: List of the fields to be displayed.
   */
  jira: Scalars['JSON']['output'];
  /**
   * Test Coverage Status of the Coverable Issue. This status can be calculated based on latest status, version or Test Plan.
   *
   * Arguments
   * environment: the environment for which to calculate the for status.
   * isFinal: whether the final statuses has precedence over non-final.
   * version: the version name for which to calculate the status for.
   * testPlan: the Test Plan issue id for which to calculate the status for.
   */
  status?: Maybe<CoverageStatus>;
  /**
   * List of Tests associated with the Coverable Issue issue.
   *
   * Arguments
   * issueIds: the issue ids of the Tests.
   * limit: the maximum amount of tests to be returned. The maximum is 100.
   * start: the index of the first item to return in the page of results (page offset).
   */
  tests?: Maybe<TestResults>;
};


export type CoverableIssueJiraArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CoverableIssueStatusArgs = {
  environment?: InputMaybe<Scalars['String']['input']>;
  isFinal?: InputMaybe<Scalars['Boolean']['input']>;
  testPlan?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type CoverableIssueTestsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};

/** Coverable Issue Results type */
export type CoverableIssueResults = {
  __typename?: 'CoverableIssueResults';
  /** The maximum amount of Coverable Issues to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Test issue results. */
  results?: Maybe<Array<Maybe<CoverableIssue>>>;
  /** The index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of issues. */
  total?: Maybe<Scalars['Int']['output']>;
  /** Warnings generated if you have a invalid Coverable Issue */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CoverageStatus = {
  __typename?: 'CoverageStatus';
  /** Color of the Coverage Status */
  color?: Maybe<Scalars['String']['output']>;
  /** Description of the Coverage Status */
  description?: Maybe<Scalars['String']['output']>;
  /** Name of the Coverage Status */
  name?: Maybe<Scalars['String']['output']>;
};

/** Create Precondition Response type */
export type CreatePreconditionResult = {
  __typename?: 'CreatePreconditionResult';
  /** Precondition that was created. */
  precondition?: Maybe<Precondition>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Create Step input */
export type CreateStepInput = {
  /** Action of the Step. */
  action?: InputMaybe<Scalars['String']['input']>;
  /** Attachments of the Step. */
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  /** The issue id of the test called by the step. */
  callTestIssueId?: InputMaybe<Scalars['String']['input']>;
  /** Custom Fields of the Step */
  customFields?: InputMaybe<Array<InputMaybe<CustomStepFieldInput>>>;
  /** Data of the Step. */
  data?: InputMaybe<Scalars['String']['input']>;
  /** Result of the Step. */
  result?: InputMaybe<Scalars['String']['input']>;
};

/** Create Test Execution Result type */
export type CreateTestExecutionResult = {
  __typename?: 'CreateTestExecutionResult';
  /** Test Environments that were created. */
  createdTestEnvironments?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Test Execution that was created. */
  testExecution?: Maybe<TestExecution>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Create Test Plan Result type */
export type CreateTestPlanResult = {
  __typename?: 'CreateTestPlanResult';
  /** Test Plan that was created. */
  testPlan?: Maybe<TestPlan>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Create Test Result type */
export type CreateTestResult = {
  __typename?: 'CreateTestResult';
  /** Test that was created. */
  test?: Maybe<Test>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Create Test Set Result type */
export type CreateTestSetResult = {
  __typename?: 'CreateTestSetResult';
  /** Test Set that was created. */
  testSet?: Maybe<TestSet>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Custom Field Input */
export type CustomFieldInput = {
  /** Id of the custom field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Value of the custom field. */
  value?: InputMaybe<Scalars['JSON']['input']>;
};

/** Step CustomField type */
export type CustomStepField = {
  __typename?: 'CustomStepField';
  /** Id of the Custom Field. */
  id?: Maybe<Scalars['String']['output']>;
  /** Name of the Custom Field. */
  name?: Maybe<Scalars['String']['output']>;
  /** Value of the Custom Field. */
  value?: Maybe<Scalars['JSON']['output']>;
};

/** Step Custom Field input */
export type CustomStepFieldInput = {
  /** Id of the Custom Field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** value of the Custom Field. */
  value?: InputMaybe<Scalars['JSON']['input']>;
};

/** Evidence Type */
export type Evidence = {
  __typename?: 'Evidence';
  /** Evidence creation timestamp. */
  createdOn?: Maybe<Scalars['String']['output']>;
  /** Download link of the Evidence. */
  downloadLink?: Maybe<Scalars['String']['output']>;
  /** Filename of the Evidence. */
  filename?: Maybe<Scalars['String']['output']>;
  /** Id of the Evidence. */
  id?: Maybe<Scalars['String']['output']>;
  /** File size in bytes. */
  size?: Maybe<Scalars['Int']['output']>;
  /** If file is stored in Jira */
  storedInJira?: Maybe<Scalars['Boolean']['output']>;
};

/** Example Type */
export type Example = {
  __typename?: 'Example';
  /** Duration of the Example. */
  duration?: Maybe<Scalars['Float']['output']>;
  /** Id of the Example. */
  id?: Maybe<Scalars['String']['output']>;
  /** Status of the Example. */
  status?: Maybe<StepStatus>;
};

/** Expanded test step type */
export type ExpandedStep = {
  __typename?: 'ExpandedStep';
  /** Action of the Step. */
  action?: Maybe<Scalars['String']['output']>;
  /** Attachments of the Step. */
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  /** The issue id of the called test with the step */
  calledTestIssueId?: Maybe<Scalars['String']['output']>;
  /** Custom Fields of the Step. */
  customFields?: Maybe<Array<Maybe<CustomStepField>>>;
  /** Data of the Step. */
  data?: Maybe<Scalars['String']['output']>;
  /** Id of the Step. */
  id?: Maybe<Scalars['String']['output']>;
  /** The issue id of the test calling the step */
  parentTestIssueId?: Maybe<Scalars['String']['output']>;
  /** Result of the Step. */
  result?: Maybe<Scalars['String']['output']>;
};

/** Expaded test issue type */
export type ExpandedTest = {
  __typename?: 'ExpandedTest';
  /** List of Coverable Issues associated with the Test issue */
  coverableIssues?: Maybe<CoverableIssueResults>;
  /** Test Repository folder of the Test. */
  folder?: Maybe<Folder>;
  /** Gherkin definition of the Test issue. */
  gherkin?: Maybe<Scalars['String']['output']>;
  /** List of Xray History results for the issue */
  history?: Maybe<XrayHistoryResults>;
  /** Issue id of the Test issue. */
  issueId?: Maybe<Scalars['String']['output']>;
  /** Extra Jira information of the Test issue. */
  jira: Scalars['JSON']['output'];
  /** Date when the test was last modified. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** List of Precondition associated with the Test issue. */
  preconditions?: Maybe<PreconditionResults>;
  /** Project id of the Test issue. */
  projectId?: Maybe<Scalars['String']['output']>;
  /**
   * Gherkin type of the Test issue.
   * Possible values: 'scenario' or 'scenario_outline'.
   */
  scenarioType?: Maybe<Scalars['String']['output']>;
  /** Status of the Test. This status can be calculated based on latest status, version or Test Plan. */
  status?: Maybe<TestStatusType>;
  /** Expanded step definition of the test. */
  steps?: Maybe<Array<Maybe<ExpandedStep>>>;
  /** List of Test Executions associated with the Test issue. */
  testExecutions?: Maybe<TestExecutionResults>;
  /** List of Test Plans associated with the Test issue. */
  testPlans?: Maybe<TestPlanResults>;
  /** List of Test Runs for the Test issue */
  testRuns?: Maybe<TestRunResults>;
  /** List of Test Sets associated with the Test issue. */
  testSets?: Maybe<TestSetResults>;
  /** Test type of the Test issue. */
  testType?: Maybe<TestType>;
  /** List of Test versions of the Test */
  testVersions?: Maybe<TestVersionResults>;
  /** Unstructured definition of the Test issue. */
  unstructured?: Maybe<Scalars['String']['output']>;
  /** Version id of the Test issue. */
  versionId?: Maybe<Scalars['Int']['output']>;
  /** Warnings generated while expanding the test steps. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Expaded test issue type */
export type ExpandedTestCoverableIssuesArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Expaded test issue type */
export type ExpandedTestHistoryArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Expaded test issue type */
export type ExpandedTestJiraArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Expaded test issue type */
export type ExpandedTestPreconditionsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Expaded test issue type */
export type ExpandedTestStatusArgs = {
  environment?: InputMaybe<Scalars['String']['input']>;
  isFinal?: InputMaybe<Scalars['Boolean']['input']>;
  testPlan?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


/** Expaded test issue type */
export type ExpandedTestTestExecutionsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Expaded test issue type */
export type ExpandedTestTestPlansArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Expaded test issue type */
export type ExpandedTestTestRunsArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Expaded test issue type */
export type ExpandedTestTestSetsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Expaded test issue type */
export type ExpandedTestTestVersionsArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
  testTypeId?: InputMaybe<Scalars['String']['input']>;
};

/** Expanded tests results type */
export type ExpandedTestResults = {
  __typename?: 'ExpandedTestResults';
  /** The maximum amount of Tests to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Expanded test issue results. */
  results?: Maybe<Array<Maybe<ExpandedTest>>>;
  /** The index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of issues. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Test Repository folder type. */
export type Folder = {
  __typename?: 'Folder';
  /** Folder name */
  name?: Maybe<Scalars['String']['output']>;
  /** Folder path */
  path?: Maybe<Scalars['String']['output']>;
};

export type FolderResults = {
  __typename?: 'FolderResults';
  /** Folder children */
  folders?: Maybe<Scalars['JSON']['output']>;
  /** Folder issues count */
  issuesCount?: Maybe<Scalars['Int']['output']>;
  /** Folder name */
  name?: Maybe<Scalars['String']['output']>;
  /** Folder path */
  path?: Maybe<Scalars['String']['output']>;
  /** Folder preconditions count */
  preconditionsCount?: Maybe<Scalars['Int']['output']>;
  /** Folder tests count */
  testsCount?: Maybe<Scalars['Int']['output']>;
};

/** Folder Search input */
export type FolderSearchInput = {
  /** Whether descendant folders should be included in the search. */
  includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
  /** Path of the Folder. */
  path: Scalars['String']['input'];
  /** Test Plan id of the Folder. */
  testPlanId?: InputMaybe<Scalars['String']['input']>;
};

/** Issue Link Type type */
export type IssueLinkType = {
  __typename?: 'IssueLinkType';
  /** Id of Issue Link Type */
  id?: Maybe<Scalars['String']['output']>;
  /** Name of Issue Link Type */
  name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Mutation used to add defects to a Test Run.
   * ===
   * The mutation below adds 2 defects to the Test Run.
   * <pre>
   * mutation {
   *     <b>addDefectsToTestRun</b>( id: "5acc7ab0a3fe1b6fcdc3c737", issues: ["XRAY-1234", "12345"]) {
   *         addedDefects
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  addDefectsToTestRun?: Maybe<AddDefectsResult>;
  /**
   * Mutation used to add defects to a Test Run Step.
   * ===
   * The mutation below adds 2 defects to the Test Run Step.
   * <pre>
   * mutation {
   *     <b>addDefectsToTestRunStep</b>(
   *         testRunId: "5e8489c05f200f3cd45bbaf0",
   *         stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
   *         issues: ["XRAY-1234", "12345"]
   *     ) {
   *         addedDefects
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  addDefectsToTestRunStep?: Maybe<AddDefectsResult>;
  /**
   * Mutation used to add evidence to a Test Run.
   * ===
   * The mutation below adds an evidence to the Test Run.
   * <pre>
   * mutation {
   *     <b>addEvidenceToTestRun</b>(
   *         id: "5acc7ab0a3fe1b6fcdc3c737",
   *         evidence: [
   *             {
   *                 filename: "evidence.txt"
   *                 mimeType: "text/plain"
   *                 data: "SGVsbG8gV29ybGQ="
   *             }
   *         ]
   *     ) {
   *         addedEvidence
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  addEvidenceToTestRun?: Maybe<AddEvidenceResult>;
  /**
   * Mutation used to add evidence to a Test Run Step.
   * ===
   * The mutation below adds an evidence to the Test Run Step.
   * <pre>
   * mutation {
   *     <b>addEvidenceToTestRunStep</b>(
   *         testRunId: "5e8489c05f200f3cd45bbaf0",
   *         stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
   *         evidence: [
   *             {
   *                 filename: "evidence.txt"
   *                 mimeType: "text/plain"
   *                 data: "SGVsbG8gV29ybGQ="
   *             }
   *         ]
   *     ) {
   *         addedEvidence
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  addEvidenceToTestRunStep?: Maybe<AddEvidenceResult>;
  /**
   * Mutation used to add issues to a Folder.
   * ===
   * The mutation below will add issues to a Folder.
   * <pre>
   * mutation {
   *     <b>addIssuesToFolder</b>(
   *         projectId: "10000",
   *         path: "/generic",
   *         issueIds: ["10002","12324","12345"]
   *     ) {
   *         folder {
   *             name
   *             path
   *             issuesCount
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  addIssuesToFolder?: Maybe<ActionFolderResult>;
  /**
   * Mutation used to associate Preconditions to the Test.
   * <b>Note</b>: The preconditions to be associated with the Test must be of the same Test Type of the Test.
   * ===
   * The mutation below will associate the precondition with issue id "54321" to the test "12345".
   * <pre>
   * mutation {
   *     <b>addPreconditionsToTest</b>(
   *         issueId: "12345",
   *         preconditionIssueIds: ["54321"]
   *     ) {
   *         addedPreconditions
   *         warning
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will associate the precondition with issue id "54321" to the version 3 of the Test "12345".
   * <pre>
   * mutation {
   *     <b>addPreconditionsToTest</b>(
   *         issueId: "12345",
   *         versionId: 3,
   *         preconditionIssueIds: ["54321"]
   *     ) {
   *         addedPreconditions
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addPreconditionsToTest?: Maybe<AddPreconditionsResult>;
  /**
   * Mutation used to add Test Environments to the Test Execution.
   * ===
   * The mutation below will add the test Environments "android" and "ios" to the Test execution "12345".
   * <pre>
   * mutation {
   *     <b>addTestEnvironmentsToTestExecution</b>(
   *         issueId: "12345",
   *         testEnvironments: ["android", "ios"]
   *     ) {
   *         associatedTestEnvironments
   *         createdTestEnvironments
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestEnvironmentsToTestExecution?: Maybe<AddTestEnvironmentsResult>;
  /**
   * Mutation used to associate Test Executions to the Test.
   * ===
   * The mutation below will associate the Test Execution with issue id "54321" to the Test "12345".
   * <pre>
   * mutation {
   *     <b>addTestExecutionsToTest</b>(
   *         issueId: "12345",
   *         testExecIssueIds: ["54321"]
   *     ) {
   *         addedTestExecutions
   *         warning
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will associate the Test Execution with issue id "54321" to version 3 of the Test "12345".
   * <pre>
   * mutation {
   *     <b>addTestExecutionsToTest</b>(
   *         issueId: "12345",
   *         versionId: 3,
   *         testExecIssueIds: ["54321"]
   *     ) {
   *         addedTestExecutions
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestExecutionsToTest?: Maybe<AddTestExecutionsResult>;
  /**
   * Mutation used to associate Test Executions to the Test Plan.
   * ===
   * The mutation below will associate the Test Execution with issue id "54321" to the test Plan "12345".
   * <pre>
   * mutation {
   *     <b>addTestExecutionsToTestPlan</b>(
   *         issueId: "12345",
   *         testExecIssueIds: ["54321"]
   *     ) {
   *         addedTestExecutions
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestExecutionsToTestPlan?: Maybe<AddTestExecutionsResult>;
  /**
   * Mutation used to associate Test Plans to the Test.
   * ===
   * The mutation below will associate the Test Plan with issue id "54321" to the test "12345".
   * <pre>
   * mutation {
   *     <b>addTestPlansToTest</b>(
   *         issueId: "12345",
   *         testPlanIssueIds: ["54321"]
   *     ) {
   *         addedTestPlans
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestPlansToTest?: Maybe<AddTestPlansResult>;
  /**
   * Mutation used to associate Test Sets to the Test.
   * ===
   * The mutation below will associate the test set with issue id "54321" to the test "12345".
   * <pre>
   * mutation {
   *     <b>addTestSetsToTest</b>(
   *         issueId: "12345",
   *         testSetIssueIds: ["54321"]
   *     ) {
   *         addedTestSets
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestSetsToTest?: Maybe<AddTestSetsResult>;
  /**
   * Mutation used to add a Step to a Test.
   * ===
   * The mutation below will add a new Step to the test with id "12345".
   * <pre>
   * mutation {
   *     <b>addTestStep</b>(
   *         issueId: "12345",
   *         step: {
   *             action: "Use Xray Cloud Rest Api to add a new Step to the Test",
   *             result: "Step was added to the Test",
   *             customFields: [{id:"5ddc0e585da9670010e608dc", value:"Tokyo"}]
   *         }
   *     ) {
   *         id
   *         action
   *         data
   *         result
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will add a new Step to the version 3 of the Test with id "12345".
   * <pre>
   * mutation {
   *     <b>addTestStep</b>(
   *         issueId: "12345",
   *         versionId: 3,
   *         step: {
   *             action: "Use Xray Cloud Rest Api to add a new Step to the Test",
   *             result: "Step was added to the Test",
   *             customFields: [{id:"5ddc0e585da9670010e608dc", value:"Tokyo"}]
   *         }
   *     ) {
   *         id
   *         action
   *         data
   *         result
   *     }
   * }
   * </pre>
   * ===
   */
  addTestStep?: Maybe<Step>;
  /**
   * Mutation used to add tests to a Folder.
   * ===
   * The mutation below will add tests to a Folder.
   * <pre>
   * mutation {
   *     <b>addTestsToFolder</b>(
   *         projectId: "10000",
   *         path: "/generic",
   *         testIssueIds: ["10002","12324","12345"]
   *     ) {
   *         folder {
   *             name
   *             path
   *             testsCount
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  addTestsToFolder?: Maybe<ActionFolderResult>;
  /**
   * Mutation used to associate Tests to the Precondition. One of <b>testIssueIds</b> or <b>tests</b> is required.
   * <b>Note</b>: The Tests to be associated with the Precondition must be of the same Test Type of the Precondition.
   * ===
   * The mutation below will associate the Test with issue id "54321" to the Precondition "12345"
   * <pre>
   * mutation {
   *     <b>addTestsToPrecondition</b>(
   *         issueId: "12345",
   *         testIssueIds: ["54321"]
   *     ) {
   *         addedTests
   *         warning
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will associate the version 2 of Test "54321" and the version 3 of Test "67890" to the Precondition "12345"
   * <pre>
   * mutation {
   *     <b>addTestsToPrecondition</b>(
   *         issueId: "12345",
   *         tests: [{ issueId: "54321", versionId: 2 }, { issueId: "67890", versionId: 3 }]
   *     ) {
   *         addedTests
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestsToPrecondition?: Maybe<AddTestsResult>;
  /**
   * Mutation used to associate Tests to the Test Execution. One of <b>testIssueIds</b> or <b>tests</b> is required.
   * ===
   * The mutation below will associate the test with issue id "54321" to the Test execution "12345".
   * <pre>
   * mutation {
   *     <b>addTestsToTestExecution</b>(
   *         issueId: "12345",
   *         testIssueIds: ["54321"]
   *     ) {
   *         addedTests
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestsToTestExecution?: Maybe<AddTestsResult>;
  /**
   * Mutation used to associate Tests to the Test Plan.
   * ===
   * The mutation below will associate the test with issue id "54321" to the Test Plan "12345".
   * <pre>
   * mutation {
   *     <b>addTestsToTestPlan</b>(
   *         issueId: "12345",
   *         testIssueIds: ["54321"]
   *     ) {
   *         addedTests
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestsToTestPlan?: Maybe<AddTestsResult>;
  /**
   * Mutation used to associate Tests to the Test Set.
   * ===
   * The mutation below will associate the test with issue id "54321" to the Test Set "12345".
   * <pre>
   * mutation {
   *     <b>addTestsToTestSet</b>(
   *         issueId: "12345",
   *         testIssueIds: ["54321"]
   *     ) {
   *         addedTests
   *         warning
   *     }
   * }
   * </pre>
   * ===
   */
  addTestsToTestSet?: Maybe<AddTestsResult>;
  /**
   * Mutation used to create a new Folder.
   * ===
   * The mutation below will create a new Folder.
   * <pre>
   * mutation {
   *     <b>createFolder</b>(
   *         projectId: "10000",
   *         path: "/generic"
   *     ) {
   *         folder {
   *             name
   *             path
   *             testsCount
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will create a new Folder and add tests to it.
   * <pre>
   * mutation {
   *     <b>createFolder</b>(
   *         projectId: "10000",
   *         path: "/generic",
   *         testIssueIds: ["10002","12324","12345"]
   *     ) {
   *         folder {
   *             name
   *             path
   *             testsCount
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will create a new Folder and add tests and/or preconditions to it.
   * <pre>
   * mutation {
   *     <b>createFolder</b>(
   *         projectId: "10000",
   *         path: "/generic",
   *         issueIds: ["10002","12324","12345"]
   *     ) {
   *         folder {
   *             name
   *             path
   *             testsCount
   *             issuesCount
   *             preconditionsCount
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * <b>Note</b>: Use createFolder with <b>testIssueIds</b> (in which all ids must be from Tests)
   * OR with <b>issueIds</b> (which can be eiter Test ids and/or Precondition ids), but not with both.
   * ===
   */
  createFolder?: Maybe<ActionFolderResult>;
  /**
   * Mutation used to create a new Precondition.
   * ===
   * The mutation below will create a new Precondition.
   * <pre>
   * mutation {
   *     <b>createPrecondition</b>(
   *         preconditionType: { name: "Generic" }
   *         definition: "Turn on calculator."
   *         jira: {
   *             fields: { summary:"Turn on calculator", project: {key: "CALC"} }
   *         }
   *     ) {
   *         precondition {
   *             issueId
   *             preconditionType {
   *                 name
   *             }
   *             definition
   *             jira(fields: ["key"])
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  createPrecondition?: Maybe<CreatePreconditionResult>;
  /**
   * Mutation used to create a new Test.
   * ===
   * The mutation below will create a new Test.
   * <pre>
   * mutation {
   *     <b>createTest</b>(
   *         testType: { name: "Generic" },
   *         unstructured: "Perform exploratory tests on calculator.",
   *         jira: {
   *             fields: { summary:"Exploratory Test", project: {key: "CALC"} }
   *         }
   *     ) {
   *         test {
   *             issueId
   *             testType {
   *                 name
   *             }
   *             unstructured
   *             jira(fields: ["key"])
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * === ===
   * The mutation below will create a new Test.
   * <pre>
   * mutation {
   *     <b>createTest</b>(
   *         testType: { name: "Manual" },
   *         steps: [
   *             {
   *                 action: "Create first example step",
   *                 result: "First step was created"
   *             },
   *             {
   *                 action: "Create second example step with data",
   *                 data: "Data for the step",
   *                 result: "Second step was created with data"
   *             }
   *         ],
   *         jira: {
   *             fields: { summary:"Exploratory Test", project: {key: "CALC"} }
   *         }
   *     ) {
   *         test {
   *             issueId
   *             testType {
   *                 name
   *             }
   *             steps {
   *                 action
   *                 data
   *                 result
   *             }
   *             jira(fields: ["key"])
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  createTest?: Maybe<CreateTestResult>;
  /**
   * Mutation used to create a new Test Execution.
   * ===
   * The mutation below will create a new Test Execution.
   * <pre>
   * mutation {
   *     <b>createTestExecution</b>(
   *         testIssueIds: ["54321"]
   *         testEnvironments: ["android"]
   *         jira: {
   *             fields: { summary: "Test Execution for CALC-123", project: {key: "CALC"} }
   *         }
   *     ) {
   *         testExecution {
   *             issueId
   *             jira(fields: ["key"])
   *         }
   *         warnings
   *         createdTestEnvironments
   *     }
   * }
   * </pre>
   * ===
   */
  createTestExecution?: Maybe<CreateTestExecutionResult>;
  /**
   * Mutation used to create a new Test Plan.
   * ===
   * The mutation below will create a new Test Plan.
   * <pre>
   * mutation {
   *     <b>createTestPlan</b>(
   *         testIssueIds: ["54321"]
   *         jira: {
   *             fields: { summary: "Test Plan for v1.0", project: {key: "CALC"} }
   *         }
   *     ) {
   *         testPlan {
   *             issueId
   *             jira(fields: ["key"])
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  createTestPlan?: Maybe<CreateTestPlanResult>;
  /**
   * Mutation used to create a new Test Set.
   * ===
   * The mutation below will create a new Test Set.
   * <pre>
   * mutation {
   *     <b>createTestSet</b>(
   *         testIssueIds: ["54321"]
   *         jira: {
   *             fields: { summary: "Test Set for Generic Tests", project: {key: "CALC"} }
   *         }
   *     ) {
   *         testSet {
   *             issueId
   *             jira(fields: ["key"])
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  createTestSet?: Maybe<CreateTestSetResult>;
  /**
   * Mutation used to delete a Folder.
   * ===
   * The mutation below will delete a Folder.
   * <pre>
   * mutation {
   *     <b>deleteFolder</b>(
   *         projectId: "10000",
   *         path: "/generic"
   *     )
   * }
   * </pre>
   * ===
   */
  deleteFolder?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to delete a Precondition
   * ===
   * The mutation below will delete the Precondition with issue id "12345"
   * <pre>
   * mutation {
   *     <b>deletePrecondition</b>(issueId: "12345")
   * }
   * </pre>
   * ===
   */
  deletePrecondition?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to delete a Test.
   * ===
   * The mutation below will delete the Test with issue id "12345".
   * <pre>
   * mutation {
   *     <b>deleteTest</b>(issueId: "12345")
   * }
   * </pre>
   * ===
   */
  deleteTest?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to delete a Test Execution.
   * ===
   * The mutation below will delete the Test Execution with id "12345".
   * <pre>
   * mutation {
   *     <b>deleteTestExecution</b>(issueId: "12345")
   * }
   * </pre>
   * ===
   */
  deleteTestExecution?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to delete a Test Plan.
   * ===
   * The mutation below will delete the Test Plan with id "12345".
   * <pre>
   * mutation {
   *     <b>deleteTestPlan</b>(issueId: "12345")
   * }
   * </pre>
   * ===
   */
  deleteTestPlan?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to delete a Test Set
   * ===
   * The mutation below will delete the Test Set with issue id "12345".
   * <pre>
   * mutation {
   *     <b>deleteTestSet</b>(issueId: "12345")
   * }
   * </pre>
   * ===
   */
  deleteTestSet?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to move a Folder.
   * ===
   * The mutation below will move a Folder.
   * <pre>
   * mutation {
   *     <b>moveFolder</b>(
   *         projectId: "10000",
   *         path: "/generic",
   *         destinationPath: "/testType"
   *     ) {
   *         folder {
   *             name
   *             path
   *             testsCount
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  moveFolder?: Maybe<ActionFolderResult>;
  /**
   * Mutation used to remove all Steps from a Test.
   * ===
   * The mutation below removes all the Steps from test with id "12345".
   * <pre>
   * mutation {
   *     <b>removeAllTestSteps</b>(
   *         issueId: "12345",
   *     )
   * }
   * </pre>
   * ===
   * ===
   * The mutation below removes all the Steps from the version 3 of the Test with id "12345".
   * <pre>
   * mutation {
   *     <b>removeAllTestSteps</b>(
   *         issueId: "12345",
   *         versionId: 3
   *     )
   * }
   * </pre>
   * ===
   */
  removeAllTestSteps?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove defects from a Test Run.
   * ===
   * The mutation below removes 2 defects from the Test Run.
   * <pre>
   * mutation {
   *     <b>removeDefectsFromTestRun</b>( id: "5acc7ab0a3fe1b6fcdc3c737", issues: ["XRAY-1234", "12345"])
   * }
   * </pre>
   * ===
   */
  removeDefectsFromTestRun?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove defects from a Test Run.
   * ===
   * The mutation below removes 2 defects from the Test Run.
   * <pre>
   * mutation {
   *     <b>removeDefectsFromTestRunStep</b>(
   *         testRunId: "5e8489c05f200f3cd45bbaf0",
   *         stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
   *         issues: ["XRAY-1234", "12345"]
   *     ) {
   *         removedDefects
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  removeDefectsFromTestRunStep?: Maybe<RemoveDefectsResult>;
  /**
   * Mutation used to remove evidence from a Test Run.
   * ===
   * The mutation below removes an evidence from the Test Run.
   * <pre>
   * mutation {
   *     <b>removeEvidenceFromTestRun</b>(
   *         id: "5acc7ab0a3fe1b6fcdc3c737",
   *         evidenceFilenames: ["evidence.txt"]
   *     ) {
   *         removedEvidence
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  removeEvidenceFromTestRun?: Maybe<RemoveEvidenceResult>;
  /**
   * Mutation used to remove evidence from a Test Run Step.
   * ===
   * The mutation below removes an evidence from the Test Run Step.
   * <pre>
   * mutation {
   *     <b>removeEvidenceFromTestRunStep</b>(
   *         testRunId: "5e8489c05f200f3cd45bbaf0",
   *         stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
   *         evidenceFilenames: ["evidence.txt"]
   *     ) {
   *         removedEvidence
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  removeEvidenceFromTestRunStep?: Maybe<RemoveEvidenceResult>;
  /**
   * Mutation used to remove issues from Folder.
   * ===
   * The mutation below will remove issues from a Folder.
   * <pre>
   * mutation {
   *     <b>removeIssuesFromFolder</b>(
   *         projectId: "10000",
   *         issueIds: ["10002","12324","12345"]
   *     )
   * }
   * </pre>
   * ===
   */
  removeIssuesFromFolder?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Preconditions from the Test.
   * ===
   * The mutation below will remove the preconditions with issue id "54321" and "67890" from the test "12345".
   * <pre>
   * mutation {
   *     <b>removePreconditionsFromTest</b>(issueId: "12345", preconditionIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will remove the preconditions with issue id "54321" and "67890" from the version 3 of the Test "12345".
   * <pre>
   * mutation {
   *     <b>removePreconditionsFromTest</b>(issueId: "12345", versionId: 3, preconditionIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   */
  removePreconditionsFromTest?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Test Environments from the Test Execution.
   * ===
   * The mutation below will remoive the Test Environments "android" and "ios" from the Test execution "12345".
   * <pre>
   * mutation {
   *     <b>removeTestEnvironmentsFromTestExecution</b>(
   *         issueId: "12345",
   *         testEnvironments: ["android", "ios"]
   *     )
   * }
   * </pre>
   * ===
   */
  removeTestEnvironmentsFromTestExecution?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Test Executions from the Test.
   * ===
   * The mutation below will remove the Test Executions with issue id "54321" and "67890" from the Test "12345".
   * <pre>
   * mutation {
   *     <b>removeTestExecutionsFromTest</b>(issueId: "12345", testExecIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   */
  removeTestExecutionsFromTest?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Test Executions from the Test Plan.
   * ===
   * The mutation below will remove the Test executions with issue id "54321" and "67890" from the Test Plan "12345".
   * <pre>
   * mutation {
   *     <b>removeTestExecutionsFromTestPlan</b>(issueId: "12345", testExecIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   */
  removeTestExecutionsFromTestPlan?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Test Plans from the Test.
   * ===
   * The mutation below will remove the Test Plans with issue id "54321" and "67890" from the Test "12345".
   * <pre>
   * mutation {
   *     <b>removeTestPlansFromTest</b>(issueId: "12345", testPlanIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   */
  removeTestPlansFromTest?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Test Sets from the Test.
   * ===
   * The mutation below will remove the Test Sets with issue id "54321" and "67890" from the test "12345".
   * <pre>
   * mutation {
   *     <b>removeTestSetsFromTest</b>(issueId: "12345", testSetIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   */
  removeTestSetsFromTest?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove a Step from a Test.
   * ===
   * The mutation below removes the Step with id "836d30ec-f034-4a03-879e-9c44a1d6d1fe".
   * <pre>
   * mutation {
   *     <b>removeTestStep</b>(
   *         stepId: "836d30ec-f034-4a03-879e-9c44a1d6d1fe",
   *     )
   * }
   * </pre>
   * ===
   */
  removeTestStep?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove tests from Folder.
   * ===
   * The mutation below will remove tests from a Folder.
   * <pre>
   * mutation {
   *     <b>removeTestsFromFolder</b>(
   *         projectId: "10000",
   *         testIssueIds: ["10002","12324","12345"]
   *     )
   * }
   * </pre>
   * ===
   */
  removeTestsFromFolder?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Tests from the Precondition. One of <b>testIssueIds</b> or <b>tests</b> is required.
   * ===
   * The mutation below will remove the Tests with issue id "54321" and "67890" from the Precondition "12345".
   * <pre>
   * mutation {
   *     <b>removeTestsFromPrecondition</b>(issueId: "12345", testIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will remove the version 2 of Test "54321" and the version 3 of Test "67890" from the Precondition "12345".
   * <pre>
   * mutation {
   *     <b>removeTestsFromPrecondition</b>(
   *         issueId: "12345",
   *         tests: [{ issueId: "54321", versionId: 2 }, { issueId: "67890", versionId: 3 }]
   *     )
   * }
   * </pre>
   * ===
   */
  removeTestsFromPrecondition?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Tests from the Test Execution.
   * ===
   * The mutation below will remove the Tests with issue id "54321" and "67890" from the Test Execution "12345".
   * <pre>
   * mutation {
   *     <b>removeTestsFromTestExecution</b>(issueId: "12345", testIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   */
  removeTestsFromTestExecution?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Tests from the Test Plan.
   * ===
   * The mutation below will remove the Tests with id "54321" and "67890" from the Test Plan "12345".
   * <pre>
   * mutation {
   *     <b>removeTestsFromTestPlan</b>(issueId: "12345", testIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   */
  removeTestsFromTestPlan?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to remove Tests from the Test Set.
   * ===
   * The mutation below will remove the Tests with issue id "54321" and "67890" from the test set "12345".
   * <pre>
   * mutation {
   *     <b>removeTestsFromTestSet</b>(issueId: "12345", testIssueIds: ["54321", "67890"])
   * }
   * </pre>
   * ===
   */
  removeTestsFromTestSet?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to rename a Folder.
   * ===
   * The mutation below will rename a Folder.
   * <pre>
   * mutation {
   *     <b>renameFolder</b>(
   *         projectId: "10000",
   *         path: "/generic",
   *         newName: "Junit"
   *     ) {
   *         folder {
   *             name
   *             path
   *             testsCount
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  renameFolder?: Maybe<ActionFolderResult>;
  /**
   * Mutation used to reset the Test Run. This will load the new test definition and delete the current execution data.
   * ===
   * The mutation below resets the Test Run.
   * <pre>
   * mutation {
   *     <b>resetTestRun</b>( id: "5acc7ab0a3fe1b6fcdc3c737")
   * }
   * </pre>
   * ===
   */
  resetTestRun?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to set the timer in Test Run. This will start, pause or stop the timer in Test Run.
   * ===
   * The mutation below start the timer in Test Run.
   * <pre>
   * mutation {
   *     <b>setTestRunTimer</b>(
   *         testRunId: "5acc7ab0a3fe1b6fcdc3c737"
   *         running: true
   *     ) {
   *         warnings
   *     }
   * }
   * </pre>
   *
   * The mutation below stop the timer in Test Run.
   * <pre>
   * mutation {
   *     <b>setTestRunTimer</b>(
   *         testRunId: "5acc7ab0a3fe1b6fcdc3c737"
   *         reset: true
   *     ) {
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  setTestRunTimer?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to update the Gherkin definition of a Test.
   * ===
   * The mutation below will update the gherkin definition of the Test with id "12345".
   * <pre>
   * mutation {
   *     <b>updateGherkinTestDefinition</b>(issueId: "12345", gherkin: "Gherkin definition" ) {
   *         issueId
   *         gherkin
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will update the gherkin definition of the version 3 of the Test with id "12345".
   * <pre>
   * mutation {
   *     <b>updateGherkinTestDefinition</b>(issueId: "12345", versionId: 3, gherkin: "Gherkin definition" ) {
   *         issueId
   *         gherkin
   *     }
   * }
   * </pre>
   * ===
   */
  updateGherkinTestDefinition?: Maybe<Test>;
  /**
   * Mutation used to update the status of a Test Run iteration.
   * ===
   * The mutation below updates the status of a Test Run iteration.
   * <pre>
   * mutation {
   *     <b>updateIterationStatus</b>(
   *         testRunId: "5e8489c05f200f3cd45bbaf0",
   *         iterationRank: "0",
   *         status: "PASSED"
   *     ) {
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  updateIterationStatus?: Maybe<UpdateIterationStatusResult>;
  /**
   * Mutation used to update a Precondition
   * ===
   * The mutation below will update the Precondition with id "49137"
   * <pre>
   * mutation {
   *     <b>updatePrecondition</b>(
   *         issueId: "49137",
   *         data: { preconditionType: {name: "Manual" }, definition: "Turn on calculator" }
   *     ) {
   *         issueId
   *         preconditionType {
   *             kind
   *             name
   *         }
   *         definition
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will update the Precondition with id "12345" and move it to the specified folder
   * <pre>
   * mutation {
   *     <b>updatePrecondition</b>(
   *         issueId: "12345",
   *         data: { folderPath: "/generic" }
   *     ) {
   *         issueId
   *         preconditionType {
   *             kind
   *             name
   *         }
   *         definition
   *     }
   * }
   * </pre>
   * ===
   */
  updatePrecondition?: Maybe<Precondition>;
  /**
   * Mutation used update the precondition folder on the Test Repository.
   * ===
   * The mutation below will add the precondition to "Component/UI" folder.
   * <pre>
   * mutation {
   *     <b>updatePreconditionFolder</b>(
   *         issueId: "12345",
   *         folderPath: "/Component/UI"
   *     )
   * }
   * </pre>
   * The mutation below will move the Precondition to the root.
   * <pre>
   * mutation {
   *     <b>updatePreconditionFolder</b>(
   *         issueId: "12345",
   *         folderPath: "/"
   *     )
   * }
   * </pre>
   * ===
   */
  updatePreconditionFolder?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used update the Test folder on the Test Repository.
   * ===
   * The mutation below will add the test to "Component/UI" folder.
   * <pre>
   * mutation {
   *     <b>updateTestFolder</b>(
   *         issueId: "12345",
   *         folderPath: "/Component/UI"
   *     )
   * }
   * </pre>
   * The mutation below will move the Test to the root.
   * <pre>
   * mutation {
   *     <b>updateTestFolder</b>(
   *         issueId: "12345",
   *         folderPath: "/"
   *     )
   * }
   * </pre>
   * ===
   */
  updateTestFolder?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to update a Test Run.
   * ===
   * The mutation below updates a Test Run.
   * <pre>
   * mutation {
   *     <b>updateTestRun</b>( id: "5acc7ab0a3fe1b6fcdc3c737", comment: "Everything is OK.", startedOn: "2020-03-09T10:35:09Z", finishedOn: "2020-04-09T10:35:09Z", assigneeId: "e5983db2-90f7-4135-a96f-46907e72290e", executedById: "e5983db2-90f7-4135-a96f-46907e72290e") {
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  updateTestRun?: Maybe<UpdateTestRunResult>;
  /**
   * Mutation used to update the comment of a Test Run.
   * ===
   * The mutation below updates the comment of a Test Run.
   * <pre>
   * mutation {
   *     <b>updateTestRunComment</b>( id: "5acc7ab0a3fe1b6fcdc3c737", comment: "Everything is OK.")
   * }
   * </pre>
   * ===
   */
  updateTestRunComment?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to update the status of a Test Run Example.
   * ===
   * The mutation below updates the status of a Test Run example.
   * <pre>
   * mutation {
   *     <b>updateTestRunExampleStatus</b>(
   *         exampleId: "5bbd8ab0a3fe1b6fcdc3c737",
   *         status: "PASSED"
   *     ) {
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  updateTestRunExampleStatus?: Maybe<UpdateTestRunExampleStatusResult>;
  /**
   * Mutation used to update the status of a Test Run.
   * ===
   * The mutation below updates the status of a Test Run.
   * <pre>
   * mutation {
   *     <b>updateTestRunStatus</b>( id: "5acc7ab0a3fe1b6fcdc3c737", status: "PASSED")
   * }
   * </pre>
   * ===
   */
  updateTestRunStatus?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to update the Test Run Step.
   * ===
   * The mutation below will change the status, update the comment and add a defect to the Test Run Step.
   * <pre>
   * mutation {
   *     <b>updateTestRunStep</b>(
   *         testRunId: "5e8489c05f200f3cd45bbaf0",
   *         stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
   *         updateData: {
   *             comment: "Step failed"
   *             status: "FAILED"
   *             defects: {
   *                 add: ["12345"]
   *             }
   *         }
   *     ) {
   *         addedDefects
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  updateTestRunStep?: Maybe<UpdateTestRunStepResult>;
  /**
   * Mutation used to update the comment of a Test Run Step.
   * ===
   * The mutation below updates the comment of a Test Run Step.
   * <pre>
   * mutation {
   *     <b>updateTestRunStepComment</b>(
   *         testRunId: "5e8489c05f200f3cd45bbaf0",
   *         stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
   *         comment: "This step is OK."
   *     )
   * }
   * </pre>
   * ===
   */
  updateTestRunStepComment?: Maybe<Scalars['String']['output']>;
  /**
   * Mutation used to update the status of a Test Run Step.
   * ===
   * The mutation below updates the status of a Test Run Step.
   * <pre>
   * mutation {
   *     <b>updateTestRunStepStatus</b>(
   *         testRunId: "5e8489c05f200f3cd45bbaf0",
   *         stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
   *         status: "PASSED"
   *     ) {
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  updateTestRunStepStatus?: Maybe<UpdateTestRunStepStatusResult>;
  /**
   * Mutation used to update a Step of a Test.
   * ===
   * The mutation below will update the Step with id "836d30ec-f034-4a03-879e-9c44a1d6d1fe".
   * <pre>
   * mutation {
   *     <b>updateTestStep</b>(
   *         stepId: "836d30ec-f034-4a03-879e-9c44a1d6d1fe",
   *         step: {
   *             result: "Xray Cloud Rest Api works as expected",
   *             customFields: [{id:"5ddc0e585da9670010e608dc", value:"Lisbon"}]
   *         }
   *     ) {
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  updateTestStep?: Maybe<UpdateTestStepResult>;
  /**
   * Mutation used to update the Test Type of a Test.
   * ===
   * The mutation below will update the Test Type of the Test with id "12345".
   * <pre>
   * mutation {
   *     <b>updateTestType</b>(issueId: "12345", testType: {name: "Manual"} ) {
   *         issueId
   *         testType {
   *             name
   *             kind
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will update the Test Type of the version 3 of the Test with id "12345".
   * <pre>
   * mutation {
   *     <b>updateTestType</b>(issueId: "12345", versionId: 3, testType: {name: "Manual"} ) {
   *         issueId
   *         testType {
   *             name
   *             kind
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  updateTestType?: Maybe<Test>;
  /**
   * Mutation used to update the Unstructured definition of a Test.
   * ===
   * The mutation below will update the unstructured definition of the Test with id "12345".
   * <pre>
   * mutation {
   *     <b>updateUnstructuredTestDefinition</b>(issueId: "12345", unstructured: "Generic definition" ) {
   *         issueId
   *         unstructured
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The mutation below will update the unstructured definition of the version 3 of the Test with id "12345".
   * <pre>
   * mutation {
   *     <b>updateUnstructuredTestDefinition</b>(issueId: "12345", versionId: 3, unstructured: "Generic definition" ) {
   *         issueId
   *         unstructured
   *     }
   * }
   * </pre>
   * ===
   */
  updateUnstructuredTestDefinition?: Maybe<Test>;
};


export type MutationAddDefectsToTestRunArgs = {
  id: Scalars['String']['input'];
  issues: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddDefectsToTestRunStepArgs = {
  issues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  iterationRank?: InputMaybe<Scalars['String']['input']>;
  stepId: Scalars['String']['input'];
  testRunId: Scalars['String']['input'];
};


export type MutationAddEvidenceToTestRunArgs = {
  evidence: Array<InputMaybe<AttachmentDataInput>>;
  id: Scalars['String']['input'];
};


export type MutationAddEvidenceToTestRunStepArgs = {
  evidence?: InputMaybe<Array<InputMaybe<AttachmentDataInput>>>;
  iterationRank?: InputMaybe<Scalars['String']['input']>;
  stepId: Scalars['String']['input'];
  testRunId: Scalars['String']['input'];
};


export type MutationAddIssuesToFolderArgs = {
  index?: InputMaybe<Scalars['Int']['input']>;
  issueIds: Array<InputMaybe<Scalars['String']['input']>>;
  path: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};


export type MutationAddPreconditionsToTestArgs = {
  issueId: Scalars['String']['input'];
  preconditionIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
  versionId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddTestEnvironmentsToTestExecutionArgs = {
  issueId: Scalars['String']['input'];
  testEnvironments: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddTestExecutionsToTestArgs = {
  issueId: Scalars['String']['input'];
  testExecIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
  versionId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddTestExecutionsToTestPlanArgs = {
  issueId: Scalars['String']['input'];
  testExecIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddTestPlansToTestArgs = {
  issueId: Scalars['String']['input'];
  testPlanIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddTestSetsToTestArgs = {
  issueId: Scalars['String']['input'];
  testSetIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddTestStepArgs = {
  issueId: Scalars['String']['input'];
  step: CreateStepInput;
  versionId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAddTestsToFolderArgs = {
  index?: InputMaybe<Scalars['Int']['input']>;
  path: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  testIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
  testPlanId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddTestsToPreconditionArgs = {
  issueId: Scalars['String']['input'];
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tests?: InputMaybe<Array<InputMaybe<TestWithVersionInput>>>;
};


export type MutationAddTestsToTestExecutionArgs = {
  issueId: Scalars['String']['input'];
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tests?: InputMaybe<Array<InputMaybe<TestWithVersionInput>>>;
};


export type MutationAddTestsToTestPlanArgs = {
  issueId: Scalars['String']['input'];
  testIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddTestsToTestSetArgs = {
  issueId: Scalars['String']['input'];
  testIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationCreateFolderArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  testPlanId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreatePreconditionArgs = {
  definition?: InputMaybe<Scalars['String']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  jira: Scalars['JSON']['input'];
  preconditionType?: InputMaybe<UpdatePreconditionTypeInput>;
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tests?: InputMaybe<Array<InputMaybe<TestWithVersionInput>>>;
};


export type MutationCreateTestArgs = {
  folderPath?: InputMaybe<Scalars['String']['input']>;
  gherkin?: InputMaybe<Scalars['String']['input']>;
  jira: Scalars['JSON']['input'];
  preconditionIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  steps?: InputMaybe<Array<InputMaybe<CreateStepInput>>>;
  testType?: InputMaybe<UpdateTestTypeInput>;
  unstructured?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateTestExecutionArgs = {
  jira: Scalars['JSON']['input'];
  testEnvironments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tests?: InputMaybe<Array<InputMaybe<TestWithVersionInput>>>;
};


export type MutationCreateTestPlanArgs = {
  jira: Scalars['JSON']['input'];
  savedFilter?: InputMaybe<Scalars['String']['input']>;
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreateTestSetArgs = {
  jira: Scalars['JSON']['input'];
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationDeleteFolderArgs = {
  path: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  testPlanId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeletePreconditionArgs = {
  issueId: Scalars['String']['input'];
};


export type MutationDeleteTestArgs = {
  issueId: Scalars['String']['input'];
};


export type MutationDeleteTestExecutionArgs = {
  issueId: Scalars['String']['input'];
};


export type MutationDeleteTestPlanArgs = {
  issueId: Scalars['String']['input'];
};


export type MutationDeleteTestSetArgs = {
  issueId: Scalars['String']['input'];
};


export type MutationMoveFolderArgs = {
  destinationPath: Scalars['String']['input'];
  index?: InputMaybe<Scalars['Int']['input']>;
  path: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  testPlanId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveAllTestStepsArgs = {
  issueId: Scalars['String']['input'];
  versionId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationRemoveDefectsFromTestRunArgs = {
  id: Scalars['String']['input'];
  issues: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRemoveDefectsFromTestRunStepArgs = {
  issues: Array<InputMaybe<Scalars['String']['input']>>;
  iterationRank?: InputMaybe<Scalars['String']['input']>;
  stepId: Scalars['String']['input'];
  testRunId: Scalars['String']['input'];
};


export type MutationRemoveEvidenceFromTestRunArgs = {
  evidenceFilenames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  evidenceIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id: Scalars['String']['input'];
};


export type MutationRemoveEvidenceFromTestRunStepArgs = {
  evidenceFilenames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  evidenceIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  iterationRank?: InputMaybe<Scalars['String']['input']>;
  stepId: Scalars['String']['input'];
  testRunId: Scalars['String']['input'];
};


export type MutationRemoveIssuesFromFolderArgs = {
  issueIds: Array<InputMaybe<Scalars['String']['input']>>;
  projectId: Scalars['String']['input'];
};


export type MutationRemovePreconditionsFromTestArgs = {
  issueId: Scalars['String']['input'];
  preconditionIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
  versionId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationRemoveTestEnvironmentsFromTestExecutionArgs = {
  issueId: Scalars['String']['input'];
  testEnvironments: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRemoveTestExecutionsFromTestArgs = {
  issueId: Scalars['String']['input'];
  testExecIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRemoveTestExecutionsFromTestPlanArgs = {
  issueId: Scalars['String']['input'];
  testExecIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRemoveTestPlansFromTestArgs = {
  issueId: Scalars['String']['input'];
  testPlanIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRemoveTestSetsFromTestArgs = {
  issueId: Scalars['String']['input'];
  testSetIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRemoveTestStepArgs = {
  stepId: Scalars['String']['input'];
};


export type MutationRemoveTestsFromFolderArgs = {
  projectId?: InputMaybe<Scalars['String']['input']>;
  testIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
  testPlanId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveTestsFromPreconditionArgs = {
  issueId: Scalars['String']['input'];
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tests?: InputMaybe<Array<InputMaybe<TestWithVersionInput>>>;
};


export type MutationRemoveTestsFromTestExecutionArgs = {
  issueId: Scalars['String']['input'];
  testIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRemoveTestsFromTestPlanArgs = {
  issueId: Scalars['String']['input'];
  testIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRemoveTestsFromTestSetArgs = {
  issueId: Scalars['String']['input'];
  testIssueIds: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationRenameFolderArgs = {
  newName: Scalars['String']['input'];
  path: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  testPlanId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResetTestRunArgs = {
  id: Scalars['String']['input'];
};


export type MutationSetTestRunTimerArgs = {
  reset?: InputMaybe<Scalars['Boolean']['input']>;
  running?: InputMaybe<Scalars['Boolean']['input']>;
  testRunId: Scalars['String']['input'];
};


export type MutationUpdateGherkinTestDefinitionArgs = {
  gherkin: Scalars['String']['input'];
  issueId: Scalars['String']['input'];
  versionId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateIterationStatusArgs = {
  iterationRank: Scalars['String']['input'];
  status: Scalars['String']['input'];
  testRunId: Scalars['String']['input'];
};


export type MutationUpdatePreconditionArgs = {
  data?: InputMaybe<UpdatePreconditionInput>;
  issueId: Scalars['String']['input'];
};


export type MutationUpdatePreconditionFolderArgs = {
  folderPath: Scalars['String']['input'];
  issueId: Scalars['String']['input'];
};


export type MutationUpdateTestFolderArgs = {
  folderPath: Scalars['String']['input'];
  issueId: Scalars['String']['input'];
};


export type MutationUpdateTestRunArgs = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  customFields?: InputMaybe<Array<InputMaybe<CustomFieldInput>>>;
  executedById?: InputMaybe<Scalars['String']['input']>;
  finishedOn?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  startedOn?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTestRunCommentArgs = {
  comment: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationUpdateTestRunExampleStatusArgs = {
  exampleId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateTestRunStatusArgs = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateTestRunStepArgs = {
  iterationRank?: InputMaybe<Scalars['String']['input']>;
  stepId: Scalars['String']['input'];
  testRunId: Scalars['String']['input'];
  updateData: UpdateTestRunStepInput;
};


export type MutationUpdateTestRunStepCommentArgs = {
  comment: Scalars['String']['input'];
  iterationRank?: InputMaybe<Scalars['String']['input']>;
  stepId: Scalars['String']['input'];
  testRunId: Scalars['String']['input'];
};


export type MutationUpdateTestRunStepStatusArgs = {
  iterationRank?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  stepId: Scalars['String']['input'];
  testRunId: Scalars['String']['input'];
};


export type MutationUpdateTestStepArgs = {
  step: UpdateStepInput;
  stepId: Scalars['String']['input'];
};


export type MutationUpdateTestTypeArgs = {
  issueId: Scalars['String']['input'];
  testType: UpdateTestTypeInput;
  versionId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateUnstructuredTestDefinitionArgs = {
  issueId: Scalars['String']['input'];
  unstructured: Scalars['String']['input'];
  versionId?: InputMaybe<Scalars['Int']['input']>;
};

/** Precondition issue type */
export type Precondition = {
  __typename?: 'Precondition';
  /** Definition of the Precondition issue. */
  definition?: Maybe<Scalars['String']['output']>;
  /** Test Repository folder of the Precondition. */
  folder?: Maybe<Folder>;
  /** List of Xray History results for the issue */
  history?: Maybe<XrayHistoryResults>;
  /** Id of the Precondition issue. */
  issueId?: Maybe<Scalars['String']['output']>;
  /** Extra Jira information of the Precondition Issue. */
  jira?: Maybe<Scalars['JSON']['output']>;
  /** Date when the precondition was last modified. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** Precondition Type of the Precondition issue. */
  preconditionType?: Maybe<TestType>;
  /** Project id of the Precondition issue. */
  projectId?: Maybe<Scalars['String']['output']>;
  /** List of the Test versions associated with the Precondition issue. */
  testVersions?: Maybe<TestVersionResults>;
  /** List of the Tests associated with the Precondition issue. */
  tests?: Maybe<TestResults>;
};


/** Precondition issue type */
export type PreconditionHistoryArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Precondition issue type */
export type PreconditionJiraArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Precondition issue type */
export type PreconditionTestVersionsArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
  testTypeId?: InputMaybe<Scalars['String']['input']>;
};


/** Precondition issue type */
export type PreconditionTestsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};

/** Folder Search input */
export type PreconditionFolderSearchInput = {
  /** Whether descendant folders should be included in the search. */
  includeDescendants?: InputMaybe<Scalars['Boolean']['input']>;
  /** Path of the Folder. */
  path: Scalars['String']['input'];
};

/** Precondition Results type */
export type PreconditionResults = {
  __typename?: 'PreconditionResults';
  /** Maximum amount of Preconditions to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Precondition issue results. */
  results?: Maybe<Array<Maybe<Precondition>>>;
  /** Index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of issues. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Project Settings type */
export type ProjectSettings = {
  __typename?: 'ProjectSettings';
  /** Defect Issue Types. */
  defectIssueTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Project id. */
  projectId?: Maybe<Scalars['String']['output']>;
  /** Test Coverage Settings. */
  testCoverageSettings?: Maybe<ProjectSettingsTestCoverage>;
  /** Test Environments. */
  testEnvironments?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Test Run Custom Fields Settings. */
  testRunCustomFieldSettings?: Maybe<ProjectSettingsTestRunCustomFields>;
  /** Test Step Settings. */
  testStepSettings?: Maybe<ProjectSettingsTestStepSettings>;
  /** Test Type Settings. */
  testTypeSettings?: Maybe<ProjectSettingsTestType>;
};

/** Project Test Coverage Settings type */
export type ProjectSettingsTestCoverage = {
  __typename?: 'ProjectSettingsTestCoverage';
  /** Coverable issue type ids */
  coverableIssueTypeIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Epic - Issues(Stories) relation */
  epicIssuesRelation?: Maybe<Scalars['Boolean']['output']>;
  /** Issue Link Type Direction */
  issueLinkTypeDirection?: Maybe<Scalars['String']['output']>;
  /** Issue Link Type Id */
  issueLinkTypeId?: Maybe<Scalars['String']['output']>;
  /** Issue - Sub-tasks relation */
  issueSubTasksRelation?: Maybe<Scalars['Boolean']['output']>;
};

/** Project Test Run Custom Field Settings type */
export type ProjectSettingsTestRunCustomField = {
  __typename?: 'ProjectSettingsTestRunCustomField';
  /** Id */
  id?: Maybe<Scalars['String']['output']>;
  /** Name */
  name?: Maybe<Scalars['String']['output']>;
  /** Is the field required */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Type */
  type?: Maybe<Scalars['String']['output']>;
  /** Values */
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Project Test Run Custom Field Field Settings type */
export type ProjectSettingsTestRunCustomFields = {
  __typename?: 'ProjectSettingsTestRunCustomFields';
  /** Fields */
  fields?: Maybe<Array<Maybe<ProjectSettingsTestRunCustomField>>>;
};

/** Project Test Step Field Settings type */
export type ProjectSettingsTestStepField = {
  __typename?: 'ProjectSettingsTestStepField';
  /** Is the field disabled */
  disabled?: Maybe<Scalars['Boolean']['output']>;
  /** Id */
  id?: Maybe<Scalars['String']['output']>;
  /** Name */
  name?: Maybe<Scalars['String']['output']>;
  /** Is the field required */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Type */
  type?: Maybe<Scalars['String']['output']>;
  /** Values */
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Project Test Step Settings type */
export type ProjectSettingsTestStepSettings = {
  __typename?: 'ProjectSettingsTestStepSettings';
  /** Fields */
  fields?: Maybe<Array<Maybe<ProjectSettingsTestStepField>>>;
};

/** Project Test Type Settings type */
export type ProjectSettingsTestType = {
  __typename?: 'ProjectSettingsTestType';
  /** Default Test Type Id */
  defaultTestTypeId?: Maybe<Scalars['String']['output']>;
  /** Test Types */
  testTypes?: Maybe<Array<Maybe<TestType>>>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Returns a Coverable Issue by issueId.
   * ===
   * The query below returns a Coverable Issue.
   * <pre>
   * {
   *     <b>getCoverableIssue</b> {
   *         issueId
   *         jira(fields: ["assignee", "reporter"])
   *         status {
   *             name
   *             description
   *             color
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The query below returns the Coverable Issue with issue id **12345**.
   * <pre>
   * {
   *     <b>getCoverableIssue</b>(issueId: "12345") {
   *         issueId
   *     }
   * }
   * </pre>
   * ===
   */
  getCoverableIssue?: Maybe<CoverableIssue>;
  /**
   * Returns multiple coverable issues by jql or issue ids.
   * ===
   * The query below returns 10 coverable issues that match the provided jql.
   * <pre>
   * {
   *     <b>getCoverableIssues</b>(limit: 10) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             jira(fields: ["assignee", "reporter"])
   *             status {
   *                 name
   *                 description
   *                 color
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getCoverableIssues?: Maybe<CoverableIssueResults>;
  /**
   * Returns a test (with the call test steps expanded) by issue id and version id.
   * ===
   * The query below returns the test version 2 of the test with the id "12345".
   * <pre>
   * {
   *     <b>getExpandedTest</b>(issueId: "12345", testVersionId: "2") {
   *         issueId
   *         testType {
   *             name
   *             kind
   *         }
   *         steps {
   *             parentTestIssueId
   *             calledTestIssueId
   *             id
   *             data
   *             action
   *             result
   *             attachments {
   *                 id
   *                 filename
   *             }
   *         }
   *         warnings
   *     }
   * }
   * </pre>
   * ===
   */
  getExpandedTest?: Maybe<ExpandedTest>;
  /**
   * Returns multiple tests (with the call test steps expanded) by jql, issue ids, project id or test type.
   * ===
   * The query below returns the first 100 tests.
   * <pre>
   * {
   *     <b>getExpandedTests</b>(limit: 100) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             testType {
   *                 name
   *                 kind
   *             }
   *             jira(fields: ["assignee", "reporter"])
   *             warnings
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The query below returns 10 tests that match the provided jql.
   * <pre>
   * {
   *     <b>getExpandedTests</b>(jql: "project = 'PC'", limit: 10) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             testType {
   *                 name
   *                 kind
   *             }
   *             steps {
   *                 parentTestIssueId
   *                 calledTestIssueId
   *                 id
   *                 data
   *                 action
   *                 result
   *                 attachments {
   *                     id
   *                     filename
   *                 }
   *                 customfields {
   *                     id
   *                     value
   *                 }
   *             }
   *             jira(fields: ["assignee", "reporter"])
   *             warnings
   *         }
   *     }
   * }
   * </pre>
   * <b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
   * ===
   * ===
   * The query below returns the tests of each test version.
   * <pre>
   * {
   *     <b>getExpandedTests</b>(tests:[{ issueId:"12345", testVersionId: "1" }, { issueId:"54321", testVersionId: "2" }]) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             testType {
   *                 name
   *                 kind
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getExpandedTests?: Maybe<ExpandedTestResults>;
  /**
   * Returns the folder for the given projectId with the specified Path along with its child folders.
   * ===
   * The query below returns the root folder and all its child folders.
   * <pre>
   * {
   *     <b>getFolder</b>(projectId: "10000", path: "/") {
   *         name
   *         path
   *         testsCount
   *         folders
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The query below returns the folder with path "/generic" and all its child folders.
   * <pre>
   * {
   *     <b>getFolder</b>(projectId: "10000", path: "/generic") {
   *         name
   *         path
   *         testsCount
   *         folders
   *     }
   * }
   * </pre>
   * ===
   */
  getFolder?: Maybe<FolderResults>;
  /**
   * Returns the Issue Link Types
   * ===
   * The Query below returns all Issue Link Types
   * <pre>
   * {
   *     <b>getIssueLinkTypes</b> {
   *         issueLinks {
   *             id
   *             name
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getIssueLinkTypes?: Maybe<Array<Maybe<IssueLinkType>>>;
  /**
   * Returns a Precondition by issue id.
   * ===
   * The Query below returns a Precondition.
   * <pre>
   * {
   *     <b>getPrecondition</b> {
   *         issueId
   *         preconditionType {
   *             kind
   *             name
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The Query below returns the Precondition with issue id **12345**
   * <pre>
   * {
   *     <b>getPrecondition</b>(issueId: "12345") {
   *         issueId
   *         definition
   *         jira(fields: ["assignee", "reporter"])
   *     }
   * }
   * </pre>
   * ===
   */
  getPrecondition?: Maybe<Precondition>;
  /**
   * Returns multiple Preconditions by jql, issueIds, projectId or Precondition Type.
   * ===
   * The Query below returns the first 100 Preconditions.
   * <pre>
   * {
   *     <b>getPreconditions</b>(limit: 100) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             preconditionType {
   *                 name
   *                 kind
   *             }
   *             definition
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The Query below returns 10 Preconditions that match the provided jql
   * <pre>
   * {
   *     <b>getPreconditions</b>(jql: "project = 'PC'", limit: 10) {
   *         results {
   *             issueId
   *             preconditionType {
   *                 name
   *                 kind
   *             }
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * <b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
   * ===
   */
  getPreconditions?: Maybe<PreconditionResults>;
  /**
   * Returns the Project Settings of a Project.
   * ===
   * The Query below returns multiple Status
   * <pre>
   * {
   *     <b>getProjectSettings</b> ( projectIdOrKey: "10000" ) {
   *         projectId,
   *         testEnvironments,
   *         testCoverageSettings {
   *             coverableIssueTypeIds
   *             epicIssuesRelation
   *             issueSubTasksRelation
   *             issueLinkTypeId
   *             issueLinkTypeDirection
   *         }
   *         defectIssueTypes
   *         testTypeSettings {
   *             testTypes {
   *                 id
   *                 name
   *                 kind
   *             }
   *             defaultTestTypeId
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getProjectSettings?: Maybe<ProjectSettings>;
  /**
   * Returns a Status by Test Run Status name.
   * ===
   * The Query below returns a Status
   * <pre>
   * {
   *     <b>getStatus</b>( name: "PASSED") {
   *         name
   *         description
   *         final
   *         color
   *     }
   * }
   * </pre>
   * ===
   */
  getStatus?: Maybe<Status>;
  /**
   * Returns all Test Run Status.
   * ===
   * The Query below returns multiple Status
   * <pre>
   * {
   *     <b>getStatuses</b> {
   *         name
   *         description
   *         final
   *         color
   *     }
   * }
   * </pre>
   * ===
   */
  getStatuses?: Maybe<Array<Maybe<Status>>>;
  /**
   * Returns a Status by Test Run Step Status name.
   * ===
   * The Query below returns a Status
   * <pre>
   * {
   *     <b>getStepStatus</b>( name: "PASSED") {
   *         name
   *         description
   *         color
   *     }
   * }
   * </pre>
   * ===
   */
  getStepStatus?: Maybe<StepStatus>;
  /**
   * Returns all Test Run Step Status.
   * ===
   * The Query below returns multiple Status
   * <pre>
   * {
   *     <b>getStepStatuses</b> {
   *         name
   *         description
   *         color
   *     }
   * }
   * </pre>
   * ===
   */
  getStepStatuses?: Maybe<Array<Maybe<StepStatus>>>;
  /**
   * Returns a Test by issueId.
   * ===
   * The query below returns a Test.
   * <pre>
   * {
   *     <b>getTest</b> {
   *         issueId
   *         gherkin
   *         jira(fields: ["assignee", "reporter"])
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The query below returns the Test with issue id **12345**.
   * <pre>
   * {
   *     <b>getTest</b>(issueId: "12345") {
   *         issueId
   *         testType {
   *             name
   *             kind
   *         }
   *         steps {
   *             id
   *             data
   *             action
   *             result
   *             attachments {
   *                 id
   *                 filename
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getTest?: Maybe<Test>;
  /**
   * Returns a Test Execution by issue id.
   * ===
   * The Query below returns a Test Execution.
   * <pre>
   * {
   *     <b>getTestExecution</b> {
   *         issueId
   *         projectId
   *         jira(fields: ["assignee", "reporter"])
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The Query below returns the Test Execution with issue id **12345**.
   * <pre>
   * {
   *     <b>getTestExecution</b>(issueId: "12345") {
   *         issueId
   *         tests(limit: 100) {
   *             total
   *             start
   *             limit
   *             results {
   *                 issueId
   *                 testType {
   *                     name
   *                 }
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getTestExecution?: Maybe<TestExecution>;
  /**
   * Returns multiple Test Executions by jql, issue ids or project id.
   * ===
   * The Query below returns the first 100 Test Executions
   * <pre>
   * {
   *     <b>getTestExecutions</b>(limit: 100) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The Query below returns 10 Test Executions that match the provided jql.
   * <pre>
   * {
   *     <b>getTestExecutions</b>(jql: "project = 'PC'", limit: 10) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             tests(limit: 10) {
   *                 total
   *                 start
   *                 limit
   *                 results {
   *                     issueId
   *                     testType {
   *                         name
   *                     }
   *                 }
   *             }
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * <b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
   * ===
   */
  getTestExecutions?: Maybe<TestExecutionResults>;
  /**
   * Returns a Test Plan by issue id.
   * ===
   * The Query below returns a Test Plan.
   * <pre>
   * {
   *     <b>getTestPlan</b> {
   *         issueId
   *         projectId
   *         jira(fields: ["assignee", "reporter"])
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The Query below returns the Test Plan with issue id **12345**
   * <pre>
   * {
   *     <b>getTestPlan</b>(issueId: "12345") {
   *         issueId
   *         tests(limit: 100) {
   *             results {
   *                 issueId
   *                 testType {
   *                     name
   *                 }
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getTestPlan?: Maybe<TestPlan>;
  /**
   * Returns multiple Test Plans by jql, issue ids or project id.
   * ===
   * The Query below returns the first 100 Test Plans
   * <pre>
   * {
   *     <b>getTestPlans</b>(limit: 100) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The Query below returns 10 Test Plans that match the provided jql.
   * <pre>
   * {
   *     <b>getTestPlans</b>(jql: "project = 'PC'", limit: 10) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             tests(limit: 10) {
   *                 total
   *                 start
   *                 limit
   *                 results {
   *                     issueId
   *                     testType {
   *                         name
   *                     }
   *                 }
   *             }
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * <b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
   * ===
   */
  getTestPlans?: Maybe<TestPlanResults>;
  /**
   * Returns a Test Run by Test issue id and Test Execution issue id.
   * ===
   * The Query below returns a Test Run
   * <pre>
   * {
   *     <b>getTestRun</b>( testIssueId: "11165", testExecIssueId: "11164") {
   *         id
   *         status {
   *             name
   *             color
   *             description
   *         }
   *         gherkin
   *         examples {
   *             id
   *             status {
   *                 name
   *                 color
   *                 description
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getTestRun?: Maybe<TestRun>;
  /**
   * Returns a Test Run by id.
   * ===
   * The Query below returns a Test Run.
   * <pre>
   * {
   *     <b>getTestRunById</b>( id: "5acc7ab0a3fe1b6fcdc3c737") {
   *         id
   *         status {
   *             name
   *             color
   *             description
   *         }
   *         steps {
   *             action
   *             data
   *             result
   *             attachments {
   *                 id
   *                 filename
   *             }
   *             status {
   *                 name
   *                 color
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getTestRunById?: Maybe<TestRun>;
  /**
   * Returns multiple Test Runs testIssueIds and/or testExecIssueIds.
   * ===
   * The query below returns the first 100 Test Runs that match the given testIssueIds and testExecIssueIds.
   * <pre>
   * {
   *     <b>getTestRuns</b>( testIssueIds: ["10001", "10002"], testExecIssueIds: ["10001", "10002"], limit: 100 ) {
   *         total
   *         limit
   *         start
   *         results {
   *             id
   *             status {
   *                 name
   *                 color
   *                 description
   *             }
   *             gherkin
   *             examples {
   *                 id
   *                 status {
   *                 name
   *                 color
   *                 description
   *                 }
   *             }
   *             test {
   *                 issueId
   *             }
   *             testExecution {
   *                 issueId
   *             }
   *         }
   *     }
   * }
   * </pre>
   * === ===
   * The query below returns the first 100 Test Runs that match the given ids.
   * <pre>
   * {
   *     <b>getTestRuns</b>( testIssueIds: ["12345"], limit: 100 ) {
   *         total
   *         limit
   *         start
   *         results {
   *             id
   *             status {
   *                 name
   *                 color
   *                 description
   *             }
   *             steps {
   *                 action
   *                 data
   *                 result
   *                 attachments {
   *                     id
   *                     filename
   *                 }
   *                 status {
   *                     name
   *                     color
   *                 }
   *             }
   *             test {
   *                 issueId
   *             }
   *             testExecution {
   *                 issueId
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getTestRuns?: Maybe<TestRunResults>;
  /**
   * Returns multiple Test Runs by id.
   * ===
   * The query below returns the first 100 Test Runs that match the given ids.
   * <pre>
   * {
   *     <b>getTestRunsById</b>( ids: ["5acc7ab0a3fe1b6fcdc3c737"], limit: 10 ) {
   *         total
   *         limit
   *         start
   *         results {
   *             id
   *             status {
   *                 name
   *                 color
   *                 description
   *             }
   *             gherkin
   *             examples {
   *                 id
   *                 status {
   *                     name
   *                     color
   *                     description
   *                 }
   *             }
   *             test {
   *                 issueId
   *             }
   *             testExecution {
   *                 issueId
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getTestRunsById?: Maybe<TestRunResults>;
  /**
   * Returns a Test Set by issueId
   * ===
   * The query below returns a test set
   * <pre>
   * {
   *     <b>getTestSet</b> {
   *         issueId
   *         projectId
   *         jira(fields: ["assignee", "reporter"])
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The query below returns the test set with issue id **12345**
   * <pre>
   * {
   *     <b>getTestSet</b>(issueId: "12345") {
   *         issueId
   *         tests(limit: 100) {
   *             results {
   *                 issueId
   *                 testType {
   *                     name
   *                 }
   *             }
   *         }
   *     }
   * }
   * </pre>
   * ===
   */
  getTestSet?: Maybe<TestSet>;
  /**
   * Returns multiple Test Sets by jql, issueIds or projectId.
   * ===
   * The query below returns the first 100 Test Sets.
   * <pre>
   * {
   *     <b>getTestSets</b>(limit: 100) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The query below returns 10 Test Sets that match the provided jql.
   * <pre>
   * {
   *     <b>getTestSets</b>(jql: "project = 'PC'", limit: 10) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             tests(limit: 10) {
   *                 results {
   *                     issueId
   *                     testType {
   *                         name
   *                     }
   *                 }
   *             }
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * <b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
   * ===
   */
  getTestSets?: Maybe<TestSetResults>;
  /**
   * Returns multiple tests by jql, issue ids, project id or test type.
   * ===
   * The query below returns the first 100 tests.
   * <pre>
   * {
   *     <b>getTests</b>(limit: 100) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             testType {
   *                 name
   *                 kind
   *             }
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * ===
   * ===
   * The query below returns 10 tests that match the provided jql.
   * <pre>
   * {
   *     <b>getTests</b>(jql: "project = 'PC'", limit: 10) {
   *         total
   *         start
   *         limit
   *         results {
   *             issueId
   *             testType {
   *                 name
   *                 kind
   *             }
   *             steps {
   *                 id
   *                 data
   *                 action
   *                 result
   *                 attachments {
   *                     id
   *                     filename
   *                 }
   *                 customfields {
   *                     id
   *                     value
   *                 }
   *             }
   *             jira(fields: ["assignee", "reporter"])
   *         }
   *     }
   * }
   * </pre>
   * <b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
   * ===
   */
  getTests?: Maybe<TestResults>;
};


export type QueryGetCoverableIssueArgs = {
  issueId: Scalars['String']['input'];
};


export type QueryGetCoverableIssuesArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jql?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetExpandedTestArgs = {
  issueId: Scalars['String']['input'];
  versionId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetExpandedTestsArgs = {
  folder?: InputMaybe<FolderSearchInput>;
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jql?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  modifiedSince?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  testType?: InputMaybe<TestTypeInput>;
  tests?: InputMaybe<Array<InputMaybe<TestWithVersionInput>>>;
};


export type QueryGetFolderArgs = {
  path: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  testPlanId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPreconditionArgs = {
  issueId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPreconditionsArgs = {
  folder?: InputMaybe<PreconditionFolderSearchInput>;
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jql?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  modifiedSince?: InputMaybe<Scalars['String']['input']>;
  preconditionType?: InputMaybe<TestTypeInput>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetProjectSettingsArgs = {
  projectIdOrKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetStatusArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetStepStatusArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTestArgs = {
  issueId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTestExecutionArgs = {
  issueId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTestExecutionsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jql?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  modifiedSince?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTestPlanArgs = {
  issueId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTestPlansArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jql?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  modifiedSince?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTestRunArgs = {
  testExecIssueId?: InputMaybe<Scalars['String']['input']>;
  testIssueId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTestRunByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTestRunsArgs = {
  limit: Scalars['Int']['input'];
  modifiedSince?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  testExecIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  testIssueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  testRunAssignees?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryGetTestRunsByIdArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTestSetArgs = {
  issueId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTestSetsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jql?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  modifiedSince?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTestsArgs = {
  folder?: InputMaybe<FolderSearchInput>;
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jql?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  modifiedSince?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  testType?: InputMaybe<TestTypeInput>;
};

/** Remove defects Result Type */
export type RemoveDefectsResult = {
  __typename?: 'RemoveDefectsResult';
  /** Ids of the removed Defects. */
  removedDefects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Remove Evidence Result Type */
export type RemoveEvidenceResult = {
  __typename?: 'RemoveEvidenceResult';
  /** Ids of the removed Evidence. */
  removedEvidence?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Result Type */
export type Result = {
  __typename?: 'Result';
  /** Backgrounds of the Results. */
  backgrounds?: Maybe<Array<Maybe<ResultsStep>>>;
  /** Duration of the Result. */
  duration?: Maybe<Scalars['Float']['output']>;
  /** Examples of the Result. */
  examples?: Maybe<Array<Maybe<ResultsExample>>>;
  /** Hooks of the Results. */
  hooks?: Maybe<Array<Maybe<ResultsStep>>>;
  /** Output if exist an error or a failure (JUNIT, XUNIT, NUNIT, TESTNG) */
  log?: Maybe<Scalars['String']['output']>;
  /** Name of the Result. */
  name?: Maybe<Scalars['String']['output']>;
  /** Status of the Result. */
  status?: Maybe<StepStatus>;
  /** Steps of the Results. */
  steps?: Maybe<Array<Maybe<ResultsStep>>>;
  /** Whether or not the Result was imported. */
  wasImported?: Maybe<Scalars['String']['output']>;
};

/** Results Embedding */
export type ResultsEmbedding = {
  __typename?: 'ResultsEmbedding';
  /** Data of the Embedding. Base64 format. */
  data?: Maybe<Scalars['String']['output']>;
  /** Link to download the embedding if no data is present */
  downloadLink?: Maybe<Scalars['String']['output']>;
  /** Filename of the Embedding. */
  filename?: Maybe<Scalars['String']['output']>;
  /** Mime Type of the Embedding. */
  mimeType?: Maybe<Scalars['String']['output']>;
};

/** Results Example Type */
export type ResultsExample = {
  __typename?: 'ResultsExample';
  /** Backgrounds of the Results. */
  backgrounds?: Maybe<Array<Maybe<ResultsStep>>>;
  /** Duration of the Result. */
  duration?: Maybe<Scalars['Float']['output']>;
  /** Hooks of the Results. */
  hooks?: Maybe<Array<Maybe<ResultsStep>>>;
  /** Status of the Result. */
  status?: Maybe<StepStatus>;
  /** Steps of the Results. */
  steps?: Maybe<Array<Maybe<ResultsStep>>>;
  /** Whether or not the Result was imported. */
  wasImported?: Maybe<Scalars['String']['output']>;
};

/** Results Step */
export type ResultsStep = {
  __typename?: 'ResultsStep';
  /** Duration of the step. */
  duration?: Maybe<Scalars['Float']['output']>;
  /** Embeddings of the step. */
  embeddings?: Maybe<Array<Maybe<ResultsEmbedding>>>;
  /** Error of the step. */
  error?: Maybe<Scalars['String']['output']>;
  /** If a gherkin step, keyword of the gherkin step. */
  keyword?: Maybe<Scalars['String']['output']>;
  /** If a Robot step, output of the Robot step. */
  log?: Maybe<Scalars['String']['output']>;
  /** Name of the step. */
  name?: Maybe<Scalars['String']['output']>;
  /** Status of the step. */
  status?: Maybe<StepStatus>;
};

export type SimpleFolderResults = {
  __typename?: 'SimpleFolderResults';
  /** Folder issues count */
  issuesCount?: Maybe<Scalars['Int']['output']>;
  /** Folder name */
  name?: Maybe<Scalars['String']['output']>;
  /** Folder path */
  path?: Maybe<Scalars['String']['output']>;
  /** Folder preconditions count */
  preconditionsCount?: Maybe<Scalars['Int']['output']>;
  /** Folder tests count */
  testsCount?: Maybe<Scalars['Int']['output']>;
};

/** Status Type */
export type Status = {
  __typename?: 'Status';
  /** Color of the Status. */
  color?: Maybe<Scalars['String']['output']>;
  /** Coverage mapping of the Status. */
  coverageStatus?: Maybe<Scalars['String']['output']>;
  /** Description of the Status. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether the Status is final or not. */
  final?: Maybe<Scalars['Boolean']['output']>;
  /** Name of the Status. */
  name?: Maybe<Scalars['String']['output']>;
};

/** Test Step type */
export type Step = {
  __typename?: 'Step';
  /** Action of the Step. */
  action?: Maybe<Scalars['String']['output']>;
  /** Attachments of the Step. */
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  /** The issue id of the test being called in the step. */
  callTestIssueId?: Maybe<Scalars['String']['output']>;
  /** Custom Fields of the Step. */
  customFields?: Maybe<Array<Maybe<CustomStepField>>>;
  /** Data of the Step. */
  data?: Maybe<Scalars['String']['output']>;
  /** Id of the Step. */
  id?: Maybe<Scalars['String']['output']>;
  /** Result of the Step. */
  result?: Maybe<Scalars['String']['output']>;
};

/** Step Status Type */
export type StepStatus = {
  __typename?: 'StepStatus';
  /** Color of the Status. */
  color?: Maybe<Scalars['String']['output']>;
  /** Description of the Status. */
  description?: Maybe<Scalars['String']['output']>;
  /** Name of the Status. */
  name?: Maybe<Scalars['String']['output']>;
  /** The test status to which the step status is mapped to. */
  testStatus?: Maybe<Status>;
};

/** Test issue type */
export type Test = {
  __typename?: 'Test';
  /** List of Coverable Issues associated with the Test issue */
  coverableIssues?: Maybe<CoverableIssueResults>;
  /** Test Repository folder of the Test. */
  folder?: Maybe<Folder>;
  /** Gherkin definition of the Test issue. */
  gherkin?: Maybe<Scalars['String']['output']>;
  /** List of Xray History results for the issue */
  history?: Maybe<XrayHistoryResults>;
  /** Issue id of the Test issue. */
  issueId?: Maybe<Scalars['String']['output']>;
  /** Extra Jira information of the Test issue. */
  jira: Scalars['JSON']['output'];
  /** Date when the test was last modified. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** List of Precondition associated with the Test issue. */
  preconditions?: Maybe<PreconditionResults>;
  /** Project id of the Test issue. */
  projectId?: Maybe<Scalars['String']['output']>;
  /**
   * Gherkin type of the Test issue.
   * Possible values: 'scenario' or 'scenario_outline'.
   */
  scenarioType?: Maybe<Scalars['String']['output']>;
  /** Status of the Test. This status can be calculated based on latest status, version or Test Plan. */
  status?: Maybe<TestStatusType>;
  /** Step definition of the Test issue. */
  steps?: Maybe<Array<Maybe<Step>>>;
  /** List of Test Executions associated with the Test issue. */
  testExecutions?: Maybe<TestExecutionResults>;
  /** List of Test Plans associated with the Test issue. */
  testPlans?: Maybe<TestPlanResults>;
  /** List of Test Runs for the Test issue */
  testRuns?: Maybe<TestRunResults>;
  /** List of Test Sets associated with the Test issue. */
  testSets?: Maybe<TestSetResults>;
  /** Test type of the Test issue. */
  testType?: Maybe<TestType>;
  /** List of Test versions of the Test */
  testVersions?: Maybe<TestVersionResults>;
  /** Unstructured definition of the Test issue. */
  unstructured?: Maybe<Scalars['String']['output']>;
};


/** Test issue type */
export type TestCoverableIssuesArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test issue type */
export type TestHistoryArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test issue type */
export type TestJiraArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Test issue type */
export type TestPreconditionsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test issue type */
export type TestStatusArgs = {
  environment?: InputMaybe<Scalars['String']['input']>;
  isFinal?: InputMaybe<Scalars['Boolean']['input']>;
  testPlan?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


/** Test issue type */
export type TestTestExecutionsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test issue type */
export type TestTestPlansArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test issue type */
export type TestTestRunsArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test issue type */
export type TestTestSetsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test issue type */
export type TestTestVersionsArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
  testTypeId?: InputMaybe<Scalars['String']['input']>;
};

/** Test Execution issue type */
export type TestExecution = {
  __typename?: 'TestExecution';
  /** List of Xray History results for the issue */
  history?: Maybe<XrayHistoryResults>;
  /** Id of the Test Execution issue. */
  issueId?: Maybe<Scalars['String']['output']>;
  /** Extra Jira information of the Test Execution Issue. */
  jira?: Maybe<Scalars['JSON']['output']>;
  /** Date when the test exec was last modified. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** Project id of the Test Execution issue. */
  projectId?: Maybe<Scalars['String']['output']>;
  /** Test Environments of the Test Execution. */
  testEnvironments?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** List of Test Plans associated with the Test Execution Issue. */
  testPlans?: Maybe<TestPlanResults>;
  /** List of Test Runs for the Test Execution Issue. */
  testRuns?: Maybe<TestRunResults>;
  /** List of Tests associated with the Test Execution Issue. */
  tests?: Maybe<TestResults>;
};


/** Test Execution issue type */
export type TestExecutionHistoryArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test Execution issue type */
export type TestExecutionJiraArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Test Execution issue type */
export type TestExecutionTestPlansArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test Execution issue type */
export type TestExecutionTestRunsArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test Execution issue type */
export type TestExecutionTestsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};

/** Test Execution Results Type */
export type TestExecutionResults = {
  __typename?: 'TestExecutionResults';
  /** Maximum amount of Test Executions to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Test Execution issue results. */
  results?: Maybe<Array<Maybe<TestExecution>>>;
  /** Index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of issues. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Test Plan issue type */
export type TestPlan = {
  __typename?: 'TestPlan';
  /** Folder structure of the Test Plan. */
  folders?: Maybe<FolderResults>;
  /** List of Xray History results for the issue */
  history?: Maybe<XrayHistoryResults>;
  /** Id of the Test Plan issue. */
  issueId?: Maybe<Scalars['String']['output']>;
  /** Extra Jira information of the Test Plan issue. */
  jira?: Maybe<Scalars['JSON']['output']>;
  /** Date when the test plan was last modified. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** Project id of the Test Plan issue. */
  projectId?: Maybe<Scalars['String']['output']>;
  /** List of Test Executions associated with the Test Plan issue. */
  testExecutions?: Maybe<TestExecutionResults>;
  /** List of Tests associated with the Test Plan issue. */
  tests?: Maybe<TestResults>;
};


/** Test Plan issue type */
export type TestPlanHistoryArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test Plan issue type */
export type TestPlanJiraArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Test Plan issue type */
export type TestPlanTestExecutionsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test Plan issue type */
export type TestPlanTestsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};

/** Test Plan Results type */
export type TestPlanResults = {
  __typename?: 'TestPlanResults';
  /** Maximum amount of Test Plans to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Test Plan issue results. */
  results?: Maybe<Array<Maybe<TestPlan>>>;
  /** Index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of issues. */
  total?: Maybe<Scalars['Int']['output']>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Test Results type */
export type TestResults = {
  __typename?: 'TestResults';
  /** The maximum amount of Tests to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Test issue results. */
  results?: Maybe<Array<Maybe<Test>>>;
  /** The index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of issues. */
  total?: Maybe<Scalars['Int']['output']>;
  /** Warnings generated if you have a invalid Test */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Test Run type */
export type TestRun = {
  __typename?: 'TestRun';
  /** User's account id assigned to the Test Run. This is user assigned to the Test Run, not taking into account the assignee of the test execution. */
  assigneeId?: Maybe<Scalars['String']['output']>;
  /** Comment definition of the Test Run. */
  comment?: Maybe<Scalars['String']['output']>;
  /** Custom Fields of the Test Run. */
  customFields?: Maybe<Array<Maybe<TestRunCustomFieldValue>>>;
  /** Defects of the Test Run. */
  defects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Evidence of the Test Run. */
  evidence?: Maybe<Array<Maybe<Evidence>>>;
  /** Examples of the Test Run. */
  examples?: Maybe<Array<Maybe<Example>>>;
  /** User's account id that executed the Test Run. */
  executedById?: Maybe<Scalars['String']['output']>;
  /** Finished On date of the Test Run. */
  finishedOn?: Maybe<Scalars['String']['output']>;
  /** Cucumber definition of the Test issue. */
  gherkin?: Maybe<Scalars['String']['output']>;
  /** Id of the Test Run. */
  id?: Maybe<Scalars['String']['output']>;
  /** Iterations of the Test Run. */
  iterations?: Maybe<TestRunIterationResults>;
  /** Date when the test run was last modified. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** Parameters of the Test Run. */
  parameters?: Maybe<Array<Maybe<TestRunParameter>>>;
  /** Preconditions of the Test Run. */
  preconditions?: Maybe<TestRunPreconditionResults>;
  /** Results of the Test Run. */
  results?: Maybe<Array<Maybe<Result>>>;
  /** Cucumber Type definition of the Test Run. */
  scenarioType?: Maybe<Scalars['String']['output']>;
  /** Started On date of the Test Run. */
  startedOn?: Maybe<Scalars['String']['output']>;
  /** Status of the Test Run. */
  status?: Maybe<Status>;
  /** Step definition of the Test Run. */
  steps?: Maybe<Array<Maybe<TestRunStep>>>;
  /** Test of the Test Run. */
  test?: Maybe<Test>;
  /** Test Execution of the Test Run. */
  testExecution?: Maybe<TestExecution>;
  /** Test Type of the Test Run. */
  testType?: Maybe<TestType>;
  /** Test version of the Test Run. */
  testVersion?: Maybe<TestVersion>;
  /** Generic definition of the Test issue. */
  unstructured?: Maybe<Scalars['String']['output']>;
};


/** Test Run type */
export type TestRunIterationsArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test Run type */
export type TestRunPreconditionsArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};

/** Custom Fields Type */
export type TestRunCustomFieldValue = {
  __typename?: 'TestRunCustomFieldValue';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Scalars['JSON']['output']>;
};

/** Step CustomField type */
export type TestRunCustomStepField = {
  __typename?: 'TestRunCustomStepField';
  /** Id of the Custom Field. */
  id?: Maybe<Scalars['String']['output']>;
  /** Name of the Custom Field. */
  name?: Maybe<Scalars['String']['output']>;
  /** Value of the Custom Field. */
  value?: Maybe<Scalars['JSON']['output']>;
};

/** Test Run Defect Operations Input */
export type TestRunDefectOperationsInput = {
  /** Defects to add to the Test Run Step. */
  add?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Defects to remove from the Test Run Step. */
  remove?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Test Run Evidence Operations Input */
export type TestRunEvidenceOperationsInput = {
  /** Evidence to add to the Test Run Step. */
  add?: InputMaybe<Array<InputMaybe<AttachmentDataInput>>>;
  /** Evidence filenames to remove from the Test Run Step. */
  removeFilenames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Evidence ids to remove from the Test Run Step. */
  removeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Test Run iteration type */
export type TestRunIteration = {
  __typename?: 'TestRunIteration';
  /** Parameters of the iteration. */
  parameters?: Maybe<Array<Maybe<TestRunParameter>>>;
  /** Rank of the iteration. */
  rank?: Maybe<Scalars['String']['output']>;
  /** Status of the iteration. */
  status?: Maybe<StepStatus>;
  /** Step results of the iteration. */
  stepResults?: Maybe<TestRunIterationStepResults>;
};


/** Test Run iteration type */
export type TestRunIterationStepResultsArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};

/** Test Run iterations results type */
export type TestRunIterationResults = {
  __typename?: 'TestRunIterationResults';
  /** Maximum amount of iterations to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Iteration results. */
  results?: Maybe<Array<Maybe<TestRunIteration>>>;
  /** Index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of iterations. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Test Run iteration step result type */
export type TestRunIterationStepResult = {
  __typename?: 'TestRunIterationStepResult';
  /** Actual Result of the Test Run step. */
  actualResult?: Maybe<Scalars['String']['output']>;
  /** Comment of the Test Run step. */
  comment?: Maybe<Scalars['String']['output']>;
  /** Defects of the Test Run step. */
  defects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Evidence of the Test Run step. */
  evidence?: Maybe<Array<Maybe<Evidence>>>;
  /** Id of the Test Run step. */
  id?: Maybe<Scalars['String']['output']>;
  /** Status of the Test Run step. */
  status?: Maybe<StepStatus>;
};

/** Test Run iteration step results results type */
export type TestRunIterationStepResults = {
  __typename?: 'TestRunIterationStepResults';
  /** Maximum amount of step results to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Step results. */
  results?: Maybe<Array<Maybe<TestRunIterationStepResult>>>;
  /** Index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of steps. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Test Run parameter type */
export type TestRunParameter = {
  __typename?: 'TestRunParameter';
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Test Run Precondition type */
export type TestRunPrecondition = {
  __typename?: 'TestRunPrecondition';
  /** Precondition definition. */
  definition?: Maybe<Scalars['String']['output']>;
  /** Precondition of the Test Run. */
  preconditionRef?: Maybe<Precondition>;
};

/** Precondition Results type */
export type TestRunPreconditionResults = {
  __typename?: 'TestRunPreconditionResults';
  /** Maximum amount of Preconditions to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Precondition results. */
  results?: Maybe<Array<Maybe<TestRunPrecondition>>>;
  /** Index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of preconditions. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Test Run Results type */
export type TestRunResults = {
  __typename?: 'TestRunResults';
  /** The maximum amount of Test Runs to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Test Run results. */
  results?: Maybe<Array<Maybe<TestRun>>>;
  /** The index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of Test Runs. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Test Run Step Type */
export type TestRunStep = {
  __typename?: 'TestRunStep';
  /** Action of the Test Run Step. */
  action?: Maybe<Scalars['String']['output']>;
  /** Actual Result of the Test Run Step. */
  actualResult?: Maybe<Scalars['String']['output']>;
  /** Attachments of the Test Run Step. */
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  /** Comment of the Test Run Step. */
  comment?: Maybe<Scalars['String']['output']>;
  /** Custom Fields of the Test Run Step. */
  customFields?: Maybe<Array<Maybe<TestRunCustomStepField>>>;
  /** Data of the Test Run Step. */
  data?: Maybe<Scalars['String']['output']>;
  /** Defects of the Test Run Step. */
  defects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Evidence of the Test Run Step. */
  evidence?: Maybe<Array<Maybe<Evidence>>>;
  /** Id of the Test Run Step. */
  id?: Maybe<Scalars['String']['output']>;
  /** Result of the Test Run Step. */
  result?: Maybe<Scalars['String']['output']>;
  /** Status of the Test Run Step. */
  status?: Maybe<StepStatus>;
};

/** Test Set type */
export type TestSet = {
  __typename?: 'TestSet';
  /** List of Xray History results for the issue */
  history?: Maybe<XrayHistoryResults>;
  /** Issue id of the Test Set Issue. */
  issueId?: Maybe<Scalars['String']['output']>;
  /** Extra Jira information of the Test Set Issue. */
  jira?: Maybe<Scalars['JSON']['output']>;
  /** Date when the test set was last modified. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** Project id of the Test Set Issue. */
  projectId?: Maybe<Scalars['String']['output']>;
  /** List of Tests associated with the Test Set Issue. */
  tests?: Maybe<TestResults>;
};


/** Test Set type */
export type TestSetHistoryArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


/** Test Set type */
export type TestSetJiraArgs = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Test Set type */
export type TestSetTestsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};

/** Test Set Results */
export type TestSetResults = {
  __typename?: 'TestSetResults';
  /** Maximum amount of test sets to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Test Set issue results. */
  results?: Maybe<Array<Maybe<TestSet>>>;
  /** Index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of issues. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Test Status Type */
export type TestStatusType = {
  __typename?: 'TestStatusType';
  /** Color of the Test Status. */
  color?: Maybe<Scalars['String']['output']>;
  /** Description of the Test Status. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether the status is final or not. */
  final?: Maybe<Scalars['Boolean']['output']>;
  /** Name of the Test Status. */
  name?: Maybe<Scalars['String']['output']>;
};

/** Test Type type */
export type TestType = {
  __typename?: 'TestType';
  /** Id of the Test Type. */
  id?: Maybe<Scalars['String']['output']>;
  /**
   * Kind of the Test Type.
   * Possible values are "Gherkin", "Steps" or "Unstructured".
   */
  kind?: Maybe<Scalars['String']['output']>;
  /** Name of the Test Type. */
  name?: Maybe<Scalars['String']['output']>;
};

/** Test Type input */
export type TestTypeInput = {
  /** Id of the Test Type. */
  id?: InputMaybe<Scalars['String']['input']>;
  /**
   * Kind of the Test Type.
   * Possible values are "Gherkin", "Steps" or "Unstructured".
   */
  kind?: InputMaybe<Scalars['String']['input']>;
  /** Name of the Test Type. */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TestVersion = {
  __typename?: 'TestVersion';
  /** If is an archived Test version. */
  archived: Scalars['Boolean']['output'];
  /** If is the default Test version. */
  default: Scalars['Boolean']['output'];
  /** Gherkin definition of the Test version. */
  gherkin?: Maybe<Scalars['String']['output']>;
  /** Number of the Test version. */
  id: Scalars['Int']['output'];
  /** Date when the Test version was last modified. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** Name of the Test version. */
  name: Scalars['String']['output'];
  preconditions?: Maybe<PreconditionResults>;
  /**
   * Gherkin type of the Test version.
   * Possible values: 'scenario' or 'scenario_outline'.
   */
  scenarioType?: Maybe<Scalars['String']['output']>;
  /** Step definition of the Test version. */
  steps?: Maybe<Array<Maybe<Step>>>;
  test: Test;
  /** List of Test Executions associated with the Test version. */
  testExecutions?: Maybe<TestExecutionResults>;
  testRuns?: Maybe<TestRunResults>;
  /** Test type of the Test version. */
  testType?: Maybe<TestType>;
  /** Unstructured definition of the Test version. */
  unstructured?: Maybe<Scalars['String']['output']>;
};


export type TestVersionPreconditionsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type TestVersionTestExecutionsArgs = {
  issueIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type TestVersionTestRunsArgs = {
  limit: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['Int']['input']>;
};

/** Test version results type */
export type TestVersionResults = {
  __typename?: 'TestVersionResults';
  /** The maximum amount of Test versions to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Test version results. */
  results?: Maybe<Array<Maybe<TestVersion>>>;
  /** The index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of Test versions. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Test with Version input */
export type TestWithVersionInput = {
  /** Issue id of the Test issue. */
  issueId?: InputMaybe<Scalars['String']['input']>;
  /** Test Version id of the Test Issue */
  versionId?: InputMaybe<Scalars['Int']['input']>;
};

/** Update Test Run iteration status result type */
export type UpdateIterationStatusResult = {
  __typename?: 'UpdateIterationStatusResult';
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Update Precondition input */
export type UpdatePreconditionInput = {
  /** Definition of the Precondition Issue. */
  definition?: InputMaybe<Scalars['String']['input']>;
  /** the repository path to which the Precondition should be moved to */
  folderPath?: InputMaybe<Scalars['String']['input']>;
  /** Precondition type of the Precondition Issue. */
  preconditionType?: InputMaybe<UpdatePreconditionTypeInput>;
};

/** Precondition Type input */
export type UpdatePreconditionTypeInput = {
  /** Id of the Precondition Type. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Name of the Precondition Type. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Update Step input */
export type UpdateStepInput = {
  /** Action of the Step. */
  action?: InputMaybe<Scalars['String']['input']>;
  /** Attachments of the Step. */
  attachments?: InputMaybe<AttachmentOperationsInput>;
  /** Custom Fields of the Step */
  customFields?: InputMaybe<Array<InputMaybe<CustomStepFieldInput>>>;
  /** Data of the Step. */
  data?: InputMaybe<Scalars['String']['input']>;
  /** Result of the Step. */
  result?: InputMaybe<Scalars['String']['input']>;
};

/** Update Test Run Example Status Result Type */
export type UpdateTestRunExampleStatusResult = {
  __typename?: 'UpdateTestRunExampleStatusResult';
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Update Test Run Result Type */
export type UpdateTestRunResult = {
  __typename?: 'UpdateTestRunResult';
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Update Test Run Step Input */
export type UpdateTestRunStepInput = {
  /** Actual Result of the Test Run Step. */
  actualResult?: InputMaybe<Scalars['String']['input']>;
  /** Comment to add to the Test Run Step. */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Defects of the Test Run Step. */
  defects?: InputMaybe<TestRunDefectOperationsInput>;
  /** Evidence of the Test Run Step. */
  evidence?: InputMaybe<TestRunEvidenceOperationsInput>;
  /** Status to set to the Test Run Step. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Update Test Run Step Result Type */
export type UpdateTestRunStepResult = {
  __typename?: 'UpdateTestRunStepResult';
  /** Ids of the added Defects. */
  addedDefects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Ids of the added Evidence. */
  addedEvidence?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Ids of the removed Defects. */
  removedDefects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Ids of the removed Evidence. */
  removedEvidence?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Update Test Run Step Status Result Type */
export type UpdateTestRunStepStatusResult = {
  __typename?: 'UpdateTestRunStepStatusResult';
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Update Test Step Results type */
export type UpdateTestStepResult = {
  __typename?: 'UpdateTestStepResult';
  /** List of added attachments. */
  addedAttachments?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** List of removed attachments. */
  removedAttachments?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Warnings generated during the operation. */
  warnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Test Type input */
export type UpdateTestTypeInput = {
  /** Id of the Test Type. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Name of the Test Type. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Xray History Entry type */
export type XrayHistoryEntry = {
  __typename?: 'XrayHistoryEntry';
  /** Action performed. */
  action?: Maybe<Scalars['String']['output']>;
  /** Details of the change(s). */
  changes?: Maybe<Array<Maybe<Changes>>>;
  /** Date of change(s). */
  date?: Maybe<Scalars['String']['output']>;
  /** User that performed the change(s). */
  user?: Maybe<Scalars['String']['output']>;
  /** Test Version that the changes refer to (if applicable). */
  version?: Maybe<Scalars['String']['output']>;
};

/** Xray History Results type */
export type XrayHistoryResults = {
  __typename?: 'XrayHistoryResults';
  /** Maximum amount of History results to be returned. The maximum is 100. */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Precondition issue results. */
  results?: Maybe<Array<Maybe<XrayHistoryEntry>>>;
  /** Index of the first item to return in the page of results (page offset). */
  start?: Maybe<Scalars['Int']['output']>;
  /** Total amount of issues. */
  total?: Maybe<Scalars['Int']['output']>;
};

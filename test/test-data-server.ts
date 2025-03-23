// ============================================================================================== //
// TEST DATA FOR XRAY SERVER
// In case of a fork or migration, these are all the information you will need to update/recreate.
// ============================================================================================== //
export const DATA_SERVER = {
  get defects() {
    return DEFECTS;
  },
  get preconditions() {
    return PRECONDITIONS;
  },
  project: { key: "XCNODE" },
  get settings() {
    return SETTINGS;
  },
  get testExecutions() {
    return TEST_EXECUTIONS;
  },
  get testPlans() {
    return TEST_PLANS;
  },
  get tests() {
    return TESTS;
  },
  get testSets() {
    return TEST_SETS;
  },
} as const;
// ============================================================================================== //
// TESTS
// ============================================================================================== //
const TESTS = {
  addTestSteps: {
    v1: { key: "XCNODE-17" },
    v2: { key: "XCNODE-16" },
  },
  deleteTestStepAttachments: {
    v1: { key: "XCNODE-21", steps: [{ id: 3540 }] },
    v2: { key: "XCNODE-20", steps: [{ id: 3541 }] },
  },
  immutable: {
    key: "XCNODE-9",
    steps: [
      {
        attachments: [
          {
            fileName: "1f4222_64_64.png",
            id: 2986,
            mimeType: "image/png",
          },
        ],
        id: 3510,
        v1: {
          data: { raw: "data 1", rendered: "<p>data 1</p>" },
          result: { raw: "result 1", rendered: "<p>result 1</p>" },
          step: { raw: "action 1", rendered: "<p>action 1</p>" },
        },
        v2: {
          fields: {
            ["Action"]: { type: "Wiki", value: { raw: "action 1", rendered: "<p>action 1</p>" } },
            ["Data"]: { type: "Wiki", value: { raw: "data 1", rendered: "<p>data 1</p>" } },
            ["Expected Result"]: {
              type: "Wiki",
              value: { raw: "result 1", rendered: "<p>result 1</p>" },
            },
          },
        },
      },
      {
        id: 3511,
        v1: {
          data: { raw: "data 2", rendered: "<p>data 2</p>" },
          result: { raw: "result 2", rendered: "<p>result 2</p>" },
          step: { raw: "action 2", rendered: "<p>action 2</p>" },
        },
        v2: {
          fields: {
            ["Action"]: { type: "Wiki", value: { raw: "action 2", rendered: "<p>action 2</p>" } },
            ["Data"]: { type: "Wiki", value: { raw: "data 2", rendered: "<p>data 2</p>" } },
            ["Expected Result"]: {
              type: "Wiki",
              value: { raw: "result 2", rendered: "<p>result 2</p>" },
            },
          },
        },
      },
    ],
  },
  immutableCucumber: {
    key: "XCNODE-36",
  },
  immutableDatadriven: {
    dataset: ["name,age", "Jane,42", "John,33", ""],
    key: "XCNODE-1",
  },
  importDatasets: { key: "XCNODE-4" },
  updateTestSteps: {
    v1: { key: "XCNODE-19", steps: [{ id: 3533 }] },
    v2: { key: "XCNODE-18", steps: [{ id: 3532 }] },
  },
} as const;
// ============================================================================================== //
// DEFECTS
// ============================================================================================== //
const DEFECTS = {
  immutable: {
    key: "XCNODE-33",
  },
} as const;
// ============================================================================================== //
// TEST EXECUTIONS
// ============================================================================================== //
const TEST_EXECUTIONS = {
  addAttachments: {
    v1: { key: "XCNODE-10", tests: [{ ...TESTS.immutableDatadriven, testRunId: 12800 }] },
    v2: { key: "XCNODE-3", tests: [{ ...TESTS.immutableDatadriven, testRunId: 12467 }] },
  },
  addTests: {
    key: "XCNODE-30",
  },
  immutable: {
    key: "XCNODE-2",
    testEnvironments: [{ name: "environmentwith,comma" }, { name: "firefox" }],
    tests: [
      {
        ...TESTS.immutableDatadriven,
        comment: { raw: "no errors", rendered: "<p>no errors</p>" },
        status: "PASS",
        testRunId: 12466,
      },
      { ...TESTS.immutable, defects: [DEFECTS.immutable], status: "FAIL", testRunId: 12805 },
    ],
  },
  immutableCucumber: {
    key: "XCNODE-37",
    tests: [
      {
        ...TESTS.immutableCucumber,
        examples: [
          { id: 10043 },
          { id: 10044, values: ["20", "30", "add", "50"] },
          { id: 10045, values: ["2", "5", "add", "7"] },
          { id: 10046, values: ["0", "40", "add", "40"] },
          { id: 10047, values: ["4", "50", "add", "54"] },
          { id: 10048, values: ["5", "50", "add", "55"] },
        ],
        testRunId: 13255,
      },
    ],
  },
  importXray: {
    v1: { key: "XCNODE-11", tests: [{ ...TESTS.immutableDatadriven }] },
    v2: { key: "XCNODE-5", tests: [{ ...TESTS.immutableDatadriven }] },
  },
  importXrayMultipart: {
    v1: { key: "XCNODE-12", tests: [{ ...TESTS.immutableDatadriven }] },
    v2: { key: "XCNODE-6", tests: [{ ...TESTS.immutableDatadriven }] },
  },
  removeTests: {
    key: "XCNODE-31",
  },
  updateCucumberExamples: {
    key: "XCNODE-38",
    tests: [
      {
        ...TESTS.immutableCucumber,
        initialStatuses: ["PASS"],
        testRunId: 13256,
        updatedStatuses: ["FAIL"],
      },
    ],
  },
  updateTestRun: {
    v1: {
      key: "XCNODE-13",
      tests: [
        { ...TESTS.immutableDatadriven, testRunId: "12803" },
        { ...TESTS.immutable, steps: [{ id: "4471" }, { id: "4472" }], testRunId: 12804 },
      ],
    },
    v2: {
      key: "XCNODE-8",
      tests: [
        { ...TESTS.immutableDatadriven, testRunId: "12470" },
        { ...TESTS.immutable, steps: [{ id: "4423" }, { id: "4424" }], testRunId: 12471 },
      ],
    },
  },
  updateTestRunComments: {
    key: "XCNODE-35",
    tests: [
      {
        ...TESTS.immutable,
        initialComment: { raw: "initial comment", rendered: "<p>initial comment</p>" },
        testRunId: 13253,
        updatedComment: { raw: "updated comment", rendered: "<p>updated comment</p>" },
      },
    ],
  },
  updateTestRunDefects: {
    key: "XCNODE-34",
    testRuns: {
      addDefects: {
        defects: [DEFECTS.immutable],
        status: "FAIL",
        test: TESTS.immutable,
        testRunId: 13251,
      },
      removeDefects: {
        defects: [DEFECTS.immutable],
        status: "FAIL",
        test: TESTS.immutableDatadriven,
        testRunId: 13252,
      },
    },
  },
  updateTestRunStatuses: {
    key: "XCNODE-32",
    tests: [
      { ...TESTS.immutable, initialStatus: "TODO", testRunId: 13250, updatedStatus: "EXECUTING" },
    ],
  },
} as const;
// ============================================================================================== //
// TEST PLANS
// ============================================================================================== //
const TEST_PLANS = {
  addTestExecutions: {
    key: "XCNODE-28",
  },
  addTests: {
    key: "XCNODE-26",
  },
  immutable: {
    key: "XCNODE-7",
    testExecutions: [TEST_EXECUTIONS.immutable, TEST_EXECUTIONS.addAttachments.v2],
    tests: [TESTS.immutableDatadriven, TESTS.immutable, TESTS.immutableCucumber],
  },
  removeTestExecutions: {
    key: "XCNODE-29",
  },
  removeTests: {
    key: "XCNODE-27",
  },
} as const;
// ============================================================================================== //
// TEST SETS
// ============================================================================================== //
const TEST_SETS = {
  addTests: {
    key: "XCNODE-24",
  },
  immutable: {
    key: "XCNODE-15",
    tests: [TESTS.immutable],
  },
  removeTests: {
    key: "XCNODE-25",
  },
} as const;
// ============================================================================================== //
// PRECONDITIONS
// ============================================================================================== //
const PRECONDITIONS = {
  addTests: {
    key: "XCNODE-22",
  },
  immutable: {
    key: "XCNODE-14",
    tests: [TESTS.immutable],
  },
  removeTests: {
    key: "XCNODE-23",
  },
} as const;
// ============================================================================================== //
// XRAY SETTINGS
// ============================================================================================== //
const SETTINGS = {
  testStatus: {
    pass: {
      color: "#95C160",
      description: "The test run/iteration has passed",
      final: true,
      id: 0,
      name: "PASS",
      rank: 0,
      requirementStatusName: "OK",
    },
  },
  testStepStatus: {
    pass: {
      color: "#95C160",
      description: "The test step has passed",
      id: 0,
      name: "PASS",
      rank: 0,
      testStatusId: 0,
    },
  },
} as const;

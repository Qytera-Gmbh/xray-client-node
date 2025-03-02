// ============================================================================================== //
// TEST DATA FOR XRAY CLOUD
// In case of a fork or migration, these are all the issues you will need to update/recreate.
// ============================================================================================== //
export const DATA_CLOUD = {
  project: { key: "XCN" },
  get testExecutions() {
    return TEST_EXECUTIONS;
  },
  get testPlans() {
    return TEST_PLANS;
  },
  get tests() {
    return TESTS;
  },
} as const;
// ============================================================================================== //
// TESTS
// ============================================================================================== //
const TESTS = {
  immutable: {
    dataset: ["name,age", "Jeff,25", "John,41", "Mary,-146", "Susan,19", ""],
    issueId: "15049",
    key: "XCN-1",
    testType: "Manual",
  },
} as const;
// ============================================================================================== //
// TEST EXECUTIONS
// ============================================================================================== //
const TEST_EXECUTIONS = {
  addAttachments: { key: "XCN-4", testRunId: "67aa31f900cff4d6104bca3b" },
  immutable: {
    evidence: {
      content: "hello world",
      id: "49edd0c2-7bb8-4bfc-aa16-62c090891252",
      name: "hello.txt",
    },
    issueId: "15050",
    key: "XCN-2",
    tests: [
      {
        ...TESTS.immutable,
        status: {
          color: "#95C160",
          description: "The test run has passed",
          name: "PASSED",
        },
        testRunId: "6798fab7acaa2dd62ef1fa7a",
      },
    ],
  },
  importXray: {
    v1: { key: "XCN-9", tests: [TESTS.immutable] },
    v2: { key: "XCN-6", tests: [TESTS.immutable] },
  },
  importXrayMultipart: {
    v1: { issueId: "15686", key: "XCN-8", tests: [TESTS.immutable] },
    v2: { issueId: "15357", key: "XCN-7", tests: [TESTS.immutable] },
  },
  removeAttachments: {
    key: "XCN-5",
    tests: [{ ...TESTS.immutable, testRunId: "67aa32d700cff4d6104d2f1c" }],
  },
} as const;
// ============================================================================================== //
// TEST PLANS
// ============================================================================================== //
const TEST_PLANS = {
  immutable: {
    issueId: "15051",
    key: "XCN-3",
    testExecutions: [TEST_EXECUTIONS.immutable],
    tests: [TESTS.immutable],
  },
} as const;

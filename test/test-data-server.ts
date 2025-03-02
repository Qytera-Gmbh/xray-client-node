// ============================================================================================== //
// TEST DATA FOR XRAY SERVER
// In case of a fork or migration, these are all the information you will need to update/recreate.
// ============================================================================================== //
export const DATA_SERVER = {
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
  immutable: {
    key: "XCNODE-9",
  },
  immutableDatadriven: {
    dataset: ["name,age", "Jane,42", "John,33", ""],
    key: "XCNODE-1",
  },
  importDatasets: { key: "XCNODE-4" },
} as const;
// ============================================================================================== //
// TEST EXECUTIONS
// ============================================================================================== //
const TEST_EXECUTIONS = {
  addAttachments: {
    v1: { key: "XCNODE-10", tests: [{ ...TESTS.immutableDatadriven, testRunId: 12800 }] },
    v2: { key: "XCNODE-3", tests: [{ ...TESTS.immutableDatadriven, testRunId: 12467 }] },
  },
  immutable: {
    key: "XCNODE-2",
    testEnvironments: [{ name: "environmentwith,comma" }, { name: "firefox" }],
    tests: [{ ...TESTS.immutableDatadriven, testRunId: 12466 }],
  },
  importXray: {
    v1: { key: "XCNODE-11", tests: [{ ...TESTS.immutableDatadriven }] },
    v2: { key: "XCNODE-5", tests: [{ ...TESTS.immutableDatadriven }] },
  },
  importXrayMultipart: {
    v1: { key: "XCNODE-12", tests: [{ ...TESTS.immutableDatadriven }] },
    v2: { key: "XCNODE-6", tests: [{ ...TESTS.immutableDatadriven }] },
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
} as const;
// ============================================================================================== //
// TEST PLANS
// ============================================================================================== //
const TEST_PLANS = {
  immutable: {
    key: "XCNODE-7",
    testExecutions: [TEST_EXECUTIONS.immutable, TEST_EXECUTIONS.addAttachments.v2],
    tests: [TESTS.immutableDatadriven],
  },
} as const;
// ============================================================================================== //
// TEST SETS
// ============================================================================================== //
const TEST_SETS = {
  immutable: {
    key: "XCNODE-15",
    tests: [TESTS.immutable],
  },
} as const;
// ============================================================================================== //
// PRECONDITIONS
// ============================================================================================== //
const PRECONDITIONS = {
  immutable: {
    key: "XCNODE-14",
    tests: [TESTS.immutable],
  },
} as const;
// ============================================================================================== //
// XRAY SETTINGS
// ============================================================================================== //
const SETTINGS = {
  testStatuses: {
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
} as const;

/**
 * Test data for Xray server tests.
 */
export const DATA_SERVER = {
  project: { key: "XCNODE" },
  testExecutions: {
    addingAttachments: {
      v1: { key: "XCNODE-10", tests: [{ key: "XCNODE-1", testRunId: "12800" }] },
      v2: { key: "XCNODE-3", tests: [{ key: "XCNODE-1", testRunId: "12467" }] },
    },
    immutable: { key: "XCNODE-2", tests: [{ key: "XCNODE-1", testRunId: "12466" }] },
    importingXray: {
      v1: { key: "XCNODE-11", tests: [{ key: "XCNODE-1" }] },
      v2: { key: "XCNODE-5", tests: [{ key: "XCNODE-1" }] },
    },
    importingXrayMultipart: {
      v1: { key: "XCNODE-12", tests: [{ key: "XCNODE-1" }] },
      v2: { key: "XCNODE-6", tests: [{ key: "XCNODE-1" }] },
    },
    updateTestRun: {
      v1: {
        key: "XCNODE-13",
        tests: [
          { key: "XCNODE-1", testRunId: "12803" },
          { key: "XCNODE-9", testRunId: "12804" },
        ],
      },
      v2: {
        key: "XCNODE-8",
        tests: [
          { key: "XCNODE-1", testRunId: "12470" },
          { key: "XCNODE-9", testRunId: "12471" },
        ],
      },
    },
  },
  testPlans: {
    immutable: { key: "XCNODE-7", testExecutions: ["XCNODE-2", "XCNODE-3"], tests: ["XCNODE-1"] },
  },
  tests: {
    immutable: {
      key: "XCNODE-9",
    },
    immutableDatadriven: {
      dataset: ["name,age", "Jane,42", "John,33", ""],
      key: "XCNODE-1",
    },
    importingDatasets: { key: "XCNODE-4" },
  },
} as const;

/**
 * Test data for Xray cloud tests.
 */
export const DATA_CLOUD = {
  project: { key: "XCN" },
  testExecutions: {
    addingAttachments: { key: "XCN-4", testRunId: "67aa31f900cff4d6104bca3b" },
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
          key: "XCN-1",
          status: {
            color: "#95C160",
            description: "The test run has passed",
            name: "PASSED",
          },
          testRunId: "6798fab7acaa2dd62ef1fa7a",
        },
      ],
    },
    importingXray: {
      v1: { key: "XCN-9", tests: [{ key: "XCN-1" }] },
      v2: { key: "XCN-6", tests: [{ key: "XCN-1" }] },
    },
    importingXrayMultipart: {
      v1: { issueId: "15686", key: "XCN-8", tests: [{ key: "XCN-1" }] },
      v2: { issueId: "15357", key: "XCN-7", tests: [{ key: "XCN-1" }] },
    },
    removingAttachments: {
      key: "XCN-5",
      tests: [{ key: "XCN-1", testRunId: "67aa32d700cff4d6104d2f1c" }],
    },
  },
  testPlans: {
    immutable: {
      issueId: "15051",
      key: "XCN-3",
      testExecutions: ["XCN-2"],
      tests: ["XCN-1"],
    },
  },
  tests: {
    immutable: {
      dataset: ["name,age", "Jeff,25", "John,41", "Mary,-146", "Susan,19", ""],
      issueId: "15049",
      key: "XCN-1",
      testType: "Manual",
    },
  },
} as const;

/**
 * Test data for Xray server tests.
 */
export const DATA_SERVER = {
  project: { key: "XCNODE" },
  testExecutions: {
    addingAttachments: { key: "XCNODE-3", tests: [{ key: "XCNODE-1", testRunId: "12467" }] },
    immutable: { key: "XCNODE-2", tests: [{ key: "XCNODE-1", testRunId: "12466" }] },
    importingXray: { key: "XCNODE-5", tests: [{ key: "XCNODE-1" }] },
    importingXrayMultipart: { key: "XCNODE-6", tests: [{ key: "XCNODE-1" }] },
    updateTestRun: {
      key: "XCNODE-8",
      tests: [
        { key: "XCNODE-1", testRunId: "12470" },
        { key: "XCNODE-9", testRunId: "12471" },
      ],
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
      key: "XCN-2",
    },
    importingXray: { key: "XCN-6", tests: [{ key: "XCN-1" }] },
    importingXrayMultipart: { issueId: "15357", key: "XCN-7", tests: [{ key: "XCN-1" }] },
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

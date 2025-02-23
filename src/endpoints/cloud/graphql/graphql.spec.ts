import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../../test/clients.js";
import { DATA_CLOUD } from "../../../../test/data.js";
import { GraphQLApi } from "./graphql.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestExecution", () => {
    it("returns test execution data", async () => {
      const response = await XRAY_CLIENT_CLOUD.graphql.getTestExecution(
        {
          issueId: DATA_CLOUD.testExecutions.importingXrayMultipart.issueId,
        },
        (testExecution) => [
          testExecution.issueId,
          testExecution.jira({ fields: ["key"] }),
          testExecution.tests({ limit: 100 }, (testResults) => [
            testResults.results((test) => [
              test.issueId,
              test.testType((testType) => [testType.name]),
            ]),
          ]),
        ]
      );
      assert.deepStrictEqual(response, {
        issueId: DATA_CLOUD.testExecutions.importingXrayMultipart.issueId,
        jira: {
          key: DATA_CLOUD.testExecutions.importingXrayMultipart.key,
        },
        tests: {
          results: [
            {
              issueId: DATA_CLOUD.tests.immutable.issueId,
              testType: {
                name: DATA_CLOUD.tests.immutable.testType,
              },
            },
          ],
        },
      });
    });
  });

  describe("getTestExecutions", () => {
    it("returns test executions data", async () => {
      const response = await XRAY_CLIENT_CLOUD.graphql.getTestExecutions(
        {
          jql: `project = ${DATA_CLOUD.project.key}`,
          limit: 1,
        },
        (testExecutionResults) => [
          testExecutionResults.start,
          testExecutionResults.limit,
          testExecutionResults.results((testExecution) => [
            testExecution.issueId,
            testExecution.jira({ fields: ["key"] }),
            testExecution.tests({ limit: 10 }, (testResults) => [
              testResults.start,
              testResults.limit,
              testResults.results((test) => [
                test.issueId,
                test.jira({ fields: ["key"] }),
                test.testType((testType) => [testType.name]),
              ]),
            ]),
          ]),
        ]
      );
      assert.deepStrictEqual(response, {
        limit: 1,
        results: [
          {
            issueId: DATA_CLOUD.testExecutions.importingXrayMultipart.issueId,
            jira: {
              key: DATA_CLOUD.testExecutions.importingXrayMultipart.key,
            },
            tests: {
              limit: 10,
              results: [
                {
                  issueId: DATA_CLOUD.tests.immutable.issueId,
                  jira: {
                    key: DATA_CLOUD.tests.immutable.key,
                  },
                  testType: {
                    name: DATA_CLOUD.tests.immutable.testType,
                  },
                },
              ],
              start: 0,
            },
          },
        ],
        start: 0,
      });
    });
  });

  describe("getTestPlan", () => {
    it("returns test plan data", async () => {
      const response = await XRAY_CLIENT_CLOUD.graphql.getTestPlan(
        { issueId: DATA_CLOUD.testPlans.immutable.issueId },
        (testPlan) => [
          testPlan.issueId,
          testPlan.jira({ fields: ["key"] }),
          testPlan.tests({ limit: 100 }, (testResults) => [
            testResults.results((test) => [
              test.issueId,
              test.testType((testType) => [testType.name]),
            ]),
          ]),
        ]
      );
      assert.deepStrictEqual(response, {
        issueId: DATA_CLOUD.testPlans.immutable.issueId,
        jira: {
          key: DATA_CLOUD.testPlans.immutable.key,
        },
        tests: {
          results: [
            {
              issueId: DATA_CLOUD.tests.immutable.issueId,
              testType: {
                name: DATA_CLOUD.tests.immutable.testType,
              },
            },
          ],
        },
      });
    });
  });

  describe("getTestPlans", () => {
    it("returns test plans data", async () => {
      const response = await XRAY_CLIENT_CLOUD.graphql.getTestPlans(
        {
          jql: `project = ${DATA_CLOUD.project.key}`,
          limit: 1,
        },
        (testPlanResults) => [
          testPlanResults.start,
          testPlanResults.limit,
          testPlanResults.results((testPlan) => [
            testPlan.issueId,
            testPlan.jira({ fields: ["key"] }),
            testPlan.tests({ limit: 10 }, (testResults) => [
              testResults.start,
              testResults.limit,
              testResults.results((test) => [
                test.issueId,
                test.jira({ fields: ["key"] }),
                test.testType((testType) => [testType.name]),
              ]),
            ]),
          ]),
        ]
      );
      assert.deepStrictEqual(response, {
        limit: 1,
        results: [
          {
            issueId: DATA_CLOUD.testPlans.immutable.issueId,
            jira: {
              key: DATA_CLOUD.testPlans.immutable.key,
            },
            tests: {
              limit: 10,
              results: [
                {
                  issueId: DATA_CLOUD.tests.immutable.issueId,
                  jira: {
                    key: DATA_CLOUD.tests.immutable.key,
                  },
                  testType: {
                    name: DATA_CLOUD.tests.immutable.testType,
                  },
                },
              ],
              start: 0,
            },
          },
        ],
        start: 0,
      });
    });
  });

  describe("getTestRun", () => {
    it("returns test run data", async () => {
      const response = await XRAY_CLIENT_CLOUD.graphql.getTestRun(
        {
          testExecIssueId: DATA_CLOUD.testExecutions.immutable.issueId,
          testIssueId: DATA_CLOUD.tests.immutable.issueId,
        },
        (testRun) => [
          testRun.id,
          testRun.status((status) => [status.name, status.color, status.description]),
          testRun.gherkin,
          testRun.examples((examples) => [
            examples.id,
            examples.status((status) => [status.name, status.color, status.description]),
          ]),
        ]
      );
      assert.deepStrictEqual(response, {
        examples: [],
        gherkin: null,
        id: DATA_CLOUD.testExecutions.immutable.tests[0].testRunId,
        status: {
          color: DATA_CLOUD.testExecutions.immutable.tests[0].status.color,
          description: DATA_CLOUD.testExecutions.immutable.tests[0].status.description,
          name: DATA_CLOUD.testExecutions.immutable.tests[0].status.name,
        },
      });
    });
  });

  describe("getTestRuns", () => {
    it("returns test run data", async () => {
      const response = await XRAY_CLIENT_CLOUD.graphql.getTestRuns(
        { limit: 100, testExecIssueIds: [DATA_CLOUD.testExecutions.immutable.key] },
        (testRunResults) => [
          testRunResults.total,
          testRunResults.limit,
          testRunResults.start,
          testRunResults.results((testRun) => [
            testRun.test((test) => [test.jira({ fields: ["key"] })]),
          ]),
        ]
      );
      assert.deepStrictEqual(response, {
        limit: 100,
        results: [
          {
            test: {
              jira: {
                key: DATA_CLOUD.tests.immutable.key,
              },
            },
          },
        ],
        start: 0,
        total: 1,
      });
    });
  });

  describe("addEvidenceToTestRun", () => {
    const filename = "evidence.txt";

    beforeEach(async () => {
      const controller = new GraphQLApi(XRAY_CLIENT_CLOUD);
      await controller.removeEvidenceFromTestRun(
        {
          evidenceFilenames: [filename],
          id: DATA_CLOUD.testExecutions.addingAttachments.testRunId,
        },
        (removeEvidenceResult) => [removeEvidenceResult.warnings]
      );
    });

    it("adds evidence to test runs", async () => {
      const controller = new GraphQLApi(XRAY_CLIENT_CLOUD);
      const response = await controller.addEvidenceToTestRun(
        {
          evidence: [
            {
              data: "SGVsbG8gV29ybGQ=",
              filename: filename,
              mimeType: "text/plain",
            },
          ],
          id: DATA_CLOUD.testExecutions.addingAttachments.testRunId,
        },
        (addEvidenceResult) => [addEvidenceResult.addedEvidence, addEvidenceResult.warnings]
      );
      assert.deepStrictEqual(response, {
        addedEvidence: [filename],
        warnings: [],
      });
    });
  });

  describe("removeEvidenceFromTestRun", () => {
    const filename = "evidence.txt";

    beforeEach(async () => {
      const controller = new GraphQLApi(XRAY_CLIENT_CLOUD);
      await controller.addEvidenceToTestRun(
        {
          evidence: [
            {
              data: "SGVsbG8gV29ybGQ=",
              filename: filename,
              mimeType: "text/plain",
            },
          ],
          id: DATA_CLOUD.testExecutions.removingAttachments.tests[0].testRunId,
        },
        (addEvidenceResult) => [addEvidenceResult.addedEvidence, addEvidenceResult.warnings]
      );
    });

    it("removes evidence from test runs", async () => {
      const controller = new GraphQLApi(XRAY_CLIENT_CLOUD);
      const response = await controller.removeEvidenceFromTestRun(
        {
          evidenceFilenames: [filename],
          id: DATA_CLOUD.testExecutions.removingAttachments.tests[0].testRunId,
        },
        (removeEvidenceResult) => [
          removeEvidenceResult.removedEvidence,
          removeEvidenceResult.warnings,
        ]
      );
      assert.deepStrictEqual(response.warnings, []);
      assert.strictEqual(response.removedEvidence?.length, 1);
      assert.strictEqual(typeof response.removedEvidence[0], "string");
    });
  });
});

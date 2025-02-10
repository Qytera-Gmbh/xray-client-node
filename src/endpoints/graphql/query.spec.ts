import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { QueryApi } from "./query.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestPlan", () => {
    it("returns test plan data", async () => {
      const controller = new QueryApi(XRAY_CLIENT_CLOUD);
      const response = await controller.getTestPlan({ issueId: "15051" }, (testPlan) => [
        testPlan.issueId,
        testPlan.jira({ fields: ["key"] }),
        testPlan.tests({ limit: 100 }, (testResults) => [
          testResults.results((test) => [
            test.issueId,
            test.testType((testType) => [testType.name]),
          ]),
        ]),
      ]);
      assert.deepStrictEqual(response, {
        issueId: "15051",
        jira: {
          key: "XCN-3",
        },
        tests: {
          results: [
            {
              issueId: "15049",
              testType: {
                name: "Manual",
              },
            },
          ],
        },
      });
    });
  });

  describe("getTestPlans", () => {
    it("returns test plans data", async () => {
      const controller = new QueryApi(XRAY_CLIENT_CLOUD);
      const response = await controller.getTestPlans(
        {
          jql: "project = XCN",
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
            issueId: "15051",
            jira: {
              key: "XCN-3",
            },
            tests: {
              limit: 10,
              results: [
                {
                  issueId: "15049",
                  jira: {
                    key: "XCN-1",
                  },
                  testType: {
                    name: "Manual",
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

  describe("getTestRuns", () => {
    it("returns test run data", async () => {
      const controller = new QueryApi(XRAY_CLIENT_CLOUD);
      const response = await controller.getTestRuns(
        { limit: 100, testExecIssueIds: ["XCN-2"] },
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
                key: "XCN-1",
              },
            },
          },
        ],
        start: 0,
        total: 1,
      });
    });
  });
});

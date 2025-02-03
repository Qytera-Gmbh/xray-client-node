import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { GetTestPlansApi } from "./get-test-plans.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("query", () => {
    it("returns test plans data", async () => {
      const controller = new GetTestPlansApi(XRAY_CLIENT_CLOUD);
      const response = await controller.query(
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
});

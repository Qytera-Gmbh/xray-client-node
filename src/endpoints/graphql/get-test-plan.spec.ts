import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { GetTestPlanApi } from "./get-test-plan.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("query", () => {
    it("returns test plan data", async () => {
      const controller = new GetTestPlanApi(XRAY_CLIENT_CLOUD);
      const response = await controller.query({ issueId: "15051" }, (testPlan) => [
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
        data: {
          getTestPlan: {
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
          },
        },
      });
    });
  });
});

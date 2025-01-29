import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { GetTestPlanApi } from "./get-test-plan.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("query", () => {
    it("returns test plan data", async () => {
      const controller = new GetTestPlanApi(XRAY_CLIENT_CLOUD);
      const response = await controller.query(
        { issueId: "15051" },
        `
          issueId
          jira(fields: ["key"])
          tests(limit: 100) {
            results {
              issueId
              testType {
                name
              }
            }              
          }
        `
      );
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

import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { GetTestRuns } from "./get-test-runs.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("query", () => {
    it("returns test run data", async () => {
      const controller = new GetTestRuns(XRAY_CLIENT_CLOUD);
      const response = await controller.query(
        { limit: 100, testExecIssueIds: ["XCN-2"] },
        `
          total
          limit
          start
          results {
            test {
              jira(fields: ["key"])
            }
          }
        `
      );
      assert.deepStrictEqual(response, {
        data: {
          getTestRuns: {
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
          },
        },
      });
    });
  });
});

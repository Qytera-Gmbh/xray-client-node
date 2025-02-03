import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { GetTestRunsApi } from "./get-test-runs.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("query", () => {
    it("returns test run data", async () => {
      const controller = new GetTestRunsApi(XRAY_CLIENT_CLOUD);
      const response = await controller.query(
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

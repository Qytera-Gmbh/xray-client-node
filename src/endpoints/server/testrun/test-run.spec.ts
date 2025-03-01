import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestRun", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_SERVER.testRuns.getTestRun.v1],
      ["v2", XRAY_CLIENT_SERVER.testRuns.getTestRun],
    ] as const) {
      describe(version, () => {
        it("returns test run details by id", async () => {
          const content = await endpoint(DATA_SERVER.testExecutions.immutable.tests[0].testRunId);
          assert.strictEqual(content.testKey, DATA_SERVER.testExecutions.immutable.tests[0].key);
        });

        it("returns test run details by query", async () => {
          const content = await endpoint({
            testExecIssueKey: DATA_SERVER.testExecutions.immutable.key,
            testIssueKey: DATA_SERVER.testExecutions.immutable.tests[0].key,
          });
          assert.strictEqual(content.testKey, DATA_SERVER.testExecutions.immutable.tests[0].key);
        });
      });
    }
  });

  describe("updateTestRun", () => {
    for (const [version, endpoint, issue] of [
      [
        "v1",
        XRAY_CLIENT_SERVER.testRuns.updateTestRun.v1,
        DATA_SERVER.testExecutions.updateTestRun.v1,
      ],
      [
        "v2",
        XRAY_CLIENT_SERVER.testRuns.updateTestRun,
        DATA_SERVER.testExecutions.updateTestRun.v2,
      ],
    ] as const) {
      describe(version, () => {
        beforeEach(async () => {
          await endpoint(issue.tests[1].testRunId, {
            status: "TODO",
            steps: [
              { id: issue.tests[1].steps[0].id, status: "TODO" },
              { id: issue.tests[1].steps[1].id, status: "TODO" },
            ],
          });
          const content = await XRAY_CLIENT_SERVER.testRuns.getTestRun(issue.tests[1].testRunId);
          assert.strictEqual(content.status, "TODO");
          assert.strictEqual(content.steps?.[0].status, "TODO");
          assert.strictEqual(content.steps[1].status, "TODO");
        });

        it("updates test run details", async () => {
          await endpoint(issue.tests[1].testRunId, {
            status: "EXECUTING",
            steps: [
              { id: issue.tests[1].steps[0].id, status: "EXECUTING" },
              { id: issue.tests[1].steps[1].id, status: "EXECUTING" },
            ],
          });
          const content = await XRAY_CLIENT_SERVER.testRuns.getTestRun(issue.tests[1].testRunId);
          assert.strictEqual(content.status, "EXECUTING");
          assert.strictEqual(content.steps?.[0].status, "EXECUTING");
          assert.strictEqual(content.steps[1].status, "EXECUTING");
        });
      });
    }
  });
});

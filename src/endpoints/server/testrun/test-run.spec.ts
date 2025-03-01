import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  for (const [version, endpoint] of [
    ["v1", XRAY_CLIENT_SERVER.testRuns.v1],
    ["v2", XRAY_CLIENT_SERVER.testRuns],
  ] as const) {
    describe(version, () => {
      describe("getTestRun", () => {
        it("returns test run details by id", async () => {
          const content = await endpoint.getTestRun(
            DATA_SERVER.testExecutions.immutable.tests[0].testRunId
          );
          assert.strictEqual(content.testKey, DATA_SERVER.testExecutions.immutable.tests[0].key);
        });

        it("returns test run details by query", async () => {
          const content = await endpoint.getTestRun({
            testExecIssueKey: DATA_SERVER.testExecutions.immutable.key,
            testIssueKey: DATA_SERVER.testExecutions.immutable.tests[0].key,
          });
          assert.strictEqual(content.testKey, DATA_SERVER.testExecutions.immutable.tests[0].key);
        });
      });

      describe("updateTestRun", () => {
        beforeEach(async () => {
          await endpoint.updateTestRun(
            DATA_SERVER.testExecutions.updateTestRun.tests[1].testRunId,
            {
              status: "TODO",
              steps: [
                { id: "4423", status: "TODO" },
                { id: "4424", status: "TODO" },
              ],
            }
          );
          const content = await endpoint.getTestRun(
            DATA_SERVER.testExecutions.updateTestRun.tests[1].testRunId
          );
          assert.strictEqual(content.status, "TODO");
          assert.strictEqual(content.steps?.[0].status, "TODO");
          assert.strictEqual(content.steps[1].status, "TODO");
        });

        it("updates test run details", async () => {
          await endpoint.updateTestRun(
            DATA_SERVER.testExecutions.updateTestRun.tests[1].testRunId,
            {
              status: "EXECUTING",
              steps: [
                { id: "4423", status: "EXECUTING" },
                { id: "4424", status: "EXECUTING" },
              ],
            }
          );
          const content = await endpoint.getTestRun(
            DATA_SERVER.testExecutions.updateTestRun.tests[1].testRunId
          );
          assert.strictEqual(content.status, "EXECUTING");
          assert.strictEqual(content.steps?.[0].status, "EXECUTING");
          assert.strictEqual(content.steps[1].status, "EXECUTING");
        });
      });
    });
  }
});

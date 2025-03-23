import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getStatus", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.status]] as const) {
      describe(version, () => {
        it("returns the test run status", async () => {
          const content = await endpoint.getStatus(
            DATA_SERVER.testExecutions.immutable.tests[0].testRunId
          );
          assert.strictEqual(content, DATA_SERVER.testExecutions.immutable.tests[0].status);
        });
      });
    }
  });

  describe("updateStatus", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.status]] as const) {
      describe(version, () => {
        beforeEach(async () => {
          await endpoint.updateStatus(
            DATA_SERVER.testExecutions.updateTestRunStatuses.tests[0].testRunId,
            { status: DATA_SERVER.testExecutions.updateTestRunStatuses.tests[0].initialStatus }
          );
          const content = await endpoint.getStatus(
            DATA_SERVER.testExecutions.updateTestRunStatuses.tests[0].testRunId
          );
          assert.strictEqual(
            content,
            DATA_SERVER.testExecutions.updateTestRunStatuses.tests[0].initialStatus
          );
        });

        it("updates the test run status", async () => {
          await endpoint.updateStatus(
            DATA_SERVER.testExecutions.updateTestRunStatuses.tests[0].testRunId,
            { status: DATA_SERVER.testExecutions.updateTestRunStatuses.tests[0].updatedStatus }
          );
          const content = await endpoint.getStatus(
            DATA_SERVER.testExecutions.updateTestRunStatuses.tests[0].testRunId
          );
          assert.strictEqual(
            content,
            DATA_SERVER.testExecutions.updateTestRunStatuses.tests[0].updatedStatus
          );
        });
      });
    }
  });
});

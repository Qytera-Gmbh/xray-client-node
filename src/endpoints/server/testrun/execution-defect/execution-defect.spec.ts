import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getDefects", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.defect]] as const) {
      describe(version, () => {
        it("returns defect content", async () => {
          const content = await endpoint.getDefects(
            DATA_SERVER.testExecutions.immutable.tests[1].testRunId
          );
          assert.strictEqual(content.length, 1);
          assert.strictEqual(
            content[0].key,
            DATA_SERVER.testExecutions.immutable.tests[1].defects[0].key
          );
        });
      });
    }
  });

  describe("addDefects", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.defect]] as const) {
      describe(version, () => {
        beforeEach(async () => {
          await endpoint.removeDefect(
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.addDefects.testRunId,
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.addDefects.defects[0].key
          );
          const content = await endpoint.getDefects(
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.addDefects.testRunId
          );
          assert.strictEqual(content.length, 0);
        });

        it("adds defects", async () => {
          await endpoint.addDefects(
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.addDefects.testRunId,
            [DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.addDefects.defects[0].key]
          );
          const content = await endpoint.getDefects(
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.addDefects.testRunId
          );
          assert.strictEqual(content.length, 1);
          assert.strictEqual(
            content[0].key,
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.addDefects.defects[0].key
          );
        });
      });
    }
  });

  describe("removeDefect", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.defect]] as const) {
      describe(version, () => {
        beforeEach(async () => {
          await endpoint.addDefects(
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.removeDefects.testRunId,
            [DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.removeDefects.defects[0].key]
          );
          const content = await endpoint.getDefects(
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.removeDefects.testRunId
          );
          assert.strictEqual(content.length, 1);
        });

        it("removes defects", async () => {
          await endpoint.removeDefect(
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.removeDefects.testRunId,
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.removeDefects.defects[0].key
          );
          const content = await endpoint.getDefects(
            DATA_SERVER.testExecutions.updateTestRunDefects.testRuns.removeDefects.testRunId
          );
          assert.strictEqual(content.length, 0);
        });
      });
    }
  });
});

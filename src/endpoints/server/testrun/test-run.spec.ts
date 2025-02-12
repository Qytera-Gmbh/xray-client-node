import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/data.js";
import { TestRunApi } from "./test-run.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestRun", () => {
    it("returns test run details by id", async () => {
      const controller = new TestRunApi(XRAY_CLIENT_SERVER);
      const content = await controller.getTestRun(
        DATA_SERVER.testExecutions.immutable.tests[0].testRunId
      );
      assert.strictEqual(content.testKey, DATA_SERVER.testExecutions.immutable.tests[0].key);
    });

    it("returns test run details by query", async () => {
      const controller = new TestRunApi(XRAY_CLIENT_SERVER);
      const content = await controller.getTestRun({
        testExecIssueKey: DATA_SERVER.testExecutions.immutable.key,
        testIssueKey: DATA_SERVER.testExecutions.immutable.tests[0].key,
      });
      assert.strictEqual(content.testKey, DATA_SERVER.testExecutions.immutable.tests[0].key);
    });
  });

  describe("updateTestRun", () => {
    beforeEach(async () => {
      const controller = new TestRunApi(XRAY_CLIENT_SERVER);
      await controller.updateTestRun(DATA_SERVER.testExecutions.updateTestRun.tests[1].testRunId, {
        status: "TODO",
        steps: [
          { id: "4423", status: "TODO" },
          { id: "4424", status: "TODO" },
        ],
      });
      const content = await controller.getTestRun(
        DATA_SERVER.testExecutions.updateTestRun.tests[1].testRunId
      );
      assert.strictEqual(content.status, "TODO");
      assert.strictEqual(content.steps?.[0].status, "TODO");
      assert.strictEqual(content.steps[1].status, "TODO");
    });

    it("updates test run details", async () => {
      const controller = new TestRunApi(XRAY_CLIENT_SERVER);
      await controller.updateTestRun(DATA_SERVER.testExecutions.updateTestRun.tests[1].testRunId, {
        status: "EXECUTING",
        steps: [
          { id: "4423", status: "EXECUTING" },
          { id: "4424", status: "EXECUTING" },
        ],
      });
      const content = await controller.getTestRun(
        DATA_SERVER.testExecutions.updateTestRun.tests[1].testRunId
      );
      assert.strictEqual(content.status, "EXECUTING");
      assert.strictEqual(content.steps?.[0].status, "EXECUTING");
      assert.strictEqual(content.steps[1].status, "EXECUTING");
    });
  });
});

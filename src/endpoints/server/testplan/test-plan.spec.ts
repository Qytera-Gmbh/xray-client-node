import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/data.js";
import { TestPlanApi } from "./test-plan.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestExecutions", () => {
    it("returns test execution data", async () => {
      const controller = new TestPlanApi(XRAY_CLIENT_SERVER);
      const content = await controller.getTestExecutions(DATA_SERVER.testPlans.immutable.key);
      assert.strictEqual(content.length, 2);
      assert.strictEqual(content[0].key, DATA_SERVER.testPlans.immutable.testExecutions[0]);
      assert.strictEqual(content[1].key, DATA_SERVER.testPlans.immutable.testExecutions[1]);
    });
  });

  describe("getTests", () => {
    it("returns test data", async () => {
      const controller = new TestPlanApi(XRAY_CLIENT_SERVER);
      const content = await controller.getTests(DATA_SERVER.testPlans.immutable.key);
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].key, DATA_SERVER.testPlans.immutable.tests[0]);
    });
  });
});

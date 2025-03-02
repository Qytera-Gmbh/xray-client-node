import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestExecutions", () => {
    it("returns test execution data", async () => {
      const content = await XRAY_CLIENT_SERVER.testPlan.getTestExecutions(
        DATA_SERVER.testPlans.immutable.key
      );
      assert.strictEqual(content.length, 2);
      assert.strictEqual(content[0].key, DATA_SERVER.testPlans.immutable.testExecutions[0].key);
      assert.strictEqual(content[1].key, DATA_SERVER.testPlans.immutable.testExecutions[1].key);
    });
  });

  describe("getTests", () => {
    it("returns test data", async () => {
      const content = await XRAY_CLIENT_SERVER.testPlan.getTests(
        DATA_SERVER.testPlans.immutable.key
      );
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].key, DATA_SERVER.testPlans.immutable.tests[0].key);
    });
  });
});

import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../test/clients.js";
import { TestPlanApi } from "./test-plan.js";

const TEST_PLAN_KEYS = {
  immutable: "CYPLUG-1406",
};

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestExecutions", () => {
    it("returns test execution content", async () => {
      const controller = new TestPlanApi(XRAY_CLIENT_SERVER);
      const content = await controller.getTestExecutions(TEST_PLAN_KEYS.immutable);
      assert.strictEqual(content.length, 2);
      assert.strictEqual(content[0].key, "CYPLUG-1404");
      assert.strictEqual(content[1].key, "CYPLUG-1405");
    });
  });

  describe("getTests", () => {
    it("adds evidence data", async () => {
      const controller = new TestPlanApi(XRAY_CLIENT_SERVER);
      const content = await controller.getTests(TEST_PLAN_KEYS.immutable);
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].key, "CYPLUG-1403");
    });
  });
});

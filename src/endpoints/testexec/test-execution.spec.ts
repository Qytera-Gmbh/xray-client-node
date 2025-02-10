import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../test/clients.js";
import { TestExecutionApi } from "./test-execution.js";

const TEST_EXECUTION_KEYS = {
  immutable: "CYPLUG-1404",
};

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTests", () => {
    it("returns test data", async () => {
      const controller = new TestExecutionApi(XRAY_CLIENT_SERVER);
      const content = await controller.getTests(TEST_EXECUTION_KEYS.immutable);
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].key, "CYPLUG-1403");
    });
  });
});

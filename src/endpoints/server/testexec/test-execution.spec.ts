import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTests", () => {
    it("returns test data", async () => {
      const content = await XRAY_CLIENT_SERVER.testExecutions.getTests(
        DATA_SERVER.testExecutions.immutable.key
      );
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].key, DATA_SERVER.tests.immutableDatadriven.key);
    });
  });
});

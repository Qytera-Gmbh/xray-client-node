import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTests", () => {
    it("returns tests through the keys parameter", async () => {
      const tests = await XRAY_CLIENT_SERVER.test.getTests({
        keys: [DATA_SERVER.tests.immutableDatadriven.key, DATA_SERVER.tests.immutable.key],
      });
      assert.strictEqual(tests.length, 2);
      assert.strictEqual(tests[0].key, DATA_SERVER.tests.immutable.key);
      assert.strictEqual(tests[1].key, DATA_SERVER.tests.immutableDatadriven.key);
    });

    it("returns tests through the jql parameter", async () => {
      const tests = await XRAY_CLIENT_SERVER.test.getTests({
        jql: `key in (${DATA_SERVER.tests.immutableDatadriven.key})`,
      });
      assert.strictEqual(tests.length, 1);
      assert.strictEqual(tests[0].key, DATA_SERVER.tests.immutableDatadriven.key);
    });
  });
});

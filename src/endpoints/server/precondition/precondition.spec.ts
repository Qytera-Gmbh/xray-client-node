import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTests", () => {
    it("returns test data", async () => {
      const content = await XRAY_CLIENT_SERVER.precondition.getTests(
        DATA_SERVER.preconditions.immutable.key
      );
      assert.strictEqual(content.length, DATA_SERVER.preconditions.immutable.tests.length);
      assert.strictEqual(content[0].key, DATA_SERVER.preconditions.immutable.tests[0].key);
      assert.strictEqual(
        content[0].precondition[0].preconditionKey,
        DATA_SERVER.preconditions.immutable.key
      );
    });
  });
});

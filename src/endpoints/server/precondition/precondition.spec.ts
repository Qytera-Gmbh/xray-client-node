import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
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

  describe("associateTests", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.precondition.associateTests(DATA_SERVER.preconditions.addTests.key, {
        add: [DATA_SERVER.tests.updateTestSteps.v2.key],
        remove: [DATA_SERVER.tests.updateTestSteps.v1.key],
      });
    });

    it("associates tests with the precondition", async () => {
      const warnings = await XRAY_CLIENT_SERVER.precondition.associateTests(
        DATA_SERVER.preconditions.addTests.key,
        {
          add: [DATA_SERVER.tests.updateTestSteps.v1.key],
          remove: [DATA_SERVER.tests.updateTestSteps.v2.key],
        }
      );
      assert.strictEqual(warnings.length, 0);
      const content = await XRAY_CLIENT_SERVER.precondition.getTests(
        DATA_SERVER.preconditions.addTests.key
      );
      assert.deepStrictEqual(
        content.map((test) => test.key),
        [DATA_SERVER.tests.updateTestSteps.v1.key]
      );
    });
  });

  describe("removeTests", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.precondition.associateTests(
        DATA_SERVER.preconditions.removeTests.key,
        {
          add: [DATA_SERVER.tests.updateTestSteps.v1.key],
        }
      );
    });

    it("removes tests from preconditions", async () => {
      await XRAY_CLIENT_SERVER.precondition.removeTest(
        DATA_SERVER.preconditions.removeTests.key,
        DATA_SERVER.tests.updateTestSteps.v1.key
      );
      const content = await XRAY_CLIENT_SERVER.precondition.getTests(
        DATA_SERVER.preconditions.removeTests.key
      );
      assert.strictEqual(content.length, 0);
    });
  });
});

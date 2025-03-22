import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTests", () => {
    it("returns test data", async () => {
      const content = await XRAY_CLIENT_SERVER.testSet.getTests(DATA_SERVER.testSets.immutable.key);
      assert.strictEqual(content.length, DATA_SERVER.testSets.immutable.tests.length);
      assert.strictEqual(content[0].key, DATA_SERVER.testSets.immutable.tests[0].key);
    });

    it("includes test definitions by default", async () => {
      const content = await XRAY_CLIENT_SERVER.testSet.getTests(DATA_SERVER.testSets.immutable.key);
      assert.ok("definition" in content[0]);
    });

    it("includes test definitions if the query parameter is true", async () => {
      const content = await XRAY_CLIENT_SERVER.testSet.getTests(
        DATA_SERVER.testSets.immutable.key,
        { testDefinition: true }
      );
      assert.ok("definition" in content[0]);
    });

    it("does not include test definitions if the query parameter is false", async () => {
      const content = await XRAY_CLIENT_SERVER.testSet.getTests(
        DATA_SERVER.testSets.immutable.key,
        { testDefinition: false }
      );
      assert.ok(!("definition" in content[0]));
    });
  });

  describe("associateTests", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.testSet.associateTests(DATA_SERVER.testSets.addTests.key, {
        add: [DATA_SERVER.tests.updateTestSteps.v2.key],
        remove: [DATA_SERVER.tests.updateTestSteps.v1.key],
      });
    });

    it("associates tests with the test set", async () => {
      const warnings = await XRAY_CLIENT_SERVER.testSet.associateTests(
        DATA_SERVER.testSets.addTests.key,
        {
          add: [DATA_SERVER.tests.updateTestSteps.v1.key],
          remove: [DATA_SERVER.tests.updateTestSteps.v2.key],
        }
      );
      assert.strictEqual(warnings.length, 0);
      const content = await XRAY_CLIENT_SERVER.testSet.getTests(DATA_SERVER.testSets.addTests.key);
      assert.deepStrictEqual(
        content.map((test) => test.key),
        [DATA_SERVER.tests.updateTestSteps.v1.key]
      );
    });
  });

  describe("removeTests", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.testSet.associateTests(DATA_SERVER.testSets.removeTests.key, {
        add: [DATA_SERVER.tests.updateTestSteps.v1.key],
      });
    });

    it("removes tests from test sets", async () => {
      await XRAY_CLIENT_SERVER.testSet.removeTest(
        DATA_SERVER.testSets.removeTests.key,
        DATA_SERVER.tests.updateTestSteps.v1.key
      );
      const content = await XRAY_CLIENT_SERVER.testSet.getTests(
        DATA_SERVER.testSets.removeTests.key
      );
      assert.strictEqual(content.length, 0);
    });
  });
});

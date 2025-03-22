import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTests", () => {
    it("returns test data", async () => {
      const content = await XRAY_CLIENT_SERVER.testExecution.getTests(
        DATA_SERVER.testExecutions.immutable.key
      );
      assert.strictEqual(content.length, 2);
      assert.strictEqual(content[0].key, DATA_SERVER.tests.immutableDatadriven.key);
    });
  });

  describe("associateTests", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.testExecution.associateTests(
        DATA_SERVER.testExecutions.addTests.key,
        {
          add: [DATA_SERVER.tests.updateTestSteps.v2.key],
          remove: [DATA_SERVER.tests.updateTestSteps.v1.key],
        }
      );
    });

    it("associates tests with the test execution", async () => {
      const warnings = await XRAY_CLIENT_SERVER.testExecution.associateTests(
        DATA_SERVER.testExecutions.addTests.key,
        {
          add: [DATA_SERVER.tests.updateTestSteps.v1.key],
          remove: [DATA_SERVER.tests.updateTestSteps.v2.key],
        }
      );
      assert.strictEqual(warnings.length, 0);
      const content = await XRAY_CLIENT_SERVER.testExecution.getTests(
        DATA_SERVER.testExecutions.addTests.key
      );
      assert.deepStrictEqual(
        content.map((test) => test.key),
        [DATA_SERVER.tests.updateTestSteps.v1.key]
      );
    });
  });

  describe("removeTests", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.testExecution.associateTests(
        DATA_SERVER.testExecutions.removeTests.key,
        {
          add: [DATA_SERVER.tests.updateTestSteps.v1.key],
        }
      );
    });

    it("removes tests from test test executions", async () => {
      await XRAY_CLIENT_SERVER.testExecution.removeTest(
        DATA_SERVER.testExecutions.removeTests.key,
        DATA_SERVER.tests.updateTestSteps.v1.key
      );
      const content = await XRAY_CLIENT_SERVER.testExecution.getTests(
        DATA_SERVER.testExecutions.removeTests.key
      );
      assert.strictEqual(content.length, 0);
    });
  });
});

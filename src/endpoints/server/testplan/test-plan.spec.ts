import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
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
      assert.strictEqual(content.length, DATA_SERVER.testPlans.immutable.tests.length);
      assert.strictEqual(content[0].key, DATA_SERVER.testPlans.immutable.tests[0].key);
    });
  });

  describe("associateTests", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.testPlan.associateTests(DATA_SERVER.testPlans.addTests.key, {
        add: [DATA_SERVER.tests.updateTestSteps.v2.key],
        remove: [DATA_SERVER.tests.updateTestSteps.v1.key],
      });
    });

    it("associates tests with the test plan", async () => {
      const warnings = await XRAY_CLIENT_SERVER.testPlan.associateTests(
        DATA_SERVER.testPlans.addTests.key,
        {
          add: [DATA_SERVER.tests.updateTestSteps.v1.key],
          remove: [DATA_SERVER.tests.updateTestSteps.v2.key],
        }
      );
      assert.strictEqual(warnings.length, 0);
      const content = await XRAY_CLIENT_SERVER.testPlan.getTests(
        DATA_SERVER.testPlans.addTests.key
      );
      assert.deepStrictEqual(
        content.map((test) => test.key),
        [DATA_SERVER.tests.updateTestSteps.v1.key]
      );
    });
  });

  describe("removeTests", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.testPlan.associateTests(DATA_SERVER.testPlans.removeTests.key, {
        add: [DATA_SERVER.tests.updateTestSteps.v1.key],
      });
    });

    it("removes tests from test plans", async () => {
      await XRAY_CLIENT_SERVER.testPlan.removeTest(
        DATA_SERVER.testPlans.removeTests.key,
        DATA_SERVER.tests.updateTestSteps.v1.key
      );
      const content = await XRAY_CLIENT_SERVER.testPlan.getTests(
        DATA_SERVER.testPlans.removeTests.key
      );
      assert.strictEqual(content.length, 0);
    });
  });

  describe("associateTestExecutions", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.testPlan.associateTestExecutions(
        DATA_SERVER.testPlans.addTestExecutions.key,
        {
          add: [DATA_SERVER.testExecutions.importXray.v2.key],
          remove: [DATA_SERVER.testExecutions.importXray.v1.key],
        }
      );
    });

    it("associates tests with the test plan", async () => {
      const warnings = await XRAY_CLIENT_SERVER.testPlan.associateTestExecutions(
        DATA_SERVER.testPlans.addTestExecutions.key,
        {
          add: [DATA_SERVER.testExecutions.importXray.v1.key],
          remove: [DATA_SERVER.testExecutions.importXray.v2.key],
        }
      );
      assert.strictEqual(warnings.length, 0);
      const content = await XRAY_CLIENT_SERVER.testPlan.getTestExecutions(
        DATA_SERVER.testPlans.addTestExecutions.key
      );
      assert.deepStrictEqual(
        content.map((testExecution) => testExecution.key),
        [DATA_SERVER.testExecutions.importXray.v1.key]
      );
    });
  });

  describe("removeTestExecution", () => {
    beforeEach(async () => {
      await XRAY_CLIENT_SERVER.testPlan.associateTestExecutions(
        DATA_SERVER.testPlans.removeTestExecutions.key,
        {
          add: [DATA_SERVER.testExecutions.importXray.v1.key],
        }
      );
    });

    it("removes tests from test plans", async () => {
      await XRAY_CLIENT_SERVER.testPlan.removeTestExecution(
        DATA_SERVER.testPlans.removeTestExecutions.key,
        DATA_SERVER.testExecutions.importXray.v1.key
      );
      const content = await XRAY_CLIENT_SERVER.testPlan.getTestExecutions(
        DATA_SERVER.testPlans.removeTestExecutions.key
      );
      assert.strictEqual(content.length, 0);
    });
  });
});

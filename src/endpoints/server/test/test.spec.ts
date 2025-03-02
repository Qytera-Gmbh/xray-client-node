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

  describe("getTestRuns", () => {
    it("returns test runs without query parameter", async () => {
      const testRuns = await XRAY_CLIENT_SERVER.test.getTestRuns(
        DATA_SERVER.testExecutions.immutable.tests[0].key
      );
      const testRun = testRuns.find(
        (r) => r.id === DATA_SERVER.testExecutions.immutable.tests[0].testRunId
      );
      assert.ok(testRun);
    });

    it("returns test runs with query parameter", async () => {
      const testRuns = await XRAY_CLIENT_SERVER.test.getTestRuns(
        DATA_SERVER.testExecutions.immutable.tests[0].key,
        {
          testEnvironments: DATA_SERVER.testExecutions.immutable.testEnvironments.map(
            (e) => e.name
          ),
        }
      );
      const testRun = testRuns.find(
        (r) => r.id === DATA_SERVER.testExecutions.immutable.tests[0].testRunId
      );
      assert.deepStrictEqual(
        testRun?.testEnvironments,
        DATA_SERVER.testExecutions.immutable.testEnvironments.map((e) => e.name)
      );
    });
  });

  describe("getPreconditions", () => {
    it("returns test preconditions", async () => {
      const preconditions = await XRAY_CLIENT_SERVER.test.getPreconditions(
        DATA_SERVER.preconditions.immutable.tests[0].key
      );
      assert.deepStrictEqual(preconditions[0].key, DATA_SERVER.preconditions.immutable.key);
    });
  });

  describe("getTestSets", () => {
    it("returns test sets", async () => {
      const testSets = await XRAY_CLIENT_SERVER.test.getTestSets(
        DATA_SERVER.testSets.immutable.tests[0].key
      );
      assert.deepStrictEqual(testSets[0].key, DATA_SERVER.testSets.immutable.key);
    });
  });

  describe("getTestExecutions", () => {
    it("returns test executions", async () => {
      const testExecutions = await XRAY_CLIENT_SERVER.test.getTestExecutions(
        DATA_SERVER.testExecutions.immutable.tests[0].key
      );
      assert.deepStrictEqual(testExecutions[0].key, DATA_SERVER.testExecutions.immutable.key);
    });
  });
});

import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getExamples", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.example]] as const) {
      describe(version, () => {
        it("returns the test run examples", async () => {
          const content = await endpoint.getExamples(
            DATA_SERVER.testExecutions.immutableCucumber.tests[0].testRunId
          );
          assert.deepStrictEqual(
            content.map((example) => example.id),
            DATA_SERVER.testExecutions.immutableCucumber.tests[0].examples.map(
              (example) => example.id
            )
          );
        });
      });
    }
  });

  describe("getExample", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.example]] as const) {
      describe(version, () => {
        it("returns the test run examples", async () => {
          const content = await endpoint.getExample(
            DATA_SERVER.testExecutions.immutableCucumber.tests[0].testRunId,
            0
          );
          assert.deepStrictEqual(
            content.id,
            DATA_SERVER.testExecutions.immutableCucumber.tests[0].examples[1].id
          );
        });
      });
    }
  });

  describe("updateExample", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.example]] as const) {
      describe(version, () => {
        beforeEach(async () => {
          await endpoint.updateExample(
            DATA_SERVER.testExecutions.updateCucumberExamples.tests[0].testRunId,
            0,
            {
              status: DATA_SERVER.testExecutions.updateCucumberExamples.tests[0].initialStatuses[0],
            }
          );
          const content = await endpoint.getExample(
            DATA_SERVER.testExecutions.updateCucumberExamples.tests[0].testRunId,
            0
          );
          assert.strictEqual(
            content.status,
            DATA_SERVER.testExecutions.updateCucumberExamples.tests[0].initialStatuses[0]
          );
        });

        it("updates the test run example", async () => {
          await endpoint.updateExample(
            DATA_SERVER.testExecutions.updateCucumberExamples.tests[0].testRunId,
            0,
            {
              status: DATA_SERVER.testExecutions.updateCucumberExamples.tests[0].updatedStatuses[0],
            }
          );
          const content = await endpoint.getExample(
            DATA_SERVER.testExecutions.updateCucumberExamples.tests[0].testRunId,
            0
          );
          assert.strictEqual(
            content.status,
            DATA_SERVER.testExecutions.updateCucumberExamples.tests[0].updatedStatuses[0]
          );
        });
      });
    }
  });
});

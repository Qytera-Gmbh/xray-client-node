import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getComment", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.comment]] as const) {
      describe(version, () => {
        it("returns the test run comment", async () => {
          const content = await endpoint.getComment(
            DATA_SERVER.testExecutions.immutable.tests[0].testRunId
          );
          assert.deepStrictEqual(content, DATA_SERVER.testExecutions.immutable.tests[0].comment);
        });
      });
    }
  });

  describe("updateComment", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.comment]] as const) {
      describe(version, () => {
        beforeEach(async () => {
          await endpoint.updateComment(
            DATA_SERVER.testExecutions.updateTestRunComments.tests[0].testRunId,
            DATA_SERVER.testExecutions.updateTestRunComments.tests[0].initialComment.raw
          );
          const content = await endpoint.getComment(
            DATA_SERVER.testExecutions.updateTestRunComments.tests[0].testRunId
          );
          assert.deepStrictEqual(
            content,
            DATA_SERVER.testExecutions.updateTestRunComments.tests[0].initialComment
          );
        });

        it("updates the test run comment", async () => {
          await endpoint.updateComment(
            DATA_SERVER.testExecutions.updateTestRunComments.tests[0].testRunId,
            DATA_SERVER.testExecutions.updateTestRunComments.tests[0].updatedComment.raw
          );
          const content = await endpoint.getComment(
            DATA_SERVER.testExecutions.updateTestRunComments.tests[0].testRunId
          );
          assert.deepStrictEqual(
            content,
            DATA_SERVER.testExecutions.updateTestRunComments.tests[0].updatedComment
          );
        });
      });
    }
  });
});

import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  for (const [version, endpoint] of [
    ["v1", XRAY_CLIENT_SERVER.testRuns.evidence.v1],
    ["v2", XRAY_CLIENT_SERVER.testRuns.evidence],
  ] as const) {
    describe(version, () => {
      describe("getEvidence", () => {
        it("returns evidence content", async () => {
          const content = await endpoint.getEvidence(
            DATA_SERVER.testExecutions.immutable.tests[0].testRunId
          );
          assert.strictEqual(content.length, 1);
          assert.strictEqual(content[0].fileName, "evidence.txt");
        });
      });

      describe("addEvidence", () => {
        beforeEach(async () => {
          for (const evidence of await endpoint.getEvidence(
            DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
          )) {
            await endpoint.deleteEvidenceByName(
              DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
              evidence.fileName
            );
          }
        });

        it("adds evidence data", async () => {
          await endpoint.addEvidence(
            DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
            {
              contentType: "text/plain",
              data: Buffer.from("hello world").toString("base64"),
              filename: "hello.txt",
            }
          );
          const content = await endpoint.getEvidence(
            DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
          );
          assert.strictEqual(content.length, 1);
          assert.strictEqual(content[0].fileName, "hello.txt");
        });
      });

      describe("deleteEvidenceById", () => {
        beforeEach(async () => {
          for (const evidence of await endpoint.getEvidence(
            DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
          )) {
            await endpoint.deleteEvidenceByName(
              DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
              evidence.fileName
            );
          }
          await endpoint.addEvidence(
            DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
            {
              contentType: "text/plain",
              data: Buffer.from("hello world").toString("base64"),
              filename: "delete-by-id.txt",
            }
          );
        });

        it("deletes evidence data", async () => {
          const content = await endpoint.getEvidence(
            DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
          );
          assert.strictEqual(content.length, 1);
          await endpoint.deleteEvidenceById(
            DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
            content[0].id
          );
          assert.deepStrictEqual(
            await endpoint.getEvidence(
              DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
            ),
            []
          );
        });
      });
    });
  }
});

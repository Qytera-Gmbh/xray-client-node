import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getEvidence", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_SERVER.testRun.evidence.v1],
      ["v2", XRAY_CLIENT_SERVER.testRun.evidence],
    ] as const) {
      describe(version, () => {
        it("returns evidence content", async () => {
          const content = await endpoint.getEvidence(
            DATA_SERVER.testExecutions.immutable.tests[0].testRunId
          );
          assert.strictEqual(content.length, 1);
          assert.strictEqual(content[0].fileName, "evidence.txt");
        });
      });
    }
  });

  describe("addEvidence", () => {
    for (const [version, endpoint, issue] of [
      ["v1", XRAY_CLIENT_SERVER.testRun.evidence.v1, DATA_SERVER.testExecutions.addAttachments.v1],
      ["v2", XRAY_CLIENT_SERVER.testRun.evidence, DATA_SERVER.testExecutions.addAttachments.v2],
    ] as const) {
      describe(version, () => {
        beforeEach(async () => {
          for (const evidence of await XRAY_CLIENT_SERVER.testRun.evidence.getEvidence(
            issue.tests[0].testRunId
          )) {
            await XRAY_CLIENT_SERVER.testRun.evidence.deleteEvidenceByName(
              issue.tests[0].testRunId,
              evidence.fileName
            );
          }
        });

        it("adds evidence data", async () => {
          await endpoint.addEvidence(issue.tests[0].testRunId, {
            contentType: "text/plain",
            data: Buffer.from("hello world").toString("base64"),
            filename: "hello.txt",
          });
          const content = await XRAY_CLIENT_SERVER.testRun.evidence.getEvidence(
            issue.tests[0].testRunId
          );
          assert.strictEqual(content.length, 1);
          assert.strictEqual(content[0].fileName, "hello.txt");
        });
      });
    }
  });

  describe("deleteEvidenceByName", () => {
    for (const [version, endpoint, issue] of [
      ["v1", XRAY_CLIENT_SERVER.testRun.evidence.v1, DATA_SERVER.testExecutions.addAttachments.v1],
      ["v2", XRAY_CLIENT_SERVER.testRun.evidence, DATA_SERVER.testExecutions.addAttachments.v2],
    ] as const) {
      const filename = `delete-by-name-${version}.txt`;
      describe(version, () => {
        beforeEach(async () => {
          const evidences = await XRAY_CLIENT_SERVER.testRun.evidence.getEvidence(
            issue.tests[0].testRunId
          );
          if (evidences.every((e) => e.fileName !== filename)) {
            await XRAY_CLIENT_SERVER.testRun.evidence.addEvidence(issue.tests[0].testRunId, {
              contentType: "text/plain",
              data: Buffer.from("hello world").toString("base64"),
              filename: filename,
            });
          }
        });

        it("deletes evidence data", async () => {
          for (const evidence of await XRAY_CLIENT_SERVER.testRun.evidence.getEvidence(
            issue.tests[0].testRunId
          )) {
            await endpoint.deleteEvidenceByName(issue.tests[0].testRunId, evidence.fileName);
          }
          const evidences = await XRAY_CLIENT_SERVER.testRun.evidence.getEvidence(
            issue.tests[0].testRunId
          );
          assert.ok(evidences.every((e) => e.fileName !== filename));
        });
      });
    }
  });

  describe("deleteEvidenceById", () => {
    for (const [version, endpoint, issue] of [
      ["v1", XRAY_CLIENT_SERVER.testRun.evidence.v1, DATA_SERVER.testExecutions.addAttachments.v1],
      ["v2", XRAY_CLIENT_SERVER.testRun.evidence, DATA_SERVER.testExecutions.addAttachments.v2],
    ] as const) {
      const filename = `delete-by-id-${version}.txt`;
      describe(version, () => {
        beforeEach(async () => {
          const evidences = await XRAY_CLIENT_SERVER.testRun.evidence.getEvidence(
            issue.tests[0].testRunId
          );
          if (evidences.every((e) => e.fileName !== filename)) {
            await XRAY_CLIENT_SERVER.testRun.evidence.addEvidence(issue.tests[0].testRunId, {
              contentType: "text/plain",
              data: Buffer.from("hello world").toString("base64"),
              filename: filename,
            });
          }
        });

        it("deletes evidence data", async () => {
          for (const evidence of await XRAY_CLIENT_SERVER.testRun.evidence.getEvidence(
            issue.tests[0].testRunId
          )) {
            await endpoint.deleteEvidenceById(issue.tests[0].testRunId, evidence.id);
          }
          const evidences = await XRAY_CLIENT_SERVER.testRun.evidence.getEvidence(
            issue.tests[0].testRunId
          );
          assert.ok(evidences.every((e) => e.fileName !== filename));
        });
      });
    }
  });
});

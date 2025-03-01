import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getEvidence", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence.v1],
      ["v2", XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence],
    ] as const) {
      describe(version, () => {
        it("returns evidence content", async () => {
          const content = await endpoint(DATA_SERVER.testExecutions.immutable.tests[0].testRunId);
          assert.strictEqual(content.length, 1);
          assert.strictEqual(content[0].fileName, "evidence.txt");
        });
      });
    }
  });

  describe("addEvidence", () => {
    for (const [version, endpoint, issue] of [
      [
        "v1",
        XRAY_CLIENT_SERVER.testRuns.evidence.addEvidence.v1,
        DATA_SERVER.testExecutions.addingAttachments.v1,
      ],
      [
        "v2",
        XRAY_CLIENT_SERVER.testRuns.evidence.addEvidence,
        DATA_SERVER.testExecutions.addingAttachments.v2,
      ],
    ] as const) {
      describe(version, () => {
        beforeEach(async () => {
          for (const evidence of await XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence(
            issue.tests[0].testRunId
          )) {
            await XRAY_CLIENT_SERVER.testRuns.evidence.deleteEvidenceByName(
              issue.tests[0].testRunId,
              evidence.fileName
            );
          }
        });
      });

      it("adds evidence data", async () => {
        await endpoint(issue.tests[0].testRunId, {
          contentType: "text/plain",
          data: Buffer.from("hello world").toString("base64"),
          filename: "hello.txt",
        });
        const content = await XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence(
          issue.tests[0].testRunId
        );
        assert.strictEqual(content.length, 1);
        assert.strictEqual(content[0].fileName, "hello.txt");
      });
    }
  });

  describe("deleteEvidenceByName", () => {
    for (const [version, endpoint, issue] of [
      [
        "v1",
        XRAY_CLIENT_SERVER.testRuns.evidence.deleteEvidenceByName.v1,
        DATA_SERVER.testExecutions.addingAttachments.v1,
      ],
      [
        "v2",
        XRAY_CLIENT_SERVER.testRuns.evidence.deleteEvidenceByName,
        DATA_SERVER.testExecutions.addingAttachments.v2,
      ],
    ] as const) {
      const filename = `delete-by-name-${version}.txt`;
      describe(version, () => {
        beforeEach(async () => {
          const evidences = await XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence(
            issue.tests[0].testRunId
          );
          if (evidences.every((e) => e.fileName !== filename)) {
            await XRAY_CLIENT_SERVER.testRuns.evidence.addEvidence(issue.tests[0].testRunId, {
              contentType: "text/plain",
              data: Buffer.from("hello world").toString("base64"),
              filename: filename,
            });
          }
        });
      });

      it("deletes evidence data", async () => {
        for (const evidence of await XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence(
          issue.tests[0].testRunId
        )) {
          await endpoint(issue.tests[0].testRunId, evidence.fileName);
        }
        const evidences = await XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence(
          issue.tests[0].testRunId
        );
        assert.ok(evidences.every((e) => e.fileName !== filename));
      });
    }
  });

  describe("deleteEvidenceById", () => {
    for (const [version, endpoint, issue] of [
      [
        "v1",
        XRAY_CLIENT_SERVER.testRuns.evidence.deleteEvidenceById.v1,
        DATA_SERVER.testExecutions.addingAttachments.v1,
      ],
      [
        "v2",
        XRAY_CLIENT_SERVER.testRuns.evidence.deleteEvidenceById,
        DATA_SERVER.testExecutions.addingAttachments.v2,
      ],
    ] as const) {
      const filename = `delete-by-id-${version}.txt`;
      describe(version, () => {
        beforeEach(async () => {
          const evidences = await XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence(
            issue.tests[0].testRunId
          );
          if (evidences.every((e) => e.fileName !== filename)) {
            await XRAY_CLIENT_SERVER.testRuns.evidence.addEvidence(issue.tests[0].testRunId, {
              contentType: "text/plain",
              data: Buffer.from("hello world").toString("base64"),
              filename: filename,
            });
          }
        });
      });

      it("deletes evidence data", async () => {
        for (const evidence of await XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence(
          issue.tests[0].testRunId
        )) {
          await endpoint(issue.tests[0].testRunId, evidence.id);
        }
        const evidences = await XRAY_CLIENT_SERVER.testRuns.evidence.getEvidence(
          issue.tests[0].testRunId
        );
        assert.ok(evidences.every((e) => e.fileName !== filename));
      });
    }
  });
});

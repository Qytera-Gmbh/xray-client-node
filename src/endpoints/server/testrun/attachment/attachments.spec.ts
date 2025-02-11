import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/data.js";
import { ExecutionEvidenceApi } from "./attachment.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getEvidence", () => {
    it("returns evidence content", async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      const content = await controller.getEvidence(
        DATA_SERVER.testExecutions.immutable.tests[0].testRunId
      );
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].fileName, "evidence.txt");
    });
  });

  describe("addEvidence", () => {
    beforeEach(async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      for (const evidence of await controller.getEvidence(
        DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
      )) {
        await controller.deleteEvidenceByName(
          DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
          evidence.fileName
        );
      }
    });

    it("adds evidence data", async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      await controller.addEvidence(
        DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
        {
          contentType: "text/plain",
          data: Buffer.from("hello world").toString("base64"),
          filename: "hello.txt",
        }
      );
      const content = await controller.getEvidence(
        DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
      );
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].fileName, "hello.txt");
    });
  });

  describe("deleteEvidenceById", () => {
    beforeEach(async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      for (const evidence of await controller.getEvidence(
        DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
      )) {
        await controller.deleteEvidenceByName(
          DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
          evidence.fileName
        );
      }
      await controller.addEvidence(
        DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
        {
          contentType: "text/plain",
          data: Buffer.from("hello world").toString("base64"),
          filename: "delete-by-id.txt",
        }
      );
    });

    it("deletes evidence data", async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      const content = await controller.getEvidence(
        DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
      );
      assert.strictEqual(content.length, 1);
      await controller.deleteEvidenceById(
        DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId,
        content[0].id
      );
      assert.deepStrictEqual(
        await controller.getEvidence(
          DATA_SERVER.testExecutions.addingAttachments.tests[0].testRunId
        ),
        []
      );
    });
  });
});

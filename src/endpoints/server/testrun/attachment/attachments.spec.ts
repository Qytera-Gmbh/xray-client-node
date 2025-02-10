import assert from "node:assert";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { ExecutionEvidenceApi } from "./attachment.js";

const TEST_RUN_IDS = {
  immutable: "12462",
  mutable: "12463",
};

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getEvidence", () => {
    it("returns evidence content", async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      const content = await controller.getEvidence(TEST_RUN_IDS.immutable);
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].fileName, "evidence.txt");
    });
  });

  describe("addEvidence", () => {
    beforeEach(async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      for (const evidence of await controller.getEvidence(TEST_RUN_IDS.mutable)) {
        await controller.deleteEvidenceByName(TEST_RUN_IDS.mutable, evidence.fileName);
      }
    });

    it("adds evidence data", async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      await controller.addEvidence(TEST_RUN_IDS.mutable, {
        contentType: "text/plain",
        data: Buffer.from("hello world").toString("base64"),
        filename: "hello.txt",
      });
      const content = await controller.getEvidence(TEST_RUN_IDS.mutable);
      assert.strictEqual(content.length, 1);
      assert.strictEqual(content[0].fileName, "hello.txt");
    });
  });

  describe("deleteEvidenceById", () => {
    beforeEach(async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      for (const evidence of await controller.getEvidence(TEST_RUN_IDS.mutable)) {
        await controller.deleteEvidenceByName(TEST_RUN_IDS.mutable, evidence.fileName);
      }
      await controller.addEvidence(TEST_RUN_IDS.mutable, {
        contentType: "text/plain",
        data: Buffer.from("hello world").toString("base64"),
        filename: "delete-by-id.txt",
      });
    });

    it("deletes evidence data", async () => {
      const controller = new ExecutionEvidenceApi(XRAY_CLIENT_SERVER);
      const content = await controller.getEvidence(TEST_RUN_IDS.mutable);
      assert.strictEqual(content.length, 1);
      await controller.deleteEvidenceById(TEST_RUN_IDS.mutable, content[0].id);
      assert.deepStrictEqual(await controller.getEvidence(TEST_RUN_IDS.mutable), []);
    });
  });
});

import assert from "node:assert";
import path, { join } from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../../test/clients.js";
import { DATA_CLOUD } from "../../../../test/data.js";
import { AttachmentsApi } from "./attachments.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("get attachment", () => {
    it("returns attachment content", async () => {
      const controller = new AttachmentsApi(XRAY_CLIENT_CLOUD);
      const content = await controller.getAttachment(
        DATA_CLOUD.testExecutions.immutable.evidence.id
      );
      assert.strictEqual(content, DATA_CLOUD.testExecutions.immutable.evidence.content);
    });

    it("adds attachments", async () => {
      const controller = new AttachmentsApi(XRAY_CLIENT_CLOUD);
      const content = await controller.addAttachment(join("test", "resources", "mini.txt"));
      assert.ok(content.created);
      assert.ok(content.id);
      assert.strictEqual(content.filename, "mini.txt");
      assert.strictEqual(content.size, 11);
    });
  });
});

import assert from "node:assert";
import path, { join } from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../../test/clients.js";
import { DATA_CLOUD } from "../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("get attachment", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_CLOUD.attachments.v1],
      ["v2", XRAY_CLIENT_CLOUD.attachments],
    ] as const) {
      it(`returns attachment content (${version})`, async () => {
        const content = await endpoint.getAttachment(
          DATA_CLOUD.testExecutions.immutable.evidence.id
        );
        assert.strictEqual(content, DATA_CLOUD.testExecutions.immutable.evidence.content);
      });
    }
  });

  describe("add attachments", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_CLOUD.attachments.v1],
      ["v2", XRAY_CLIENT_CLOUD.attachments],
    ] as const) {
      it(`adds attachments (${version})`, async () => {
        const content = await endpoint.addAttachment(join("test", "resources", "mini.txt"));
        assert.ok(content.created);
        assert.ok(content.id);
        assert.strictEqual(content.filename, "mini.txt");
        assert.strictEqual(content.size, 11);
      });
    }
  });
});

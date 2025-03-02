import assert from "node:assert";
import path, { join } from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../../test/clients.js";
import { DATA_CLOUD } from "../../../../test/test-data-cloud.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("get attachment", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_CLOUD.attachment.getAttachment.v1],
      ["v2", XRAY_CLIENT_CLOUD.attachment.getAttachment],
    ] as const) {
      describe(version, () => {
        it(`returns attachment content (${version})`, async () => {
          const content = await endpoint(DATA_CLOUD.testExecutions.immutable.evidence.id);
          assert.strictEqual(content, DATA_CLOUD.testExecutions.immutable.evidence.content);
        });
      });
    }

    describe("add attachments", () => {
      for (const [version, endpoint] of [
        ["v1", XRAY_CLIENT_CLOUD.attachment.addAttachment.v1],
        ["v2", XRAY_CLIENT_CLOUD.attachment.addAttachment],
      ] as const) {
        describe(version, () => {
          it(`adds attachments (${version})`, async () => {
            const content = await endpoint(join("test", "resources", "mini.txt"));
            assert.ok(content.created);
            assert.ok(content.id);
            assert.strictEqual(content.filename, "mini.txt");
            assert.strictEqual(content.size, 11);
          });
        });
      }
    });
  });
});

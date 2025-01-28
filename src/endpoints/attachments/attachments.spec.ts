import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { Attachments } from "./attachments.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("get attachment", () => {
    it("returns attachment content", async () => {
      const controller = new Attachments(XRAY_CLIENT_CLOUD);
      const content = await controller.getAttachment("49edd0c2-7bb8-4bfc-aa16-62c090891252");
      assert.strictEqual(content, "hello world");
    });
  });
});

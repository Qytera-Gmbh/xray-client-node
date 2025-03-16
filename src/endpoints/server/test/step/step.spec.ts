import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getSteps", () => {
    it("v1", async () => {
      const content = await XRAY_CLIENT_SERVER.test.step.v1.getSteps(
        DATA_SERVER.tests.immutable.key
      );
      assert.deepStrictEqual(content[0].step, DATA_SERVER.tests.immutable.steps[0].v1.step);
      assert.deepStrictEqual(content[0].data, DATA_SERVER.tests.immutable.steps[0].v1.data);
      assert.deepStrictEqual(content[0].result, DATA_SERVER.tests.immutable.steps[0].v1.result);
      assert.deepStrictEqual(content[1].step, DATA_SERVER.tests.immutable.steps[1].v1.step);
      assert.deepStrictEqual(content[1].data, DATA_SERVER.tests.immutable.steps[1].v1.data);
      assert.deepStrictEqual(content[1].result, DATA_SERVER.tests.immutable.steps[1].v1.result);
    });

    it("v2", async () => {
      const content = await XRAY_CLIENT_SERVER.test.step.getSteps(DATA_SERVER.tests.immutable.key);
      assert.ok("fields" in content.steps[0]);
      assert.ok("fields" in content.steps[1]);
      assert.deepStrictEqual(
        content.steps[0].fields,
        DATA_SERVER.tests.immutable.steps[0].v2.fields
      );
      assert.deepStrictEqual(
        content.steps[1].fields,
        DATA_SERVER.tests.immutable.steps[1].v2.fields
      );
    });
  });

  describe("getStep", () => {
    it("v1", async () => {
      const content = await XRAY_CLIENT_SERVER.test.step.v1.getStep(
        DATA_SERVER.tests.immutable.key,
        DATA_SERVER.tests.immutable.steps[0].id
      );
      assert.deepStrictEqual(content.step, DATA_SERVER.tests.immutable.steps[0].v1.step);
      assert.deepStrictEqual(content.data, DATA_SERVER.tests.immutable.steps[0].v1.data);
      assert.deepStrictEqual(content.result, DATA_SERVER.tests.immutable.steps[0].v1.result);
    });

    it("v2", async () => {
      const content = await XRAY_CLIENT_SERVER.test.step.getStep(
        DATA_SERVER.tests.immutable.key,
        DATA_SERVER.tests.immutable.steps[0].id
      );
      assert.ok("fields" in content.step);
      assert.ok("fields" in content.step);
      assert.deepStrictEqual(content.step.fields, DATA_SERVER.tests.immutable.steps[0].v2.fields);
    });
  });

  describe("getAttachments", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_SERVER.test.step.v1],
      ["v2", XRAY_CLIENT_SERVER.test.step],
    ] as const) {
      describe(version, () => {
        it("returns attachments", async () => {
          const content = await endpoint.getAttachments(
            DATA_SERVER.tests.immutable.key,
            DATA_SERVER.tests.immutable.steps[0].id
          );
          assert.strictEqual(content[0].id, DATA_SERVER.tests.immutable.steps[0].attachments[0].id);
          assert.strictEqual(
            content[0].fileName,
            DATA_SERVER.tests.immutable.steps[0].attachments[0].fileName
          );
          assert.strictEqual(
            content[0].mimeType,
            DATA_SERVER.tests.immutable.steps[0].attachments[0].mimeType
          );
        });
      });
    }
  });
});

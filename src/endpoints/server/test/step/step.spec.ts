import assert from "node:assert";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
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

  describe("createStep and deleteStep", () => {
    describe("v1", () => {
      beforeEach(async () => {
        let steps = await XRAY_CLIENT_SERVER.test.step.v1.getSteps(
          DATA_SERVER.tests.addTestSteps.v1.key
        );
        await Promise.all(
          steps
            .map((step) => step.id)
            .map((id) =>
              XRAY_CLIENT_SERVER.test.step.v1.deleteStep(DATA_SERVER.tests.addTestSteps.v1.key, id)
            )
        );
        steps = await XRAY_CLIENT_SERVER.test.step.v1.getSteps(
          DATA_SERVER.tests.addTestSteps.v1.key
        );
        assert.strictEqual(steps.length, 0);
      });

      it("creates steps", async () => {
        const uuid = randomUUID();
        const content = await XRAY_CLIENT_SERVER.test.step.v1.createStep(
          DATA_SERVER.tests.addTestSteps.v1.key,
          { data: `data-${uuid}`, result: `result-${uuid}`, step: `step-${uuid}` }
        );
        assert.strictEqual(typeof content.id, "number");
        const steps = await XRAY_CLIENT_SERVER.test.step.v1.getSteps(
          DATA_SERVER.tests.addTestSteps.v1.key
        );
        const lastStep = steps[steps.length - 1];
        assert.deepStrictEqual(lastStep.step, {
          raw: `step-${uuid}`,
          rendered: `<p>step-${uuid}</p>`,
        });
        assert.deepStrictEqual(lastStep.data, {
          raw: `data-${uuid}`,
          rendered: `<p>data-${uuid}</p>`,
        });
        assert.deepStrictEqual(lastStep.result, {
          raw: `result-${uuid}`,
          rendered: `<p>result-${uuid}</p>`,
        });
      });
    });

    describe("v2", () => {
      beforeEach(async () => {
        let steps = await XRAY_CLIENT_SERVER.test.step.getSteps(
          DATA_SERVER.tests.addTestSteps.v2.key
        );
        await Promise.all(
          steps.steps
            .map((step) => step.id)
            .map((id) =>
              XRAY_CLIENT_SERVER.test.step.deleteStep(DATA_SERVER.tests.addTestSteps.v2.key, id)
            )
        );
        steps = await XRAY_CLIENT_SERVER.test.step.getSteps(DATA_SERVER.tests.addTestSteps.v2.key);
        assert.strictEqual(steps.steps.length, 0);
      });

      it("creates steps", async () => {
        const uuid = randomUUID();
        const content = await XRAY_CLIENT_SERVER.test.step.createStep(
          DATA_SERVER.tests.addTestSteps.v2.key,
          {
            fields: {
              ["Action"]: `step-${uuid}`,
              ["Data"]: `data-${uuid}`,
              ["Expected Result"]: `result-${uuid}`,
            },
          }
        );
        assert.strictEqual(typeof content.step.id, "number");
        const steps = await XRAY_CLIENT_SERVER.test.step.getSteps(
          DATA_SERVER.tests.addTestSteps.v2.key
        );
        const lastStep = steps.steps[steps.steps.length - 1];
        assert.ok("fields" in lastStep);
        assert.deepStrictEqual(lastStep.fields, {
          ["Action"]: {
            type: "Wiki",
            value: { raw: `step-${uuid}`, rendered: `<p>step-${uuid}</p>` },
          },
          ["Data"]: {
            type: "Wiki",
            value: { raw: `data-${uuid}`, rendered: `<p>data-${uuid}</p>` },
          },
          ["Expected Result"]: {
            type: "Wiki",
            value: { raw: `result-${uuid}`, rendered: `<p>result-${uuid}</p>` },
          },
        });
      });
    });
  });

  describe("updateStep", () => {
    describe("v1", () => {
      beforeEach(async () => {
        const attachments = await XRAY_CLIENT_SERVER.test.step.getAttachments(
          DATA_SERVER.tests.updateTestSteps.v1.key,
          DATA_SERVER.tests.updateTestSteps.v1.steps[0].id
        );
        await XRAY_CLIENT_SERVER.test.step.v1.updateStep(
          DATA_SERVER.tests.updateTestSteps.v1.key,
          DATA_SERVER.tests.updateTestSteps.v1.steps[0].id,
          {
            attachments: { remove: attachments.map((attachment) => attachment.id) },
            data: "<dummy>",
            result: "<dummy>",
            step: "<dummy>",
          }
        );
        const step = await XRAY_CLIENT_SERVER.test.step.v1.getStep(
          DATA_SERVER.tests.updateTestSteps.v1.key,
          DATA_SERVER.tests.updateTestSteps.v1.steps[0].id
        );
        assert.strictEqual(step.attachments.length, 0);
      });

      it("updates steps", async () => {
        const uuid = randomUUID();
        const content = await XRAY_CLIENT_SERVER.test.step.v1.updateStep(
          DATA_SERVER.tests.updateTestSteps.v1.key,
          DATA_SERVER.tests.updateTestSteps.v1.steps[0].id,
          {
            attachments: {
              add: [
                {
                  contentType: "plain/text",
                  data: "gsddfgdsfg...(base64)",
                  filename: "example1.txt",
                },
              ],
            },
            data: `data-${uuid}`,
            result: `result-${uuid}`,
            step: `step-${uuid}`,
          }
        );
        assert.strictEqual(content.id, DATA_SERVER.tests.updateTestSteps.v1.steps[0].id);
        const step = await XRAY_CLIENT_SERVER.test.step.v1.getStep(
          DATA_SERVER.tests.updateTestSteps.v1.key,
          DATA_SERVER.tests.updateTestSteps.v1.steps[0].id
        );
        assert.deepStrictEqual(step.step, { raw: `step-${uuid}`, rendered: `<p>step-${uuid}</p>` });
        assert.deepStrictEqual(step.data, { raw: `data-${uuid}`, rendered: `<p>data-${uuid}</p>` });
        assert.deepStrictEqual(step.result, {
          raw: `result-${uuid}`,
          rendered: `<p>result-${uuid}</p>`,
        });
        const attachments = await XRAY_CLIENT_SERVER.test.step.getAttachments(
          DATA_SERVER.tests.updateTestSteps.v1.key,
          DATA_SERVER.tests.updateTestSteps.v1.steps[0].id
        );
        assert.strictEqual(attachments.length, 1);
        assert.strictEqual(attachments[0].mimeType, "plain/text");
        assert.strictEqual(attachments[0].fileName, "example1.txt");
      });
    });

    describe("v2", () => {
      beforeEach(async () => {
        const attachments = await XRAY_CLIENT_SERVER.test.step.getAttachments(
          DATA_SERVER.tests.updateTestSteps.v2.key,
          DATA_SERVER.tests.updateTestSteps.v2.steps[0].id
        );
        await XRAY_CLIENT_SERVER.test.step.updateStep(
          DATA_SERVER.tests.updateTestSteps.v2.key,
          DATA_SERVER.tests.updateTestSteps.v2.steps[0].id,
          {
            attachments: { remove: attachments.map((attachment) => attachment.id) },
            fields: { ["Action"]: "<dummy>", ["Data"]: "<dumm>", ["Expected Result"]: "<dummy>" },
          }
        );
        const step = await XRAY_CLIENT_SERVER.test.step.getStep(
          DATA_SERVER.tests.updateTestSteps.v2.key,
          DATA_SERVER.tests.updateTestSteps.v2.steps[0].id
        );
        assert.strictEqual(step.step.testCallStep, false);
        assert.strictEqual(step.step.attachments.length, 0);
      });

      it("updates steps", async () => {
        const uuid = randomUUID();
        const content = await XRAY_CLIENT_SERVER.test.step.updateStep(
          DATA_SERVER.tests.updateTestSteps.v2.key,
          DATA_SERVER.tests.updateTestSteps.v2.steps[0].id,
          {
            attachments: {
              add: [
                {
                  contentType: "plain/text",
                  data: "gsddfgdsfg...(base64)",
                  filename: "example1.txt",
                },
              ],
            },
            fields: {
              ["Action"]: `step-${uuid}`,
              ["Data"]: `data-${uuid}`,
              ["Expected Result"]: `result-${uuid}`,
            },
          }
        );
        assert.strictEqual(content.step.id, DATA_SERVER.tests.updateTestSteps.v2.steps[0].id);
        const step = await XRAY_CLIENT_SERVER.test.step.getStep(
          DATA_SERVER.tests.updateTestSteps.v2.key,
          DATA_SERVER.tests.updateTestSteps.v2.steps[0].id
        );
        assert.ok("fields" in step.step);
        assert.deepStrictEqual(step.step.fields, {
          ["Action"]: {
            type: "Wiki",
            value: { raw: `step-${uuid}`, rendered: `<p>step-${uuid}</p>` },
          },
          ["Data"]: {
            type: "Wiki",
            value: { raw: `data-${uuid}`, rendered: `<p>data-${uuid}</p>` },
          },
          ["Expected Result"]: {
            type: "Wiki",
            value: { raw: `result-${uuid}`, rendered: `<p>result-${uuid}</p>` },
          },
        });
        const attachments = await XRAY_CLIENT_SERVER.test.step.getAttachments(
          DATA_SERVER.tests.updateTestSteps.v2.key,
          DATA_SERVER.tests.updateTestSteps.v2.steps[0].id
        );
        assert.strictEqual(attachments.length, 1);
        assert.strictEqual(attachments[0].mimeType, "plain/text");
        assert.strictEqual(attachments[0].fileName, "example1.txt");
      });
    });
  });
});

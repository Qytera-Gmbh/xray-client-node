import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestSteps", () => {
    it("v1", async () => {
      const content = await XRAY_CLIENT_SERVER.test.step.v1.getTestSteps(
        DATA_SERVER.tests.immutable.key
      );
      assert.deepStrictEqual(content[0].step, DATA_SERVER.tests.immutable.steps.v1[0].step);
      assert.deepStrictEqual(content[0].data, DATA_SERVER.tests.immutable.steps.v1[0].data);
      assert.deepStrictEqual(content[0].result, DATA_SERVER.tests.immutable.steps.v1[0].result);
      assert.deepStrictEqual(content[1].step, DATA_SERVER.tests.immutable.steps.v1[1].step);
      assert.deepStrictEqual(content[1].data, DATA_SERVER.tests.immutable.steps.v1[1].data);
      assert.deepStrictEqual(content[1].result, DATA_SERVER.tests.immutable.steps.v1[1].result);
    });

    it("v2", async () => {
      const content = await XRAY_CLIENT_SERVER.test.step.getTestSteps(
        DATA_SERVER.tests.immutable.key
      );
      assert.ok("fields" in content.steps[0]);
      assert.ok("fields" in content.steps[1]);
      assert.deepStrictEqual(
        content.steps[0].fields,
        DATA_SERVER.tests.immutable.steps.v2[0].fields
      );
      assert.deepStrictEqual(
        content.steps[1].fields,
        DATA_SERVER.tests.immutable.steps.v2[1].fields
      );
    });
  });
});

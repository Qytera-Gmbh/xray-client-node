import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getTestStatuses", () => {
    it("returns test statuses", async () => {
      const statuses = await XRAY_CLIENT_SERVER.setting.getTestStatuses();
      const passingStatus = statuses.find((s) => s.id === DATA_SERVER.settings.testStatus.pass.id);
      assert.deepStrictEqual(passingStatus, DATA_SERVER.settings.testStatus.pass);
    });
  });

  describe("getTestStepStatuses", () => {
    it("returns test step statuses", async () => {
      const statuses = await XRAY_CLIENT_SERVER.setting.getTestStepStatuses();
      const passingStatus = statuses.find(
        (s) => s.id === DATA_SERVER.settings.testStepStatus.pass.id
      );
      assert.deepStrictEqual(passingStatus, DATA_SERVER.settings.testStepStatus.pass);
    });
  });
});

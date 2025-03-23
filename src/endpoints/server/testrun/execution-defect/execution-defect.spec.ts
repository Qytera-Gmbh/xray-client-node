import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/test-data-server.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("getDefects", () => {
    for (const [version, endpoint] of [["v1", XRAY_CLIENT_SERVER.testRun.defect]] as const) {
      describe(version, () => {
        it("returns defect content", async () => {
          const content = await endpoint.getDefects(
            DATA_SERVER.testExecutions.immutable.tests[1].testRunId
          );
          assert.strictEqual(content.length, 1);
          assert.strictEqual(
            content[0].key,
            DATA_SERVER.testExecutions.immutable.tests[1].defects[0].key
          );
        });
      });
    }
  });
});

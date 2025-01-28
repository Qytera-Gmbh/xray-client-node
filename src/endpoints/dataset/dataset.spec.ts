import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { Dataset } from "./dataset.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("export", () => {
    it("returns csv data", async () => {
      const controller = new Dataset(XRAY_CLIENT_CLOUD);
      const dataset = await controller.export({ testIssueKey: "XCN-1" });
      assert.strictEqual(dataset, "name,age\nJeff,25\nJohn,41\nMary,-146\nSusan,19\n");
    });
  });
});

import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD, XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DatasetApi } from "./dataset.js";

const NEWLINE_REGEX = /\r\n?|\n/;

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("export", () => {
    it("returns csv data in xray cloud", async () => {
      const controller = new DatasetApi(XRAY_CLIENT_CLOUD);
      const dataset = await controller.export({ testIssueKey: "XCN-1" });
      assert.strictEqual(dataset, "name,age\nJeff,25\nJohn,41\nMary,-146\nSusan,19\n");
      assert.deepStrictEqual(dataset.split(NEWLINE_REGEX), [
        "name,age",
        "Jeff,25",
        "John,41",
        "Mary,-146",
        "Susan,19",
        "",
      ]);
    });

    it("returns csv data in xray server", async () => {
      const controller = new DatasetApi(XRAY_CLIENT_SERVER);
      const dataset = await controller.export({ testIssueKey: "CYPLUG-1403" });
      assert.deepStrictEqual(dataset.split(NEWLINE_REGEX), ["name,age", "Jane,42", "John,33", ""]);
    });
  });
});

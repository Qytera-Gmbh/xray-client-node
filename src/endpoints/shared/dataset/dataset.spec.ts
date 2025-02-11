import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD, XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_CLOUD, DATA_SERVER } from "../../../../test/data.js";
import { DatasetApi } from "./dataset.js";

const NEWLINE_REGEX = /\r\n?|\n/;

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("export", () => {
    it("returns csv data in xray cloud", async () => {
      const controller = new DatasetApi(XRAY_CLIENT_CLOUD);
      const dataset = await controller.export({ testIssueKey: DATA_CLOUD.tests.immutable.key });
      assert.strictEqual(dataset, "name,age\nJeff,25\nJohn,41\nMary,-146\nSusan,19\n");
      assert.deepStrictEqual(dataset.split(NEWLINE_REGEX), DATA_CLOUD.tests.immutable.dataset);
    });

    it("returns csv data in xray server", async () => {
      const controller = new DatasetApi(XRAY_CLIENT_SERVER);
      const dataset = await controller.export({
        testIssueKey: DATA_SERVER.tests.immutableDatadriven.key,
      });
      assert.deepStrictEqual(
        dataset.split(NEWLINE_REGEX),
        DATA_SERVER.tests.immutableDatadriven.dataset
      );
    });
  });
});

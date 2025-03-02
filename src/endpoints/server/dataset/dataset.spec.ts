import assert from "node:assert";
import path, { join } from "node:path";
import { cwd } from "node:process";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/test-data-server.js";

const NEWLINE_REGEX = /\r\n?|\n/;

describe(path.relative(process.cwd(), import.meta.filename), () => {
  beforeEach(async () => {
    const file = join(cwd(), "test", "resources", "mini-cars.csv");
    await XRAY_CLIENT_SERVER.dataset.import(file, {
      testIssueKey: DATA_SERVER.tests.importDatasets.key,
    });
    const dataset = await XRAY_CLIENT_SERVER.dataset.export({
      testIssueKey: DATA_SERVER.tests.importDatasets.key,
    });
    assert.deepStrictEqual(dataset.split(NEWLINE_REGEX), [
      "model,type",
      "Toyota,manual",
      "Ford,automatic",
      "",
    ]);
  });

  for (const [version, endpoint] of [["v2", XRAY_CLIENT_SERVER.dataset]] as const) {
    describe(version, () => {
      it("returns csv data in xray server", async () => {
        const dataset = await endpoint.export({
          testIssueKey: DATA_SERVER.tests.immutableDatadriven.key,
        });
        assert.deepStrictEqual(
          dataset.split(NEWLINE_REGEX),
          DATA_SERVER.tests.immutableDatadriven.dataset
        );
      });

      it("imports csv data", async () => {
        const file = join(cwd(), "test", "resources", "mini.csv");
        await endpoint.import(file, {
          testIssueKey: DATA_SERVER.tests.importDatasets.key,
        });
        const dataset = await endpoint.export({
          testIssueKey: DATA_SERVER.tests.importDatasets.key,
        });
        assert.deepStrictEqual(dataset.split(NEWLINE_REGEX), [
          "name,age",
          "Jane,42",
          "John,33",
          "",
        ]);
      });
    });
  }
});

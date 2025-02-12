import assert from "node:assert";
import path, { join } from "node:path";
import { cwd } from "node:process";
import { beforeEach, describe, it } from "node:test";
import { XRAY_CLIENT_SERVER } from "../../../../test/clients.js";
import { DATA_SERVER } from "../../../../test/data.js";

const NEWLINE_REGEX = /\r\n?|\n/;

describe(path.relative(process.cwd(), import.meta.filename), () => {
  beforeEach(async () => {
    const file = join(cwd(), "test", "resources", "mini-cars.csv");
    await XRAY_CLIENT_SERVER.dataset.import(file, {
      testIssueKey: DATA_SERVER.tests.importingDatasets.key,
    });
    const dataset = await XRAY_CLIENT_SERVER.dataset.export({
      testIssueKey: DATA_SERVER.tests.importingDatasets.key,
    });
    assert.deepStrictEqual(dataset.split(NEWLINE_REGEX), [
      "model,type",
      "Toyota,manual",
      "Ford,automatic",
      "",
    ]);
  });

  it("imports csv data", async () => {
    const file = join(cwd(), "test", "resources", "mini.csv");
    await XRAY_CLIENT_SERVER.dataset.import(file, {
      testIssueKey: DATA_SERVER.tests.importingDatasets.key,
    });
    const dataset = await XRAY_CLIENT_SERVER.dataset.export({
      testIssueKey: DATA_SERVER.tests.importingDatasets.key,
    });
    assert.deepStrictEqual(dataset.split(NEWLINE_REGEX), ["name,age", "Jane,42", "John,33", ""]);
  });
});

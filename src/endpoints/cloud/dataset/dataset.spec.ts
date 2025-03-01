import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../../test/clients.js";
import { DATA_CLOUD } from "../../../../test/data.js";

const NEWLINE_REGEX = /\r\n?|\n/;

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("export", () => {
    for (const [version, endpoint] of [["v2", XRAY_CLIENT_CLOUD.dataset]] as const) {
      it(`returns csv data (${version})`, async () => {
        const dataset = await endpoint.export({
          testIssueKey: DATA_CLOUD.tests.immutable.key,
        });
        assert.deepStrictEqual(dataset.split(NEWLINE_REGEX), DATA_CLOUD.tests.immutable.dataset);
      });
    }
  });
});

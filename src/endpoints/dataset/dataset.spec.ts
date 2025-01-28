import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { getEnv } from "../../../test/util.js";
import { XrayClientCloud } from "../../client/xray-client-cloud.js";
import { Dataset } from "./dataset.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("export", () => {
    it("returns csv data", async () => {
      const controller = new Dataset(
        new XrayClientCloud({
          credentials: {
            clientId: getEnv("xray-client-id"),
            clientSecret: getEnv("xray-client-secret"),
          },
          url: "https://xray.cloud.getxray.app",
        })
      );
      const dataset = await controller.export({ testIssueKey: "XCN-1" });
      assert.strictEqual(dataset, "name,age\nJeff,25\nJohn,41\nMary,-146\nSusan,19\n");
    });
  });
});

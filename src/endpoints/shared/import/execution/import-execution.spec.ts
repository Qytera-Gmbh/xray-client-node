import assert from "node:assert";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { describe, it } from "node:test";
import type { Xray } from "../../../../../index.js";
import {
  JIRA_CLIENT_CLOUD,
  JIRA_CLIENT_SERVER,
  XRAY_CLIENT_CLOUD,
  XRAY_CLIENT_SERVER,
} from "../../../../../test/clients.js";
import { ImportExecutionApi } from "./import-execution.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("xray", () => {
    it("imports xray results in xray cloud", async () => {
      const controller = new ImportExecutionApi<Xray.Import.ResponseCloud>(XRAY_CLIENT_CLOUD, {
        isServerApi: false,
      });
      const data = await controller.xray({
        testExecutionKey: "XCN-6",
        tests: [{ status: "PASSED", testKey: "XCN-1" }],
      });
      assert.strictEqual(data.key, "XCN-6");
    });

    it("imports xray results in xray server", async () => {
      const controller = new ImportExecutionApi<Xray.Import.ResponseServer>(XRAY_CLIENT_SERVER, {
        isServerApi: true,
      });
      const data = await controller.xray({
        testExecutionKey: "CYPLUG-1408",
        tests: [{ status: "EXECUTING", testKey: "CYPLUG-1403" }],
      });
      assert.strictEqual(data.testExecIssue.key, "CYPLUG-1408");
    });
  });

  describe("xray multipart", () => {
    it("imports xray multipart results in xray cloud", async () => {
      const description = randomUUID();
      const controller = new ImportExecutionApi<Xray.Import.ResponseCloud>(XRAY_CLIENT_CLOUD, {
        isServerApi: false,
      });
      const data = await controller.xrayMultipart(
        {
          testExecutionKey: "XCN-7",
          tests: [{ status: "PASSED", testKey: "XCN-1" }],
        },
        { fields: { description: description, project: { key: "XCN" } } }
      );
      assert.strictEqual(data.key, "XCN-7");
      assert.deepStrictEqual(
        (
          await JIRA_CLIENT_CLOUD.issues.getIssue({
            fields: ["description"],
            issueIdOrKey: "XCN-7",
          })
        ).fields.description,
        {
          content: [
            {
              content: [
                {
                  text: description,
                  type: "text",
                },
              ],
              type: "paragraph",
            },
          ],
          type: "doc",
          version: 1,
        }
      );
    });

    it("imports xray multipart results in xray server", async () => {
      const description = randomUUID();
      const controller = new ImportExecutionApi<Xray.Import.ResponseServer>(XRAY_CLIENT_SERVER, {
        isServerApi: true,
      });
      const data = await controller.xrayMultipart(
        {
          testExecutionKey: "CYPLUG-1409",
          tests: [{ status: "EXECUTING", testKey: "CYPLUG-1403" }],
        },
        { fields: { description: description, project: { key: "CYPLUG" } } }
      );
      assert.strictEqual(data.testExecIssue.key, "CYPLUG-1409");
      assert.strictEqual(
        (
          await JIRA_CLIENT_SERVER.issues.getIssue({
            fields: ["description"],
            issueIdOrKey: "CYPLUG-1409",
          })
        ).fields.description,
        description
      );
    });
  });
});

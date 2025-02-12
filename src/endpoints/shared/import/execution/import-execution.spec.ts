import assert from "node:assert";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { describe, it } from "node:test";
import {
  JIRA_CLIENT_CLOUD,
  JIRA_CLIENT_SERVER,
  XRAY_CLIENT_CLOUD,
  XRAY_CLIENT_SERVER,
} from "../../../../../test/clients.js";
import { DATA_CLOUD, DATA_SERVER } from "../../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("xray", () => {
    it("imports xray results in xray cloud", async () => {
      const data = await XRAY_CLIENT_CLOUD.import.execution.xray({
        testExecutionKey: DATA_CLOUD.testExecutions.importingXray.key,
        tests: [
          { status: "PASSED", testKey: DATA_CLOUD.testExecutions.importingXray.tests[0].key },
        ],
      });
      assert.strictEqual(data.key, DATA_CLOUD.testExecutions.importingXray.key);
    });

    it("imports xray results in xray server", async () => {
      const data = await XRAY_CLIENT_SERVER.import.execution.xray({
        testExecutionKey: DATA_SERVER.testExecutions.importingXray.key,
        tests: [
          { status: "EXECUTING", testKey: DATA_SERVER.testExecutions.importingXray.tests[0].key },
        ],
      });
      assert.strictEqual(data.testExecIssue.key, DATA_SERVER.testExecutions.importingXray.key);
    });
  });

  describe("xray multipart", () => {
    it("imports xray multipart results in xray cloud", async () => {
      const description = randomUUID();
      const data = await XRAY_CLIENT_CLOUD.import.execution.xrayMultipart(
        {
          testExecutionKey: DATA_CLOUD.testExecutions.importingXrayMultipart.key,
          tests: [
            {
              status: "PASSED",
              testKey: DATA_CLOUD.testExecutions.importingXrayMultipart.tests[0].key,
            },
          ],
        },
        { fields: { description: description, project: { key: DATA_CLOUD.project.key } } }
      );
      assert.strictEqual(data.key, DATA_CLOUD.testExecutions.importingXrayMultipart.key);
      assert.deepStrictEqual(
        (
          await JIRA_CLIENT_CLOUD.issues.getIssue({
            fields: ["description"],
            issueIdOrKey: DATA_CLOUD.testExecutions.importingXrayMultipart.key,
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
      const data = await XRAY_CLIENT_SERVER.import.execution.xrayMultipart(
        {
          testExecutionKey: DATA_SERVER.testExecutions.importingXrayMultipart.key,
          tests: [
            {
              status: "EXECUTING",
              testKey: DATA_SERVER.testExecutions.importingXrayMultipart.tests[0].key,
            },
          ],
        },
        { fields: { description: description, project: { key: DATA_SERVER.project.key } } }
      );
      assert.strictEqual(
        data.testExecIssue.key,
        DATA_SERVER.testExecutions.importingXrayMultipart.key
      );
      assert.strictEqual(
        (
          await JIRA_CLIENT_SERVER.issues.getIssue({
            fields: ["description"],
            issueIdOrKey: DATA_SERVER.testExecutions.importingXrayMultipart.key,
          })
        ).fields.description,
        description
      );
    });
  });
});

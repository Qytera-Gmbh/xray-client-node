import assert from "node:assert";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { describe, it } from "node:test";
import { JIRA_CLIENT_SERVER, XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("xray", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_SERVER.import.execution.xray.v1],
      ["v2", XRAY_CLIENT_SERVER.import.execution.xray],
    ] as const) {
      describe(version, () => {
        it("imports xray results in xray server", async () => {
          const data = await endpoint({
            testExecutionKey: DATA_SERVER.testExecutions.importingXray.key,
            tests: [
              {
                status: "EXECUTING",
                testKey: DATA_SERVER.testExecutions.importingXray.tests[0].key,
              },
            ],
          });
          assert.strictEqual(data.testExecIssue.key, DATA_SERVER.testExecutions.importingXray.key);
        });
      });
    }
  });

  describe("xray multipart", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_SERVER.import.execution.xrayMultipart.v1],
      ["v2", XRAY_CLIENT_SERVER.import.execution.xrayMultipart],
    ] as const) {
      describe(version, () => {
        it("imports xray multipart results in xray server", async () => {
          const description = randomUUID();
          const data = await endpoint(
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
    }
  });
});

import assert from "node:assert";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { describe, it } from "node:test";
import { JIRA_CLIENT_SERVER, XRAY_CLIENT_SERVER } from "../../../../../test/clients.js";
import { DATA_SERVER } from "../../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("xray", () => {
    for (const [version, endpoint, issue] of [
      [
        "v1",
        XRAY_CLIENT_SERVER.import.execution.xray.v1,
        DATA_SERVER.testExecutions.importingXray.v1,
      ],
      ["v2", XRAY_CLIENT_SERVER.import.execution.xray, DATA_SERVER.testExecutions.importingXray.v2],
    ] as const) {
      describe(version, () => {
        it("imports xray results in xray server", async () => {
          const data = await endpoint({
            testExecutionKey: issue.key,
            tests: [
              {
                status: "EXECUTING",
                testKey: issue.tests[0].key,
              },
            ],
          });
          assert.strictEqual(data.testExecIssue.key, issue.key);
        });
      });
    }
  });

  describe("xray multipart", () => {
    for (const [version, endpoint, issue] of [
      [
        "v1",
        XRAY_CLIENT_SERVER.import.execution.xrayMultipart.v1,
        DATA_SERVER.testExecutions.updateTestRun.v1,
      ],
      [
        "v2",
        XRAY_CLIENT_SERVER.import.execution.xrayMultipart,
        DATA_SERVER.testExecutions.updateTestRun.v2,
      ],
    ] as const) {
      describe(version, () => {
        it("imports xray multipart results in xray server", async () => {
          const description = randomUUID();
          const data = await endpoint(
            {
              testExecutionKey: issue.key,
              tests: [
                {
                  status: "EXECUTING",
                  testKey: issue.tests[0].key,
                },
              ],
            },
            { fields: { description: description, project: { key: DATA_SERVER.project.key } } }
          );
          assert.strictEqual(data.testExecIssue.key, issue.key);
          assert.strictEqual(
            (
              await JIRA_CLIENT_SERVER.issues.getIssue({
                fields: ["description"],
                issueIdOrKey: issue.key,
              })
            ).fields.description,
            description
          );
        });
      });
    }
  });
});

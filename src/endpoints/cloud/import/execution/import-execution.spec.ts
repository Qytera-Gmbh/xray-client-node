import assert from "node:assert";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { describe, it } from "node:test";
import { JIRA_CLIENT_CLOUD, XRAY_CLIENT_CLOUD } from "../../../../../test/clients.js";
import { DATA_CLOUD } from "../../../../../test/test-data-cloud.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("xray", () => {
    for (const [version, endpoint, issue] of [
      ["v1", XRAY_CLIENT_CLOUD.import.execution.v1, DATA_CLOUD.testExecutions.importXray.v1],
      ["v2", XRAY_CLIENT_CLOUD.import.execution, DATA_CLOUD.testExecutions.importXray.v2],
    ] as const) {
      describe(version, () => {
        it("imports xray results in xray cloud", async () => {
          const data = await endpoint.xray({
            testExecutionKey: issue.key,
            tests: [{ status: "PASSED", testKey: issue.tests[0].key }],
          });
          assert.strictEqual(data.key, issue.key);
        });
      });
    }
  });

  describe("xray multipart", () => {
    for (const [version, endpoint, issue] of [
      [
        "v1",
        XRAY_CLIENT_CLOUD.import.execution.v1,
        DATA_CLOUD.testExecutions.importXrayMultipart.v1,
      ],
      ["v2", XRAY_CLIENT_CLOUD.import.execution, DATA_CLOUD.testExecutions.importXrayMultipart.v2],
    ] as const) {
      describe(version, () => {
        it("imports xray multipart results in xray cloud", async () => {
          const description = randomUUID();
          const data = await endpoint.xrayMultipart(
            {
              testExecutionKey: issue.key,
              tests: [
                {
                  status: "PASSED",
                  testKey: issue.tests[0].key,
                },
              ],
            },
            { fields: { description: description, project: { key: DATA_CLOUD.project.key } } }
          );
          assert.strictEqual(data.key, issue.key);
          assert.deepStrictEqual(
            (
              await JIRA_CLIENT_CLOUD.issues.getIssue({
                fields: ["description"],
                issueIdOrKey: issue.key,
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
      });
    }
  });
});

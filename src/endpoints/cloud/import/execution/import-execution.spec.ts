import assert from "node:assert";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { describe, it } from "node:test";
import { JIRA_CLIENT_CLOUD, XRAY_CLIENT_CLOUD } from "../../../../../test/clients.js";
import { DATA_CLOUD } from "../../../../../test/data.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("xray", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_CLOUD.import.execution.xray],
      ["v2", XRAY_CLIENT_CLOUD.import.execution.xray.v1],
    ] as const) {
      describe(version, () => {
        it("imports xray results in xray cloud", async () => {
          const data = await endpoint({
            testExecutionKey: DATA_CLOUD.testExecutions.importingXray.key,
            tests: [
              { status: "PASSED", testKey: DATA_CLOUD.testExecutions.importingXray.tests[0].key },
            ],
          });
          assert.strictEqual(data.key, DATA_CLOUD.testExecutions.importingXray.key);
        });
      });
    }
  });

  describe("xray multipart", () => {
    for (const [version, endpoint] of [
      ["v1", XRAY_CLIENT_CLOUD.import.execution.xrayMultipart],
      ["v2", XRAY_CLIENT_CLOUD.import.execution.xrayMultipart.v1],
    ] as const) {
      describe(version, () => {
        it("imports xray multipart results in xray cloud", async () => {
          const description = randomUUID();
          const data = await endpoint(
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
      });
    }
  });
});

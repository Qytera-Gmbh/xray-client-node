import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { XRAY_CLIENT_CLOUD } from "../../../test/clients.js";
import { GetTestPlansApi } from "./get-test-plans.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("query", () => {
    it("returns test plans data", async () => {
      const controller = new GetTestPlansApi(XRAY_CLIENT_CLOUD);
      const response = await controller.query(
        {
          jql: "project = XCN",
          limit: 1,
        },
        `
          start
          limit
          results {
            issueId
            jira(fields: ["key"])
            tests(limit: 10) {
              start
              limit
              results {
                issueId
            		jira(fields: ["key"])
                testType {
                  name
                }
              }
            }
          }
        `
      );
      assert.deepStrictEqual(response, {
        data: {
          getTestPlans: {
            limit: 1,
            results: [
              {
                issueId: "15051",
                jira: {
                  key: "XCN-3",
                },
                tests: {
                  limit: 10,
                  results: [
                    {
                      issueId: "15049",
                      jira: {
                        key: "XCN-1",
                      },
                      testType: {
                        name: "Manual",
                      },
                    },
                  ],
                  start: 0,
                },
              },
            ],
            start: 0,
          },
        },
      });
    });
  });
});

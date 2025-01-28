import type { XrayClientCloud } from "../../client/xray-client-cloud.js";
import type { TestExecution } from "../../models/graphql/__generated__/index.js";
import type { QueryResponse } from "../../models/graphql/graphql.js";

export class GetTestRuns {
  private readonly client: XrayClientCloud;

  /**
   * Creates a new execution import service.
   *
   * @param client the client to use when importing executions
   */
  constructor(client: XrayClientCloud) {
    this.client = client;
  }

  /**
   * Returns multiple Test Runs testIssueIds and/or testExecIssueIds.
   *
   * @example
   *
   * ```ts
   * query(
   *   { limit: 100, testExecIssueIds: ["XCN-2"] },
   *   `
   *     total
   *     limit
   *     start
   *     results {
   *       test {
   *         jira(fields: ["key"])
   *       }
   *     }
   *   `
   * );
   * ```
   *
   * @param variables the query arguments
   * @param resultShape the desired shape of the result
   * @returns the query result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestruns.doc.html
   */
  public async query(
    variables: {
      /**
       * The maximum amount of Test Runs to be returned. The maximum is 100.
       */
      limit: number;
      /**
       * All TestRuns modified after this date will be returned.
       */
      modifiedSince?: string;
      /**
       * The index of the first item to return in the page of results (page offset).
       */
      start?: number;
      /**
       * The issue ids of the Test Execution of the Test Runs.
       */
      testExecIssueIds?: string[];
      /**
       * The issue ids of the Test of the Test Runs.
       */
      testIssueIds?: string[];
      /**
       * The user account ids of the assignee of the Test Runs.
       */
      testRunAssignees?: string[];
    },
    resultShape: string
  ): Promise<QueryResponse<{ getTestRuns: TestExecution["testRuns"] }>> {
    const queryString = `
      query($testIssueIds: [String], $testExecIssueIds: [String], $testRunAssignees: [String], $limit: Int!, $start: Int, $modifiedSince: String) {
        getTestRuns(testIssueIds: $testIssueIds, testExecIssueIds: $testExecIssueIds, testRunAssignees: $testRunAssignees, limit: $limit, start: $start, modifiedSince: $modifiedSince) {
          ${resultShape}
        }
      }
    `;
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: queryString, variables: variables }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as QueryResponse<{
      getTestRuns: TestExecution["testRuns"];
    }>;
  }
}

import { print } from "graphql";
import type { BaseClient } from "../../client/base-client.js";
import type {
  GetOutput,
  Selection,
  TestRunResults,
} from "../../models/xray/graphql/__generated__/index.js";
import { query } from "../../models/xray/graphql/__generated__/index.js";

/**
 * Models the GraphQL test run endpoints.
 */
export class GetTestRunsApi {
  private readonly client: BaseClient;

  /**
   * Creates a new GraphQL test run request service.
   *
   * @param client the client to use to perform requests
   */
  constructor(client: BaseClient) {
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
  public async query<T extends Selection<TestRunResults>>(
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
    resultShape: (testRunResults: TestRunResults) => [...T]
  ): Promise<GetOutput<T>> {
    const document = query((q) => [q.getTestRuns<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as GetOutput<T>;
  }
}

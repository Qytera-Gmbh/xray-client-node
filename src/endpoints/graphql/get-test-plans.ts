import type { BaseClient } from "../../client/base-client.js";
import type { TestPlanResults } from "../../models/xray/graphql/__generated__/index.js";
import type { QueryResponse } from "../../models/xray/graphql/graphql.js";

/**
 * Models the GraphQL test plans endpoints.
 */
export class GetTestPlansApi {
  private readonly client: BaseClient;

  /**
   * Creates a new GraphQL test plans request service.
   *
   * @param client the client to use to perform requests
   */
  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Returns multiple test plans by JQL, issue IDs or project ID.
   *
   * @example
   *
   * ```ts
   * query(
   *   { limit: 100 },
   *   `
   *     total
   *     limit
   *     start
   *     results {
   *       issueId
   *       jira(fields: ["key", "assignee", "reporter"])
   *     }
   *   `
   * );
   * ```
   *
   * @param variables the query arguments
   * @param resultShape the desired shape of the result
   * @returns the query result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestplans.doc.html
   */
  public async query(
    variables: {
      /**
       * The IDs of the test plan issues to be returned.
       */
      issueIds?: string[];
      /**
       * The JQL that defines the search.
       */
      jql?: string;
      /**
       * The maximum amount of test plans to be returned. The maximum is 100.
       */
      limit: number;
      /**
       * All test plans modified after this date will be returned.
       */
      modifiedSince?: string;
      /**
       * The ID of the project of the test plan issues to be returned.
       */
      projectId?: string;
      /**
       * The index of the first item to return in the page of results (page offset).
       */
      start?: number;
    },
    resultShape: string
  ): Promise<QueryResponse<{ getTestPlans: TestPlanResults }>> {
    const queryString = `
      query ($jql: String, $issueIds: [String], $projectId: String, $limit: Int!, $start: Int, $modifiedSince: String) {
        getTestPlans(jql: $jql, issueIds: $issueIds, projectId: $projectId, limit: $limit, start: $start, modifiedSince: $modifiedSince) {
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
    return (await response.json()) as QueryResponse<{ getTestPlans: TestPlanResults }>;
  }
}

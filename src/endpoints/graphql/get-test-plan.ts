import type { BaseClient } from "../../client/base-client.js";
import type { TestPlan } from "../../models/xray/graphql/__generated__/index.js";
import type { QueryResponse } from "../../models/xray/graphql/graphql.js";

/**
 * Models the GraphQL test plan endpoints.
 */
export class GetTestPlanApi {
  private readonly client: BaseClient;

  /**
   * Creates a new GraphQL test plan request service.
   *
   * @param client the client to use to perform requests
   */
  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Returns a Test Plan by issue id.
   *
   * @example
   *
   * ```ts
   * query(
   *   { issueid: "14841" },
   *   `
   *     issueId
   *     jira(fields: ["key"])
   *     tests(limit: 100) {
   *       results {
   *         issueId
   *         testType {
   *           name
   *         }
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
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestplan.doc.html
   */
  public async query(
    variables: {
      /**
       * The issue id of the Test Plan issue to be returned.
       */
      issueId: string;
    },
    resultShape: string
  ): Promise<QueryResponse<{ getTestPlan: TestPlan }>> {
    const queryString = `
      query ($issueId: String) {
        getTestPlan(issueId: $issueId) {
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
    return (await response.json()) as QueryResponse<{ getTestPlan: TestPlan }>;
  }
}

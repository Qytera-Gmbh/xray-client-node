import { print } from "graphql";
import type { BaseClient } from "../../client/base-client.js";
import type {
  GetOutput,
  Selection,
  TestPlanResults,
} from "../../models/xray/graphql/__generated__/index.js";
import { query } from "../../models/xray/graphql/__generated__/index.js";

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
   *  {
   *    jql: "project = XCN",
   *    limit: 1,
   *  },
   *  (testPlanResults) => [
   *    testPlanResults.start,
   *    testPlanResults.limit,
   *    testPlanResults.results((testPlan) => [
   *      testPlan.issueId,
   *      testPlan.jira({ fields: ["key"] }),
   *      testPlan.tests({ limit: 10 }, (testResults) => [
   *        testResults.start,
   *        testResults.limit,
   *        testResults.results((test) => [
   *          test.issueId,
   *          test.jira({ fields: ["key"] }),
   *          test.testType((testType) => [testType.name]),
   *        ]),
   *      ]),
   *    ]),
   *  ]
   * );
   *
   * // Equivalent to:
   * // {
   * //   getTestPlans(jql: "project = XCN", limit: 1) {
   * //     start
   * //     limit
   * //     results {
   * //       issueId
   * //       jira(fields: ["key"])
   * //       tests(limit: 10) {
   * //         start
   * //         limit
   * //         results {
   * //           issueId
   * //           jira(fields: ["key"])
   * //           testType {
   * //             name
   * //         }
   * //       }
   * //     }
   * //   }
   * // }
   * ```
   *
   * @param variables the query arguments
   * @param resultShape the desired shape of the result
   * @returns the query result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestplans.doc.html
   */
  public async query<T extends Selection<TestPlanResults>>(
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
    resultShape: (testPlanResults: TestPlanResults) => [...T]
  ): Promise<GetOutput<T>> {
    const document = query((q) => [q.getTestPlans<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as { data: { getTestPlans: GetOutput<T> } };
    return json.data.getTestPlans;
  }
}

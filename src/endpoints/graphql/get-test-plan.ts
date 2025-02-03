import { print } from "graphql";
import type { BaseClient } from "../../client/base-client.js";
import type {
  GetOutput,
  Selection,
  TestPlan,
} from "../../models/xray/graphql/__generated__/index.js";
import { query } from "../../models/xray/graphql/__generated__/index.js";

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
   * query({ issueId: "15051" }, (testPlan) => [
   *   testPlan.issueId,
   *   testPlan.jira({ fields: ["key"] }),
   *   testPlan.tests({ limit: 100 }, (testResults) => [
   *     testResults.results((test) => [
   *       test.issueId,
   *       test.testType((testType) => [testType.name]),
   *     ]),
   *   ]),
   * ]);
   *
   * // Equivalent to:
   * // {
   * //   getTestPlan(issueId: "12345") {
   * //     issueId
   * //     tests(limit: 100) {
   * //       jira(fields: ["key"])
   * //       results {
   * //         issueId
   * //         testType {
   * //           name
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
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestplan.doc.html
   */
  public async query<T extends Selection<TestPlan>>(
    variables: {
      /**
       * The issue id of the Test Plan issue to be returned.
       */
      issueId: string;
    },
    resultShape: (testPlan: TestPlan) => [...T]
  ): Promise<GetOutput<T>> {
    const document = query((q) => [q.getTestPlan<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as { data: { getTestPlan: GetOutput<T> } };
    return json.data.getTestPlan;
  }
}

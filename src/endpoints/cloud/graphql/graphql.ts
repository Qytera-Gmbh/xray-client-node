import { print } from "graphql";
import type { Xray } from "../../../../index.js";
import type { BaseClient } from "../../../client/base-client.js";
import { mutation, query } from "../../../models/xray/graphql/__generated__/index.js";

/**
 * Models the GraphQL endpoints.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export class GraphQLApi {
  private readonly client: BaseClient;

  /**
   * Creates a new GraphQL query service.
   *
   * @param client the client to use to perform requests
   */
  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Mutation used to add evidence to a test run.
   *
   * @example
   *
   * ```ts
   * addEvidenceToTestRun(
   *   {
   *     id: "5acc7ab0a3fe1b6fcdc3c737",
   *     evidence: [
   *       {
   *         filename: "evidence.txt"
   *         mimeType: "text/plain"
   *         data: "SGVsbG8gV29ybGQ="
   *       }
   *     ]
   *   },
   *   (addEvidenceResult) => [
   *     addEvidenceResult.addedEvidence,
   *     addEvidenceResult.warnings,
   *   ]
   * );
   *
   * // Equivalent to:
   * // mutation {
   * //   addEvidenceToTestRun(
   * //     id: "5acc7ab0a3fe1b6fcdc3c737",
   * //     evidence: [
   * //       {
   * //         filename: "evidence.txt"
   * //         mimeType: "text/plain"
   * //         data: "SGVsbG8gV29ybGQ="
   * //       }
   * //     ]
   * //   ) {
   * //     addedEvidence
   * //     warnings
   * //   }
   * // }
   * ```
   *
   * @param variables the GraphQL variable values
   * @param resultShape the desired shape of the result
   * @returns the result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestruns.doc.html
   */
  public async addEvidenceToTestRun<
    T extends Xray.GraphQL.Selection<Xray.GraphQL.AddEvidenceResult>,
  >(
    variables: {
      /**
       * The evidence to add to the test run.
       */
      evidence: readonly Xray.GraphQL.AttachmentDataInput[];
      /**
       * The ID of the test run.
       */
      id: string;
    },
    resultShape: (addEvidenceResult: Xray.GraphQL.AddEvidenceResult) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = mutation((m) => [
      m.addEvidenceToTestRun<typeof variables, T>(variables, resultShape),
    ]);
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as {
      data: { addEvidenceToTestRun: Xray.GraphQL.GetOutput<T> };
    };
    return json.data.addEvidenceToTestRun;
  }

  /**
   * Returns a test plan by issue id.
   *
   * @example
   *
   * ```ts
   * getTestPlan({ issueId: "15051" }, (testPlan) => [
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
   * @param variables the GraphQL variable values
   * @param resultShape the desired shape of the result
   * @returns the result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestplan.doc.html
   */
  public async getTestPlan<T extends Xray.GraphQL.Selection<TestPlan>>(
    variables: {
      /**
       * The issue id of the Test Plan issue to be returned.
       */
      issueId: string;
    },
    resultShape: (testPlan: Xray.GraphQL.TestPlan) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = query((q) => [q.getTestPlan<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as { data: { getTestPlan: Xray.GraphQL.GetOutput<T> } };
    return json.data.getTestPlan;
  }

  /**
   * Returns multiple test plans by JQL, issue IDs or project ID.
   *
   * @example
   *
   * ```ts
   * getTestPlans(
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
   * @param variables the GraphQL variable values
   * @param resultShape the desired shape of the result
   * @returns the result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestplans.doc.html
   */
  public async getTestPlans<T extends Xray.GraphQL.Selection<Xray.GraphQL.TestPlanResults>>(
    variables: {
      /**
       * The IDs of the test plan issues to be returned.
       */
      issueIds?: readonly string[];
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
    resultShape: (testPlanResults: Xray.GraphQL.TestPlanResults) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = query((q) => [q.getTestPlans<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as { data: { getTestPlans: Xray.GraphQL.GetOutput<T> } };
    return json.data.getTestPlans;
  }

  /**
   * Returns multiple Test Runs testIssueIds and/or testExecIssueIds.
   *
   * @example
   *
   * ```ts
   * getTestRuns(
   *   { limit: 100, testExecIssueIds: ["XCN-2"] },
   *   (testRunResults) => [
   *     testRunResults.total,
   *     testRunResults.limit,
   *     testRunResults.start,
   *     testRunResults.results((testRun) => [
   *       testRun.test((test) => [test.jira({ fields: ["key"] })]),
   *     ]),
   *   ]
   * );
   *
   * // Equivalent to:
   * // {
   * //   getTestRuns(limit: 100, testExecIssueIds: ["XCN-2"]) {
   * //     total
   * //     limit
   * //     start
   * //     results {
   * //       test {
   * //         jira(fields: ["key"])
   * //       }
   * //     }
   * //   }
   * // }
   * ```
   *
   * @param variables the GraphQL variable values
   * @param resultShape the desired shape of the result
   * @returns the result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestruns.doc.html
   */
  public async getTestRuns<T extends Xray.GraphQL.Selection<Xray.GraphQL.TestRunResults>>(
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
      testExecIssueIds?: readonly string[];
      /**
       * The issue ids of the Test of the Test Runs.
       */
      testIssueIds?: readonly string[];
      /**
       * The user account ids of the assignee of the Test Runs.
       */
      testRunAssignees?: string[];
    },
    resultShape: (testRunResults: Xray.GraphQL.TestRunResults) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = query((q) => [q.getTestRuns<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as { data: { getTestRuns: Xray.GraphQL.GetOutput<T> } };
    return json.data.getTestRuns;
  }

  /**
   * Mutation used to remove evidence from a test run.
   *
   * @example
   *
   * ```ts
   * removeEvidenceFromTestRun(
   *   {
   *     id: "5acc7ab0a3fe1b6fcdc3c737",
   *     evidenceFilenames: ["evidence.txt"],
   *   },
   *   (removeEvidenceResult) => [
   *     removeEvidenceResult.removedEvidence,
   *     removeEvidenceResult.warnings,
   *   ]
   * );
   *
   * // Equivalent to:
   * // mutation {
   * //   removeEvidenceFromTestRun(
   * //     id: "5acc7ab0a3fe1b6fcdc3c737",
   * //     evidenceFilenames: ["evidence.txt"]
   * //   ) {
   * //     removedEvidence
   * //     warnings
   * //   }
   * // }
   * ```
   *
   * @param variables the GraphQL variable values
   * @param resultShape the desired shape of the result
   * @returns the result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestruns.doc.html
   */
  public async removeEvidenceFromTestRun<
    T extends Xray.GraphQL.Selection<Xray.GraphQL.RemoveEvidenceResult>,
  >(
    variables: {
      /**
       * The filenames of the evidence to remove from the test run.
       */
      evidenceFilenames?: readonly string[];
      /**
       * The IDs of the evidence to remove from the test run.
       */
      evidenceIds?: readonly string[];
      /**
       * The ID of the test run.
       */
      id: string;
    },
    resultShape: (removeEvidenceResult: Xray.GraphQL.RemoveEvidenceResult) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = mutation((m) => [
      m.removeEvidenceFromTestRun<typeof variables, T>(variables, resultShape),
    ]);
    const response = await this.client.send("/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as {
      data: { removeEvidenceFromTestRun: Xray.GraphQL.GetOutput<T> };
    };
    return json.data.removeEvidenceFromTestRun;
  }
}

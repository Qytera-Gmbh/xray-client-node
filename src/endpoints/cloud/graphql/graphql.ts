import { print } from "graphql";
import type { Xray } from "../../../../index.js";
import { mutation, query } from "../../../models/xray/graphql/__generated__/index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the GraphQL endpoints.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export class GraphQLApi extends BaseApi {
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
   * @see https://us.xray.cloud.getxray.app/doc/graphql/addevidencetotestrun.doc.html
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
    const response = await this.client.send("api/v2/graphql", {
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
   * Returns a test execution by issue ID.
   *
   * @example
   *
   * ```ts
   * getTestExecution({ issueId: "12345" }, (testExecution) => [
   *   testExecution.issueId,
   *   testExecution.tests({ limit: 100 }, (testResults) => [
   *     testResults.total,
   *     testResults.start,
   *     testResults.limit,
   *     testResults.results((test) => [
   *       test.issueId,
   *       test.testType((testType) => [testType.name]),
   *     ]),
   *   ]),
   * ]);
   *
   * // Equivalent to:
   * // {
   * //   getTestExecution(issueId: "12345") {
   * //     issueId
   * //     tests(limit: 100) {
   * //       total
   * //       start
   * //       limit
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
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestexecution.doc.html
   */
  public async getTestExecution<T extends Xray.GraphQL.Selection<Xray.GraphQL.TestExecution>>(
    variables: {
      /**
       * The issue ID of the test execution issue to be returned.
       */
      issueId: string;
    },
    resultShape: (testExecution: Xray.GraphQL.TestExecution) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = query((q) => [
      q.getTestExecution<typeof variables, T>(variables, resultShape),
    ]);
    const response = await this.client.send("api/v2/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as {
      data: { getTestExecution: Xray.GraphQL.GetOutput<T> };
    };
    return json.data.getTestExecution;
  }

  /**
   * Returns multiple test executions by JQL, issue IDs or project ID.
   *
   * @example
   *
   * ```ts
   * getTestExecutions(
   *  {
   *    jql: "project = PC",
   *    limit: 10,
   *  },
   *  (testExecutionResults) => [
   *    testExecutionResults.total,
   *    testExecutionResults.start,
   *    testExecutionResults.limit,
   *    testExecutionResults.results((testExecution) => [
   *      testExecution.issueId,
   *      testExecution.tests({ limit: 10 }, (testResults) => [
   *        testResults.total,
   *        testResults.start,
   *        testResults.limit,
   *        testResults.results((test) => [
   *          test.issueId,
   *          test.testType((testType) => [testType.name]),
   *        ]),
   *      ]),
   *      testExecution.jira({ fields: ["key", "assignee", "reporter"] }),
   *    ]),
   *  ]
   * );
   *
   * // Equivalent to:
   * // {
   * //   getTestExecutions(jql: "project = PC", limit: 10) {
   * //     total
   * //     start
   * //     limit
   * //     results {
   * //       issueId
   * //       tests(limit: 10) {
   * //         total
   * //         start
   * //         limit
   * //         results {
   * //           issueId
   * //           testType {
   * //             name
   * //           }
   * //         }
   * //       }
   * //       jira(fields: ["key", "assignee", "reporter"])
   * //     }
   * //   }
   * // }
   * ```
   *
   * @param variables the GraphQL variable values
   * @param resultShape the desired shape of the result
   * @returns the result
   *
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestexecutions.doc.html
   */
  public async getTestExecutions<
    T extends Xray.GraphQL.Selection<Xray.GraphQL.TestExecutionResults>,
  >(
    variables: {
      /**
       * The IDs of the test execution issues to be returned.
       */
      issueIds?: readonly string[];
      /**
       * The JQL that defines the search.
       */
      jql?: string;
      /**
       * The maximum amount of test executions to be returned. The maximum is 100.
       */
      limit: number;
      /**
       * All test executions modified after this date will be returned.
       */
      modifiedSince?: string;
      /**
       * The ID of the project of the test execution issues to be returned.
       */
      projectId?: string;
      /**
       * The index of the first item to return in the page of results (page offset).
       */
      start?: number;
    },
    resultShape: (testExecutionResults: Xray.GraphQL.TestExecutionResults) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = query((q) => [
      q.getTestExecutions<typeof variables, T>(variables, resultShape),
    ]);
    const response = await this.client.send("api/v2/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as {
      data: { getTestExecutions: Xray.GraphQL.GetOutput<T> };
    };
    return json.data.getTestExecutions;
  }

  /**
   * Returns a test plan by issue ID.
   *
   * @example
   *
   * ```ts
   * getTestPlan({ issueId: "12345" }, (testPlan) => [
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
  public async getTestPlan<T extends Xray.GraphQL.Selection<Xray.GraphQL.TestPlan>>(
    variables: {
      /**
       * The issue ID of the Test Plan issue to be returned.
       */
      issueId: string;
    },
    resultShape: (testPlan: Xray.GraphQL.TestPlan) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = query((q) => [q.getTestPlan<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("api/v2/graphql", {
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
   * //           }
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
    const response = await this.client.send("api/v2/graphql", {
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
   *  Returns a test run by test issue ID and test execution issue ID.
   *
   * @example
   *
   * ```ts
   * getTestRun(
   *   { testIssueId: "11165", testExecIssueId: "11164" },
   *   (testRun) => [
   *     testRun.id,
   *     testRun.status(status => [status.name, status.color, status.description]),
   *     testRun.gherkin,
   *     testRun.examples((examples) => [
   *       examples.id,
   *       examples.status(status => [status.name, status.color, status.description]),
   *     ]),
   *   ]
   * );
   *
   * // Equivalent to:
   * // {
   * //   getTestRun(testIssueId: "11165", testExecIssueId: "11164") {
   * //     id
   * //     status {
   * //       name
   * //       color
   * //       description
   * //     }
   * //     gherkin
   * //     examples {
   * //       id
   * //       status {
   * //         name
   * //         color
   * //         description
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
   * @see https://us.xray.cloud.getxray.app/doc/graphql/gettestrun.doc.html
   */
  public async getTestRun<T extends Xray.GraphQL.Selection<Xray.GraphQL.TestRun>>(
    variables: {
      /**
       * The issue ID of the test execution of the test run.
       */
      testExecIssueId?: string;
      /**
       * The issue ID of the test of the test run.
       */
      testIssueId?: string;
    },
    resultShape: (testRun: Xray.GraphQL.TestRun) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = query((q) => [q.getTestRun<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("api/v2/graphql", {
      body: JSON.stringify({ query: print(document) }),
      expectedStatus: 200,
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    const json = (await response.json()) as { data: { getTestRun: Xray.GraphQL.GetOutput<T> } };
    return json.data.getTestRun;
  }

  /**
   * Returns multiple test runs testIssueIds and/or testExecIssueIds.
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
       * The maximum amount of test runs to be returned. The maximum is 100.
       */
      limit: number;
      /**
       * All test runs modified after this date will be returned.
       */
      modifiedSince?: string;
      /**
       * The index of the first item to return in the page of results (page offset).
       */
      start?: number;
      /**
       * The issue IDs of the Test Execution of the test runs.
       */
      testExecIssueIds?: readonly string[];
      /**
       * The issue IDs of the test of the test runs.
       */
      testIssueIds?: readonly string[];
      /**
       * The user account IDs of the assignee of the test runs.
       */
      testRunAssignees?: string[];
    },
    resultShape: (testRunResults: Xray.GraphQL.TestRunResults) => [...T]
  ): Promise<Xray.GraphQL.GetOutput<T>> {
    const document = query((q) => [q.getTestRuns<typeof variables, T>(variables, resultShape)]);
    const response = await this.client.send("api/v2/graphql", {
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
   * @see https://us.xray.cloud.getxray.app/doc/graphql/removeevidencefromtestrun.doc.html
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
    const response = await this.client.send("api/v2/graphql", {
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

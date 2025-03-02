import type { Xray } from "../../../../index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the test executions endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Executions+-+REST
 */
export class TestExecutionApi extends BaseApi {
  /**
   * Associate tests with the test execution. Return error messages, if there are any.
   *
   * @param testExecKey the key of the test execution
   * @param body the tests to associate with or remove from the test execution
   * @returns error message if there are any
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Executions+-+REST
   */
  public associateTests(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testExecKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    body: {
      /**
       * Tests to associate with the test execution.
       *
       * @example
       *
       * ```ts
       * ["CALC-33", "CALC-75"]
       * ```
       */
      add: string[];
      /**
       * Tests to remove from the test execution.
       *
       * @example
       *
       * ```ts
       * ["CALC-25", "CALC-45"]
       * ```
       */
      remove: string[];
    }
  ): Promise<string> {
    throw new Error("Method not implemented");
  }

  /**
   * Return a list of the test associated with the test execution. Note that this endpoint may be
   * paginated.
   *
   * @param testExecKey the key of the test execution
   * @param query optional query parameters
   * @returns the tests of the test execution
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Executions+-+REST
   */
  public async getTests(
    testExecKey: string,
    query?: {
      /**
       * If `true` will display detailed information about the test run.
       */
      detailed?: boolean;
      /**
       * Limits the number of results per page. Should be greater or equal to 0 and lower or equal
       * to the maximum set in the global configuration.
       */
      limit?: number;
      /**
       * Number of the page to be returned. Should be greater or equal to 1.
       */
      page?: number;
    }
  ): Promise<Xray.TestExecution.TestExecution[]> {
    const response = await this.client.send(`rest/raven/1.0/api/testexec/${testExecKey}/test`, {
      expectedStatus: 200,
      method: "GET",
      query: query,
    });
    return (await response.json()) as Xray.TestExecution.TestExecution[];
  }

  /**
   * Remove a test from a test execution.
   *
   * @param testExecKey the key of the test execution
   * @param testKey the key of the test
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Executions+-+REST
   */
  public removeTest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testExecKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testKey: string
  ): Promise<void> {
    throw new Error("Method not implemented");
  }
}

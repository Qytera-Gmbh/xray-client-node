import type { BaseClient } from "../../client/base-client.js";
import type {
  GetTestExecutionsResponse,
  GetTestsResponse,
} from "../../models/xray/testplan/test-plan.js";

/**
 * Models the test plans endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
 */
export class TestPlanApi {
  private readonly client: BaseClient;

  /**
   * Creates a new test plans request service.
   *
   * @param client the client to use to perform requests
   */
  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Return a list of the test associated with the test plan. Note that this endpoint may be
   * paginated.
   *
   * @param testPlanKey the key of the test plan
   * @param query optional query parameters
   * @returns the tests of the test plan
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
   */
  public async getTests(
    testPlanKey: string,
    query?: {
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
  ): Promise<GetTestsResponse> {
    const response = await this.client.send(`/testplans/${testPlanKey}/test`, {
      expectedStatus: 200,
      method: "GET",
      query: query,
    });
    return (await response.json()) as GetTestsResponse;
  }

  /**
   * Associate tests with the test plan. Return error messages, if there are any.
   *
   * @param testPlanKey the key of the test plan
   * @param body the tests to associate with or remove from the test plan
   * @returns error message if there are any
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
   */
  public associateTests(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testPlanKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    body: {
      /**
       * Tests to associate with the test plan.
       *
       * @example
       *
       * ```ts
       * ["CALC-14", "CALC-29"]
       * ```
       */
      add: string[];
      /**
       * Tests to remove from the test plan.
       *
       * @example
       *
       * ```ts
       * ["CALC-15", "CALC-50"]
       * ```
       */
      remove: string[];
    }
  ): Promise<string> {
    throw new Error("Method not implemented");
  }

  /**
   * Remove a test from a test plan.
   *
   * @param testPlanKey the key of the test plan
   * @param testKey the key of the test
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
   */
  public removeTest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testPlanKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testKey: string
  ): Promise<void> {
    throw new Error("Method not implemented");
  }

  /**
   * Return a list of the test executions associated with the test plan. Note that this endpoint may
   * be paginated.
   *
   * @param testPlanKey the key of the test plan
   * @returns the test executions of the test plan
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
   */
  public async getTestExecutions(testPlanKey: string): Promise<GetTestExecutionsResponse> {
    const response = await this.client.send(`/testplans/${testPlanKey}/testexecution`, {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as GetTestExecutionsResponse;
  }
}

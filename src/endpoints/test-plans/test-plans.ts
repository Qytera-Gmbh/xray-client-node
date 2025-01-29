import type { BaseClient } from "../../client/base-client.js";
import type { GetTestsResponse } from "../../models/xray/test-plans/test-plans.js";

/**
 * Models the test plans endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
 */
export class TestPlans {
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
   * @param testPlanKey the key of the test execution
   * @param query optional query parameters
   * @returns the tests of the test execution
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
    testPlanKey: string,
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
  public removeTest(testPlanKey: string, testKey: string): Promise<void> {
    throw new Error("Method not implemented");
  }
}

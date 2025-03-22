import type { Xray } from "../../../../index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the test plan endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
 */
export class TestPlanApi extends BaseApi {
  /**
   * Associate test executions with the test plan.
   *
   * It's possible to specify if the tests in the test execution should be added to the test plan
   * using the `addTestsToPlan` property in the body. If the setting is empty in the body, the
   * config in the Xray miscellaneous settings will be used instead.
   *
   * @param testPlanKey the key of the test plan
   * @param body the request body
   * @returns error message if there are any
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
   */
  public async associateTestExecutions(
    testPlanKey: string,
    body: {
      /**
       * Tests to associate with the test plan.
       *
       * @example ["CALC-14", "CALC-29"]
       */
      add?: string[];
      /**
       * `true` to add the tests contained in the test executions to the test plan, too.
       */
      addTestsToPlan?: boolean;
      /**
       * Tests to remove from the test plan.
       *
       * @example ["CALC-15", "CALC-50"]
       */
      remove?: string[];
    }
  ): Promise<string[]> {
    const response = await this.client.send(
      `rest/raven/1.0/api/testplan/${testPlanKey}/testexecution`,
      {
        body: JSON.stringify(body),
        expectedStatus: 200,
        headers: { ["Content-Type"]: "application/json" },
        method: "POST",
      }
    );
    return (await response.json()) as string[];
  }
  /**
   * Associate tests with the test plan.
   *
   * @param testPlanKey the key of the test plan
   * @param body the request body
   * @returns error message if there are any
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
   */
  public async associateTests(
    testPlanKey: string,
    body: {
      /**
       * Tests to associate with the test plan.
       *
       * @example ["CALC-14", "CALC-29"]
       */
      add?: string[];
      /**
       * Tests to remove from the test plan.
       *
       * @example ["CALC-15", "CALC-50"]
       */
      remove?: string[];
    }
  ): Promise<string[]> {
    const response = await this.client.send(`rest/raven/1.0/api/testplan/${testPlanKey}/test`, {
      body: JSON.stringify(body),
      expectedStatus: 200,
      headers: { ["Content-Type"]: "application/json" },
      method: "POST",
    });
    return (await response.json()) as string[];
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
  public async getTestExecutions(testPlanKey: string): Promise<Xray.TestPlan.TestExecution[]> {
    const response = await this.client.send(
      `rest/raven/1.0/api/testplan/${testPlanKey}/testexecution`,
      {
        expectedStatus: 200,
        method: "GET",
      }
    );
    return (await response.json()) as Xray.TestPlan.TestExecution[];
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
  ): Promise<Xray.TestPlan.Test[]> {
    const response = await this.client.send(`rest/raven/1.0/api/testplan/${testPlanKey}/test`, {
      expectedStatus: 200,
      method: "GET",
      query: query,
    });
    return (await response.json()) as Xray.TestPlan.Test[];
  }

  /**
   * Remove a test from a test plan.
   *
   * @param testPlanKey the key of the test plan
   * @param testKey the key of the test
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
   */
  public async removeTest(testPlanKey: string, testKey: string): Promise<void> {
    await this.client.send(`rest/raven/1.0/api/testplan/${testPlanKey}/test/${testKey}`, {
      expectedStatus: 200,
      method: "DELETE",
    });
  }

  /**
   * Remove a test execution from a test plan.
   *
   * @param testPlanKey the key of the test plan
   * @param testExecKey the key of the test execution
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
   */
  public async removeTestExecution(testPlanKey: string, testExecKey: string): Promise<void> {
    await this.client.send(
      `rest/raven/1.0/api/testplan/${testPlanKey}/testexecution/${testExecKey}`,
      {
        expectedStatus: 200,
        method: "DELETE",
      }
    );
  }
}

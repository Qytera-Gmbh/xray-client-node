import type { Xray } from "../../../models/index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the test set endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Sets+-+REST
 */
export class TestSetApi extends BaseApi {
  /**
   * Associate tests with the test set.
   *
   * @param testSetKey the key of the test set
   * @param body the request body
   * @returns error messages, if there are any
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Sets+-+REST
   */
  public async associateTests(
    testSetKey: string,
    body: {
      /**
       * The tests to associate with the test set.
       *
       * @example ["CALC-14", "CALC-29"]
       */
      add?: string[];
      /**
       * The tests to no longer associate with the test set.
       *
       * @example ["CALC-15", "CALC-50"]
       */
      remove?: string[];
    }
  ): Promise<string[]> {
    const response = await this.client.send(`rest/raven/1.0/api/testset/${testSetKey}/test`, {
      body: JSON.stringify(body),
      expectedStatus: 200,
      headers: { ["Content-Type"]: "application/json" },
      method: "POST",
    });
    return (await response.json()) as string[];
  }

  /**
   * Returns a JSON object with a list of the test associated with the test set.
   *
   * Note that this endpoint may be paginated.
   *
   * @param testSetKey the key of the test set
   * @param query the query parameters
   * @returns the tests
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Sets+-+REST
   */
  public async getTests<WithTestDefinition extends boolean = true>(
    testSetKey: string,
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
      /**
       * `True`, if you want to get the test and pre conditions definitions; `false` otherwise.
       * Beware that setting this flag to `false` may speed-up the response times.
       *
       * @default true
       */
      testDefinition?: WithTestDefinition;
    }
  ): Promise<Xray.TestSet.Test<WithTestDefinition>[]> {
    const response = await this.client.send(`rest/raven/1.0/api/testset/${testSetKey}/test`, {
      expectedStatus: 200,
      method: "GET",
      query,
    });
    return (await response.json()) as Xray.TestSet.Test<WithTestDefinition>[];
  }

  /**
   * Remove a test from the test set.
   *
   * @param testSetKey the key of the test set
   * @param testKey the key of the test
   * @returns the tests
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Sets+-+REST
   */
  public async removeTest(testSetKey: string, testKey: string): Promise<void> {
    await this.client.send(`rest/raven/1.0/api/testset/${testSetKey}/test/${testKey}`, {
      expectedStatus: 200,
      method: "DELETE",
    });
  }
}

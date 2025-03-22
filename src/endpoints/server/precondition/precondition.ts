import type { Xray } from "../../../models/index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the precondition endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
 */
export class PreconditionApi extends BaseApi {
  /**
   * Associate tests with the precondition.
   *
   * @param preconditionKey the key of the precondition
   * @param body the request body
   * @returns error messages, if there are any
   *
   * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
   */
  public async associateTests(
    preconditionKey: string,
    body: {
      /**
       * The tests to associate with the precondition.
       *
       * @example ["CALC-14", "CALC-29"]
       */
      add?: string[];
      /**
       * The tests to no longer associate with the precondition.
       *
       * @example ["CALC-15", "CALC-50"]
       */
      remove?: string[];
    },
    query?: {
      /**
       * The test version name.
       */
      testVersion?: string;
    }
  ): Promise<string[]> {
    const response = await this.client.send(
      `rest/raven/1.0/api/precondition/${preconditionKey}/test`,
      {
        body: JSON.stringify(body),
        expectedStatus: 200,
        headers: { ["Content-Type"]: "application/json" },
        method: "POST",
        query,
      }
    );
    return (await response.json()) as string[];
  }

  /**
   * Return JSON with a list of the tests associated with the precondition.
   *
   * @param preconditionKey the key of the precondition
   * @param query the query parameters
   * @returns the tests
   *
   * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
   */
  public async getTests(
    preconditionKey: string,
    query?: {
      /**
       * The test version name.
       */
      testVersion?: string;
    }
  ): Promise<Xray.Test.Details[]> {
    const response = await this.client.send(
      `rest/raven/1.0/api/precondition/${preconditionKey}/test`,
      {
        expectedStatus: 200,
        method: "GET",
        query,
      }
    );
    return (await response.json()) as Xray.Test.Details[];
  }

  /**
   * Remove a test from the precondition.
   *
   * @param preconditionKey the key of the precondition
   * @param testKey the key of the test
   * @param query the query parameters
   * @returns the tests
   *
   * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
   */
  public async removeTest(
    preconditionKey: string,
    testKey: string,
    query?: {
      /**
       * The test version name.
       */
      testVersion?: string;
    }
  ): Promise<void> {
    await this.client.send(`rest/raven/1.0/api/precondition/${preconditionKey}/test/${testKey}`, {
      expectedStatus: 200,
      method: "DELETE",
      query,
    });
  }
}

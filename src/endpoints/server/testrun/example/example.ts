import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the test run examaple endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Examples
 * @see https://docs.getxray.app/display/XRAY/Test+Examples+-+REST
 */
export class ExampleApi extends BaseApi {
  /**
   * Return a test run example.
   *
   * @param testRunId the ID of the test run
   * @param exampleIndex the index of the example
   * @returns the test run example
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Examples+-+REST
   */
  public async getExample(
    testRunId: number,
    exampleIndex: number
  ): Promise<Xray.TestRun.CucumberExample> {
    const response = await this.client.send(
      `rest/raven/1.0/api/testrun/${testRunId.toString()}/example/${exampleIndex.toString()}`,
      {
        expectedStatus: 200,
        method: "GET",
      }
    );
    return (await response.json()) as Xray.TestRun.CucumberExample;
  }

  /**
   * Return all of the test run examples.
   *
   * @param testRunId the ID of the test run
   * @returns the test run examples
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-Examples
   */
  public async getExamples(testRunId: number): Promise<Xray.TestRun.CucumberExample[]> {
    const response = await this.client.send(
      `rest/raven/1.0/api/testrun/${testRunId.toString()}/example`,
      {
        expectedStatus: 200,
        method: "GET",
      }
    );
    return (await response.json()) as Xray.TestRun.CucumberExample[];
  }

  /**
   * Updates a test run example.
   *
   * @param testRunId the ID of the test run
   * @param exampleIndex the index of the example
   * @param query the query parameters
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Examples+-+REST
   */
  public async updateExample(
    testRunId: number,
    exampleIndex: number,
    query: {
      /**
       * The new status of the example.
       */
      status: string;
    }
  ): Promise<void> {
    await this.client.send(
      `rest/raven/1.0/api/testrun/${testRunId.toString()}/example/${exampleIndex.toString()}`,
      {
        expectedStatus: 200,
        method: "PUT",
        query,
      }
    );
  }
}

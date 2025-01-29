import type { BaseClient } from "../../client/base-client.js";
import type { GetTestsResponse } from "../../models/xray/test-executions/test-executions.js";

/**
 * Models the test executions endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Executions+-+REST
 */
export class TestExecutions {
  private readonly client: BaseClient;

  /**
   * Creates a new test executions request service.
   *
   * @param client the client to use to perform requests
   */
  constructor(client: BaseClient) {
    this.client = client;
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
  ): Promise<GetTestsResponse> {
    const response = await this.client.send(`/testexec/${testExecKey}/test`, {
      expectedStatus: 200,
      method: "GET",
      query: query,
    });
    return (await response.json()) as GetTestsResponse;
  }
}

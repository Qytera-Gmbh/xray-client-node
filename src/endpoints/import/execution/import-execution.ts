import type { BaseClient } from "../../../client/base-client.js";
import type {
  ImportResponse,
  XrayTestExecutionResults,
} from "../../../models/import/execution/import-execution.js";

/**
 * Models the execution import endpoints.
 */
export class ImportExecution {
  private readonly client: BaseClient;

  /**
   * Creates a new execution import service.
   *
   * @param client the client to use when importing executions
   */
  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Uploads test results in Xray JSON format to the Xray instance.
   *
   * @param results the test results
   * @returns the import response
   *
   * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results+-+REST#ImportExecutionResultsREST-XrayJSONresults
   * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST+v2#ImportExecutionResultsRESTv2-XrayJSONresults
   */
  public async xray(results: XrayTestExecutionResults): Promise<ImportResponse> {
    const response = await this.client.send(`/import/execution`, {
      body: JSON.stringify(results),
      expectedStatus: 200,
      headers: {
        ["Accept"]: "application/json",
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as ImportResponse;
  }
}

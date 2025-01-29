import type { BaseClient } from "../../../client/base-client.js";
import type { IssueUpdateDetails } from "../../../models/jira/__generated__/index.js";
import type {
  ImportExecutionResponseCloud,
  ImportExecutionResponseServer,
  XrayTestExecutionResults,
} from "../../../models/xray/import/execution/import-execution.js";

/**
 * Models the execution import endpoints.
 */
export class ImportExecutionApi<
  ImportExecutionResponseType extends ImportExecutionResponseCloud | ImportExecutionResponseServer,
> {
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
  public async xray(results: XrayTestExecutionResults): Promise<ImportExecutionResponseType> {
    const response = await this.client.send(`/import/execution`, {
      body: JSON.stringify(results),
      expectedStatus: 200,
      headers: {
        ["Accept"]: "application/json",
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as ImportExecutionResponseType;
  }

  /**
   * Uploads test results to the Xray instance while also allowing modification of arbitrary Jira
   * fields.
   *
   * @param results the test results
   * @param info - the Jira test execution issue information
   * @returns the key of the test execution issue
   *
   * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results+-+REST#ImportExecutionResultsREST-XrayJSONresultsMultipart
   * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST+v2#ImportExecutionResultsRESTv2-XrayJSONresultsMultipart
   */
  public async xrayMultipart(
    results: XrayTestExecutionResults,
    info: IssueUpdateDetails
  ): Promise<ImportExecutionResponseType> {
    const resultString = JSON.stringify(results);
    const infoString = JSON.stringify(info);
    const formData = new FormData();
    formData.append("results", resultString, "results.json");
    formData.append("info", infoString, "info.json");
    const response = await this.client.send(`/import/execution/multipart`, {
      body: formData,
      expectedStatus: 200,
      headers: {
        ["Accept"]: "application/json",
        ["Content-Type"]: "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as ImportExecutionResponseType;
  }
}

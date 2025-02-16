import { FormData } from "undici";
import type { Xray } from "../../../../../index.js";
import type { BaseClient } from "../../../../client/base-client.js";
import type { IssueUpdateDetails } from "../../../../models/jira/__generated__/index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the execution import endpoints.
 */
export class ImportExecutionApi<
  ImportExecutionResponseType extends Xray.Import.ResponseCloud | Xray.Import.ResponseServer,
> extends BaseApi {
  private readonly isServerApi: boolean;

  /**
   * Creates a new API service.
   *
   * @param client the client to use to execute requests
   * @param options additional API options
   */
  constructor(client: BaseClient, options: { isServerApi: boolean }) {
    super(client);
    this.isServerApi = options.isServerApi;
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
  public async xray(
    results: Xray.Import.TestExecutionResults
  ): Promise<ImportExecutionResponseType> {
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
    results: Xray.Import.TestExecutionResults,
    info: IssueUpdateDetails
  ): Promise<ImportExecutionResponseType> {
    const resultBlob = new Blob([JSON.stringify(results)], { type: "application/json" });
    const infoBlob = new Blob([JSON.stringify(info)], { type: "application/json" });
    const formData = new FormData();
    formData.append(this.isServerApi ? "result" : "results", resultBlob, "results.json");
    formData.append("info", infoBlob, "info.json");
    const response = await this.client.send(`/import/execution/multipart`, {
      body: formData,
      expectedStatus: 200,
      headers: {
        ["Accept"]: "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as ImportExecutionResponseType;
  }
}

import type { Jira, Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the execution import endpoints.
 */
export class ImportExecutionApi extends BaseApi {
  public readonly v1 = new ImportExecutionApiV1(this.client);

  /**
   * Uploads test results in Xray JSON format to the Xray instance.
   *
   * @param results the test results
   * @returns the import response
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST+v2#ImportExecutionResultsRESTv2-XrayJSONresults
   */
  public async xray(results: Xray.Import.TestExecutionResults): Promise<ImportResponse> {
    const response = await this.client.send("api/v2/import/execution", {
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

  /**
   * Uploads test results to the Xray instance while also allowing modification of arbitrary Jira
   * fields.
   *
   * @param results the test results
   * @param info - the Jira test execution issue information
   * @returns the key of the test execution issue
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST+v2#ImportExecutionResultsRESTv2-XrayJSONresultsMultipart
   */
  public async xrayMultipart(
    results: Xray.Import.TestExecutionResults,
    info: Jira.IssueUpdateDetails
  ): Promise<ImportResponse> {
    const resultBlob = new Blob([JSON.stringify(results)], { type: "application/json" });
    const infoBlob = new Blob([JSON.stringify(info)], { type: "application/json" });
    const formData = new FormData();
    formData.append("results", resultBlob, "results.json");
    formData.append("info", infoBlob, "info.json");
    const response = await this.client.send("api/v2/import/execution/multipart", {
      body: formData,
      expectedStatus: 200,
      headers: {
        ["Accept"]: "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as ImportResponse;
  }
}

class ImportExecutionApiV1 extends BaseApi {
  /**
   * Uploads test results in Xray JSON format to the Xray instance.
   *
   * @param results the test results
   * @returns the import response
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST#ImportExecutionResultsREST-XrayJSONresults
   */
  public async xray(results: Xray.Import.TestExecutionResults): Promise<ImportResponse> {
    const response = await this.client.send("api/v1/import/execution", {
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

  /**
   * Uploads test results to the Xray instance while also allowing modification of arbitrary Jira
   * fields.
   *
   * @param results the test results
   * @param info - the Jira test execution issue information
   * @returns the key of the test execution issue
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST#ImportExecutionResultsREST-XrayJSONresultsMultipart
   */
  public async xrayMultipart(
    results: Xray.Import.TestExecutionResults,
    info: Jira.IssueUpdateDetails
  ): Promise<ImportResponse> {
    const resultBlob = new Blob([JSON.stringify(results)], { type: "application/json" });
    const infoBlob = new Blob([JSON.stringify(info)], { type: "application/json" });
    const formData = new FormData();
    formData.append("results", resultBlob, "results.json");
    formData.append("info", infoBlob, "info.json");
    const response = await this.client.send("api/v1/import/execution/multipart", {
      body: formData,
      expectedStatus: 200,
      headers: {
        ["Accept"]: "application/json",
      },
      method: "POST",
    });
    return (await response.json()) as ImportResponse;
  }
}

interface ImportResponse {
  id: string;
  key: string;
  self: string;
}

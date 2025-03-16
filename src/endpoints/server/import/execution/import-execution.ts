import { type Xray } from "../../../../../index.js";
import type { IssueUpdateDetails } from "../../../../models/jira/__generated__/index.js";
import { BaseApi } from "../../../base-api.js";

interface ImportXray {
  v1: {
    /**
     * Uploads test results in Xray JSON format to the Xray instance.
     *
     * @param results the test results
     * @returns the import response
     *
     * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results+-+REST#ImportExecutionResultsREST-XrayJSONresults
     */
    xray(results: Xray.Import.TestExecutionResults): Promise<ImportResponse>;
  };
  /**
   * Endpoint used to import test results in the Xray JSON format.
   *
   * Updating an existing test run using Xray format REST API will reset all dataset related fields.
   * This means that all current iteration data and dataset present in the test run will be replaced
   * with the new information given in the REST API request.
   *
   * @param results the test results
   * @returns the import response
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Import/post-import-execution
   */
  xray(results: Xray.Import.TestExecutionResults): Promise<ImportResponse>;
}

interface ImportXrayMultipart {
  v1: {
    /**
     * Uploads test results to the Xray instance while also allowing modification of arbitrary Jira
     * fields.
     *
     * @param results the test results
     * @param info - the Jira test execution issue information
     * @returns the key of the test execution issue
     *
     * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results+-+REST#ImportExecutionResultsREST-XrayJSONresultsMultipart
     */
    xrayMultipart(
      results: Xray.Import.TestExecutionResults,
      info: IssueUpdateDetails
    ): Promise<ImportResponse>;
  };
  /**
   * Endpoint used to import test results in the Xray JSON format with test execution issue data.
   *
   * Updating an existing test run using Xray format REST API will reset all dataset related fields.
   * This means that all current iteration data and dataset present in the test run will be replaced
   * with the new information given in the REST API request.
   *
   * @param results the test results
   * @param info - the Jira test execution issue information
   * @returns the key of the test execution issue
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Import/post-import-execution-multipart
   */
  xrayMultipart(
    results: Xray.Import.TestExecutionResults,
    info: IssueUpdateDetails
  ): Promise<ImportResponse>;
}

interface ImportResponse {
  testExecIssue: {
    id: string;
    key: string;
    name: string;
  };
}

/**
 * Models the execution import endpoints.
 */
export class ImportExecutionApi extends BaseApi implements ImportXray, ImportXrayMultipart {
  private readonly processor = {
    xray: async (url: string, results: Xray.Import.TestExecutionResults) => {
      const response = await this.client.send(url, {
        body: JSON.stringify(results),
        expectedStatus: 200,
        headers: {
          ["Accept"]: "application/json",
          ["Content-Type"]: "application/json",
        },
        method: "POST",
      });
      return (await response.json()) as ImportResponse;
    },
    xrayMultipart: async (
      url: string,
      results: Xray.Import.TestExecutionResults,
      info: IssueUpdateDetails
    ) => {
      const resultBlob = new Blob([JSON.stringify(results)], { type: "application/json" });
      const infoBlob = new Blob([JSON.stringify(info)], { type: "application/json" });
      const formData = new FormData();
      formData.append("result", resultBlob, "results.json");
      formData.append("info", infoBlob, "info.json");
      const response = await this.client.send(url, {
        body: formData,
        expectedStatus: 200,
        headers: {
          ["Accept"]: "application/json",
        },
        method: "POST",
      });
      return (await response.json()) as ImportResponse;
    },
  };

  public readonly v1: ImportXray["v1"] & ImportXrayMultipart["v1"] = this.bind((self) => ({
    xray(results) {
      return self.processor.xray("rest/raven/1.0/import/execution", results);
    },
    xrayMultipart(results, info) {
      return self.processor.xrayMultipart(
        "rest/raven/1.0/import/execution/multipart",
        results,
        info
      );
    },
  }));

  public async xray(results: Xray.Import.TestExecutionResults): Promise<ImportResponse> {
    return this.processor.xray("rest/raven/2.0/api/import/execution", results);
  }

  public async xrayMultipart(
    results: Xray.Import.TestExecutionResults,
    info: IssueUpdateDetails
  ): Promise<ImportResponse> {
    return this.processor.xrayMultipart(
      "rest/raven/2.0/api/import/execution/multipart",
      results,
      info
    );
  }
}

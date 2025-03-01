import { FormData } from "undici";
import { type Xray } from "../../../../../index.js";
import type { IssueUpdateDetails } from "../../../../models/jira/__generated__/index.js";
import { BaseApi } from "../../../base-api.js";

interface ImportXray {
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
  (results: Xray.Import.TestExecutionResults): Promise<Xray.Import.ResponseServer>;
  /**
   * Uploads test results in Xray JSON format to the Xray instance.
   *
   * @param results the test results
   * @returns the import response
   *
   * @see https://docs.getxray.app/display/XRAY/Import+Execution+Results+-+REST#ImportExecutionResultsREST-XrayJSONresults
   */
  v1: (results: Xray.Import.TestExecutionResults) => Promise<Xray.Import.ResponseServer>;
}

interface ImportXrayMultipart {
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
  (
    results: Xray.Import.TestExecutionResults,
    info: IssueUpdateDetails
  ): Promise<Xray.Import.ResponseServer>;
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
  v1: (
    results: Xray.Import.TestExecutionResults,
    info: IssueUpdateDetails
  ) => Promise<Xray.Import.ResponseServer>;
}

/**
 * Models the execution import endpoints.
 */
export class ImportExecutionApi extends BaseApi {
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
      return (await response.json()) as Xray.Import.ResponseServer;
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
      return (await response.json()) as Xray.Import.ResponseServer;
    },
  };

  public readonly xray: ImportXray = Object.assign(
    async (...[results]: Parameters<ImportXray>): ReturnType<ImportXray> => {
      return this.processor.xray(`${this.path}/v2/api/import/execution`, results);
    },
    {
      v1: async (...[results]: Parameters<ImportXray["v1"]>): ReturnType<ImportXray["v1"]> => {
        return this.processor.xray(`${this.path}/v1/import/execution`, results);
      },
    }
  );

  public readonly xrayMultipart: ImportXrayMultipart = Object.assign(
    async (
      ...[results, info]: Parameters<ImportXrayMultipart>
    ): ReturnType<ImportXrayMultipart> => {
      return this.processor.xrayMultipart(
        `${this.path}/v2/api/import/execution/multipart`,
        results,
        info
      );
    },
    {
      v1: async (
        ...[results, info]: Parameters<ImportXrayMultipart["v1"]>
      ): ReturnType<ImportXrayMultipart["v1"]> => {
        return this.processor.xrayMultipart(
          `${this.path}/v1/import/execution/multipart`,
          results,
          info
        );
      },
    }
  );
}

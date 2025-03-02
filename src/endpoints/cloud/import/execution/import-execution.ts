import { FormData } from "undici";
import { type Xray } from "../../../../../index.js";
import type { IssueUpdateDetails } from "../../../../models/jira/__generated__/index.js";
import { BaseApi } from "../../../base-api.js";

interface ImportXray {
  /**
   * Uploads test results in Xray JSON format to the Xray instance.
   *
   * @param results the test results
   * @returns the import response
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST+v2#ImportExecutionResultsRESTv2-XrayJSONresults
   */
  (results: Xray.Import.TestExecutionResults): Promise<ImportResponse>;
  /**
   * Uploads test results in Xray JSON format to the Xray instance.
   *
   * @param results the test results
   * @returns the import response
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST#ImportExecutionResultsREST-XrayJSONresults
   */
  v1: (results: Xray.Import.TestExecutionResults) => Promise<ImportResponse>;
}

interface ImportXrayMultipart {
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
  (results: Xray.Import.TestExecutionResults, info: IssueUpdateDetails): Promise<ImportResponse>;
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
  v1: (
    results: Xray.Import.TestExecutionResults,
    info: IssueUpdateDetails
  ) => Promise<ImportResponse>;
}

interface ImportResponse {
  id: string;
  key: string;
  self: string;
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
      formData.append("results", resultBlob, "results.json");
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

  public readonly xray: ImportXray = Object.assign(
    async (...[results]: Parameters<ImportXray>): ReturnType<ImportXray> => {
      return this.processor.xray("api/v2/import/execution", results);
    },
    {
      v1: async (...[results]: Parameters<ImportXray["v1"]>): ReturnType<ImportXray["v1"]> => {
        return this.processor.xray("api/v1/import/execution", results);
      },
    }
  );

  public readonly xrayMultipart: ImportXrayMultipart = Object.assign(
    async (
      ...[results, info]: Parameters<ImportXrayMultipart>
    ): ReturnType<ImportXrayMultipart> => {
      return this.processor.xrayMultipart("api/v2/import/execution/multipart", results, info);
    },
    {
      v1: async (
        ...[results, info]: Parameters<ImportXrayMultipart["v1"]>
      ): ReturnType<ImportXrayMultipart["v1"]> => {
        return this.processor.xrayMultipart("api/v1/import/execution/multipart", results, info);
      },
    }
  );
}

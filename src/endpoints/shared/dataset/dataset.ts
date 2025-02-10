import type { Xray } from "../../../../index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the execution import endpoints.
 */
export class DatasetApi<
  ExportType extends Xray.Dataset.ExportQueryCloud | Xray.Dataset.ExportQueryServer,
> extends BaseApi {
  /**
   * Retrieves a CSV file with the dataset information. The response will contain all information
   * related to the dataset, e.g., parameters and values.
   *
   * One of `testIssueId` or `testIssueKey` is required. If both are provided, `testIssueId` is
   * used. Both `contextIssueId` and `contextIssueKey` are optional. If both `contextIssueId` and
   * `contextIssueKey` are provided, `contextIssueId` is used. The `resolved` flag is only relevant
   * when requesting the dataset of a test with a context issue.
   *
   * The returned dataset is provided with all the iterations generated.
   *
   * @param query the dataset query
   * @returns the dataset's CSV content
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Dataset/get_dataset_export
   * @see https://docs.getxray.app/display/XRAYCLOUD/Exporting+datasets+-+REST+v2
   */
  public async export(query?: ExportType): Promise<string> {
    const response = await this.client.send("/dataset/export", {
      expectedStatus: 200,
      method: "GET",
      query: query,
    });
    return await response.text();
  }
}

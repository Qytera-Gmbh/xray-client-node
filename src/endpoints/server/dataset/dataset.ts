import { createReadStream } from "node:fs";
import { basename } from "node:path";
import { blob } from "node:stream/consumers";
import { FormData } from "undici";
import type { Xray } from "../../../../index.js";
import { DatasetApi } from "../../shared/dataset/dataset.js";

/**
 * Models the execution import endpoints.
 */
export class DatasetServerApi extends DatasetApi<Xray.Dataset.ExportQueryServer> {
  /**
   * Endpoint used to imports a dataset through a CSV file to an entity. It is only possible to
   * import dataset to the following entities:
   *
   * - Test
   * - Test Plan - Test
   * - Test Execution - Test (Test Run)
   *
   * Please note: The file must be of type CSV. On the first line are presented the parameter names
   * and the lines below represent their values. In order for a parameter to be considered
   * combinatorial, it must contain `*` as a suffix. The CSV delimiter is `,`.
   *
   * ```csv
   * Browser*,Languague
   * Firefox,Portuguese
   * Chrome,English
   * ```
   *
   * Please note: Xray cloud currently does not provide an endpoint for dataset imports (see
   * https://jira.getxray.app/browse/XRAYCLOUD-3972).
   *
   * @param file the dataset CSV file
   * @param query the dataset query
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Dataset/post_dataset_import
   */
  public async import(
    file: string,
    query?: {
      /**
       * The ID of the context issue (test plan or test execution).
       */
      contextIssueId?: string;
      /**
       * The key of the context issue (test plan or test execution).
       */
      contextIssueKey?: string;
      /**
       * The ID of the test issue.
       */
      testIssueId?: string;
      /**
       * The key of the test issue.
       */
      testIssueKey?: string;
      /**
       * The test version.
       */
      testVersion?: string;
    }
  ): Promise<void> {
    const formData = new FormData();
    // How to make createStreamableFile work? Running into UND_ERR_REQ_CONTENT_LENGTH_MISMATCH here.
    // Maybe we just need to wait until openAsBlob becomes a stable feature?
    const fileBlob = await blob(createReadStream(file));
    formData.append("file", fileBlob, basename(file));
    await this.client.send("/dataset/import", {
      body: formData,
      expectedStatus: 200,
      method: "POST",
      query: query,
    });
  }
}

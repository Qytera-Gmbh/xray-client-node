import { Attachments } from "../endpoints/attachments/attachments.js";
import { Dataset } from "../endpoints/dataset/dataset.js";
import { GetTestRuns } from "../endpoints/graphql/get-test-runs.js";
import { ImportExecution } from "../endpoints/import/execution/import-execution.js";
import type { DatasetExportQueryCloud } from "../models/xray/dataset/dataset.js";
import type { ImportExecutionResponseCloud } from "../models/xray/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientCloud extends BaseClient {
  attachments = new Attachments(this);
  dataset = new Dataset<DatasetExportQueryCloud>(this);
  graphql = {
    getTestRuns: new GetTestRuns(this),
  };
  import = {
    execution: new ImportExecution<ImportExecutionResponseCloud>(this),
  };

  /**
   * Constructs a new Xray cloud client.
   *
   * @param config the client configuration
   */
  constructor(config: ClientConfiguration) {
    super({ ...config, url: `${config.url}/api/v2` });
  }
}

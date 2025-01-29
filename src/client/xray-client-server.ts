import { Dataset } from "../endpoints/dataset/dataset.js";
import { ImportExecution } from "../endpoints/import/execution/import-execution.js";
import type { DatasetExportQueryServer } from "../models/xray/dataset/dataset.js";
import type { ImportExecutionResponseServer } from "../models/xray/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  dataset = new Dataset<DatasetExportQueryServer>(this);
  import = {
    execution: new ImportExecution<ImportExecutionResponseServer>(this),
  };

  /**
   * Constructs a new Xray server client.
   *
   * @param config the client configuration
   */
  constructor(config: ClientConfiguration) {
    super({ ...config, url: `${config.url}/rest/raven/2.0/api` });
  }
}

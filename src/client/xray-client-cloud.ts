import { Dataset } from "../endpoints/dataset/dataset.js";
import { ImportExecution } from "../endpoints/import/execution/import-execution.js";
import type { DatasetExportQueryCloud } from "../models/dataset/dataset.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientCloud extends BaseClient {
  public import = {
    execution: new ImportExecution(this),
  };
  public dataset = new Dataset<DatasetExportQueryCloud>(this);

  /**
   * Constructs a new Xray cloud client.
   *
   * @param config the client configuration
   */
  constructor(config: ClientConfiguration) {
    super({ ...config, url: `${config.url}/api/v2` });
  }
}

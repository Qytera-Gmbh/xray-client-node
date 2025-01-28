import { Dataset } from "../endpoints/dataset/dataset.js";
import { ImportExecution } from "../endpoints/import/execution/import-execution.js";
import type { DatasetExportQueryServer } from "../models/dataset/dataset.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  public import = {
    execution: new ImportExecution(this),
  };
  public dataset = new Dataset<DatasetExportQueryServer>(this);

  /**
   * Constructs a new Xray server client.
   *
   * @param config the client configuration
   */
  constructor(config: ClientConfiguration) {
    super({ ...config, url: `${config.url}/rest/raven/2.0/api` });
  }
}

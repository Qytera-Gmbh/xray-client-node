import type { Xray } from "../../index.js";
import { AttachmentsApi } from "../endpoints/attachments/attachments.js";
import { DatasetApi } from "../endpoints/dataset/dataset.js";
import { GraphQLApi } from "../endpoints/graphql/graphql.js";
import { ImportExecutionApi } from "../endpoints/import/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientCloud extends BaseClient {
  attachments = new AttachmentsApi(this);
  dataset = new DatasetApi<Xray.Dataset.ExportQueryCloud>(this);
  graphql = new GraphQLApi(this);
  import = {
    execution: new ImportExecutionApi<Xray.Import.ResponseCloud>(this),
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

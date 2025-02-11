import type { Xray } from "../../index.js";
import { AttachmentsApi } from "../endpoints/cloud/attachments/attachments.js";
import { GraphQLApi } from "../endpoints/cloud/graphql/graphql.js";
import { DatasetApi } from "../endpoints/shared/dataset/dataset.js";
import { ImportExecutionApi } from "../endpoints/shared/import/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientCloud extends BaseClient {
  public attachments = new AttachmentsApi(this);
  public dataset = new DatasetApi<Xray.Dataset.ExportQueryCloud>(this);
  public graphql = new GraphQLApi(this);
  public import = {
    execution: new ImportExecutionApi<Xray.Import.ResponseCloud>(this, { isServerApi: false }),
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

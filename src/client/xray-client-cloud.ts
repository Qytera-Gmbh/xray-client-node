import type { Xray } from "../../index.js";
import { AttachmentsApi } from "../endpoints/cloud/attachments/attachments.js";
import { type GraphQLApi } from "../endpoints/cloud/graphql/graphql.js";
import { DatasetApi } from "../endpoints/shared/dataset/dataset.js";
import { ImportExecutionApi } from "../endpoints/shared/import/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

// This section checks whether all optional GraphQL dependencies are installed.
// We only do this so we can output helpful error messages on GraphQL access.
let optionalModules:
  | { api: false; graphql: false; graphqlTag: false }
  | { api: false; graphql: true; graphqlTag: false }
  | { api: typeof GraphQLApi; graphql: true; graphqlTag: true } = {
  api: false,
  graphql: false,
  graphqlTag: false,
};

try {
  await import("graphql");
  optionalModules = {
    api: false,
    graphql: true,
    graphqlTag: false,
  };
  await import("graphql-tag");
  optionalModules = {
    // We save the import result so that we don't have to import over and over again later on.
    api: (await import("../endpoints/cloud/graphql/graphql.js")).GraphQLApi,
    graphql: true,
    graphqlTag: true,
  };
} catch {
  // Let's hope that the user does not want to use the GraphQL API...
}

export class XrayClientCloud extends BaseClient {
  public attachments = new AttachmentsApi(this);
  public dataset = new DatasetApi<Xray.Dataset.ExportQueryCloud>(this);
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

  public get graphql(): GraphQLApi {
    if (!optionalModules.graphql) {
      throw new Error(
        "Failed to import module graphql. Please install it to use the GraphQL endpoints"
      );
    }
    if (!optionalModules.graphqlTag) {
      throw new Error(
        "Failed to import module graphql-tag. Please install it to use the GraphQL endpoints"
      );
    }
    return new optionalModules.api(this);
  }
}

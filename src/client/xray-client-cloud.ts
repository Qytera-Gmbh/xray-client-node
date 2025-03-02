import { AttachmentsApi } from "../endpoints/cloud/attachments/attachments.js";
import { DatasetApi } from "../endpoints/cloud/dataset/dataset.js";
import { type GraphQLApi } from "../endpoints/cloud/graphql/graphql.js";
import { ImportApi } from "../endpoints/cloud/import/import.js";
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
  public readonly attachment = new AttachmentsApi(this);
  public readonly dataset = new DatasetApi(this);
  public readonly graphql: GraphQLApi;
  public readonly import = new ImportApi(this);

  /**
   * Constructs a new client based on the provided configuration.
   *
   * @param config the configuration
   */
  constructor(config: ClientConfiguration) {
    super(config);
    if (optionalModules.graphql && optionalModules.graphqlTag) {
      this.graphql = new optionalModules.api(this);
    } else {
      this.graphql = new Proxy({} as GraphQLApi, {
        get() {
          if (!optionalModules.graphql) {
            throw new Error(
              "failed to import module graphql, please install it to use the GraphQL endpoints"
            );
          }
          throw new Error(
            "failed to import module graphql-tag, please install it to use the GraphQL endpoints"
          );
        },
      });
    }
  }
}

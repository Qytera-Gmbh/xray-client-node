import type { Xray } from "../../index.js";
import { AttachmentsApi } from "../endpoints/cloud/attachments/attachments.js";
import { DatasetApi } from "../endpoints/cloud/dataset/dataset.js";
import { type GraphQLApi } from "../endpoints/cloud/graphql/graphql.js";
import { ImportExecutionApi } from "../endpoints/shared/import/execution/import-execution.js";
import { BaseClient } from "./base-client.js";
import { PATH, versioned } from "./xray-client-version.js";

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
  public readonly attachments = new AttachmentsApi(this, "");
  public readonly dataset = new DatasetApi(this, PATH.cloud.v2);
  public readonly import = {
    execution: versioned(new ImportExecutionApi<Xray.Import.ResponseCloud>(this, PATH.cloud.v2), {
      v1: new ImportExecutionApi<Xray.Import.ResponseCloud>(this, PATH.cloud.v1),
    }),
  };

  public get graphql() {
    if (!optionalModules.graphql) {
      throw new Error(
        "failed to import module graphql, please install it to use the GraphQL endpoints"
      );
    }
    if (!optionalModules.graphqlTag) {
      throw new Error(
        "failed to import module graphql-tag, please install it to use the GraphQL endpoints"
      );
    }
    return versioned(new optionalModules.api(this, PATH.cloud.graphql.v2), {
      v1: new optionalModules.api(this, PATH.cloud.graphql.v1),
    });
  }
}

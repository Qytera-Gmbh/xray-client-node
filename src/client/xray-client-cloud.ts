import { ImportExecution } from "../endpoints/import/execution/import-execution.js";
import { BaseClient } from "./base-client.js";

export class XrayClientCloud extends BaseClient {
  public import = {
    execution: new ImportExecution(this),
  };
}

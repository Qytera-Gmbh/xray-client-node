import { BaseApi } from "../../base-api.js";
import { ImportExecutionApi } from "./execution/import-execution.js";

export class ImportApi extends BaseApi {
  public readonly execution = new ImportExecutionApi(this.client);
}

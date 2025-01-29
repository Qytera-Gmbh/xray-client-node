import { DatasetApi } from "../endpoints/dataset/dataset.js";
import { ImportExecutionApi } from "../endpoints/import/execution/import-execution.js";
import { TestExecutionApi } from "../endpoints/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/testplan/test-plan.js";
import type { DatasetExportQueryServer } from "../models/xray/dataset/dataset.js";
import type { ImportExecutionResponseServer } from "../models/xray/import/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  dataset = new DatasetApi<DatasetExportQueryServer>(this);
  import = {
    execution: new ImportExecutionApi<ImportExecutionResponseServer>(this),
  };
  testExecutions = new TestExecutionApi(this);
  testPlans = new TestPlanApi(this);

  /**
   * Constructs a new Xray server client.
   *
   * @param config the client configuration
   */
  constructor(config: ClientConfiguration) {
    super({ ...config, url: `${config.url}/rest/raven/2.0/api` });
  }
}

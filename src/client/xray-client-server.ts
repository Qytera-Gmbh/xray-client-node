import type { Xray } from "../../index.js";
import { DatasetServerApi } from "../endpoints/server/dataset/dataset.js";
import { TestExecutionApi } from "../endpoints/server/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/server/testplan/test-plan.js";
import { ExecutionEvidenceApi } from "../endpoints/server/testrun/attachment/attachment.js";
import { ImportExecutionApi } from "../endpoints/shared/import/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  dataset = new DatasetServerApi(this);
  import = {
    execution: new ImportExecutionApi<Xray.Import.ResponseServer>(this, { isServerApi: true }),
  };
  testExecutions = new TestExecutionApi(this);
  testPlans = new TestPlanApi(this);
  testRun = {
    evidence: new ExecutionEvidenceApi(this),
  };

  /**
   * Constructs a new Xray server client.
   *
   * @param config the client configuration
   */
  constructor(config: ClientConfiguration) {
    super({ ...config, url: `${config.url}/rest/raven/2.0/api` });
  }
}

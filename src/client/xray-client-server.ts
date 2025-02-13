import type { Xray } from "../../index.js";
import { DatasetServerApi } from "../endpoints/server/dataset/dataset.js";
import { TestExecutionApi } from "../endpoints/server/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/server/testplan/test-plan.js";
import { ExecutionEvidenceApi } from "../endpoints/server/testrun/attachment/attachment.js";
import { TestRunApi } from "../endpoints/server/testrun/test-run.js";
import { ImportExecutionApi } from "../endpoints/shared/import/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  public dataset = new DatasetServerApi(this);
  public import = {
    execution: new ImportExecutionApi<Xray.Import.ResponseServer>(this, { isServerApi: true }),
  };
  public testExecutions = new TestExecutionApi(this);
  public testPlans = new TestPlanApi(this);
  public testRuns = {
    evidence: new ExecutionEvidenceApi(this),
    testRun: new TestRunApi(this),
  };

  /**
   * Constructs a new Xray server client.
   *
   * @param config the client configuration
   */
  constructor(
    config: ClientConfiguration & {
      /**
       * The Xray API version to use. For stability reasons it is usually a good idea to use the
       * highest version available.
       *
       * @default "latest"
       *
       * @see https://docs.getxray.app/display/XRAY/REST+API
       */
      apiVersion?: "1.0" | "2.0" | "latest";
    }
  ) {
    super({ ...config, url: `${config.url}/rest/raven/${config.apiVersion ?? "latest"}/api` });
  }
}

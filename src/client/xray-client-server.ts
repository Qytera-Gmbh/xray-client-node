import type { Xray } from "../../index.js";
import { DatasetServerApi } from "../endpoints/server/dataset/dataset.js";
import { TestExecutionApi } from "../endpoints/server/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/server/testplan/test-plan.js";
import { TestRunApi } from "../endpoints/server/testrun/test-run.js";
import { ImportExecutionApi } from "../endpoints/shared/import/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  public readonly dataset = new DatasetServerApi(this);
  public readonly import = {
    execution: new ImportExecutionApi<Xray.Import.ResponseServer>(this, { isServerApi: true }),
  };
  public readonly testExecutions = new TestExecutionApi(this);
  public readonly testPlans = new TestPlanApi(this);
  public readonly testRuns = new TestRunApi(this);

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

import { AttachmentsApi } from "../endpoints/attachments/attachments.js";
import { DatasetApi } from "../endpoints/dataset/dataset.js";
import { GetTestPlanApi } from "../endpoints/graphql/get-test-plan.js";
import { GetTestPlansApi } from "../endpoints/graphql/get-test-plans.js";
import { GetTestRunsApi } from "../endpoints/graphql/get-test-runs.js";
import { ImportExecutionApi } from "../endpoints/import/execution/import-execution.js";
import type { DatasetExportQueryCloud } from "../models/xray/dataset/dataset.js";
import type { ImportExecutionResponseCloud } from "../models/xray/import/execution/import-execution.js";
import type { ClientConfiguration } from "./base-client.js";
import { BaseClient } from "./base-client.js";

export class XrayClientCloud extends BaseClient {
  attachments = new AttachmentsApi(this);
  dataset = new DatasetApi<DatasetExportQueryCloud>(this);
  graphql = {
    getTestPlan: new GetTestPlanApi(this),
    getTestPlans: new GetTestPlansApi(this),
    getTestRuns: new GetTestRunsApi(this),
  };
  import = {
    execution: new ImportExecutionApi<ImportExecutionResponseCloud>(this),
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

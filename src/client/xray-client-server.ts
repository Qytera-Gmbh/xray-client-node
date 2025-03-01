import { DatasetApi } from "../endpoints/server/dataset/dataset.js";
import { ImportExecutionApi } from "../endpoints/server/import/execution/import-execution.js";
import { TestExecutionApi } from "../endpoints/server/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/server/testplan/test-plan.js";
import { TestRunApi } from "../endpoints/server/testrun/test-run.js";
import { BaseClient } from "./base-client.js";
import { PATH, versioned } from "./xray-client-version.js";

export class XrayClientServer extends BaseClient {
  public readonly dataset = new DatasetApi(this, PATH.server);
  public readonly import = {
    execution: new ImportExecutionApi(this, PATH.server),
  };
  public readonly testExecutions = versioned(new TestExecutionApi(this, PATH.server), {
    v1: new TestExecutionApi(this, PATH.server),
  });
  public readonly testPlans = versioned(new TestPlanApi(this, PATH.server), {
    v1: new TestPlanApi(this, PATH.server),
  });
  public readonly testRuns = versioned(new TestRunApi(this, PATH.server), {
    v1: new TestRunApi(this, PATH.server),
  });
}

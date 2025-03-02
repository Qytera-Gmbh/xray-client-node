import { DatasetApi } from "../endpoints/server/dataset/dataset.js";
import { ImportExecutionApi } from "../endpoints/server/import/execution/import-execution.js";
import { TestExecutionApi } from "../endpoints/server/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/server/testplan/test-plan.js";
import { TestRunApi } from "../endpoints/server/testrun/test-run.js";
import { TestApi } from "../endpoints/server/tests/test.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  public readonly dataset = new DatasetApi(this);
  public readonly import = {
    execution: new ImportExecutionApi(this),
  };
  public readonly test = new TestApi(this);
  public readonly testExecution = new TestExecutionApi(this);
  public readonly testPlan = new TestPlanApi(this);
  public readonly testRun = new TestRunApi(this);
}

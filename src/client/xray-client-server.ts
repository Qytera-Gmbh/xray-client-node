import { DatasetApi } from "../endpoints/server/dataset/dataset.js";
import { ImportExecutionApi } from "../endpoints/server/import/execution/import-execution.js";
import { SettingApi } from "../endpoints/server/setting/setting.js";
import { TestApi } from "../endpoints/server/test/test.js";
import { TestExecutionApi } from "../endpoints/server/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/server/testplan/test-plan.js";
import { TestRunApi } from "../endpoints/server/testrun/test-run.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  public dataset = new DatasetApi(this);
  public import = {
    execution: new ImportExecutionApi(this),
  };
  public setting = new SettingApi(this);
  public test = new TestApi(this);
  public testExecution = new TestExecutionApi(this);
  public testPlan = new TestPlanApi(this);
  public testRun = new TestRunApi(this);
}

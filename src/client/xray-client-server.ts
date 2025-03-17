import { DatasetApi } from "../endpoints/server/dataset/dataset.js";
import { ImportApi } from "../endpoints/server/import/import.js";
import { PreconditionApi } from "../endpoints/server/precondition/precondition.js";
import { SettingApi } from "../endpoints/server/setting/setting.js";
import { TestApi } from "../endpoints/server/test/test.js";
import { TestExecutionApi } from "../endpoints/server/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/server/testplan/test-plan.js";
import { TestRunApi } from "../endpoints/server/testrun/test-run.js";
import { BaseClient } from "./base-client.js";

export class XrayClientServer extends BaseClient {
  public readonly dataset = new DatasetApi(this);
  public readonly import = new ImportApi(this);
  public readonly precondition = new PreconditionApi(this);
  public readonly setting = new SettingApi(this);
  public readonly test = new TestApi(this);
  public readonly testExecution = new TestExecutionApi(this);
  public readonly testPlan = new TestPlanApi(this);
  public readonly testRun = new TestRunApi(this);
}

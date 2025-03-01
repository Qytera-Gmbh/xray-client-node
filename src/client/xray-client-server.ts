import type { Xray } from "../../index.js";
import { DatasetApi } from "../endpoints/server/dataset/dataset.js";
import { TestExecutionApi } from "../endpoints/server/testexec/test-execution.js";
import { TestPlanApi } from "../endpoints/server/testplan/test-plan.js";
import { TestRunApi } from "../endpoints/server/testrun/test-run.js";
import { ImportExecutionApi } from "../endpoints/shared/import/execution/import-execution.js";
import { BaseClient } from "./base-client.js";
import { PATH, versioned } from "./xray-client-version.js";

export class XrayClientServer extends BaseClient {
  public readonly dataset = new DatasetApi(this, PATH.server.v2);
  public readonly import = {
    execution: versioned(new ImportExecutionApi<Xray.Import.ResponseServer>(this, PATH.server.v2), {
      v1: new ImportExecutionApi<Xray.Import.ResponseServer>(
        this,
        PATH.server.v1.replace("/api", "")
      ),
    }),
  };
  public readonly testExecutions = versioned(new TestExecutionApi(this, PATH.server.v2), {
    v1: new TestExecutionApi(this, PATH.server.v1),
  });
  public readonly testPlans = versioned(new TestPlanApi(this, PATH.server.v2), {
    v1: new TestPlanApi(this, PATH.server.v1),
  });
  public readonly testRuns = versioned(new TestRunApi(this, PATH.server.v2), {
    v1: new TestRunApi(this, PATH.server.v2),
  });
}

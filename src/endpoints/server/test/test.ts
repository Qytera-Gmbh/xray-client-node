import type { Xray } from "../../../models/index.js";
import { BaseApi } from "../../base-api.js";
import { TestStepApi } from "./step/step.js";

/**
 * Models the Xray server test endpoints.
 */
export class TestApi extends BaseApi {
  public readonly step = new TestStepApi(this.client);

  /**
   * To export the pre-conditions of a test, you need to specify the key of the test you wish to
   * export the test pre-conditions from.
   *
   * @param key the test issue key
   * @returns JSON with the test preconditions of a given test
   *
   * @see https://docs.getxray.app/display/XRAY/Tests+-+REST
   */
  public async getPreconditions(key: string): Promise<Xray.Test.Precondition[]> {
    const response = await this.client.send(`rest/raven/1.0/api/test/${key}/preconditions`, {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as Xray.Test.Precondition[];
  }

  /**
   * To export the test executions of a test, you need to specify the key of the test you wish to
   * export the test executions from.
   *
   * @param key the test issue key
   * @returns JSON with the exported test executions
   *
   * @see https://docs.getxray.app/display/XRAY/Tests+-+REST
   */
  public async getTestExecutions(key: string): Promise<Xray.Test.TestExecution[]> {
    const response = await this.client.send(`rest/raven/1.0/api/test/${key}/testexecutions`, {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as Xray.Test.TestExecution[];
  }

  /**
   * To export the test plans of a test, you need to specify the key of the test you wish to export
   * the test plans from.
   *
   * @param key the test issue key
   * @returns JSON with the exported test plans
   *
   * @see https://docs.getxray.app/display/XRAY/Tests+-+REST
   */
  public async getTestPlans(key: string): Promise<Xray.Test.TestPlan[]> {
    const response = await this.client.send(`rest/raven/1.0/api/test/${key}/testplans`, {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as Xray.Test.TestPlan[];
  }

  /**
   * To export the test runs of a test, you need to specify the key of the test you wish to export
   * the test runs from. You can filter the test runs by test environment.
   *
   * @param key the test issue key
   * @param query the query parameters
   * @returns JSON with the exported test runs
   *
   * @see https://docs.getxray.app/display/XRAY/Tests+-+REST
   */
  public async getTestRuns(
    key: string,
    query?: {
      /**
       * Test execution environments.
       */
      testEnvironments?: string[];
    }
  ): Promise<Xray.TestRun.Details[]> {
    const response = await this.client.send(`rest/raven/1.0/api/test/${key}/testruns`, {
      expectedStatus: 200,
      method: "GET",
      query: {
        testEnvironments: query?.testEnvironments?.map((e) => e.replace(",", "\\,")).join(","),
      },
    });
    return (await response.json()) as Xray.TestRun.Details[];
  }

  /**
   * To export tests to JSON, you need to specify the keys, the ID of the filter or JQL query of the
   * issues you want to export. At least one query parameter has to be specified, but all 3 can be
   * sent at the same time.
   *
   * @param query the query
   * @returns JSON with the exported tests
   *
   * @see https://docs.getxray.app/display/XRAY/Tests+-+REST
   */
  public async getTests(query?: {
    /**
     * Jira ID of the filter.
     */
    filter?: number;
    /**
     * A JQL query.
     */
    jql?: string;
    /**
     * List of keys of the tests.
     */
    keys?: string[];
  }): Promise<Xray.Test.Details[]> {
    const response = await this.client.send("rest/raven/1.0/api/test", {
      expectedStatus: 200,
      method: "GET",
      query: {
        ...query,
        keys: query?.keys?.join(";"),
      },
    });
    return (await response.json()) as Xray.Test.Details[];
  }

  /**
   * To export the test sets of a test, you need to specify the key of the test you wish to export
   * the test sets from.
   *
   * @param key the test issue key
   * @returns JSON with the exported test sets
   *
   * @see https://docs.getxray.app/display/XRAY/Tests+-+REST
   */
  public async getTestSets(key: string): Promise<Xray.Test.TestSet[]> {
    const response = await this.client.send(`rest/raven/1.0/api/test/${key}/testsets`, {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as Xray.Test.TestSet[];
  }
}

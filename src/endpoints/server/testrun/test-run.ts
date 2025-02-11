import type {
  GetTestRunResponse,
  UpdateTestRunResponse,
} from "../../../models/xray/testrun/test-run.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the execution evidence endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-TestRun
 */
export class TestRunApi extends BaseApi {
  /**
   * Return a JSON that represents the test run.
   *
   * @param testRun the ID of the test run to return or a query specifying the test run
   * @returns the test run details
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-TestRun
   */
  public async getTestRun(
    testRun:
      | {
          /**
           * The key of the test execution.
           */
          testExecIssueKey: string;
          /**
           * The key of the test issue.
           */
          testIssueKey: string;
        }
      | string
  ): Promise<GetTestRunResponse> {
    let response;
    if (typeof testRun === "string") {
      response = await this.client.send(`/testrun/${testRun}`, {
        expectedStatus: 200,
        method: "GET",
      });
    } else {
      response = await this.client.send("/testrun", {
        expectedStatus: 200,
        method: "GET",
        query: testRun,
      });
    }
    return (await response.json()) as GetTestRunResponse;
  }

  /**
   * Update the test run. The fields that can be updated on the test run are: `status`, `comment`,
   * `assignee`, `defects`, `evidences`, examples and `steps`.
   *
   * @param testRun the ID of the test run to update
   * @returns the test run details
   *
   * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-TestRun
   */
  public async updateTestRun(
    testRun: string,
    body: {
      /**
       * @example "ampr"
       */
      assignee?: string;
      /**
       * @example "new comment"
       */
      comment?: string;
      defects?: {
        /**
         * @example ["test-114", "appId=a364a9c7-9ac0-3183-9175-353c1331692a&issue=SDP-5"]
         */
        add?: string[];
        /**
         * @example ["DCW-9", "appId=a364a9c7-9ac0-3183-9175-353c1331692a&issue=SDP-1"]
         */
        remove?: string[];
      };
      evidences?: {
        add?: {
          /**
           * @example "plain/text"
           */
          contentType: string;
          /**
           * @example "(base64 encoding...)"
           */
          data: string;
          /**
           * @example "test1.txt"
           */
          filename: string;
        }[];
        /**
         * @example ["274", "543"]
         */
        remove?: string[];
      };
      examples?: {
        /**
         * @example "1379"
         */
        id: string;
        /**
         * @example "TODO"
         */
        status: string;
      }[];
      /**
       * @example "FAIL"
       */
      status?: string;
      steps?: {
        /**
         * @example "the comment 1"
         */
        comment?: string;
        defects?: {
          /**
           * @example ["test-114", "test-115", "test-116", "appId=a364a9c7-9ac0-3183-9175-353c1331692a&issue=SDP-5"]
           */
          add: string[];
        };
        evidences?: {
          add?: {
            /**
             * @example "plain/text"
             */
            contentType: string;
            /**
             * @example "(base64 encoding...)"
             */
            data: string;
            /**
             * @example "test1.txt"
             */
            filename: string;
          }[];
          /**
           * @example ["274", "543"]
           */
          remove?: string[];
        };
        /**
         * @example "730"
         */
        id: string;
        /**
         * @example "PASS"
         */
        status?: string;
      }[];
    }
  ): Promise<UpdateTestRunResponse> {
    const response = await this.client.send(`/testrun/${testRun}`, {
      body: JSON.stringify(body),
      expectedStatus: 200,
      headers: { ["Content-Type"]: "application/json" },
      method: "PUT",
    });
    return (await response.json()) as UpdateTestRunResponse;
  }
}

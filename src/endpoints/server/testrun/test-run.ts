import type { Xray } from "../../../../index.js";
import { PATH, versioned } from "../../../client/xray-client-version.js";
import { BaseApi } from "../../base-api.js";
import { ExecutionEvidenceApiV1, ExecutionEvidenceApiV2 } from "./attachment/attachment.js";

/**
 * Models the execution evidence endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-TestRun
 */
export class TestRunApi extends BaseApi {
  public readonly evidence = versioned(new ExecutionEvidenceApiV2(this.client, PATH.server), {
    v1: new ExecutionEvidenceApiV1(this.client, PATH.server),
  });

  /**
   * Retrieves a Test Run given the test execution and test keys. The response will contain all
   * information related to a test run, e.g., status, created and finish dates, step results, test
   * environments, defects, test run custom fields, and so on.
   *
   * In case the test run has iterations, steps will not appear. However, if it has parameters but
   * executed one time, it will show the steps and the parameters info.
   *
   * @param testRun the ID of the test run to return or a query specifying the test run
   * @returns the test run details
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Run/get_testrun__id_
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
  ): Promise<Xray.TestRun.GetTestRunResponse> {
    let response;
    if (typeof testRun === "string") {
      response = await this.client.send(`${this.path}/testrun/${testRun}`, {
        expectedStatus: 200,
        method: "GET",
      });
    } else {
      response = await this.client.send(`${this.path}/testrun`, {
        expectedStatus: 200,
        method: "GET",
        query: testRun,
      });
    }
    return (await response.json()) as Xray.TestRun.GetTestRunResponse;
  }

  /**
   * Update all the values of a test run. The user can update the values of the overall status,
   * step results, assignee, test environments, add defects and evidences and so on.
   *
   * To update the value of a Test Run custom field, the id of the field must be provided as well as
   * a valid value for that custom field type.
   *
   * - **Toggle Fields** values should be _"true"_, _"false"_, _"0"_ or _"1"_
   * - **Number Fields** values should be a string containing a number, e.g. _"320"_. Decimal number
   *   are also accepted,for instance, "320.5". The decimal places are always separated by a _"."_
   * - **Single Select and Radio Button Fields** values should be a single string containing the
   *   option value, e.g. _"Option A"_. The value should be a valid option for that custom field.
   *   The values are not case sensitive.
   * - **Multiple Select Fields** values should be an array of the string of option values, e.g.
   *   _["Option A", "Option B"]_. All the selected values should be valid for that custom field.
   *   The option values are not case sensitive.
   * - **Date Fields** should follow the ISO format _yyyy-MM-dd_, where _yyyy_ represents the year,
   *   _MM_ the month in year and _dd_ the day in the month. For instance, a valid value would be
   *   _"2020-05-02"_.
   * - **Date Time fields** should be in UTC following the ISO format _yyyy-MM-dd'T'HH:mm'Z'_. The
   *   date part follows the same date format, while _HH_ represents the hours (0-24), _mm_ the
   *   minutes in hour and _Z_ indicates the hour in UTC. For instance, a valid date time value
   *   would be _"2020-05-02T10:30Z"_.
   *
   * An error will be returned when there are invalid custom field values. It is also possible to
   * delete a test run custom field value by providing a null or empty value (e.g., _""_ or _[]_).
   * **It is not possible to delete a value of a required test run custom field value.**
   *
   * Also, **it is not possible to change the test run to a final status when there are required
   * test run custom fields with empty values.**
   *
   * In the case of a test run of a manual test type, it is possible to update the steps only if
   * there are zero or one iterations. If there are multiple iterations, it is not possible to
   * update the steps through this endpoint, only the iterations.
   *
   * @param testRun the ID of the test run to update
   * @param body the details to update
   * @returns the test run details
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Run/put_testrun__id_
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
  ): Promise<Xray.TestRun.UpdateTestRunResponse> {
    const response = await this.client.send(`${this.path}/testrun/${testRun}`, {
      body: JSON.stringify(body),
      expectedStatus: 200,
      headers: { ["Content-Type"]: "application/json" },
      method: "PUT",
    });
    return (await response.json()) as Xray.TestRun.UpdateTestRunResponse;
  }
}

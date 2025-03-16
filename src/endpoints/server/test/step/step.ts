import type { Xray } from "../../../../models/index.js";
import { BaseApi } from "../../../base-api.js";

interface GetSteps {
  /**
   * Returns all the steps of a test issue given the key. The response contains for each step the
   * corresponding id, index, fields and the attachments.
   *
   * The test step fields are identified by their name and can be of type _Data_ (toggle, number,
   * date and date time fields), _Option_ (single select, multiple select and radio button fields),
   * _Wiki_ (native fields, single and multiple line fields).
   *
   * The value of step fields of type _Wiki_ have a raw and rendered value. _Option_ fields value
   * will be an array containing the information of the selected options (the option ID and its
   * value).
   *
   * @param testKey the key of the test issue
   * @param query the query parameters
   * @returns the test step details
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step/get_test__testKey__steps
   */
  getSteps(
    testKey: string,
    query?: {
      /**
       * One of the test versions.
       *
       * @example "manual_1"
       */
      testVersion?: string;
    }
  ): Promise<{ steps: Xray.Test.Step.DetailsV2[] }>;
  v1: {
    /**
     * Return JSON with the test steps of a given test.
     *
     * @param testKey the key of the test issue
     * @returns the test step details
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    getSteps(testKey: string): Promise<Xray.Test.Step.DetailsV1[]>;
  };
}

interface GetStep {
  /**
   * Returns the values of a single test step, given the test key and the step ID. The response
   * follows the same format as the previous endpoints, containing the step ID, index, fields and
   * the attachments.
   *
   * The test step fields are identified by their name and can be of type _Data_ (toggle, number,
   * date and date time fields), _Option_ (single select, multiple select and radio button fields),
   * _Wiki_ (native fields, single and multiple line fields).
   *
   * The value of step fields of type _Wiki_ have a raw and rendered value. _Option_ fields value
   * will be an array containing the information of the selected options (the option ID and its
   * value).
   *
   * @param testKey the key of the test issue
   * @param stepId the ID of the test step
   * @returns the test step details
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step/get_test__testKey__steps__stepId_
   */
  getStep(testKey: string, stepId: number): Promise<{ step: Xray.Test.Step.DetailsV2 }>;
  v1: {
    /**
     * Return JSON with the test step with the given ID.
     *
     * @param testKey the key of the test issue
     * @param id the ID of the test step
     * @returns the test step details
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    getStep(testKey: string, id: number): Promise<Xray.Test.Step.DetailsV1>;
  };
}

interface GetAttachments {
  /**
   * Returns all the attachments of a test step, given the test key and step ID.
   *
   * @param testKey the key of the test issue
   * @param stepId the ID of the test step
   * @returns the test step attachments
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step/get_test__testKey__steps__stepId__attachments
   */
  getAttachments(testKey: string, stepId: number): Promise<Xray.Attachment.FileAttachment[]>;
  v1: {
    /**
     * Return JSON with all the test step attachments.
     *
     * @param testKey the key of the test issue
     * @param id the ID of the test step
     * @returns the test step attachments
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    getAttachments(testKey: string, id: number): Promise<Xray.Attachment.FileAttachment[]>;
  };
}

interface CreateStep {
  /**
   * Create a new test step. All step fields values are listed under fields and identified by the
   * name and a list of attachments to add to the step. The field values should follow a certain
   * format according to the custom field type.
   *
   * - **Toggle Fields** values should be `"true"`, `"false"`, `"0"` or `"1"`
   * - **Number Fields** values should be a string containing a number, e.g. `"320"`. Decimal number
   * are also accepted, for instance, `"320.5"`. The decimal places are always separated by a `.`
   * - **Single Select and Radio Button Fields** values should be a single string containing the
   * option value, e.g. `"Option A"`. The value should be a valid option for that custom field.
   * The values are not case sensitive.
   * - **Multiple Select Fields** values should be an array of the string of option values, e.g.
   * `["Option A", "Option B"]`. All the selected values should be valid for that custom field. The
   * option values are not case sensitive.
   * - **Date Fields** should follow the ISO format _yyyy-MM-dd_, where _yyyy_ represents the year,
   * _MM_ the month in year and _dd_ the day in the month. For instance, a valid value would be
   * `"2020-05-02"`.
   * - **Date Time fields** should be in UTC following the ISO format _yyyy-MM-dd'T'HH:mm'Z'_.
   * The date part follows the same date format, while _HH_ represents the hours (0-24), _mm_ the
   * minutes in hour and _Z_ indicates the hour in UTC. For instance, a valid date time value would
   * be `"2020-05-02T10:30Z"`.
   *
   * The remaining field types values do not required a specific validation. For instance, for a
   * single line custom field a valid value would be `"Perform Action B"`.
   *
   * If some value is not valid for a certain custom field type, an error will be return stating the
   * field with the incorrect value. Furthermore, all required step fields must be provided.
   *
   * @param testKey the key of the test issue
   * @param query the query parameters
   * @param body the new step
   * @returns the step creation result
   *
   */
  createStep(
    testKey: string,
    body: {
      attachments?: File[];
      /**
       * @example
       *
       * ```ts
       * {
       *   Action: "Step Action",
       *   Date: "01/Feb/2022",
       *   Toggle: "true",
       *   SingleSelectList: "Selected Value",
       *   MultiSelectList: ["Option A", "Option B"]
       * }
       * ```
       */
      fields: Record<string, string | string[]>;
    },
    query?: {
      /**
       * A test version.
       *
       * @example "manual_2"
       */
      testVersion?: string;
    }
  ): Promise<CreateStepResponse>;
  v1: {
    /**
     * Create a new test step.
     *
     * @param testKey the key of the test issue
     * @param body the new step
     * @returns the step creation result
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    createStep(
      testKey: string,
      body: {
        attachments?: File[];
        /**
         * @example "example data"
         */
        data?: string;
        /**
         * @example "example result"
         */
        result?: string;
        /**
         * @example "example step"
         */
        step: string;
      }
    ): Promise<CreateStepResponse["step"]>;
  };
}

interface File {
  /**
   * @example "plain/text"
   */
  contentType: string;
  /**
   * @example "aGVsbG8gd29ybGQ="
   */
  data: string;
  /**
   * @example "example.txt"
   */
  filename: string;
}

interface CreateStepResponse {
  step: {
    /**
     * @example [25737, 25738]
     */
    attachmentIds: number[];
    /**
     * @example 85860
     */
    id: number;
  };
  warnings: string[];
}

/**
 * Models the test step endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
 * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step
 */
export class TestStepApi extends BaseApi implements GetSteps, GetStep, GetAttachments, CreateStep {
  private readonly processor = {
    getAttachments: async (url: string) => {
      const response = await this.client.send(url, {
        expectedStatus: 200,
        method: "GET",
      });
      return (await response.json()) as Xray.Attachment.FileAttachment[];
    },
  };

  public readonly v1: GetSteps["v1"] & GetStep["v1"] & GetAttachments["v1"] & CreateStep["v1"] =
    this.bind((self) => ({
      async createStep(testKey, body) {
        const response = await self.client.send(`rest/raven/1.0/api/test/${testKey}/step`, {
          body: JSON.stringify(body),
          expectedStatus: 200,
          headers: { ["Content-Type"]: "application/json" },
          method: "PUT",
        });
        return (await response.json()) as Awaited<ReturnType<CreateStep["v1"]["createStep"]>>;
      },
      async getAttachments(testKey, id) {
        return self.processor.getAttachments(
          `rest/raven/1.0/api/test/${testKey}/step/${id.toString()}/attachment`
        );
      },
      async getStep(testKey, id) {
        const response = await self.client.send(
          `rest/raven/1.0/api/test/${testKey}/step/${id.toString()}`,
          {
            expectedStatus: 200,
            method: "GET",
          }
        );
        return (await response.json()) as Awaited<ReturnType<GetStep["v1"]["getStep"]>>;
      },
      async getSteps(testKey) {
        const response = await self.client.send(`rest/raven/1.0/api/test/${testKey}/step`, {
          expectedStatus: 200,
          method: "GET",
        });
        return (await response.json()) as Awaited<ReturnType<GetSteps["v1"]["getSteps"]>>;
      },
    }));

  public async createStep(
    ...[testKey, body, query]: Parameters<CreateStep["createStep"]>
  ): ReturnType<CreateStep["createStep"]> {
    const response = await this.client.send(`rest/raven/2.0/api/test/${testKey}/steps`, {
      body: JSON.stringify(body),
      expectedStatus: 201,
      headers: { ["Content-Type"]: "application/json" },
      method: "POST",
      query,
    });
    return (await response.json()) as Awaited<ReturnType<CreateStep["createStep"]>>;
  }

  public async getAttachments(
    ...[testKey, id]: Parameters<GetAttachments["getAttachments"]>
  ): ReturnType<GetAttachments["getAttachments"]> {
    return this.processor.getAttachments(
      `rest/raven/2.0/api/test/${testKey}/steps/${id.toString()}/attachments`
    );
  }

  public async getStep(
    ...[testKey, id]: Parameters<GetStep["getStep"]>
  ): ReturnType<GetStep["getStep"]> {
    const response = await this.client.send(
      `rest/raven/2.0/api/test/${testKey}/steps/${id.toString()}`,
      {
        expectedStatus: 200,
        method: "GET",
      }
    );
    return (await response.json()) as Awaited<ReturnType<GetStep["getStep"]>>;
  }

  public async getSteps(
    ...[testKey, query]: Parameters<GetSteps["getSteps"]>
  ): ReturnType<GetSteps["getSteps"]> {
    const response = await this.client.send(`rest/raven/2.0/api/test/${testKey}/steps`, {
      expectedStatus: 200,
      method: "GET",
      query,
    });
    return (await response.json()) as Awaited<ReturnType<GetSteps["getSteps"]>>;
  }
}

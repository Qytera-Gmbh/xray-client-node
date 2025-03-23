import type { Xray } from "../../../../../index.js";
import { BaseApi } from "../../../base-api.js";

/**
 * Models the test step endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
 * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step
 */
export class TestStepApi extends BaseApi {
  private readonly processor = {
    getAttachments: async (url: string) => {
      const response = await this.client.send(url, {
        expectedStatus: 200,
        method: "GET",
      });
      return (await response.json()) as Xray.Attachment.FileAttachment[];
    },
  };

  public readonly v1 = {
    /**
     * Create a new test step.
     *
     * @param testKey the key of the test issue
     * @param body the new step
     * @returns the step creation result
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    createStep: async (
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
    ): Promise<NewStepResponse["step"]> => {
      const response = await this.client.send(`rest/raven/1.0/api/test/${testKey}/step`, {
        body: JSON.stringify(body),
        expectedStatus: 200,
        headers: { ["Content-Type"]: "application/json" },
        method: "PUT",
      });
      return (await response.json()) as NewStepResponse["step"];
    },

    /**
     * Remove an attachment from a test step.
     *
     * @param testKey the key of the test issue
     * @param stepId the ID of the test step
     * @param attachmentId the ID of the attachment
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    deleteAttachment: async (
      testKey: string,
      stepId: number,
      attachmentId: number
    ): Promise<void> => {
      await this.client.send(
        `rest/raven/1.0/api/test/${testKey}/step/${stepId.toString()}/attachment/${attachmentId.toString()}`,
        {
          expectedStatus: 200,
          method: "DELETE",
        }
      );
    },

    /**
     * Remove a test step from a test.
     *
     * @param testKey the key of the test issue
     * @param stepId the ID of the test step
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    deleteStep: async (testKey: string, stepId: number): Promise<void> => {
      await this.client.send(`rest/raven/1.0/api/test/${testKey}/step/${stepId.toString()}`, {
        expectedStatus: 200,
        method: "DELETE",
      });
    },

    /**
     * Return JSON with all the test step attachments.
     *
     * @param testKey the key of the test issue
     * @param id the ID of the test step
     * @returns the test step attachments
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    getAttachments: async (
      testKey: string,
      id: number
    ): Promise<Xray.Attachment.FileAttachment[]> => {
      return await this.processor.getAttachments(
        `rest/raven/1.0/api/test/${testKey}/step/${id.toString()}/attachment`
      );
    },

    /**
     * Return JSON with the test step with the given ID.
     *
     * @param testKey the key of the test issue
     * @param id the ID of the test step
     * @returns the test step details
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    getStep: async (testKey: string, id: number): Promise<Xray.Test.Step.DetailsV1> => {
      const response = await this.client.send(
        `rest/raven/1.0/api/test/${testKey}/step/${id.toString()}`,
        {
          expectedStatus: 200,
          method: "GET",
        }
      );
      return (await response.json()) as Promise<Xray.Test.Step.DetailsV1>;
    },

    /**
     * Return JSON with the test steps of a given test.
     *
     * @param testKey the key of the test issue
     * @returns the test step details
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    getSteps: async (testKey: string): Promise<Xray.Test.Step.DetailsV1[]> => {
      const response = await this.client.send(`rest/raven/1.0/api/test/${testKey}/step`, {
        expectedStatus: 200,
        method: "GET",
      });
      return (await response.json()) as Promise<Xray.Test.Step.DetailsV1[]>;
    },

    /**
     * Update a specific test step.
     *
     * @param testKey the key of the test issue
     * @param stepId the ID of the test step
     * @param body the new step
     * @returns the step update result
     *
     * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
     */
    updateStep: async (
      testKey: string,
      stepId: number,
      body: {
        attachments?: {
          /**
           * @example
           *
           * ```ts
           * [
           *   {
           *     data: "gsddfgdsfg...(base64) ",
           *     filename: "example1.txt",
           *     contentType: "plain/text"
           *   },
           *   {
           *     data: "gsddfgdsfg...(base64) ",
           *     filename: "example2.txt",
           *     contentType: "plain/text"
           *   }
           * ]
           * ```
           */
          add?: File[];
          /**
           * @example [141, 105]
           */
          remove?: number[];
        };
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
        step?: string;
      }
    ): Promise<NewStepResponse["step"]> => {
      const response = await this.client.send(
        `rest/raven/1.0/api/test/${testKey}/step/${stepId.toString()}`,
        {
          body: JSON.stringify(body),
          expectedStatus: 200,
          headers: { ["Content-Type"]: "application/json" },
          method: "POST",
        }
      );
      return (await response.json()) as NewStepResponse["step"];
    },
  };

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
  public async createStep(
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
  ): Promise<NewStepResponse> {
    const response = await this.client.send(`rest/raven/2.0/api/test/${testKey}/steps`, {
      body: JSON.stringify(body),
      expectedStatus: 201,
      headers: { ["Content-Type"]: "application/json" },
      method: "POST",
      query,
    });
    return (await response.json()) as NewStepResponse;
  }

  /**
   * Deletes a test step attachment, given the test key and step and attachment IDs.
   *
   * @param testKey the key of the test issue
   * @param stepId the ID of the test step
   * @param attachmentId the ID of the attachment
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step/delete_test__testKey__steps__stepId__attachment__attachmentId_
   */
  public async deleteAttachment(
    testKey: string,
    stepId: number,
    attachmentId: number
  ): Promise<void> {
    await this.client.send(
      `rest/raven/2.0/api/test/${testKey}/steps/${stepId.toString()}/attachment/${attachmentId.toString()}`,
      {
        expectedStatus: 204,
        method: "DELETE",
      }
    );
  }

  /**
   * Deletes a test step given the test key and the step ID.
   *
   * @param testKey the key of the test issue
   * @param stepId the ID of the test step
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step/delete_test__testKey__steps__stepId_
   */
  public async deleteStep(testKey: string, stepId: number): Promise<void> {
    await this.client.send(`rest/raven/2.0/api/test/${testKey}/steps/${stepId.toString()}`, {
      expectedStatus: 204,
      method: "DELETE",
    });
  }

  /**
   * Returns all the attachments of a test step, given the test key and step ID.
   *
   * @param testKey the key of the test issue
   * @param stepId the ID of the test step
   * @returns the test step attachments
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step/get_test__testKey__steps__stepId__attachments
   */
  public async getAttachments(
    testKey: string,
    stepId: number
  ): Promise<Xray.Attachment.FileAttachment[]> {
    return this.processor.getAttachments(
      `rest/raven/2.0/api/test/${testKey}/steps/${stepId.toString()}/attachments`
    );
  }

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
  public async getStep(
    testKey: string,
    stepId: number
  ): Promise<{ step: Xray.Test.Step.DetailsV2 }> {
    const response = await this.client.send(
      `rest/raven/2.0/api/test/${testKey}/steps/${stepId.toString()}`,
      {
        expectedStatus: 200,
        method: "GET",
      }
    );
    return (await response.json()) as Promise<{ step: Xray.Test.Step.DetailsV2 }>;
  }

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
  public async getSteps(
    testKey: string,
    query?: {
      /**
       * One of the test versions.
       *
       * @example "manual_1"
       */
      testVersion?: string;
    }
  ): Promise<{ steps: Xray.Test.Step.DetailsV2[] }> {
    const response = await this.client.send(`rest/raven/2.0/api/test/${testKey}/steps`, {
      expectedStatus: 200,
      method: "GET",
      query,
    });
    return (await response.json()) as Promise<{ steps: Xray.Test.Step.DetailsV2[] }>;
  }

  /**
   * Updates the values of an existing test step, given the test key and step id. The user can
   * update the field values and the attachments of a step. The values should follow a specific
   * format similar to the step creation.
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
   * field with the incorrect value. A field value can be deleted sending an empty value, such as
   * `""` or `[]`, or by sending `null`. **It is not possible to delete the value of a required
   * field.**
   *
   * @param testKey the key of the test issue
   * @param stepId the ID of the test step
   * @param body the new step
   * @returns the step update result
   *
   * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step/put_test__testKey__steps__stepId_
   */
  public async updateStep(
    testKey: string,
    stepId: number,
    body: {
      attachments?: {
        /**
         * @example
         *
         * ```ts
         * [
         *   {
         *     data: "gsddfgdsfg...(base64) ",
         *     filename: "example1.txt",
         *     contentType: "plain/text"
         *   },
         *   {
         *     data: "gsddfgdsfg...(base64) ",
         *     filename: "example2.txt",
         *     contentType: "plain/text"
         *   }
         * ]
         * ```
         */
        add?: File[];
        /**
         * @example [141, 105]
         */
        remove?: number[];
      };
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
    }
  ): Promise<NewStepResponse> {
    const response = await this.client.send(
      `rest/raven/2.0/api/test/${testKey}/steps/${stepId.toString()}`,
      {
        body: JSON.stringify(body),
        expectedStatus: 200,
        headers: { ["Content-Type"]: "application/json" },
        method: "PUT",
      }
    );
    return (await response.json()) as NewStepResponse;
  }
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

interface NewStepResponse {
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

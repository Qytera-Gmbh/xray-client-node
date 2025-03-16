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

/**
 * Models the test step endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
 * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step
 */
export class TestStepApi extends BaseApi implements GetSteps, GetStep, GetAttachments {
  private readonly processor = {
    getAttachments: async (url: string) => {
      const response = await this.client.send(url, {
        expectedStatus: 200,
        method: "GET",
      });
      return (await response.json()) as Xray.Attachment.FileAttachment[];
    },
  };

  public readonly v1: GetSteps["v1"] & GetStep["v1"] & GetAttachments["v1"] = this.bind((self) => ({
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
      return (await response.json()) as Xray.Test.Step.DetailsV1;
    },
    async getSteps(testKey) {
      const response = await self.client.send(`rest/raven/1.0/api/test/${testKey}/step`, {
        expectedStatus: 200,
        method: "GET",
      });
      return (await response.json()) as Xray.Test.Step.DetailsV1[];
    },
  }));

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

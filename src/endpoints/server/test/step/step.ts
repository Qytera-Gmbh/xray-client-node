import type { Xray } from "../../../../models/index.js";
import { BaseApi } from "../../../base-api.js";

interface GetTestSteps {
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
  getTestSteps(
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
    getTestSteps(testKey: string): Promise<Xray.Test.Step.DetailsV1[]>;
  };
}

/**
 * Models the test step endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Test+Steps+-+REST
 * @see https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step
 */
export class TestStepApi extends BaseApi implements GetTestSteps {
  public readonly v1: GetTestSteps["v1"] = this.bind((self) => ({
    async getTestSteps(testKey) {
      const response = await self.client.send(`rest/raven/1.0/api/test/${testKey}/step`, {
        expectedStatus: 200,
        method: "GET",
      });
      return (await response.json()) as Xray.Test.Step.DetailsV1[];
    },
  }));

  public async getTestSteps(
    ...[testKey, query]: Parameters<GetTestSteps["getTestSteps"]>
  ): ReturnType<GetTestSteps["getTestSteps"]> {
    const response = await this.client.send(`rest/raven/2.0/api/test/${testKey}/steps`, {
      expectedStatus: 200,
      method: "GET",
      query,
    });
    return (await response.json()) as Awaited<ReturnType<GetTestSteps["getTestSteps"]>>;
  }
}

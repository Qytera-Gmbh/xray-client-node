import type { Xray } from "../../../models/index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the precondition endpoints in Xray server.
 *
 * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
 */
export class PreconditionApi extends BaseApi {
  /**
   * Return JSON with a list of the tests associated with the precondition.
   *
   * @param preconditionKey the key of the precondition
   * @param query the query parameters
   *
   * @see https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST
   */
  public async getTests(
    preconditionKey: string,
    query?: {
      /**
       * The test version name.
       */
      testVersion?: string;
    }
  ): Promise<Xray.Precondition.Test[]> {
    const response = await this.client.send(
      `rest/raven/1.0/api/precondition/${preconditionKey}/test`,
      {
        expectedStatus: 200,
        method: "GET",
        query,
      }
    );
    return (await response.json()) as Xray.Precondition.Test[];
  }
}

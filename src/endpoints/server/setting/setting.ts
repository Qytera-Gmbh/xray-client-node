import type { Xray } from "../../../models/index.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the Xray server settings endpoints.
 */
export class SettingApi extends BaseApi {
  /**
   * It is possible to get all test statuses available in Xray sorted by rank.
   *
   * @returns JSON with the test statuses
   *
   * @see https://docs.getxray.app/display/XRAY/Tests+-+REST
   */
  public async getTestStatuses(): Promise<Xray.Setting.Status[]> {
    const response = await this.client.send("rest/raven/1.0/api/settings/teststatuses", {
      expectedStatus: 200,
      method: "GET",
    });
    return (await response.json()) as Xray.Setting.Status[];
  }
}

import type { BaseClient } from "../../client/base-client.js";

/**
 * Models the attachment endpoints.
 */
export class Attachments {
  private readonly client: BaseClient;

  /**
   * Creates a new execution import service.
   *
   * @param client the client to use when importing executions
   */
  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Gets an attachment
   *
   * @param attachmentId ID of the attachment to get
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST+v2
   */
  public async getAttachment(attachmentId: string): Promise<string> {
    const response = await this.client.send(`/attachments/${attachmentId}`, {
      expectedStatus: 200,
      method: "GET",
    });
    return await response.text();
  }
}

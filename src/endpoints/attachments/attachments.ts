import type { Xray } from "../../../index.js";
import type { BaseClient } from "../../client/base-client.js";
import { createStreamableFile } from "../../util/form-data.js";

/**
 * Models the attachment endpoints.
 */
export class AttachmentsApi {
  private readonly client: BaseClient;

  /**
   * Creates a new attachments service.
   *
   * @param client the client to use when dealing with attachments
   */
  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Gets an attachment.
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

  /**
   * Creates an attachment.
   *
   * @param file the path to the file
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST+v2
   */
  public async addAttachment(file: string): Promise<Xray.Attachment.AddAttachmentResponse> {
    const formData = new FormData();
    formData.append("attachment", await createStreamableFile(file));
    const response = await this.client.send(`/attachments`, {
      body: formData,
      expectedStatus: 200,
      method: "POST",
    });
    return (await response.json()) as Xray.Attachment.AddAttachmentResponse;
  }
}

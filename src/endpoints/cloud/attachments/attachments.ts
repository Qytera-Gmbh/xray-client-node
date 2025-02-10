import { open } from "node:fs/promises";
import { basename } from "node:path";
import type { Xray } from "../../../../index.js";
import { createStreamableFile } from "../../../util/form-data.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the attachment endpoints.
 */
export class AttachmentsApi extends BaseApi {
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
    const handle = await open(file);
    formData.append("attachment", await createStreamableFile(basename(file), handle));
    const response = await this.client.send(`/attachments`, {
      body: formData,
      expectedStatus: 200,
      method: "POST",
    });
    await handle.close();
    return (await response.json()) as Xray.Attachment.AddAttachmentResponse;
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
}

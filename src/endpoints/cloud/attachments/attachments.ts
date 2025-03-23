import { open } from "node:fs/promises";
import { basename } from "node:path";
import { createStreamableFile } from "../../../util/form-data.js";
import { BaseApi } from "../../base-api.js";

/**
 * Models the attachment endpoints.
 */
export class AttachmentsApi extends BaseApi {
  public readonly v1 = new AttachmentsApiV1(this.client);

  /**
   * Creates an attachment.
   *
   * @param file the path to the file
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST+v2
   */
  public async addAttachment(file: string): Promise<AddAttachmentResponse> {
    const formData = new FormData();
    const handle = await open(file);
    formData.append("attachment", await createStreamableFile(basename(file), handle));
    const response = await this.client.send("api/v2/attachments", {
      body: formData,
      expectedStatus: 200,
      method: "POST",
    });
    await handle.close();
    return (await response.json()) as AddAttachmentResponse;
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
    const response = await this.client.send(`api/v2/attachments/${attachmentId}`, {
      expectedStatus: 200,
      method: "GET",
    });
    return await response.text();
  }
}

class AttachmentsApiV1 extends BaseApi {
  /**
   * Creates an attachment.
   *
   * @param file the path to the file
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST
   */
  public async addAttachment(file: string): Promise<AddAttachmentResponse> {
    const formData = new FormData();
    const handle = await open(file);
    formData.append("attachment", await createStreamableFile(basename(file), handle));
    const response = await this.client.send("api/v1/attachments", {
      body: formData,
      expectedStatus: 200,
      method: "POST",
    });
    await handle.close();
    return (await response.json()) as AddAttachmentResponse;
  }

  /**
   * Gets an attachment.
   *
   * @param attachmentId ID of the attachment to get
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST
   */
  public async getAttachment(attachmentId: string): Promise<string> {
    const response = await this.client.send(`api/v1/attachments/${attachmentId}`, {
      expectedStatus: 200,
      method: "GET",
    });
    return await response.text();
  }
}

interface AddAttachmentResponse {
  /**
   * @example "2020-06-28T16:59:33.051Z"
   */
  created: string;
  /**
   * @example "report.pdf"
   */
  filename: string;
  /**
   * @example "7e0073ec-cc9a-44fa-a2da-9d8c163caeae"
   */
  id: string;
  /**
   * @example 123446
   */
  size: number;
}

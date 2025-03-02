import { open } from "node:fs/promises";
import { basename } from "node:path";
import { FormData } from "undici";
import { createStreamableFile } from "../../../util/form-data.js";
import { BaseApi } from "../../base-api.js";

interface AddAttachment {
  /**
   * Creates an attachment.
   *
   * @param file the path to the file
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST+v2
   */
  addAttachment(file: string): Promise<AddAttachmentResponse>;
  v1: {
    /**
     * Creates an attachment.
     *
     * @param file the path to the file
     * @returns the attachment data
     *
     * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST
     */
    addAttachment(file: string): Promise<AddAttachmentResponse>;
  };
}

interface GetAttachment {
  /**
   * Gets an attachment.
   *
   * @param attachmentId ID of the attachment to get
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST+v2
   */
  getAttachment(file: string): Promise<string>;
  v1: {
    /**
     * Gets an attachment.
     *
     * @param attachmentId ID of the attachment to get
     * @returns the attachment data
     *
     * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST
     */
    getAttachment(file: string): Promise<string>;
  };
}

/**
 * Models the attachment endpoints.
 */
export class AttachmentsApi extends BaseApi implements AddAttachment, GetAttachment {
  private readonly processor = {
    addAttachment: async (url: string, file: string) => {
      const formData = new FormData();
      const handle = await open(file);
      formData.append("attachment", await createStreamableFile(basename(file), handle));
      const response = await this.client.send(url, {
        body: formData,
        expectedStatus: 200,
        method: "POST",
      });
      await handle.close();
      return (await response.json()) as AddAttachmentResponse;
    },
    getAttachment: async (url: string) => {
      const response = await this.client.send(url, {
        expectedStatus: 200,
        method: "GET",
      });
      return await response.text();
    },
  };

  public readonly v1: AddAttachment["v1"] & GetAttachment["v1"] = this.bind((self) => ({
    addAttachment(file) {
      return self.processor.addAttachment("api/v1/attachments", file);
    },
    getAttachment(attachmentId) {
      return self.processor.getAttachment(`api/v1/attachments/${attachmentId}`);
    },
  }));

  public async addAttachment(file: string): Promise<AddAttachmentResponse> {
    return this.processor.addAttachment("api/v2/attachments", file);
  }

  public async getAttachment(attachmentId: string): Promise<string> {
    return this.processor.getAttachment(`api/v2/attachments/${attachmentId}`);
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

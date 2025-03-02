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
  (file: string): Promise<AddAttachmentResponse>;
  /**
   * Creates an attachment.
   *
   * @param file the path to the file
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST
   */
  v1: (file: string) => Promise<AddAttachmentResponse>;
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
  (file: string): Promise<string>;
  /**
   * Gets an attachment.
   *
   * @param attachmentId ID of the attachment to get
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST
   */
  v1: (file: string) => Promise<string>;
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

/**
 * Models the attachment endpoints.
 */
export class AttachmentsApi extends BaseApi {
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

  public readonly addAttachment: AddAttachment = Object.assign(
    async (...[file]: Parameters<AddAttachment>): ReturnType<AddAttachment> => {
      return this.processor.addAttachment("api/v2/attachments", file);
    },
    {
      v1: async (...[file]: Parameters<AddAttachment["v1"]>): ReturnType<AddAttachment["v1"]> => {
        return this.processor.addAttachment("api/v1/attachments", file);
      },
    }
  );

  public readonly getAttachment: GetAttachment = Object.assign(
    async (...[attachmentId]: Parameters<GetAttachment>): ReturnType<GetAttachment> => {
      return this.processor.getAttachment(`api/v2/attachments/${attachmentId}`);
    },
    {
      v1: async (
        ...[attachmentId]: Parameters<GetAttachment["v1"]>
      ): ReturnType<GetAttachment["v1"]> => {
        return this.processor.getAttachment(`api/v1/attachments/${attachmentId}`);
      },
    }
  );
}

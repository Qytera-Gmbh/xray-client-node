import { open } from "node:fs/promises";
import { basename } from "node:path";
import { FormData } from "undici";
import type { Xray } from "../../../../index.js";
import { createStreamableFile } from "../../../util/form-data.js";
import { BaseApi } from "../../base-api.js";

interface AddAttachmentEndpoint {
  /**
   * Creates an attachment.
   *
   * @param file the path to the file
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST+v2
   */
  (file: string): Promise<Xray.Attachment.AddAttachmentResponse>;
  /**
   * Creates an attachment.
   *
   * @param file the path to the file
   * @returns the attachment data
   *
   * @see https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST
   */
  v1: (file: string) => Promise<Xray.Attachment.AddAttachmentResponse>;
}

interface GetAttachmentEndpoint {
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
      return (await response.json()) as Xray.Attachment.AddAttachmentResponse;
    },
    getAttachment: async (url: string) => {
      const response = await this.client.send(url, {
        expectedStatus: 200,
        method: "GET",
      });
      return await response.text();
    },
  };

  public addAttachment: AddAttachmentEndpoint = Object.assign(
    async (...[file]: Parameters<AddAttachmentEndpoint>): ReturnType<AddAttachmentEndpoint> => {
      return this.processor.addAttachment(`${this.path}/api/v2/attachments`, file);
    },
    {
      v1: async (
        ...[file]: Parameters<AddAttachmentEndpoint["v1"]>
      ): ReturnType<AddAttachmentEndpoint["v1"]> => {
        return this.processor.addAttachment(`${this.path}/api/v1/attachments`, file);
      },
    }
  );

  public getAttachment: GetAttachmentEndpoint = Object.assign(
    async (
      ...[attachmentId]: Parameters<GetAttachmentEndpoint>
    ): ReturnType<GetAttachmentEndpoint> => {
      return this.processor.getAttachment(`${this.path}/api/v2/attachments/${attachmentId}`);
    },
    {
      v1: async (
        ...[attachmentId]: Parameters<GetAttachmentEndpoint["v1"]>
      ): ReturnType<GetAttachmentEndpoint["v1"]> => {
        return this.processor.getAttachment(`${this.path}/api/v1/attachments/${attachmentId}`);
      },
    }
  );
}

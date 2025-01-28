/**
 * Models the Xray response after a successful JSON result import.
 */
export interface AddAttachmentResponse {
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

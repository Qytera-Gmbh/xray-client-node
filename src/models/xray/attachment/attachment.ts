export interface FileAttachment {
  /**
   * @example "admin"
   */
  author: string;
  /**
   * @example "Bruce Wayne"
   */
  authorFullName: string;
  /**
   * @example "2020-02-06T10:39:37Z"
   */
  created: string;
  /**
   * @example 1580985577000
   */
  createdDate: number;
  /**
   * @example "text.gif"
   */
  fileIcon: string;
  /**
   * @example "Text File"
   */
  fileIconAlt: string;
  /**
   * @example "attachment.txt"
   */
  fileName: string;
  /**
   * @example "/Users/example/path/attachment"
   */
  filePath: string;
  /**
   * @example "100.0 kB"
   */
  fileSize: string;
  /**
   * @example "http://example.com/attachment/25684/example2.txt"
   */
  ["fileURL"]: string;
  /**
   * @example 25684
   */
  id: number;
  /**
   * @example "plain/text"
   */
  mimeType: string;
  /**
   * @example 12
   */
  numericalFileSize: number;
}

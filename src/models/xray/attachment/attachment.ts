export interface FileAttachment {
  author: string;
  authorFullName: string;
  created: string;
  createdDate: number;
  fileIcon: string;
  fileIconAlt: string;
  fileName: string;
  filePath: string;
  fileSize: string;
  ["fileURL"]: string;
  id: number;
  mimeType: string;
  numericalFileSize: number;
}

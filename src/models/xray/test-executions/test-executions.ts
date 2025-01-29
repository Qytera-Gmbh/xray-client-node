/**
 * @see https://docs.getxray.app/display/XRAY/Test+Executions+-+REST
 */
export type GetTestsResponse = {
  assignee?: string;
  defects?: {
    id: number;
    key: string;
    status: string;
    summary: string;
  }[];
  evidences?: {
    author: string;
    created: string;
    fileName: string;
    fileSize: string;
    ["fileURL"]: string;
    id?: number;
  }[];
  executedBy?: string;
  finishedOn?: string;
  id: number;
  key: string;
  rank: number;
  startedOn?: string;
  status: string;
}[];

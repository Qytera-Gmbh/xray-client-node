/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
 */
export type GetExecutionEvidenceResponse = {
  author: string;
  created: string;
  fileName: string;
  fileSize: string;
  ["fileURL"]: string;
  id: number;
}[];

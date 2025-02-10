/**
 * @see https://docs.getxray.app/display/XRAY/Test+Runs+-+REST#TestRunsREST-ExecutionEvidence
 */
export interface GetExecutionEvidenceResponse {
  author: string;
  created: string;
  fileName: string;
  fileSize: string;
  ["fileURL"]: string;
  id: number;
}

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
 */
export interface Test {
  id: number;
  key: string;
  latestStatus: string;
}

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
 */
export interface TestExecution {
  archived: boolean;
  environments: string[];
  id: number;
  key: string;
  self: string;
  summary: string;
}

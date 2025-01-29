/**
 * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
 */
export type GetTestsResponse = {
  id: number;
  key: string;
  latestStatus: string;
}[];

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Plans+-+REST
 */
export type GetTestExecutionsResponse = {
  archived: boolean;
  environments: string[];
  id: number;
  key: string;
  self: string;
  summary: string;
}[];

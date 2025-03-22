import type { Xray } from "../../../../index.js";

/**
 * @see https://docs.getxray.app/display/XRAY/Test+Sets+-+REST
 */
export type Test<WithTestDefinition extends boolean> = WithTestDefinition extends false
  ? Omit<Xray.Test.Details, "definition">
  : Xray.Test.Details;

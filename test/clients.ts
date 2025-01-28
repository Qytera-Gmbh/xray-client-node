import { XrayClientCloud } from "../src/client/xray-client-cloud.js";
import { getEnv } from "./util.js";

export const XRAY_CLIENT_CLOUD = new XrayClientCloud({
  credentials: {
    clientId: getEnv("xray-client-id"),
    clientSecret: getEnv("xray-client-secret"),
  },
  url: "https://xray.cloud.getxray.app",
});

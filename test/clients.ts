import { XrayClientCloud } from "../src/client/xray-client-cloud.js";
import { XrayClientServer } from "../src/client/xray-client-server.js";
import { getEnv } from "./util.js";

export const XRAY_CLIENT_CLOUD = new XrayClientCloud({
  credentials: {
    clientId: getEnv("xray-client-id"),
    clientSecret: getEnv("xray-client-secret"),
  },
  url: "https://xray.cloud.getxray.app",
});

export const XRAY_CLIENT_SERVER = new XrayClientServer({
  credentials: {
    password: getEnv("jira-server-password"),
    username: getEnv("jira-server-username"),
  },
  url: getEnv("jira-server-url"),
});

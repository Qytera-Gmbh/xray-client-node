import { Version2Client, Version3Client } from "jira.js";
import { XrayClientCloud } from "../src/client/xray-client-cloud.js";
import { XrayClientServer } from "../src/client/xray-client-server.js";
import { getEnv } from "./util.js";

export const XRAY_CLIENT_CLOUD = new XrayClientCloud({
  credentials: {
    clientId: getEnv("xray-client-id"),
    clientSecret: getEnv("xray-client-secret"),
    path: "/api/v2/authenticate",
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

export const JIRA_CLIENT_CLOUD = new Version3Client({
  authentication: {
    basic: { apiToken: getEnv("jira-cloud-token"), email: getEnv("jira-cloud-email") },
  },
  host: getEnv("jira-cloud-url"),
});

export const JIRA_CLIENT_SERVER = new Version2Client({
  authentication: {
    basic: { password: getEnv("jira-server-password"), username: getEnv("jira-server-username") },
  },
  host: getEnv("jira-server-url"),
});

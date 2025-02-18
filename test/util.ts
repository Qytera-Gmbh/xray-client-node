import { readdirSync } from "node:fs";
import { join } from "node:path";

import "dotenv/config";

/**
 * Recursively returns all files in the given directory that match the provided filename filter.
 *
 * @param dir - the entry directory
 * @param filter - the filename filter
 * @returns all matching files
 */
export function findFiles(dir: string, filter: (filename: string) => boolean): string[] {
  const files = readdirSync(dir, { withFileTypes: true });
  let testFiles: string[] = [];
  for (const file of files) {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      testFiles = testFiles.concat(findFiles(fullPath, filter));
    } else if (file.isFile() && filter(file.name)) {
      testFiles.push(fullPath);
    }
  }
  return testFiles;
}

/**
 * Returns an environment variable value for a specified environment variable.
 *
 * @param kind the environment variable
 * @returns the value
 */
export function getEnv(
  kind:
    | "jira-cloud-email"
    | "jira-cloud-token"
    | "jira-cloud-url"
    | "jira-server-password"
    | "jira-server-url"
    | "jira-server-username"
    | "xray-client-id"
    | "xray-client-secret"
): string {
  let name: string | undefined;
  switch (kind) {
    case "jira-cloud-email":
      name = "JIRA_CLOUD_EMAIL";
      break;
    case "jira-cloud-token":
      name = "JIRA_CLOUD_TOKEN";
      break;
    case "jira-cloud-url":
      name = "JIRA_CLOUD_URL";
      break;
    case "jira-server-password":
      name = "JIRA_SERVER_PASSWORD";
      break;
    case "jira-server-url":
      name = "JIRA_SERVER_URL";
      break;
    case "jira-server-username":
      name = "JIRA_SERVER_USERNAME";
      break;
    case "xray-client-id":
      name = "XRAY_CLIENT_ID";
      break;
    case "xray-client-secret":
      name = "XRAY_CLIENT_SECRET";
      break;
  }
  const value = process.env[name];
  if (!value) {
    throw new Error(`environment variable is undefined: ${name}`);
  }
  return value;
}

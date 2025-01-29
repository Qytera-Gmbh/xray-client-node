<h1 align="center">
  <img width="100%" src="docs/logo.svg" alt="Bruno Xray Plugin">
</h1>

[![npm version](https://img.shields.io/npm/v/@qytera/xray-client?style=flat-square)](https://www.npmjs.com/package/@qytera/xray-client)
[![npm downloads](https://img.shields.io/npm/dm/@qytera/xray-client?style=flat-square)](https://www.npmjs.com/package/@qytera/xray-client)
[![open GitHub issues](https://img.shields.io/github/issues-raw/qytera-gmbh/xray-client-node?style=flat-square)](https://github.com/Qytera-Gmbh/xray-client-node/issues?q=is%3Aissue+is%3Aopen)
[![unaddressed GitHub issues](https://img.shields.io/github/issues-search/qytera-gmbh/xray-client-node?label=unaddressed%20issues&query=no%3Aassignee%20is%3Aopen&style=flat-square)](https://github.com/Qytera-Gmbh/xray-client-node/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee)

# Node.js Xray Client

This project provides TypeScript clients to users that want to interact with the API of [Xray](https://www.getxray.app/). Supports Xray server and Xray cloud.

> [!WARNING]
> The client is at a very early stage of development and may not fully cover all Xray interactions.

# Installation

```bash
npm install @qytera/xray-client
```

# Usage

Simply create a client instance for your Xray setup and start using the fully typed endpoints available.

## Xray Cloud

```ts
import { XrayClientCloud } from "@qytera/xray-client";

// Xray cloud authentication.
export const cloudClient = new XrayClientCloud({
  credentials: {
    clientId: "xray-client-id",
    clientSecret: "xray-client-secret",
  },
  url: "https://xray.cloud.getxray.app",
});

const csvData = await cloudClient.dataset.export({ testIssueKey: "PRJ-123" });
```

## Xray Server

```ts
import { XrayClientServer } from "@qytera/xray-client";

// PAT authentication.
export const serverClient = new XrayClientServer({
  credentials: {
    token: "jira-token",
  },
  url: "https://jira.company.com",
});

// Basic authentication.
export const serverClient = new XrayClientServer({
  credentials: {
    username: "jira-username",
    password: "jira-password",
  },
  url: "https://jira.company.com",
});

const csvData = await serverClient.dataset.export({ testIssueKey: "PRJ-123" });
```

# Credits

This project was heavily inspired by [jira.js](https://github.com/MrRefactoring/jira.js).

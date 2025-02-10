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

<details>
  <summary>Xray server roadmap</summary>

---

_Based on: https://docs.getxray.app/display/XRAY/REST+API_

- [v1](https://docs.getxray.app/display/XRAY/v1.0)
  - [Tests](https://docs.getxray.app/display/XRAY/Tests+-+REST)
    - [ ] GET /rest/raven/1.0/api/test
    - [ ] GET /rest/raven/1.0/api/settings/teststatuses
    - [ ] GET /rest/raven/1.0/api/test/{key}/testruns
    - [ ] GET /rest/raven/1.0/api/test/{key}/preconditions
    - [ ] GET /rest/raven/1.0/api/test/{key}/testsets
    - [ ] GET /rest/raven/1.0/api/test/{key}/testexecutions
    - [ ] GET /rest/raven/1.0/api/test/{key}/testplans
    - [Test Steps](https://docs.getxray.app/display/XRAY/Test+Steps+-+REST)
      - [ ] GET /rest/raven/1.0/api/settings/teststepstatuses
      - [ ] GET /rest/raven/1.0/api/test/{testKey}/step
      - [ ] GET /rest/raven/1.0/api/test/{testKey}/step/{id}
      - [ ] PUT /rest/raven/1.0/api/test/{testKey}/step
      - [ ] POST /rest/raven/1.0/api/test/{testKey}/step/{id}
      - [ ] DELETE /rest/raven/1.0/api/test/{testKey}/step/{id}
      - [ ] GET /rest/raven/1.0/api/test/{testKey}/step/{id}/attachment
      - [ ] DELETE /rest/raven/1.0/api/test/{testKey}/step/{id}/attachment/{attachmentID}
  - [Pre-Conditions](https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST)
    - [ ] GET /rest/raven/1.0/api/precondition/{preConditionKey}/test
    - [ ] POST /rest/raven/1.0/api/precondition/{preConditionKey}/test
    - [ ] DELETE /rest/raven/1.0/api/precondition/{preConditionKey}/test/{testKey}
  - [Test Sets](https://docs.getxray.app/display/XRAY/Test+Sets+-+REST)
    - [ ] GET /rest/raven/1.0/api/testset/{testSetKey}/test
    - [ ] POST /rest/raven/1.0/api/testset/{testSetKey}/test
    - [ ] DELETE /rest/raven/1.0/api/testset/{testSetKey}/test/{testKey}
  - [Test Plans](https://docs.getxray.app/display/XRAY/Test+Plans+-+REST)
    - [x] GET /rest/raven/1.0/api/testplan/{testPlanKey}/test
    - [ ] POST /rest/raven/1.0/api/testplan/{testPlanKey}/test
    - [ ] DELETE /rest/raven/1.0/api/testplan/{testPlanKey}/test/{testKey}
    - [x] GET /rest/raven/1.0/api/testplan/{testPlanKey}/testexecution
    - [ ] POST /rest/raven/1.0/api/testplan/{testPlanKey}/testexecution
    - [ ] DELETE /rest/raven/1.0/api/testplan/{testPlanKey}/testexecution/{testExecKey}
  - [Test Executions](https://docs.getxray.app/display/XRAY/Test+Executions+-+REST)
    - [x] GET /rest/raven/1.0/api/testexec/{testExecKey}/test
    - [ ] POST /rest/raven/1.0/api/testexec/{testExecKey}/test
    - [ ] DELETE /rest/raven/1.0/api/testexec/{testExecKey}/test/{testKey}
  - [Test Runs](https://docs.getxray.app/display/XRAY/Test+Runs+-+REST)
    - [ ] GET /rest/raven/1.0/api/testrun/{id}/
    - [ ] GET /rest/raven/1.0/api/testrun/
    - [ ] PUT /rest/raven/1.0/api/testrun/{id}/
    - [ ] GET /rest/raven/1.0/api/testrun/{id}/status
    - [ ] PUT /rest/raven/1.0/api/testrun/{id}/status
    - [ ] GET /rest/raven/1.0/api/testrun/{id}/defect
    - [ ] POST /rest/raven/1.0/api/testrun/{id}/defect
    - [ ] DELETE /rest/raven/1.0/api/testrun/{id}/defect/{issueIdOrKey}
    - [ ] GET /rest/raven/1.0/api/testrun/{id}/attachment
    - [ ] POST /rest/raven/1.0/api/testrun/{id}/attachment
    - [ ] DELETE /rest/raven/1.0/api/testrun/{id}/attachment
    - [ ] DELETE /rest/raven/1.0/api/testrun/{id}/attachment/{attachmentid}
    - [ ] GET /rest/raven/1.0/api/testrun/{id}/comment
    - [ ] PUT /rest/raven/1.0/api/testrun/{id}/comment
    - [ ] GET /rest/raven/1.0/api/testrun/{id}/example
    - [ ] GET /rest/raven/1.0/api/testrun/{id}/step
    - [ ] GET /rest/raven/1.0/api/testrun/{id}/assignee
    - [ ] PUT /rest/raven/1.0/api/testrun/{id}/assignee
    - [Test Examples](https://docs.getxray.app/display/XRAY/Test+Examples+-+REST)
      - [ ] GET /api/testrun/{id}/example/{exampleIndex}
      - [ ] PUT /api/testrun/{id}/example/{exampleIndex}
    - [Test Step Results](https://docs.getxray.app/display/XRAY/Test+Step+Results+-+REST)
      - [ ] GET api/testrun/{id}/step/{stepResultId}/
      - [ ] PUT api/testrun/{id}/step/{stepResultId}/
      - [ ] GET api/testrun/{id}/step/{stepResultId}/status
      - [ ] PUT api/testrun/{id}/step/{stepResultId}/status
      - [ ] GET api/testrun/{id}/step/{stepResultId}/attachment
      - [ ] POST api/testrun/{id}/step/{stepResultId}/attachment
      - [ ] DELETE api/testrun/{id}/step/{stepResultId}/attachment
      - [ ] DELETE api/testrun/{id}/step/{stepResultId}/attachment/{attachmentid}
  - [Test Repository](https://docs.getxray.app/display/XRAY/Test+Repository+-+REST)
    - [ ] GET /rest/raven/1.0/api/testrepository/{projectKey}/folders
    - [ ] GET /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}/tests
    - [ ] PUT /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}/tests
    - [ ] GET /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}
    - [ ] POST /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}
    - [ ] PUT /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}
    - [ ] DELETE /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}
  - [Import Execution Results](https://docs.getxray.app/display/XRAY/Import+Execution+Results+-+REST)
    - [x] POST /rest/raven/1.0/import/execution
    - [x] POST /rest/raven/1.0/import/execution/multipart
    - [ ] POST /rest/raven/1.0/import/execution/cucumber
    - [ ] POST /rest/raven/1.0/import/execution/cucumber/multipart
    - [ ] POST /rest/raven/1.0/import/execution/behave
    - [ ] POST /rest/raven/1.0/import/execution/behave/multipart
    - [ ] POST /rest/raven/1.0/import/execution/junit
    - [ ] POST /rest/raven/1.0/import/execution/junit/multipart
    - [ ] POST /rest/raven/1.0/import/execution/testng
    - [ ] POST /rest/raven/1.0/import/execution/testng/multipart
    - [ ] POST /rest/raven/1.0/import/execution/nunit
    - [ ] POST /rest/raven/1.0/import/execution/nunit/multipart
    - [ ] POST /rest/raven/1.0/import/execution/xunit
    - [ ] POST /rest/raven/1.0/import/execution/xunit/multipart
    - [ ] POST /rest/raven/1.0/import/execution/robot
    - [ ] POST /rest/raven/1.0/import/execution/robot/multipart
    - [ ] POST /rest/raven/1.0/import/execution/bundle
  - [Export Execution Results](https://docs.getxray.app/display/XRAY/Export+Execution+Results+-+REST)
    - [ ] GET /rest/raven/1.0/testruns
    - [ ] GET /rest/raven/1.0/execution/result (deprecated)
  - [Importing Cucumber Tests](https://docs.getxray.app/display/XRAY/Importing+Cucumber+Tests+-+REST)
    - [ ] POST /rest/raven/1.0/import/feature
  - [Exporting Cucumber Tests](https://docs.getxray.app/display/XRAY/Exporting+Cucumber+Tests+-+REST)
    - [ ] GET /rest/raven/1.0/export/test
  - [Settings](https://docs.getxray.app/display/XRAY/Settings+-+REST)
    - [ ] GET /rest/raven/1.0/api/settings/teststatuses
    - [ ] GET /rest/raven/1.0/api/settings/teststepstatuses
- [v2](https://docs.getxray.app/display/XRAY/v2.0)
  - [Test Step](https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step)
    - [ ] GET /test/{testKey}/steps
    - [ ] POST /test/{testKey}/steps
    - [ ] GET /test/{testKey}/steps/{stepId}
    - [ ] PUT /test/{testKey}/steps/{stepId}
    - [ ] DELETE /test/{testKey}/steps/{stepId}
    - [ ] GET /test/{testKey}/steps/{stepId}/attachments
    - [ ] DELETE /test/{testKey}/steps/{stepId}/attachment/{attachmentId}
  - [Test Run](https://docs.getxray.app/display/XRAY/v2.0#/Test%20Run)
    - [ ] GET /testrun
    - [ ] GET /testrun/{id}
    - [ ] PUT /testrun/{id}
    - [ ] GET /testrun/{id}/customfield/{customFieldId}
    - [ ] PUT /testrun/{id}/customfield/{customFieldId}
    - [ ] GET /testrun/{id}/iteration/{iterationId}
    - [ ] PUT /testrun/{id}/iteration/{iterationId}
    - [ ] GET /testrun/{id}/iteration/{iterationId}/step
    - [ ] GET /testrun/{id}/iteration/{iterationId}/step/{stepResultId}
    - [ ] PUT /testrun/{id}/iteration/{iterationId}/step/{stepResultId}
    - [ ] GET /testrun/{id}/iteration/{iterationId}/step/{stepResultId}/status
    - [ ] PUT /testrun/{id}/iteration/{iterationId}/step/{stepResultId}/status
    - [ ] GET /testrun/{id}/iteration/{iterationId}/step/{stepResultId}/attachment
    - [ ] POST /testrun/{id}/iteration/{iterationId}/step/{stepResultId}/attachment
    - [ ] DELETE /testrun/{id}/iteration/{iterationId}/step/{stepResultId}/attachment
    - [ ] DELETE /testrun/{id}/iteration/{iterationId}/step/{stepResultId}/attachment/{attachmentId}
    - [ ] GET /testruns
  - [Test Run Status](https://docs.getxray.app/display/XRAY/v2.0#/Test%20Run%20Status)
    - [ ] PUT /testrunstatus/reset
  - [Requirement Status](https://docs.getxray.app/display/XRAY/v2.0#/Requirement%20Status)
    - [ ] PUT /requirementstatus/reset
  - [Project](https://docs.getxray.app/display/XRAY/v2.0#/Project)
    - [ ] GET /project/{id}/settings/customfields/testruns
    - [ ] GET /project/{id}/settings/customfields/teststeps
  - [External Apps](https://docs.getxray.app/display/XRAY/v2.0#/External%20Apps)
    - [ ] GET /xraylicense
  - [Import](https://docs.getxray.app/display/XRAY/v2.0#/Import)
    - [ ] POST /import/execution
    - [ ] POST /import/execution/multipart
  - [Dataset](https://docs.getxray.app/display/XRAY/v2.0#/Dataset)
    - [x] GET /dataset/export
    - [ ] POST /dataset/import
  - [Test Repository](https://docs.getxray.app/display/XRAY/v2.0#/Test%20Repository)
    - [ ] GET /testrepository/{projectKey}/folders/{folderId}

</details>

# Installation

```bash
npm install @qytera/xray-client
```

# Usage

Simply create a client instance for your Xray setup and start using the fully typed endpoints available, including GraphQL in Xray cloud.

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
// ... other endpoints
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
// ... other endpoints
```

# Credits

This project was heavily inspired by [jira.js](https://github.com/MrRefactoring/jira.js).

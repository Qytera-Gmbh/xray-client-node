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
> The client is at a very early stage of development and may not cover all Xray interactions. Please refer to the roadmaps for full lists of supported endpoints.

<details>
  <summary>Xray server roadmap</summary>

---

_Based on: https://docs.getxray.app/display/XRAY/REST+API_

- [v1](https://docs.getxray.app/display/XRAY/v1.0)
  - [Tests](https://docs.getxray.app/display/XRAY/Tests+-+REST)
    - [x] `GET /rest/raven/1.0/api/test`
    - [x] `GET /rest/raven/1.0/api/settings/teststatuses`
    - [x] `GET /rest/raven/1.0/api/test/{key}/testruns`
    - [x] `GET /rest/raven/1.0/api/test/{key}/preconditions`
    - [x] `GET /rest/raven/1.0/api/test/{key}/testsets`
    - [x] `GET /rest/raven/1.0/api/test/{key}/testexecutions`
    - [x] `GET /rest/raven/1.0/api/test/{key}/testplans`
    - [Test Steps](https://docs.getxray.app/display/XRAY/Test+Steps+-+REST)
      - [ ] `GET    /rest/raven/1.0/api/settings/teststepstatuses`
      - [ ] `GET    /rest/raven/1.0/api/test/{testKey}/step`
      - [ ] `GET    /rest/raven/1.0/api/test/{testKey}/step/{id}`
      - [ ] `PUT    /rest/raven/1.0/api/test/{testKey}/step`
      - [ ] `POST   /rest/raven/1.0/api/test/{testKey}/step/{id}`
      - [ ] `DELETE /rest/raven/1.0/api/test/{testKey}/step/{id}`
      - [ ] `GET    /rest/raven/1.0/api/test/{testKey}/step/{id}/attachment`
      - [ ] `DELETE /rest/raven/1.0/api/test/{testKey}/step/{id}/attachment/{attachmentID}`
  - [Pre-Conditions](https://docs.getxray.app/display/XRAY/Pre-Conditions+-+REST)
    - [ ] `GET    /rest/raven/1.0/api/precondition/{preConditionKey}/test`
    - [ ] `POST   /rest/raven/1.0/api/precondition/{preConditionKey}/test`
    - [ ] `DELETE /rest/raven/1.0/api/precondition/{preConditionKey}/test/{testKey}`
  - [Test Sets](https://docs.getxray.app/display/XRAY/Test+Sets+-+REST)
    - [ ] `GET    /rest/raven/1.0/api/testset/{testSetKey}/test`
    - [ ] `POST   /rest/raven/1.0/api/testset/{testSetKey}/test`
    - [ ] `DELETE /rest/raven/1.0/api/testset/{testSetKey}/test/{testKey}`
  - [Test Plans](https://docs.getxray.app/display/XRAY/Test+Plans+-+REST)
    - [x] `GET    /rest/raven/1.0/api/testplan/{testPlanKey}/test`
    - [ ] `POST   /rest/raven/1.0/api/testplan/{testPlanKey}/test`
    - [ ] `DELETE /rest/raven/1.0/api/testplan/{testPlanKey}/test/{testKey}`
    - [x] `GET    /rest/raven/1.0/api/testplan/{testPlanKey}/testexecution`
    - [ ] `POST   /rest/raven/1.0/api/testplan/{testPlanKey}/testexecution`
    - [ ] `DELETE /rest/raven/1.0/api/testplan/{testPlanKey}/testexecution/{testExecKey}`
  - [Test Executions](https://docs.getxray.app/display/XRAY/Test+Executions+-+REST)
    - [x] `GET    /rest/raven/1.0/api/testexec/{testExecKey}/test`
    - [ ] `POST   /rest/raven/1.0/api/testexec/{testExecKey}/test`
    - [ ] `DELETE /rest/raven/1.0/api/testexec/{testExecKey}/test/{testKey}`
  - [Test Runs](https://docs.getxray.app/display/XRAY/Test+Runs+-+REST)
    - [x] `GET    /rest/raven/1.0/api/testrun/{id}/`
    - [x] `GET    /rest/raven/1.0/api/testrun/`
    - [x] `PUT    /rest/raven/1.0/api/testrun/{id}/`
    - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/status`
    - [ ] `PUT    /rest/raven/1.0/api/testrun/{id}/status`
    - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/defect`
    - [ ] `POST   /rest/raven/1.0/api/testrun/{id}/defect`
    - [ ] `DELETE /rest/raven/1.0/api/testrun/{id}/defect/{issueIdOrKey}`
    - [x] `GET    /rest/raven/1.0/api/testrun/{id}/attachment`
    - [x] `POST   /rest/raven/1.0/api/testrun/{id}/attachment`
    - [x] `DELETE /rest/raven/1.0/api/testrun/{id}/attachment`
    - [x] `DELETE /rest/raven/1.0/api/testrun/{id}/attachment/{attachmentid}`
    - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/comment`
    - [ ] `PUT    /rest/raven/1.0/api/testrun/{id}/comment`
    - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/example`
    - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/step`
    - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/assignee`
    - [ ] `PUT    /rest/raven/1.0/api/testrun/{id}/assignee`
    - [Test Examples](https://docs.getxray.app/display/XRAY/Test+Examples+-+REST)
      - [ ] `GET /rest/raven/1.0/api/testrun/{id}/example/{exampleIndex}`
      - [ ] `PUT /rest/raven/1.0/api/testrun/{id}/example/{exampleIndex}`
    - [Test Step Results](https://docs.getxray.app/display/XRAY/Test+Step+Results+-+REST)
      - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/step/{stepResultId}/`
      - [ ] `PUT    /rest/raven/1.0/api/testrun/{id}/step/{stepResultId}/`
      - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/step/{stepResultId}/status`
      - [ ] `PUT    /rest/raven/1.0/api/testrun/{id}/step/{stepResultId}/status`
      - [ ] `GET    /rest/raven/1.0/api/testrun/{id}/step/{stepResultId}/attachment`
      - [ ] `POST   /rest/raven/1.0/api/testrun/{id}/step/{stepResultId}/attachment`
      - [ ] `DELETE /rest/raven/1.0/api/testrun/{id}/step/{stepResultId}/attachment`
      - [ ] `DELETE /rest/raven/1.0/api/testrun/{id}/step/{stepResultId}/attachment/{attachmentid}`
  - [Test Repository](https://docs.getxray.app/display/XRAY/Test+Repository+-+REST)
    - [ ] `GET    /rest/raven/1.0/api/testrepository/{projectKey}/folders`
    - [ ] `GET    /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}/tests`
    - [ ] `PUT    /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}/tests`
    - [ ] `GET    /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}`
    - [ ] `POST   /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}`
    - [ ] `PUT    /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}`
    - [ ] `DELETE /rest/raven/1.0/api/testrepository/{projectKey}/folders/{folderId}`
  - [Import Execution Results](https://docs.getxray.app/display/XRAY/Import+Execution+Results+-+REST)
    - [x] `POST /rest/raven/1.0/api/import/execution`
    - [x] `POST /rest/raven/1.0/api/import/execution/multipart`
    - [ ] `POST /rest/raven/1.0/api/import/execution/cucumber`
    - [ ] `POST /rest/raven/1.0/api/import/execution/cucumber/multipart`
    - [ ] `POST /rest/raven/1.0/api/import/execution/behave`
    - [ ] `POST /rest/raven/1.0/api/import/execution/behave/multipart`
    - [ ] `POST /rest/raven/1.0/api/import/execution/junit`
    - [ ] `POST /rest/raven/1.0/api/import/execution/junit/multipart`
    - [ ] `POST /rest/raven/1.0/api/import/execution/testng`
    - [ ] `POST /rest/raven/1.0/api/import/execution/testng/multipart`
    - [ ] `POST /rest/raven/1.0/api/import/execution/nunit`
    - [ ] `POST /rest/raven/1.0/api/import/execution/nunit/multipart`
    - [ ] `POST /rest/raven/1.0/api/import/execution/xunit`
    - [ ] `POST /rest/raven/1.0/api/import/execution/xunit/multipart`
    - [ ] `POST /rest/raven/1.0/api/import/execution/robot`
    - [ ] `POST /rest/raven/1.0/api/import/execution/robot/multipart`
    - [ ] `POST /rest/raven/1.0/api/import/execution/bundle`
  - [Export Execution Results](https://docs.getxray.app/display/XRAY/Export+Execution+Results+-+REST)
    - [ ] `GET /rest/raven/1.0/api/testruns`
    - [ ] `GET /rest/raven/1.0/api/execution/result (deprecated)`
  - [Importing Cucumber Tests](https://docs.getxray.app/display/XRAY/Importing+Cucumber+Tests+-+REST)
    - [ ] `POST /rest/raven/1.0/api/import/feature`
  - [Exporting Cucumber Tests](https://docs.getxray.app/display/XRAY/Exporting+Cucumber+Tests+-+REST)
    - [ ] `GET /rest/raven/1.0/api/export/test`
  - [Settings](https://docs.getxray.app/display/XRAY/Settings+-+REST)
    - [ ] `GET /rest/raven/1.0/api/settings/teststatuses`
    - [ ] `GET /rest/raven/1.0/api/settings/teststepstatuses`
- [v2](https://docs.getxray.app/display/XRAY/v2.0)
  - [Test Step](https://docs.getxray.app/display/XRAY/v2.0#/Test%20Step)
    - [ ] `GET    /rest/raven/2.0/api/test/{testKey}/steps`
    - [ ] `POST   /rest/raven/2.0/api/test/{testKey}/steps`
    - [ ] `GET    /rest/raven/2.0/api/test/{testKey}/steps/{stepId}`
    - [ ] `PUT    /rest/raven/2.0/api/test/{testKey}/steps/{stepId}`
    - [ ] `DELETE /rest/raven/2.0/api/test/{testKey}/steps/{stepId}`
    - [ ] `GET    /rest/raven/2.0/api/test/{testKey}/steps/{stepId}/attachments`
    - [ ] `DELETE /rest/raven/2.0/api/test/{testKey}/steps/{stepId}/attachment/{attachmentId}`
  - [Test Run](https://docs.getxray.app/display/XRAY/v2.0#/Test%20Run)
    - [x] `GET    /rest/raven/2.0/api/testrun`
    - [x] `GET    /rest/raven/2.0/api/testrun/{id}`
    - [x] `PUT    /rest/raven/2.0/api/testrun/{id}`
    - [ ] `GET    /rest/raven/2.0/api/testrun/{id}/customfield/{customFieldId}`
    - [ ] `PUT    /rest/raven/2.0/api/testrun/{id}/customfield/{customFieldId}`
    - [ ] `GET    /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}`
    - [ ] `PUT    /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}`
    - [ ] `GET    /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step`
    - [ ] `GET    /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step/{stepResultId}`
    - [ ] `PUT    /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step/{stepResultId}`
    - [ ] `GET    /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step/{stepResultId}/status`
    - [ ] `PUT    /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step/{stepResultId}/status`
    - [ ] `GET    /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step/{stepResultId}/attachment`
    - [ ] `POST   /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step/{stepResultId}/attachment`
    - [ ] `DELETE /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step/{stepResultId}/attachment`
    - [ ] `DELETE /rest/raven/2.0/api/testrun/{id}/iteration/{iterationId}/step/{stepResultId}/attachment/{attachmentId}`
    - [ ] `GET /testruns`
  - [Test Run Status](https://docs.getxray.app/display/XRAY/v2.0#/Test%20Run%20Status)
    - [ ] `PUT /rest/raven/2.0/api/testrunstatus/reset`
  - [Requirement Status](https://docs.getxray.app/display/XRAY/v2.0#/Requirement%20Status)
    - [ ] `PUT /rest/raven/2.0/api/requirementstatus/reset`
  - [Project](https://docs.getxray.app/display/XRAY/v2.0#/Project)
    - [ ] `GET /rest/raven/2.0/api/project/{id}/settings/customfields/testruns`
    - [ ] `GET /rest/raven/2.0/api/project/{id}/settings/customfields/teststeps`
  - [External Apps](https://docs.getxray.app/display/XRAY/v2.0#/External%20Apps)
    - [ ] `GET /rest/raven/2.0/api/xraylicense`
  - [Import](https://docs.getxray.app/display/XRAY/v2.0#/Import)
    - [x] `POST /rest/raven/2.0/api/import/execution`
    - [x] `POST /rest/raven/2.0/api/import/execution/multipart`
  - [Dataset](https://docs.getxray.app/display/XRAY/v2.0#/Dataset)
    - [x] `GET  /rest/raven/2.0/api/dataset/export`
    - [x] `POST /rest/raven/2.0/api/dataset/import`
  - [Test Repository](https://docs.getxray.app/display/XRAY/v2.0#/Test%20Repository)
    - [ ] `GET /rest/raven/2.0/api/testrepository/{projectKey}/folders/{folderId}`

</details>

<details>
  <summary>Xray cloud roadmap</summary>

---

_Based on: https://docs.getxray.app/display/XRAYCLOUD/REST+API_

- [v1](https://docs.getxray.app/display/XRAYCLOUD/Version+1)
  - [Exporting Cucumber Tests](https://docs.getxray.app/display/XRAYCLOUD/Exporting+Cucumber+Tests+-+REST)
    - [ ] `GET /api/v1/export/cucumber`
  - [Import Execution Results](https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST)
    - [x] `POST /api/v1/import/execution`
    - [x] `POST /api/v1/import/execution/multipart`
    - [ ] `POST /api/v1/import/execution/cucumber`
    - [ ] `POST /api/v1/import/execution/cucumber/multipart`
    - [ ] `POST /api/v1/import/execution/junit`
    - [ ] `POST /api/v1/import/execution/junit/multipart`
    - [ ] `POST /api/v1/import/execution/nunit`
    - [ ] `POST /api/v1/import/execution/nunit/multipart`
    - [ ] `POST /api/v1/import/execution/xunit`
    - [ ] `POST /api/v1/import/execution/xunit/multipart`
    - [ ] `POST /api/v1/import/execution/testng`
    - [ ] `POST /api/v1/import/execution/testng/multipart`
    - [ ] `POST /api/v1/import/execution/robot`
    - [ ] `POST /api/v1/import/execution/robot/multipart`
    - [ ] `POST /api/v1/import/execution/behave`
    - [ ] `POST /api/v1/import/execution/behave/multipart`
  - [Importing Tests](https://docs.getxray.app/display/XRAYCLOUD/Importing+Tests+-+REST)
    - [ ] `POST /api/v1/import/test/bulk`
    - [ ] `GET  /api/v1/import/test/bulk/{jobId}/status`
  - [Importing Cucumber Tests](https://docs.getxray.app/display/XRAYCLOUD/Importing+Cucumber+Tests+-+REST)
    - [ ] `POST /api/v1/import/feature`
  - [Backup](https://docs.getxray.app/display/XRAYCLOUD/Backup+-+REST)
    - [ ] `POST /api/v1/backup`
    - [ ] `GET  /api/v1/backup/{jobId}/status`
    - [ ] `GET  /api/v1/backup/file`
    - [ ] `GET  /api/v1/backup/file/attachment`
  - [Attachments](https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST)
    - [x] `GET  /api/v1/attachments/{attachmentId}`
    - [x] `POST /api/v1/attachments`
- [v2](https://docs.getxray.app/display/XRAYCLOUD/Version+2)
  - [Exporting Cucumber Tests](https://docs.getxray.app/display/XRAYCLOUD/Exporting+Cucumber+Tests+-+REST+v2)
    - [ ] `GET /api/v2/export/cucumber`
  - [Exporting Datasets](https://docs.getxray.app/display/XRAYCLOUD/Exporting+datasets+-+REST+v2)
    - [x] `GET /api/v2/dataset/export`
  - [Import Execution Results](https://docs.getxray.app/display/XRAYCLOUD/Import+Execution+Results+-+REST+v2)
    - [x] `POST /api/v2/import/execution`
    - [x] `POST /api/v2/import/execution/multipart`
    - [ ] `POST /api/v2/import/execution/cucumber`
    - [ ] `POST /api/v2/import/execution/cucumber/multipart`
    - [ ] `POST /api/v2/import/execution/junit`
    - [ ] `POST /api/v2/import/execution/junit/multipart`
    - [ ] `POST /api/v2/import/execution/nunit`
    - [ ] `POST /api/v2/import/execution/nunit/multipart`
    - [ ] `POST /api/v2/import/execution/xunit`
    - [ ] `POST /api/v2/import/execution/xunit/multipart`
    - [ ] `POST /api/v2/import/execution/testng`
    - [ ] `POST /api/v2/import/execution/testng/multipart`
    - [ ] `POST /api/v2/import/execution/robot`
    - [ ] `POST /api/v2/import/execution/robot/multipart`
    - [ ] `POST /api/v2/import/execution/behave`
    - [ ] `POST /api/v2/import/execution/behave/multipart`
  - [Importing Tests](https://docs.getxray.app/display/XRAYCLOUD/Importing+Tests+-+REST+v2)
    - [ ] `POST /api/v2/import/test/bulk`
    - [ ] `GET  /api/v2/import/test/bulk/{jobId}/status`
  - [Importing Cucumber Tests](https://docs.getxray.app/display/XRAYCLOUD/Importing+Cucumber+Tests+-+REST+v2)
    - [ ] `POST /api/v2/import/feature`
  - [Backup](https://docs.getxray.app/display/XRAYCLOUD/Backup+-+REST+v2)
    - [ ] `POST /api/v2/backup`
    - [ ] `GET  /api/v2/backup/{jobId}/status`
    - [ ] `GET  /api/v2/backup/file`
    - [ ] `GET  /api/v2/backup/file/attachment`
  - [Attachments](https://docs.getxray.app/display/XRAYCLOUD/Attachments+-+REST+v2)
    - [x] `GET  /api/v2/attachments/{attachmentId}`
    - [x] `POST /api/v2/attachments`
- [GraphQL](https://us.xray.cloud.getxray.app/doc/graphql/)
  - query
    - [ ] [getFolder](https://us.xray.cloud.getxray.app/doc/graphql/getfolder.doc.html)
    - [ ] [getTest](https://us.xray.cloud.getxray.app/doc/graphql/gettest.doc.html)
    - [ ] [getTests](https://us.xray.cloud.getxray.app/doc/graphql/gettests.doc.html)
    - [ ] [getExpandedTest](https://us.xray.cloud.getxray.app/doc/graphql/getexpandedtest.doc.html)
    - [ ] [getExpandedTests](https://us.xray.cloud.getxray.app/doc/graphql/getexpandedtests.doc.html)
    - [ ] [getCoverableIssue](https://us.xray.cloud.getxray.app/doc/graphql/getcoverableissue.doc.html)
    - [ ] [getCoverableIssues](https://us.xray.cloud.getxray.app/doc/graphql/getcoverableissues.doc.html)
    - [ ] [getPrecondition](https://us.xray.cloud.getxray.app/doc/graphql/getprecondition.doc.html)
    - [ ] [getPreconditions](https://us.xray.cloud.getxray.app/doc/graphql/getpreconditions.doc.html)
    - [ ] [getTestSet](https://us.xray.cloud.getxray.app/doc/graphql/gettestset.doc.html)
    - [ ] [getTestSets](https://us.xray.cloud.getxray.app/doc/graphql/gettestsets.doc.html)
    - [x] [getTestPlan](https://us.xray.cloud.getxray.app/doc/graphql/gettestplan.doc.html)
    - [x] [getTestPlans](https://us.xray.cloud.getxray.app/doc/graphql/gettestplans.doc.html)
    - [x] [getTestExecution](https://us.xray.cloud.getxray.app/doc/graphql/gettestexecution.doc.html)
    - [x] [getTestExecutions](https://us.xray.cloud.getxray.app/doc/graphql/gettestexecutions.doc.html)
    - [x] [getTestRun](https://us.xray.cloud.getxray.app/doc/graphql/gettestrun.doc.html)
    - [ ] [getTestRunById](https://us.xray.cloud.getxray.app/doc/graphql/gettestrunbyid.doc.html)
    - [x] [getTestRuns](https://us.xray.cloud.getxray.app/doc/graphql/gettestruns.doc.html)
    - [ ] [getTestRunsById](https://us.xray.cloud.getxray.app/doc/graphql/gettestrunsbyid.doc.html)
    - [ ] [getStatus](https://us.xray.cloud.getxray.app/doc/graphql/getstatus.doc.html)
    - [ ] [getStatuses](https://us.xray.cloud.getxray.app/doc/graphql/getstatuses.doc.html)
    - [ ] [getStepStatus](https://us.xray.cloud.getxray.app/doc/graphql/getstepstatus.doc.html)
    - [ ] [getStepStatuses](https://us.xray.cloud.getxray.app/doc/graphql/getstepstatuses.doc.html)
    - [ ] [getProjectSettings](https://us.xray.cloud.getxray.app/doc/graphql/getprojectsettings.doc.html)
    - [ ] [getIssueLinkTypes](https://us.xray.cloud.getxray.app/doc/graphql/getissuelinktypes.doc.html)
  - mutation
    - [ ] [createFolder](https://us.xray.cloud.getxray.app/doc/graphql/createfolder.doc.html)
    - [ ] [deleteFolder](https://us.xray.cloud.getxray.app/doc/graphql/deletefolder.doc.html)
    - [ ] [renameFolder](https://us.xray.cloud.getxray.app/doc/graphql/renamefolder.doc.html)
    - [ ] [moveFolder](https://us.xray.cloud.getxray.app/doc/graphql/movefolder.doc.html)
    - [ ] [addTestsToFolder](https://us.xray.cloud.getxray.app/doc/graphql/addteststofolder.doc.html)
    - [ ] [addIssuesToFolder](https://us.xray.cloud.getxray.app/doc/graphql/addissuestofolder.doc.html)
    - [ ] [removeTestsFromFolder](https://us.xray.cloud.getxray.app/doc/graphql/removetestsfromfolder.doc.html)
    - [ ] [removeIssuesFromFolder](https://us.xray.cloud.getxray.app/doc/graphql/removeissuesfromfolder.doc.html)
    - [ ] [createTest](https://us.xray.cloud.getxray.app/doc/graphql/createtest.doc.html)
    - [ ] [updateTestType](https://us.xray.cloud.getxray.app/doc/graphql/updatetesttype.doc.html)
    - [ ] [updateUnstructuredTestDefinition](https://us.xray.cloud.getxray.app/doc/graphql/updateunstructuredtestdefinition.doc.html)
    - [ ] [updateGherkinTestDefinition](https://us.xray.cloud.getxray.app/doc/graphql/updategherkintestdefinition.doc.html)
    - [ ] [deleteTest](https://us.xray.cloud.getxray.app/doc/graphql/deletetest.doc.html)
    - [ ] [addTestStep](https://us.xray.cloud.getxray.app/doc/graphql/addteststep.doc.html)
    - [ ] [updateTestStep](https://us.xray.cloud.getxray.app/doc/graphql/updateteststep.doc.html)
    - [ ] [removeTestStep](https://us.xray.cloud.getxray.app/doc/graphql/removeteststep.doc.html)
    - [ ] [removeAllTestSteps](https://us.xray.cloud.getxray.app/doc/graphql/removeallteststeps.doc.html)
    - [ ] [addPreconditionToTest](https://us.xray.cloud.getxray.app/doc/graphql/addpreconditionstotest.doc.html)
    - [ ] [removePreconditionFromTest](https://us.xray.cloud.getxray.app/doc/graphql/removepreconditionsfromtest.doc.html)
    - [ ] [updateTestFolder](https://us.xray.cloud.getxray.app/doc/graphql/updatetestfolder.doc.html)
    - [ ] [updatePreconditionFolder](https://us.xray.cloud.getxray.app/doc/graphql/updatepreconditionfolder.doc.html)
    - [ ] [addTestSetsToTest](https://us.xray.cloud.getxray.app/doc/graphql/addtestsetstotest.doc.html)
    - [ ] [removeTestSetsFromTest](https://us.xray.cloud.getxray.app/doc/graphql/removetestsetsfromtest.doc.html)
    - [ ] [addTestPlansToTest](https://us.xray.cloud.getxray.app/doc/graphql/addtestplanstotest.doc.html)
    - [ ] [removeTestPlansFromTest](https://us.xray.cloud.getxray.app/doc/graphql/removetestplansfromtest.doc.html)
    - [ ] [addTestExecutionsToTest](https://us.xray.cloud.getxray.app/doc/graphql/addtestexecutionstotest.doc.html)
    - [ ] [removeTestExecutionsFromTest](https://us.xray.cloud.getxray.app/doc/graphql/removetestexecutionsfromtest.doc.html)
    - [ ] [createPrecondition](https://us.xray.cloud.getxray.app/doc/graphql/createprecondition.doc.html)
    - [ ] [updatePrecondition](https://us.xray.cloud.getxray.app/doc/graphql/updateprecondition.doc.html)
    - [ ] [deletePrecondition](https://us.xray.cloud.getxray.app/doc/graphql/deleteprecondition.doc.html)
    - [ ] [addTestsToPrecondition](https://us.xray.cloud.getxray.app/doc/graphql/addteststoprecondition.doc.html)
    - [ ] [removeTestsFromPrecondition](https://us.xray.cloud.getxray.app/doc/graphql/removetestsfromprecondition.doc.html)
    - [ ] [createTestSet](https://us.xray.cloud.getxray.app/doc/graphql/createtestset.doc.html)
    - [ ] [deleteTestSet](https://us.xray.cloud.getxray.app/doc/graphql/deletetestset.doc.html)
    - [ ] [addTestsToTestSet](https://us.xray.cloud.getxray.app/doc/graphql/addteststotestset.doc.html)
    - [ ] [removeTestsFromTestSet](https://us.xray.cloud.getxray.app/doc/graphql/removetestsfromtestset.doc.html)
    - [ ] [createTestPlan](https://us.xray.cloud.getxray.app/doc/graphql/createtestplan.doc.html)
    - [ ] [deleteTestPlan](https://us.xray.cloud.getxray.app/doc/graphql/deletetestplan.doc.html)
    - [ ] [addTestsToTestPlan](https://us.xray.cloud.getxray.app/doc/graphql/addteststotestplan.doc.html)
    - [ ] [removeTestsFromTestPlan](https://us.xray.cloud.getxray.app/doc/graphql/removetestsfromtestplan.doc.html)
    - [ ] [addTestExecutionsToTestPlan](https://us.xray.cloud.getxray.app/doc/graphql/addtestexecutionstotestplan.doc.html)
    - [ ] [removeTestExecutionsFromTestPlan](https://us.xray.cloud.getxray.app/doc/graphql/removetestexecutionsfromtestplan.doc.html)
    - [ ] [createTestExecution](https://us.xray.cloud.getxray.app/doc/graphql/createtestexecution.doc.html)
    - [ ] [deleteTestExecution](https://us.xray.cloud.getxray.app/doc/graphql/deletetestexecution.doc.html)
    - [ ] [addTestsToTestExecution](https://us.xray.cloud.getxray.app/doc/graphql/addteststotestexecution.doc.html)
    - [ ] [removeTestsFromTestExecution](https://us.xray.cloud.getxray.app/doc/graphql/removetestsfromtestexecution.doc.html)
    - [ ] [addTestEnvironmentsToTestExecution](https://us.xray.cloud.getxray.app/doc/graphql/addtestenvironmentstotestexecution.doc.html)
    - [ ] [removeTestEnvironmentsFromTestExecution](https://us.xray.cloud.getxray.app/doc/graphql/removetestenvironmentsfromtestexecution.doc.html)
    - [ ] [resetTestRun](https://us.xray.cloud.getxray.app/doc/graphql/resettestrun.doc.html)
    - [ ] [updateTestRunStatus](https://us.xray.cloud.getxray.app/doc/graphql/updatetestrunstatus.doc.html)
    - [ ] [updateTestRunComment](https://us.xray.cloud.getxray.app/doc/graphql/updatetestruncomment.doc.html)
    - [ ] [updateTestRun](https://us.xray.cloud.getxray.app/doc/graphql/updatetestrun.doc.html)
    - [ ] [addDefectsToTestRun](https://us.xray.cloud.getxray.app/doc/graphql/adddefectstotestrun.doc.html)
    - [ ] [removeDefectsFromTestRun](https://us.xray.cloud.getxray.app/doc/graphql/removedefectsfromtestrun.doc.html)
    - [x] [addEvidenceToTestRun](https://us.xray.cloud.getxray.app/doc/graphql/addevidencetotestrun.doc.html)
    - [x] [removeEvidenceFromTestRun](https://us.xray.cloud.getxray.app/doc/graphql/removeevidencefromtestrun.doc.html)
    - [ ] [updateTestRunStep](https://us.xray.cloud.getxray.app/doc/graphql/updatetestrunstep.doc.html)
    - [ ] [addEvidenceToTestRunStep](https://us.xray.cloud.getxray.app/doc/graphql/addevidencetotestrunstep.doc.html)
    - [ ] [removeEvidenceFromTestRunStep](https://us.xray.cloud.getxray.app/doc/graphql/removeevidencefromtestrunstep.doc.html)
    - [ ] [addDefectsToTestRunStep](https://us.xray.cloud.getxray.app/doc/graphql/adddefectstotestrunstep.doc.html)
    - [ ] [removeDefectsFromTestRunStep](https://us.xray.cloud.getxray.app/doc/graphql/removedefectsfromtestrunstep.doc.html)
    - [ ] [updateTestRunStepComment](https://us.xray.cloud.getxray.app/doc/graphql/updatetestrunstepcomment.doc.html)
    - [ ] [updateTestRunStepStatus](https://us.xray.cloud.getxray.app/doc/graphql/updatetestrunstepstatus.doc.html)
    - [ ] [updateTestRunExampleStatus](https://us.xray.cloud.getxray.app/doc/graphql/updatetestrunexamplestatus.doc.html)
    - [ ] [updateIterationStatus](https://us.xray.cloud.getxray.app/doc/graphql/updateiterationstatus.doc.html)
    - [ ] [setTestRunTimer](https://us.xray.cloud.getxray.app/doc/graphql/settestruntimer.doc.html)

</details>

# Installation

This package is built on Node's native fetch API and, by extension, relies on the [`undici`](https://www.npmjs.com/package/undici) library.
To enable full functionality (such as passing custom proxy agent instances) without running into version conflicts between Node's built-in `undici` module and the user-facing typings of the client package, `undici` must be installed as a peer dependency.

## Xray Server

```bash
npm install @qytera/xray-client undici
```

## Xray Cloud

If you don't intend to use the [GraphQL endpoints](https://us.xray.cloud.getxray.app/doc/graphql/):

```bash
npm install @qytera/xray-client undici
```

With GraphQL support:

```bash
npm install @qytera/xray-client undici graphql graphql-tag
```

# Usage

Simply create a client instance for your Xray setup and start using the fully typed endpoints available.

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
const testRun = await serverClient.testRun.getTestRun({
  testExecIssueKey: "PRJ-456",
  testIssueKey: "PRJ-123",
});
// ... other endpoints
```

## Xray Cloud

```ts
import { XrayClientCloud } from "@qytera/xray-client";

// Xray cloud authentication.
export const cloudClient = new XrayClientCloud({
  credentials: {
    clientId: "xray-client-id",
    clientSecret: "xray-client-secret",
    path: "/api/v2/authenticate",
  },
  url: "https://xray.cloud.getxray.app",
});

const csvData = await cloudClient.dataset.export({ testIssueKey: "PRJ-123" });
// ... other endpoints
```

The GraphQL query and mutation endpoints are also available. For example, consider the following [`getTestRuns`](https://us.xray.cloud.getxray.app/doc/graphql/gettestruns.doc.html) query:

```graphql
{
  getTestRuns(limit: 100, testExecIssueIds: ["XCN-2"]) {
    total
    limit
    start
    results {
      test {
        jira(fields: ["key"])
      }
    }
  }
}
```

It can easily be mapped to the following code snippet using the library:

<!-- prettier-ignore-start -->
```ts
const testRuns = await cloudClient.graphql.getTestRuns(
  { limit: 100, testExecIssueIds: ["XCN-2"] },
  (testRunResults) => [
    testRunResults.total,
    testRunResults.limit,
    testRunResults.start,
    testRunResults.results((testRun) => [
      testRun.test((test) => [
        test.jira({ fields: ["key"] })
      ])
    ]),
  ]
);
```
<!-- prettier-ignore-end -->

## Version Specification

Xray server and Xray cloud both have [versioned API endpoints](https://docs.getxray.app/display/XRAY/Clarifications+on+APIs+usage#ClarificationsonAPIsusage-AvailableAPIs) with slightly different behaviour.
By default, the clients access the latest documented version available for each endpoint.

You can switch between versions on a per-request basis:

```ts
// Xray server:
const evidence = await serverClient.testRun.evidence.getEvidence("12345"); // 2.0 endpoint
const evidence = await serverClient.testRun.evidence.v1.getEvidence("12345"); // 1.0 endpoint

// Xray cloud:
const attachment = await cloudClient.attachment.addAttachment("my-file.txt"); // v2 endpoint
const attachment = await cloudClient.attachment.v1.addAttachment("my-file.txt"); // v1 endpoint
```

## Error Handling

Requests may result in HTTP error responses (e.g. 400 Bad Request, 403 Forbidden, 500 Internal Server Error) depending on the request configuration.
The clients always throw errors when the actual response status does not match the expected status defined internally for each endpoint.

> [!NOTE]
> Unfortunately, Xray's official documentation is not always precise about error response formats.
> The error responses also vary between Xray server/cloud and based on the Jira/Xray versions present.
> It is therefore impossible for the clients to directly model all error responses.

To handle response errors gracefully, use `isResponseError` to adapt possible outcomes to your Xray environment:

```ts
import { isResponseError } from "@qytera/xray-client";

try {
  const data = await client.import.execution.xray(/* ... */);
  // ...
} catch (error: unknown) {
  if (isResponseError(error)) {
    // access request/response data
    console.error("request failed:", error.request.url);
    console.error("request failed:", error.response.json.details);
  } else {
    // ...
  }
}
```

You can also easily define your own expected response error details and distinguish between them:

```ts
import { isResponseError } from "@qytera/xray-client";

try {
  const data = await client.import.execution.xray(/* ... */);
  // ...
} catch (error: unknown) {
  if (isResponseError(error, 400)) {
    console.error("Bad Request:", error.response.text);
  } else if (isResponseError<{ missingPermission: string }>(error, 403)) {
    console.error("Forbidden:", error.response.json.missingPermission);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

# Credits

This project was heavily inspired by [jira.js](https://github.com/MrRefactoring/jira.js).

# Changelog

# `Preview`

- Added `GET    /rest/raven/1.0/api/precondition/{preConditionKey}/test`
- Added `POST   /rest/raven/1.0/api/precondition/{preConditionKey}/test`
- Added `DELETE /rest/raven/1.0/api/precondition/{preConditionKey}/test/{testKey}`
- Added `GET    /rest/raven/1.0/api/testset/{testSetKey}/test`
- Added `POST   /rest/raven/1.0/api/testset/{testSetKey}/test`
- Added `DELETE /rest/raven/1.0/api/testset/{testSetKey}/test/{testKey}`
- Added `POST   /rest/raven/1.0/api/testplan/{testPlanKey}/test`
- Added `DELETE /rest/raven/1.0/api/testplan/{testPlanKey}/test/{testKey}`
- Added `POST   /rest/raven/1.0/api/testplan/{testPlanKey}/testexecution`
- Added `DELETE /rest/raven/1.0/api/testplan/{testPlanKey}/testexecution/{testExecKey}`
- Added `POST   /rest/raven/1.0/api/testexec/{testExecKey}/test`
- Added `DELETE /rest/raven/1.0/api/testexec/{testExecKey}/test/{testKey}`

# `4.0.0`

## Breaking Changes

- Removed `dispatcher` client parameter
- Added custom `fetch` implementation client parameter

## Other Changes

- Added `GET    /rest/raven/1.0/api/test/{testKey}/step`
- Added `GET    /rest/raven/2.0/api/test/{testKey}/steps`
- Added `GET    /rest/raven/1.0/api/test/{testKey}/step/{id}`
- Added `GET    /rest/raven/2.0/api/test/{testKey}/steps/{stepId}`
- Added `PUT    /rest/raven/1.0/api/test/{testKey}/step`
- Added `POST   /rest/raven/2.0/api/test/{testKey}/steps`
- Added `POST   /rest/raven/1.0/api/test/{testKey}/step/{id}`
- Added `PUT    /rest/raven/2.0/api/test/{testKey}/steps/{stepId}`
- Added `DELETE /rest/raven/1.0/api/test/{testKey}/step/{id}`
- Added `DELETE /rest/raven/2.0/api/test/{testKey}/steps/{stepId}`
- Added `GET    /rest/raven/1.0/api/test/{testKey}/step/{id}/attachment`
- Added `GET    /rest/raven/2.0/api/test/{testKey}/steps/{stepId}/attachments`
- Added `DELETE /rest/raven/1.0/api/test/{testKey}/step/{id}/attachment/{attachmentID}`
- Added `DELETE /rest/raven/2.0/api/test/{testKey}/steps/{stepId}/attachment/{attachmentId}`
- Added `GET    /rest/raven/1.0/api/settings/teststepstatuses`
- Removed undici peer dependency

# `3.0.0`

## Breaking Changes

- Changed `cloudClient.attachments` to `cloudClient.attachment`
- Changed `serverClient.testExecutions` to `serverClient.testExecution`
- Changed `serverClient.testPlans` to `serverClient.testPlan`
- Changed `serverClient.testRuns` to `serverClient.testRun`
- Added mandatory `path` property to Xray cloud client credentials

## Other Changes

- Added `GET /rest/raven/1.0/api/test`
- Added `GET /rest/raven/1.0/api/settings/teststatuses`
- Added `GET /rest/raven/1.0/api/test/{key}/testruns`
- Added `GET /rest/raven/1.0/api/test/{key}/preconditions`
- Added `GET /rest/raven/1.0/api/test/{key}/testsets`
- Added `GET /rest/raven/1.0/api/test/{key}/testexecutions`
- Added `GET /rest/raven/1.0/api/test/{key}/testplans`
- Added `getTestRun` GraphQL query
- Added dedicated error handling using `isResponseError`
- Added endpoint versioning support

# `2.1.0`

- Added `getTestExecution` GraphQL query
- Added `getTestExecutions` GraphQL query

# `2.0.0`

- Updated test run models of Xray server
- Changed `serverClient.testRuns.testRun.*` to `serverClient.testRuns.*`
- Changed `serverClient.testRuns.evidence.*` to `serverClient.testRuns.evidence.*`
- Moved `graphql` to optional peer dependencies
- Moved `graphql-tag` to optional peer dependencies
- Moved `undici` to peer dependencies

# `1.1.1`

- Added test run endpoints to Xray server client

# `1.1.0`

- Added Xray server test run endpoints

# `1.0.0`

- First release. For versions `<1.0.0`, please see the [GitHub releases page](https://github.com/Qytera-Gmbh/xray-client-node/releases).

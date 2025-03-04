# Changelog

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

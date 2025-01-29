import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { OpenAPI3 } from "openapi-typescript";
import openapi, { astToString, COMMENT_HEADER } from "openapi-typescript";

/**
 * Generates TypeScript models based on Jira's publically available OpenAPI documentation.
 *
 * @see https://openapi-ts.dev/node#usage
 * @see https://www.atlassian.com/blog/developer/update-to-jira-clouds-swagger-openapi-docs
 */
async function generateCloudModels(): Promise<void> {
  const response = await fetch(
    "https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json",
    { method: "GET" }
  );
  const spec = (await response.json()) as OpenAPI3;
  // We do not need to generate paths or servers etc. Just the models.
  const schemaOnlySpec = {
    components: {
      schemas: spec.components?.schemas,
    },
    info: spec.info,
    openapi: spec.openapi || "3.0.0",
  };
  const output = await openapi(schemaOnlySpec, {
    alphabetize: true,
    rootTypes: true,
    rootTypesNoSchemaPrefix: true,
  });
  const directory = join(import.meta.dirname, "__generated__");
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }
  writeFileSync(
    join(directory, "index.ts"),
    [COMMENT_HEADER, "/* eslint-disable */", "", astToString(output)].join("\n"),
    "utf-8"
  );
}

await generateCloudModels();

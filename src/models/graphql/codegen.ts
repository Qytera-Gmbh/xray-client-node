import type { CodegenConfig } from "@graphql-codegen/cli";
import { generate } from "@graphql-codegen/cli";
import { getEnv } from "../../../test/util.js";

import "dotenv/config";

const TOKEN = await fetch("https://xray.cloud.getxray.app/api/v2/authenticate", {
  body: JSON.stringify({
    ["client_id"]: getEnv("xray-client-id"),
    ["client_secret"]: getEnv("xray-client-secret"),
  }),
  headers: {
    ["Accept"]: "application/json",
    ["Content-Type"]: "application/json",
  },
  method: "POST",
}).then((response) => response.json() as Promise<string>);

const CONFIG: CodegenConfig = {
  ["emitLegacyCommonJSImports"]: false,
  generates: {
    ["./src/models/graphql/__generated__/index.ts"]: {
      plugins: [
        {
          add: {
            content: [
              "",
              "// =========================================================",
              "//  GENERATED USING @graphql-codegen/cli",
              "//  See: https://www.npmjs.com/package/@graphql-codegen/cli",
              "// =========================================================",
              "",
              "/* eslint-disable */",
            ].join("\n"),
          },
        },
        "typescript",
      ],
    },
  },
  ignoreNoDocuments: true,
  schema: {
    ["https://xray.cloud.getxray.app/api/v2/graphql"]: {
      headers: { ["Authorization"]: `Bearer ${TOKEN}` },
    },
  },
};

await generate(CONFIG);

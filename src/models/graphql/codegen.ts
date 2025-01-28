import type { CodegenConfig } from "@graphql-codegen/cli";

const TOKEN = process.env.XRAY_BEARER_TOKEN;

if (!TOKEN) {
  throw new Error(
    "Please provide the Xray bearer token through the environment variable XRAY_BEARER_TOKEN"
  );
}

const CONFIG: CodegenConfig = {
  ["emitLegacyCommonJSImports"]: false,
  generates: {
    ["./src/models/graphql/__generated__/index.ts"]: {
      plugins: [
        "typescript",
        {
          add: { content: "/* eslint-disable */" },
        },
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

export default CONFIG;

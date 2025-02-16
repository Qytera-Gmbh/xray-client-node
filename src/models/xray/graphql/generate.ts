import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { cwd } from "node:process";
import { fetch } from "undici";
import { getEnv } from "../../../../test/util.js";

import "dotenv/config";

const BUILDER_FILE = join(
  ".",
  relative(cwd(), join(import.meta.dirname, "__generated__", "index.ts"))
);

const TOKEN_RESPONSE = await fetch("https://xray.cloud.getxray.app/api/v2/authenticate", {
  body: JSON.stringify({
    ["client_id"]: getEnv("xray-client-id"),
    ["client_secret"]: getEnv("xray-client-secret"),
  }),
  headers: {
    ["Accept"]: "application/json",
    ["Content-Type"]: "application/json",
  },
  method: "POST",
});

const TOKEN = (await TOKEN_RESPONSE.json()) as string;

execSync(
  `npx typed-graphql-builder --schema https://xray.cloud.getxray.app/api/v2/graphql --output ${BUILDER_FILE} --headers "Authorization:Bearer ${TOKEN}"`,
  {
    stdio: "inherit",
  }
);

writeFileSync(
  BUILDER_FILE,
  [
    "// ==========================================================================================",
    "// GENERATED USING typed-graphql-builder",
    "// See: https://www.npmjs.com/package/typed-graphql-builder",
    "//",
    "// Modifications applied to final file:",
    "// - export Selection type to make typesafe query wrappers possible",
    "// - replace default JSON type with actual object type",
    "// ==========================================================================================",
    readFileSync(BUILDER_FILE, "utf-8")
      .replace("type Selection", "export type Selection")
      .replace("type JSON = string", "type JSON = Record<string, any>;"),
  ].join("\n")
);

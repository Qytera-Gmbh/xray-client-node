import { register } from "node:module";
import { pathToFileURL } from "node:url";

process.env.TS_NODE_PROJECT = "./tsconfig-esnext.json";

register("ts-node/esm", pathToFileURL("./"));

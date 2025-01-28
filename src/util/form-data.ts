import { File } from "node:buffer";
import { open } from "node:fs/promises";
import { basename } from "node:path";

/**
 * Creates a streamable file.
 *
 * @param path the path to the file
 * @returns the streamable file
 *
 * @see https://stackoverflow.com/a/76957447
 */
export async function createStreamableFile(path: string): Promise<File> {
  const name = basename(path);
  const handle = await open(path);
  const { size } = await handle.stat();
  const file = new File([], name);
  file.stream = () => handle.readableWebStream();
  // Set correct size otherwise, fetch will encounter UND_ERR_REQ_CONTENT_LENGTH_MISMATCH
  Object.defineProperty(file, "size", { get: () => size });
  return file;
}

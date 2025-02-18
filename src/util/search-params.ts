/**
 * Converts an input object to a URL search params string.
 *
 * @example
 *
 * ```ts
 * const params = toSearchParams({name: "Jeff", age: 25});
 * console.log(params.toString());
 * // name=Jeff&age=25
 * ```
 *
 * @param input the input object
 * @returns the URL search params
 */
export function toSearchParams(input?: object): URLSearchParams {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(input ?? {})) {
    if (typeof value === "string") {
      params[key] = value;
    } else if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "symbol" ||
      typeof value === "bigint"
    ) {
      params[key] = value.toString();
    } else {
      throw new Error(
        `cannot coerce value of query parameter ${key} to string type: ${value as string}`
      );
    }
  }
  return new URLSearchParams(params);
}

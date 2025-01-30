/**
 * Models a GraphQL query response containing arbitrary data.
 */
export interface QueryResponse<T, N extends NullHandling> {
  /**
   * The response data.
   */
  data: N extends "without-null" ? NonNullableDeep<T> : T;
}

/**
 * Defines whether `null` values should be included in a GraphQL result type.
 */
export type NullHandling = "with-null" | "without-null";

/**
 * Recursively removes `null` from a given type, including nested properties.
 */
export type NonNullableDeep<T> = T extends object
  ? { [K in keyof T]: NonNullableDeep<T[K]> }
  : Exclude<T, null>;

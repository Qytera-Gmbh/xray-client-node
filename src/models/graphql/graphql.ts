/**
 * Models a GraphQL query response containing arbitrary data.
 */
export interface QueryResponse<T> {
  data: T;
}

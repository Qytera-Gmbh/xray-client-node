/**
 * Models a GraphQL query response containing arbitrary data.
 */
export interface QueryResponse<T> {
  /**
   * The response data.
   */
  data: T;
}

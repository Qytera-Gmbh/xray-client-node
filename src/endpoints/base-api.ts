import type { BaseClient } from "../client/base-client.js";

/**
 * Models an API with different endpoints.
 */
export class BaseApi {
  protected readonly client: BaseClient;
  /**
   * A path segment to append to the client's base URL for all requests.
   */
  protected readonly path: string;

  /**
   * Creates a new API service.
   *
   * @param client the client to use to execute requests
   * @param path a path segment to append to the client's base URL
   */
  constructor(client: BaseClient, path: string) {
    this.client = client;
    this.path = path;
  }
}

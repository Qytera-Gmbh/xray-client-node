import type { BaseClient } from "../client/base-client.js";

/**
 * Models an API with different endpoints.
 */
export class BaseApi {
  protected readonly client: BaseClient;

  /**
   * Creates a new API service.
   *
   * @param client the client to use to execute requests
   */
  constructor(client: BaseClient) {
    this.client = client;
  }
}

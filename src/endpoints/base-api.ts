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

  /**
   * Provides a callback with a reference to the calling instance, ensuring that the callback always has access to the correct `this` context.
   *
   * @param callback a function that takes the calling instance as an argument
   * @returns the result of the callback
   *
   * @example
   *
   * ```ts
   * class MyApi extends BaseApi {
   *   private value = "Hello";
   *   public a = {
   *     getValue() {
   *       return this.value;
   *     },
   *   };
   *   public b = this.bind((self) => ({
   *     getValue() {
   *       return self.value;
   *     },
   *   }));
   * }
   * const instance = new MyApi();
   * const a = instance.a;
   * console.log(a.getValue()); // undefined
   * const b = instance.b;
   * console.log(b.getValue()); // "Hello"
   * ```
   */
  protected bind<T>(callback: (self: this) => T): T {
    return callback(this);
  }
}

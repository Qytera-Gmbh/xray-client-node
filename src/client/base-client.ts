import type { Dispatcher, RequestInit, Response } from "undici";
import { fetch } from "undici";
import { toSearchParams } from "../util/search-params.js";
import { ResponseError } from "./response-error.js";

/**
 * The base client of all Xray clients. Contains the authorization handling.
 */
export class BaseClient {
  /**
   * The value of the authorization header to use in HTTP requests.
   */
  private readonly authorizationValue: Promise<string>;
  /**
   * The dispatcher of the core API used to dispatch requests.
   */
  private readonly dispatcher: Dispatcher | undefined;
  /**
   * The base URL of the Xray instance.
   */
  private readonly url: string;

  /**
   * Constructs a new client based on the provided configuration.
   *
   * @param config the configuration
   */
  constructor(config: ClientConfiguration) {
    this.dispatcher = config.dispatcher;
    this.url = config.url;
    if ("token" in config.credentials) {
      this.authorizationValue = Promise.resolve(`Bearer ${config.credentials.token}`);
    } else if ("username" in config.credentials) {
      this.authorizationValue = Promise.resolve(
        `Basic ${Buffer.from(
          `${config.credentials.username}:${config.credentials.password}`
        ).toString("base64")}`
      );
    } else {
      this.authorizationValue = fetch(`${this.url}/authenticate`, {
        body: JSON.stringify({
          ["client_id"]: config.credentials.clientId,
          ["client_secret"]: config.credentials.clientSecret,
        }),
        dispatcher: this.dispatcher,
        headers: {
          ["Accept"]: "application/json",
          ["Content-Type"]: "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json() as Promise<string>)
        .then((token) => `Bearer ${token}`);
    }
  }

  /**
   * Sends an HTTP request to the Xray instance and optionally verifies the response status.
   *
   * @param path the path to append to the base URL of the Xray instance
   * @param config the request configuration
   * @returns the response
   */
  public async send(path: string, config: RequestConfig): Promise<Response> {
    let url = `${this.url}/${path.startsWith("/") ? path.slice(1) : path}`;
    if (config.query && Object.keys(config).length > 0) {
      url = `${url}?${toSearchParams(config.query).toString()}`;
    }
    const requestHeaders = {
      ["Authorization"]: await this.authorizationValue,
      ...config.headers,
    };
    const request: RequestInit = {
      body: config.body,
      dispatcher: this.dispatcher,
      headers: requestHeaders,
      method: config.method,
    };
    const response = await fetch(url, request);
    if (response.status !== config.expectedStatus) {
      throw new ResponseError({
        expectedStatus: config.expectedStatus,
        request: {
          body: config.body,
          headers: requestHeaders,
          method: config.method,
          url,
        },
        response: {
          headers: response.headers,
          status: response.status,
          text: await response.text(),
        },
      });
    }
    return response;
  }
}

/**
 * Models an HTTP request configuration.
 */
interface RequestConfig {
  /**
   * The body of the request.
   */
  body?: Exclude<RequestInit["body"], null>;
  /**
   * The expected response status of the request.
   */
  expectedStatus: number;
  /**
   * The headers of the request.
   */
  headers?: Record<string, string>;
  /**
   * The HTTP request method of the request.
   */
  method: "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT";
  /**
   * The query parameters of the request.
   */
  query?: object;
}

/**
 * The three different ways to authenticate to an Xray instance.
 */
type XrayCredentials =
  | {
      /**
       * The Jira server basic auth password.
       */
      password: string;
      /**
       * The Jira server basic auth username.
       */
      username: string;
    }
  | {
      /**
       * The Jira server PAT.
       */
      token: string;
    }
  | {
      /**
       * The Xray cloud client ID.
       */
      clientId: string;
      /**
       * The Xray cloud client secret.
       */
      clientSecret: string;
    };

/**
 * The configuration for an Xray client.
 */
export interface ClientConfiguration {
  /**
   * The credentials to use to authenticate.
   */
  credentials: XrayCredentials;
  /**
   * The dispatcher of the core API used to dispatch requests.
   *
   * An example configuration with custom SSL certificates:
   *
   * ```ts
   * import { readFileSync } from "node:fs";
   * import { Agent } from "undici";
   *
   * const configuration = {
   *   dispatcher: new Agent({
   *     connect: {
   *       cert: [readFileSync("certFile1.pem"), readFileSync("certFile2.pem")]
   *     }
   *   }),
   *   // ...
   * };
   * ```
   *
   * An example configuration with an authenticated proxy:
   *
   * ```ts
   * import { ProxyAgent } from "undici";
   *
   * const configuration = {
   *   dispatcher: new ProxyAgent({
   *     token: Buffer.from("username:password").toString("base64"),
   *     uri: "http://1.2.3.4:8765",
   *   }),
   *   // ...
   * };
   * ```
   */
  dispatcher?: Dispatcher;
  /**
   * The base URL of the Xray instance. For Xray server, simply provide the Jira base URL:
   *
   * ```ts
   * "https://my-jira-server-instance.com"
   * ```
   *
   * For Xray cloud, please provide the [Xray cloud endpoint](https://docs.getxray.app/display/XRAYCLOUD/REST+API)
   * you would like to use:
   *
   * ```ts
   * "https://xray.cloud.getxray.app"
   * ```
   */
  url: string;
}

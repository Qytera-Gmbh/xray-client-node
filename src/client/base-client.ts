import { ResponseError } from "./response-error.js";

type Fetch = typeof global.fetch;
type FetchRequestInit = Exclude<Parameters<Fetch>[1], undefined>;
type FetchBodyInit = Exclude<FetchRequestInit["body"], undefined>;

/**
 * The base client of all Xray clients. Contains the authorization handling.
 */
export class BaseClient {
  /**
   * The value of the authorization header to use in HTTP requests.
   */
  private readonly authorizationValue: Promise<string>;
  /**
   * The custom fetch implementation to use to dispatch requests.
   */
  private readonly fetch: Fetch;
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
    this.fetch = config.fetch ?? globalThis.fetch;
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
      this.authorizationValue = this.fetch(this.joinUrl(config.credentials.path), {
        body: JSON.stringify({
          ["client_id"]: config.credentials.clientId,
          ["client_secret"]: config.credentials.clientSecret,
        }),
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
   * Converts key-value pairs to a URL search params string.
   *
   * @param input the input key-value pairs
   * @returns the URL search params
   */
  private static toQueryParams(input: [string, unknown][]): URLSearchParams {
    const params: Record<string, string> = {};
    for (const [key, value] of input) {
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

  /**
   * Constructs a full URL by joining the base URL with a given path and optional query parameters.
   *
   * @param path the relative path to be appended to the client's base URL
   * @param query an optional object to be appended as URL query parameters
   * @returns the full URL
   */
  private joinUrl(path: string, query?: RequestConfig["query"]): string {
    let url = `${this.url}/${path.startsWith("/") ? path.slice(1) : path}`;
    if (query) {
      const entries = Object.entries(query).filter(
        (entry) => entry[1] !== null && entry[1] !== undefined
      );
      if (entries.length > 0) {
        url = `${url}?${BaseClient.toQueryParams(entries).toString()}`;
      }
    }
    return url;
  }

  /**
   * Sends an HTTP request to the Xray instance and optionally verifies the response status.
   *
   * @param path the path to append to the base URL of the Xray instance
   * @param config the request configuration
   * @returns the response
   */
  public async send(path: string, config: RequestConfig): ReturnType<Fetch> {
    const url = this.joinUrl(path, config.query);
    const requestHeaders = {
      ["Authorization"]: await this.authorizationValue,
      ...config.headers,
    };
    const request: FetchRequestInit = {
      body: config.body,
      headers: requestHeaders,
      method: config.method,
    };
    const response = await this.fetch(url, request);
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
  body?: FetchBodyInit;
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
      /**
       * The URL path for token retrieval.
       *
       * @see https://docs.getxray.app/display/XRAYCLOUD/Authentication+-+REST
       * @see https://docs.getxray.app/display/XRAYCLOUD/Authentication+-+REST+v2
       */
      path: "/api/v1/authenticate" | "/api/v2/authenticate";
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
   * The fetch function for sending requests, allowing customisation of fetch behaviour such as
   * setting default headers, using custom SSL certificates or handling proxy authentication.
   *
   * An example configuration with default headers:
   *
   * ```ts
   * const configuration: ClientConfiguration = {
   *   fetch: (url, init) => {
   *     const headers = init?.headers;
   *     if (headers instanceof Headers) {
   *       headers.set("custom-header", "custom-header-value");
   *     } else if (Array.isArray(headers)) {
   *       headers.push(["custom-header", "custom-header-value"]);
   *     } else if (typeof headers === "object") {
   *       headers["custom-header"] = "custom-header-value";
   *     }
   *     return fetch(url, init);
   *   },
   * };
   * ```
   *
   * An example configuration with custom SSL certificates using `undici`:
   *
   * ```ts
   * import { Agent, fetch } from "undici";
   *
   * const dispatcher = new Agent({
   *   connect: {
   *     cert: [readFileSync("certFile1.pem"), readFileSync("certFile2.pem")],
   *   },
   * });
   *
   * const configuration: ClientConfiguration = {
   *   fetch: (input, init) => {
   *     return fetch(input, { ...init, dispatcher });
   *   }
   * };
   * ```
   *
   * An example configuration with an authenticated proxy using `undici`:
   *
   * ```ts
   * import { ProxyAgent, fetch } from "undici";
   *
   * const proxyAgent = new ProxyAgent({
   *   token: Buffer.from("username:password").toString("base64"),
   *   uri: "http://1.2.3.4:8765"
   * });
   *
   * const configuration: ClientConfiguration = {
   *   fetch: (url, init) => {
   *     return fetch(url, { ...init, dispatcher: proxyAgent });
   *   }
   * };
   * ```
   */
  fetch?: Fetch;
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

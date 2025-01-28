/**
 * The base client of all Xray clients. Contains the authorization handling.
 */
export class BaseClient {
  /**
   * The base URL of the Xray instance.
   */
  private readonly url: string;
  /**
   * The value of the authorization header to use in HTTP requests.
   */
  private readonly authorizationValue: Promise<string>;

  /**
   * Constructs a new client based on the provided configuration.
   *
   * @param config the configuration
   */
  constructor(config: ClientConfiguration) {
    this.url = config.url;
    if ("token" in config.credentials) {
      this.authorizationValue = Promise.resolve(`Bearer ${config.credentials.token}`);
    } else if ("username" in config.credentials) {
      this.authorizationValue = Promise.resolve(
        Buffer.from(`${config.credentials.username}:${config.credentials.password}`).toString(
          "base64"
        )
      );
    } else {
      this.authorizationValue = fetch(`${this.url}/authenticate`, {
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
        .then((json) => {
          return `Bearer ${json}`;
        });
    }
  }

  /**
   * Sends an HTTP request to the Xray instance and optionally verifies the response status.
   *
   * @param path the path to append to the base URL of the Xray instance
   * @param config the request configuration
   * @param expectedStatus the expected HTTP response status
   * @returns the response
   */
  public async send(path: string, config: RequestInit, expectedStatus?: number): Promise<Response> {
    const url = `${this.url}/${path.startsWith("/") ? path.slice(1) : path}`;
    const request = {
      ...config,
      headers: {
        ["Authorization"]: await this.authorizationValue,
        ...config.headers,
      },
    };
    const response = await fetch(url, request);
    if (expectedStatus && response.status !== expectedStatus) {
      throw new Error(
        `Unexpected response status ${response.status.toString()}: ${await response.text()}`
      );
    }
    return response;
  }
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

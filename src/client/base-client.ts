/**
 * The base client of all Xray clients. Contains the authorization handling.
 */
export class BaseClient {
  /**
   * The base URL of the Xray instance.
   */
  protected url: string;
  /**
   * The value of the authorization header to use in HTTP requests.
   */
  protected authorizationValue: Promise<string>;

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
      this.authorizationValue = fetch(`${this.url}/api/v2/authenticate`, {
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
interface ClientConfiguration {
  /**
   * The credentials to use to authenticate.
   */
  credentials: XrayCredentials;
  /**
   * The base URL of the Xray instance.
   */
  url: string;
}

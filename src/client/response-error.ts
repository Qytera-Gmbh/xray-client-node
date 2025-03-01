import type { RequestInit, Response } from "undici";

/**
 * Represents an error that occurs when an HTTP response does not meet the expected status.
 *
 * @template ResponseBodyType the expected JSON response type
 */
export class ResponseError<ResponseBodyType = unknown> extends Error {
  private readonly expectedStatus: number;
  private readonly requestConfig: Readonly<RequestConfig>;
  private readonly responseConfig: Readonly<ResponseConfig<ResponseBodyType>>;

  /**
   * Constructs a new response error.
   *
   * @param args the error parameters
   */
  constructor(args: {
    /**
     * The expected status code.
     */
    expectedStatus: number;
    /**
     * The HTTP request configuration, including URL and options.
     */
    request: RequestConfig;
    /**
     * The HTTP response including headers, status and body as text.
     */
    response: Omit<ResponseConfig<ResponseBodyType>, "json">;
  }) {
    super(`unexpected response status ${args.response.status.toString()}: ${args.response.text}`);
    this.requestConfig = args.request;
    this.responseConfig = {
      headers: args.response.headers,
      get json() {
        return JSON.parse(args.response.text) as ResponseBodyType;
      },
      status: args.response.status,
      text: args.response.text,
    };
    this.expectedStatus = args.expectedStatus;
  }

  /**
   * The HTTP request configuration that led to this error.
   */
  public get request(): Readonly<RequestConfig> {
    return this.requestConfig;
  }

  /**
   * The HTTP response details, including headers, status, text, and parsed JSON.
   */
  public get response(): Readonly<ResponseConfig<ResponseBodyType>> {
    return this.responseConfig;
  }

  /**
   * The actual and expected HTTP status codes.
   */
  public get status(): Readonly<{
    /**
     * The HTTP status code of the response.
     */
    actual: number;
    /**
     * The HTTP status code that was expected.
     */
    expected: number;
  }> {
    return {
      actual: this.responseConfig.status,
      expected: this.expectedStatus,
    };
  }
}

/**
 * Models an HTTP request.
 */
interface RequestConfig {
  /**
   * The body of the request.
   */
  body?: RequestInit["body"];
  /**
   * The headers of the request.
   */
  headers?: RequestInit["headers"];
  /**
   * The HTTP method of the request.
   */
  method: string;
  /**
   * The URL of the request.
   */
  url: string;
}

/**
 * Models an HTTP response.
 */
interface ResponseConfig<ResponseBodyType = unknown> {
  /**
   * The headers of the response.
   */
  headers: Response["headers"];
  /**
   * The JSON body of the response.
   */
  json: ResponseBodyType;
  /**
   * The HTTP status code of the response.
   */
  status: number;
  /**
   * The response body as plain text.
   */
  text: string;
}

/**
 * Checks whether an error is an instance of {@link ResponseError}. Can be typed to provide
 * arbitrarily typed JSON bodies.
 *
 * Please note that the provided type parameters are not verified at runtime, they are for code
 * completion and TypeScript only.
 *
 * ```ts
 * type ErrorResponseBody = { failures: string[]; };
 *
 * if (isResponseError<ErrorResponseBody>(error)) {
 *   console.log(error.response.json.failures);
 * }
 * ```
 *
 * The additional status parameter can be used to quickly distinguish between different possible
 * errors based on the actual HTTP status code of the response:
 *
 * ```ts
 * type BodyBadRequest = { failures: string[]; };
 * type BodyForbidden = { missingPermission: string; };
 *
 * if (isResponseError<BodyBadRequest>(error, 400)) {
 *   console.log(error.response.json.failures);
 * } else if (isResponseError<BodyForbidden>(error, 403)) {
 *   console.log(error.response.json.missingPermission);
 * }
 * ```
 *
 * @param error the error to check
 * @param status an additional status to use for response differentiation
 * @returns `true` if the error is a response error, otherwise `false`
 *
 * @template T the expected JSON response body type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isResponseError<T = any>(
  error: unknown,
  status?: number
): error is ResponseError<T> {
  if (status) {
    return error instanceof ResponseError && error.status.actual === status;
  }
  return error instanceof ResponseError;
}

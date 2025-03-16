import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { isResponseError, ResponseError } from "./response-error.js";

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("the response error class", () => {
    it("parses json", () => {
      const error = new ResponseError({
        expectedStatus: 201,
        request: { method: "GET", url: "https://example.org" },
        response: {
          headers: new Headers(),
          status: 404,
          text: '{"message": "the requested resource does not exist"}',
        },
      });
      assert.deepStrictEqual(error.response.json, {
        message: "the requested resource does not exist",
      });
    });

    it("throws when parsing non-json data", () => {
      const error = new ResponseError({
        expectedStatus: 201,
        request: { method: "GET", url: "https://example.org" },
        response: {
          headers: new Headers(),
          status: 404,
          text: "<div>404 Not Found</div>",
        },
      });
      assert.throws(() => error.response.json, {
        message: "Unexpected token '<', \"<div>404 N\"... is not valid JSON",
        name: "SyntaxError",
      });
    });
  });

  describe("the response error type guard", () => {
    it("returns true for response errors", () => {
      const error = new ResponseError({
        expectedStatus: 201,
        request: { method: "GET", url: "https://example.org" },
        response: {
          headers: new Headers(),
          status: 404,
          text: '{"message": "the requested resource does not exist"}',
        },
      });
      assert.strictEqual(isResponseError(error), true);
    });

    it("returns false for normal errors", () => {
      const error = new Error("the requested resource does not exist");
      assert.strictEqual(isResponseError(error), false);
    });

    it("compares response codes to the provided status parameter", () => {
      const error = new ResponseError({
        expectedStatus: 201,
        request: { method: "GET", url: "https://example.org" },
        response: {
          headers: new Headers(),
          status: 404,
          text: "<div>404 Not Found</div>",
        },
      });
      assert.strictEqual(isResponseError(error, 500), false);
      assert.strictEqual(isResponseError(error, 404), true);
    });
  });
});

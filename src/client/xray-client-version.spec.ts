import assert from "node:assert";
import path from "node:path";
import { describe, it } from "node:test";
import { versioned } from "./xray-client-version.js";

class DummyClass {
  private readonly versionNumber: number;
  public readonly v42 = 0; // for conflict creation

  constructor(versionNumber: number) {
    this.versionNumber = versionNumber;
  }

  public getVersionNumber() {
    return this.versionNumber;
  }
}

describe(path.relative(process.cwd(), import.meta.filename), () => {
  describe("the versioning function", () => {
    it("falls back to the base instance", () => {
      const versionedDummies = versioned(new DummyClass(10), {
        v20: new DummyClass(20),
      });
      assert.strictEqual(versionedDummies.getVersionNumber(), 10);
    });

    it("uses the versioned instance", () => {
      const versionedDummies = versioned(new DummyClass(10), {
        v20: new DummyClass(20),
      });
      assert.strictEqual(versionedDummies.v20.getVersionNumber(), 20);
    });

    it("overwrites member properties with versioned identifiers", () => {
      const versionedDummies = versioned(new DummyClass(10), {
        v42: new DummyClass(42),
      });
      assert.strictEqual(versionedDummies.v42.getVersionNumber(), 42);
    });

    it("lists the versions as object keys", () => {
      const versionedDummies = versioned(new DummyClass(1), {
        v2: new DummyClass(2),
      });
      assert.deepStrictEqual(Object.keys(versionedDummies), ["v2", "v42", "versionNumber"]);
    });
  });
});

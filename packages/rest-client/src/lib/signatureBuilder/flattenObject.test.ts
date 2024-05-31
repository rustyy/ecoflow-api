import { describe, expect, test } from "@jest/globals";
import { flattenObject } from "./flattenObject";

describe("flattenObjects", () => {
  test("empty object to be empty object", () => {
    const result = flattenObject({});
    expect(result).toEqual({});
  });

  test("flattens arrays", () => {
    const result = flattenObject([1, 2, { a: "b" }, null]);
    expect(result).toEqual({
      "[0]": 1,
      "[1]": 2,
      "[2].a": "b",
      "[3]": null,
    });
  });

  test("flattens array property value", () => {
    const result = flattenObject({
      a: [0, 1, { a: "b", b: [1, 2] }],
    });

    expect(result).toEqual({
      "a[0]": 0,
      "a[1]": 1,
      "a[2].a": "b",
      "a[2].b[0]": 1,
      "a[2].b[1]": 2,
    });
  });
});

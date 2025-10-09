import { describe, expect, test } from "@jest/globals";
import { SignatureBuilder } from "./SignatureBuilder";

describe("SignatureBuilder", () => {
  describe("buildDataString", () => {
    test("handle simple data", () => {
      const builder = new SignatureBuilder("accessKey", "secret");
      const msg = {
        val1: "bar",
        val2: null,
        1: 1,
        a: "b",
        0: 0,
      };

      expect(builder.buildDataString(msg)).toBe(
        "0=0&1=1&a=b&val1=bar&val2=null",
      );
    });

    test("Sorts key/values", () => {
      const builder = new SignatureBuilder("accessKey", "secret");

      // from: https://developer-eu.ecoflow.com/us/document/generalInfo
      const msg = {
        // General Parameter, expand to: name=demo1
        name: "demo1",
        // Array, expand to: ids[0]=1&ids[1]=2&ids[2]=3
        ids: [1, 2, 3],
        // Object, expand to: deviceInfo.id=1
        deviceInfo: {
          id: 1,
        },
        // Object Array, expand to: deviceList[0].id=1&deviceList[1].id=2
        deviceList: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      };

      expect(builder.buildDataString(msg)).toEqual(
        "deviceInfo.id=1&deviceList[0].id=1&deviceList[1].id=2&ids[0]=1&ids[1]=2&ids[2]=3&name=demo1",
      );
    });

    test("empty message results in empty string", () => {
      const builder = new SignatureBuilder("accessKey", "secret");
      const msg = {};
      expect(builder.buildDataString(msg)).toEqual("");
    });
  });
});

import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { DeltaPro3 } from "./DeltaPro3";

describe("Delta Pro 3", () => {
  let device: DeltaPro3;
  let restClient: RestClient;
  const validSn = "MR51*****";
  const defaultSetCommandParams = {
    sn: validSn,
    cmdFunc: 254,
    dest: 2,
    dirDest: 1,
    needAck: true,
    dirSrc: 1,
    cmdId: 17,
  };

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    device = new DeltaPro3(restClient, validSn);
    restClient.setCommandPlain = jest.fn<RestClient["setCommandPlain"]>();
  });

  it.each([
    [
      false,
      {
        ...defaultSetCommandParams,
        params: {
          cfgBeepEn: false,
        },
      },
    ],
    [
      true,
      {
        ...defaultSetCommandParams,
        params: {
          cfgBeepEn: true,
        },
      },
    ],
  ])(
    "sends the expected payload to enable and disable beep switch",
    async (enabled, expectedPayload) => {
      await device.enableBeep(enabled);

      expect(restClient.setCommandPlain).toBeCalledWith(expectedPayload);
    },
  );

  describe.each([
    ["setAcTimeout" as const, "cfgAcStandbyTime", [0, 2, 20], [-1, 1.1, "a"]],
    ["setDcTimeout" as const, "cfgDcStandbyTime", [0, 2, 20], [-1, 1.1, "a"]],
    [
      "setScreenTimeout" as const,
      "cfgScreenOffTime",
      [0, 2, 20],
      [-1, 1.1, "a"],
    ],
    [
      "setDeviceTimeout" as const,
      "cfgDevStandbyTime",
      [0, 2, 20],
      [-1, 1.1, "a"],
    ],
    ["setScreenBrightness" as const, "cfgLcdLight", [0, 2, 20], [-1, 1.1, "a"]],
    [
      "enableHighVoltageAcOutput" as const,
      "cfgHvAcOutOpen",
      [true, false],
      [-1, 0, "a"],
    ],
    [
      "enableLowVoltageAcOutput" as const,
      "cfgLvAcOutOpen",
      [true, false],
      [-1, 0, "a"],
    ],
    [
      "setAcFrequency" as const,
      "cfgAcOutFreq",
      [50, 60],
      [-1, 0, 90, 1.1, "a"],
    ],
    [
      "enable12VOut" as const,
      "cfgDc12vOutOpen",
      [true, false],
      [-1, 0, 90, 1.1, "a"],
    ],
    [
      "enableXboost" as const,
      "cfgXboostEn",
      [true, false],
      [-1, 0, 90, 1.1, "a"],
    ],
  ])("%s", (fn, expectedParam, validValues, inValidValues) => {
    it("sends expected payload", async () => {
      await Promise.all(
        validValues.map(async (val, index) => {
          // @ts-expect-error
          await device[fn](val);
          expect(restClient.setCommandPlain).toHaveBeenNthCalledWith(++index, {
            ...defaultSetCommandParams,
            params: {
              [expectedParam]: val,
            },
          });
        }),
      );
    });

    it("error is thrown for invalid values", async () => {
      await Promise.all(
        inValidValues.map(async (val) => {
          // @ts-expect-error
          await expect(device[fn](val)).rejects.toThrowError();
        }),
      );
    });
  });
});

import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { DeltaPro3 } from "./DeltaPro3";
import { getPropertiesFailsOnInvalidResponse } from "../../__fixtures__/shared";

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

  it("Should be able to construct an instance of Delta Pro 3", () => {
    expect(device).toBeTruthy();
    expect(device).toBeInstanceOf(DeltaPro3);
  });

  it("should throw an error if the serial number is invalid", () => {
    expect(() => {
      new DeltaPro3(restClient, "invalid_sn" as any);
    }).toThrowError("Invalid serial number for Delta Pro 3 device.");
  });

  it("Should throw an error for invalid data received from api", async () => {
    await getPropertiesFailsOnInvalidResponse(restClient, device);
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
    "sends the correct payload to enable and disable beep switch",
    async (enabled, expectedPayload) => {
      await device.enableBeep(enabled);

      expect(restClient.setCommandPlain).toBeCalledWith(expectedPayload);
    },
  );

  describe("setAcTimeout", () => {
    it("sends correct payload for AC timeout", async () => {
      await device.setAcTimeout(120);
      await device.setAcTimeout(0);
      expect(restClient.setCommandPlain).toHaveBeenNthCalledWith(1, {
        ...defaultSetCommandParams,
        params: {
          cfgAcStandbyTime: 120,
        },
      });

      expect(restClient.setCommandPlain).toHaveBeenNthCalledWith(2, {
        ...defaultSetCommandParams,
        params: {
          cfgAcStandbyTime: 0,
        },
      });
    });

    it("error is thrown for invalid values", async () => {
      await expect(device.setAcTimeout(1.1)).rejects.toThrowError();
      await expect(device.setAcTimeout(-1)).rejects.toThrowError();
    });
  });

  describe("setDcTimeout", () => {
    it("sends correct payload for DC timeout", async () => {
      await device.setDcTimeout(120);
      await device.setDcTimeout(0);
      expect(restClient.setCommandPlain).toHaveBeenNthCalledWith(1, {
        ...defaultSetCommandParams,
        params: {
          cfgDcStandbyTime: 120,
        },
      });

      expect(restClient.setCommandPlain).toHaveBeenNthCalledWith(2, {
        ...defaultSetCommandParams,
        params: {
          cfgDcStandbyTime: 0,
        },
      });
    });

    it("error is thrown for invalid values", async () => {
      await expect(device.setAcTimeout(1.1)).rejects.toThrowError();
      await expect(device.setAcTimeout(-1)).rejects.toThrowError();
    });
  });
});

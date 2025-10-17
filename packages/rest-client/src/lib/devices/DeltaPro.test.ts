import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { DeltaPro } from "./DeltaPro";
import { propertiesFixture } from "../../__fixtures__/deltaProProperties";
import { getPropertiesFailsOnInvalidResponse } from "../../__fixtures__/shared";

describe("Delta Pro", () => {
  let device: DeltaPro;
  let restClient: RestClient;
  const validSn = "DCABZ*****";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    device = new DeltaPro(restClient, validSn);

    restClient.setCommandPlain = jest.fn<RestClient["setCommandPlain"]>();
    restClient.getDevicePropertiesPlain = jest
      .fn<RestClient["getDevicePropertiesPlain"]>()
      .mockResolvedValue(propertiesFixture);
  });

  it("Should be able to construct an instance of Delta Pro", () => {
    expect(device).toBeTruthy();
    expect(device).toBeInstanceOf(DeltaPro);
  });

  it("should throw an error if the serial number is invalid", () => {
    expect(() => {
      new DeltaPro(restClient, "invalid_sn" as any);
    }).toThrowError("Invalid serial number for Delta Pro device.");
  });

  it("Should throw an error for invalid data received from api", async () => {
    await getPropertiesFailsOnInvalidResponse(restClient, device);
  });

  it("Should return data if api response could be parsed", async () => {
    await expect(device.getProperties()).resolves.toBeDefined();
  });

  it("returns the requested property", async () => {
    await expect(device.getProperty("bmsMaster.soc")).resolves.toBe(
      propertiesFixture.data["bmsMaster.soc"],
    );
  });

  it("returns undefined for non existing property", async () => {
    await expect(device.getProperty("foobar")).resolves.toBeUndefined();
  });

  it("should enable xboost", async () => {
    const enabled = 1;
    const xboost = 1;
    await device.enableXboost(enabled, xboost);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 66,
        enabled,
        xboost,
      },
    });
  });

  it("should enable the car charger", async () => {
    const enabled = 1;
    await device.enableCharger(enabled);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 81,
        enabled,
      },
    });
  });

  it("should set the charge level", async () => {
    const level = 100;
    await device.setChargeLevel(level);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 49,
        maxChgSoc: level,
      },
    });
  });

  it("should set the discharge level", async () => {
    const level = 100;
    await device.setDischargeLevel(level);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 51,
        minDsgSoc: level,
      },
    });
  });

  it("should set car input current", async () => {
    const current = 100;
    await device.setCarInput(current);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 71,
        currMa: current,
      },
    });
  });

  it("should enable/disable beep", async () => {
    const enabled = 1;
    await device.enableBeep(enabled);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 38,
        enabled,
      },
    });

    const disabled = 0;
    await device.enableBeep(disabled);
    expect(restClient.setCommandPlain).toHaveBeenLastCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 38,
        enabled: disabled,
      },
    });
  });

  it("should set screen brightness", async () => {
    const lcdBrightness = 100;
    await device.setScreenBrightness(lcdBrightness);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 39,
        lcdBrightness,
      },
    });
  });

  it("should set smart generator auto on threshold", async () => {
    const threshold = 100;
    await device.setSmartGeneratorAutoOnThreshold(threshold);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 52,
        openOilSoc: threshold,
      },
    });
  });

  it("should set smart generator auto off threshold", async () => {
    const threshold = 100;
    await device.setSmartGeneratorAutoOffThreshold(threshold);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 53,
        closeOilSoc: threshold,
      },
    });
  });

  it("should set unit timeout", async () => {
    const timeout = 100;
    await device.setUnitTimeout(timeout);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 33,
        standByMode: timeout,
      },
    });
  });

  it("should set screen timeout", async () => {
    const timeout = 100;
    await device.setScreenTimeout(timeout);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 39,
        lcdTime: timeout,
      },
    });
  });

  it("should set AC standby time", async () => {
    const timeout = 100;
    await device.setAcStandbyTime(timeout);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 153,
        standByMins: timeout,
      },
    });
  });

  it("should set AC charging power", async () => {
    const power = 100;
    await device.setAcChargingPower(power);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 69,
        slowChgPower: power,
      },
    });
  });

  it("should set pv charging type", async () => {
    const type = 1;
    await device.setPvChargingType(type);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 82,
        chgType: type,
      },
    });
  });

  it("should set ac autostart bypass", async () => {
    const enabled = 1;
    await device.enableAcAutoStartBypass(enabled);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 84,
        enabled,
      },
    });
  });
});

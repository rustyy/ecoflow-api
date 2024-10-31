import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { propertiesFixture } from "../../__fixtures__/delta2Properties";
import { Delta2 } from "./Delta2";

describe("Delta2", () => {
  let delta2: Delta2;
  let restClient: RestClient;
  const validSn = "R331xxxx";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    delta2 = new Delta2(restClient, validSn);

    // @ts-ignore
    restClient.setCommandPlain = jest.fn();
  });

  it("Should be able to construct an instance of Delta2", () => {
    expect(delta2).toBeTruthy();
    expect(delta2).toBeInstanceOf(Delta2);
  });

  it("should throw an error if the serial number is invalid", () => {
    expect(() => {
      new Delta2(restClient, "invalid_sn" as any);
    }).toThrowError("Invalid serial number for Delta2 device.");
  });

  it("Should return data if api response could be parsed", async () => {
    // @ts-ignore
    restClient.getDevicePropertiesPlain = jest
      .fn()
      // @ts-ignore
      .mockResolvedValue(propertiesFixture);

    await expect(delta2.getProperties()).resolves.toBeDefined();
  });

  it("Should throw an error for invalid data received from api", async () => {
    const data = {
      sn: "fake_smart_plug_sn",
      success: true,
      code: 0,
      message: "Test message",
      time: new Date().getTime(),
    };

    // @ts-ignore
    restClient.getDeviceProperties = jest.fn().mockResolvedValue(data);
    await expect(delta2.getProperties()).rejects.toThrowError();
  });

  it("Should be able to set Silent Mode", async () => {
    expect.assertions(1);
    await delta2.setSilentMode(1);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 5,
      operateType: "quietMode",
      params: {
        enabled: 1,
      },
      sn: validSn,
    });
  });

  it("Should be able to set Car Charger", async () => {
    expect.assertions(1);
    await delta2.setCarCharger(1);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 5,
      operateType: "mpptCar",
      params: {
        enabled: 1,
      },
      sn: validSn,
    });
  });

  it("Should set AC standby time", async () => {
    expect.assertions(1);
    await delta2.setAcStandByTime(1);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 5,
      operateType: "standbyTime",
      params: {
        standbyMins: 1,
      },
      sn: validSn,
    });
  });

  it("Should set car input", async () => {
    expect.assertions(1);
    await delta2.setCarInput(5000);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 5,
      operateType: "dcChgCfg",
      params: {
        dcChgCfg: 5000,
      },
      sn: validSn,
    });
  });

  it("Should should throw for invalid car input values", async () => {
    expect.assertions(2);
    await expect(delta2.setCarInput(3999)).rejects.toThrowError();
    await expect(delta2.setCarInput(10001)).rejects.toThrowError();
  });

  it("should set device timeout", async () => {
    expect.assertions(1);
    await delta2.setDeviceTimeout(120);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "standbyTime",
      params: {
        standbyMin: 120,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid device timeout values", async () => {
    expect.assertions(1);
    await expect(delta2.setDeviceTimeout(-1)).rejects.toThrowError();
  });

  it("should enable USB switch", async () => {
    expect.assertions(1);
    await delta2.enableUsbOutput(1);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "dcOutCfg",
      params: {
        enabled: 1,
      },
      sn: validSn,
    });
  });

  it("should disable USB switch", async () => {
    expect.assertions(1);
    await delta2.enableUsbOutput(0);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "dcOutCfg",
      params: {
        enabled: 0,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid USB switch values", async () => {
    expect.assertions(2);
    await expect(delta2.enableUsbOutput(2 as any)).rejects.toThrowError();
    await expect(delta2.enableUsbOutput(-1 as any)).rejects.toThrowError();
  });

  it("should set LCD timeout", async () => {
    expect.assertions(1);
    await delta2.setLcdTimeout(60);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "lcdCfg",
      params: {
        delayOff: 60,
        brightLevel: 3,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid LCD timeout values", async () => {
    expect.assertions(2);
    await expect(delta2.setLcdTimeout(-1)).rejects.toThrowError();
    await expect(
      delta2.setLcdTimeout("a-string" as any),
    ).rejects.toThrowError();
  });

  it("should enable pv charging priority", async () => {
    expect.assertions(2);
    await delta2.enablePvChargingPriority(1);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "pvChangePrio",
      params: {
        pvChangeSet: 1,
      },
      sn: validSn,
    });

    await delta2.enablePvChargingPriority(0);

    expect(restClient.setCommandPlain).toHaveBeenLastCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "pvChangePrio",
      params: {
        pvChangeSet: 0,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid pv charging priority values", async () => {
    expect.assertions(2);
    await expect(
      delta2.enablePvChargingPriority(2 as any),
    ).rejects.toThrowError();
    await expect(
      delta2.enablePvChargingPriority(-1 as any),
    ).rejects.toThrowError();
  });

  it("should set AC auto out configuration", async () => {
    expect.assertions(1);
    await delta2.setAcAutoOutConfig(1, 20);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "acAutoOutConfig",
      params: {
        acAutoOutConfig: 1,
        minAcOutSoc: 20,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid AC auto out configuration values", async () => {
    expect.assertions(4);
    await expect(
      delta2.setAcAutoOutConfig(-1 as any, 20),
    ).rejects.toThrowError();
    await expect(
      delta2.setAcAutoOutConfig(2 as any, 20),
    ).rejects.toThrowError();
    await expect(delta2.setAcAutoOutConfig(1, -1)).rejects.toThrowError();
    await expect(delta2.setAcAutoOutConfig(1, 101)).rejects.toThrowError();
  });

  it("should set car standby duration", async () => {
    expect.assertions(1);
    await delta2.setCarStandByDuration(120);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 5,
      operateType: "carStandby",
      params: {
        standbyMins: 120,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid car standby duration values", async () => {
    expect.assertions(1);
    await expect(delta2.setCarStandByDuration(-1)).rejects.toThrowError();
  });

  it("should set energy management configuration", async () => {
    expect.assertions(1);
    await delta2.setEnergyManagement({
      isConfig: 1,
      bpPowerSoc: 95,
      minDsgSoc: 255,
      minChgSoc: 255,
    });

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "watthConfig",
      params: {
        isConfig: 1,
        bpPowerSoc: 95,
        minDsgSoc: 255,
        minChgSoc: 255,
      },
      sn: validSn,
    });
  });
});

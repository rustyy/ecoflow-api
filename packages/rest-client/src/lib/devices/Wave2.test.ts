import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { Wave2 } from "./Wave2";

describe("Wave2", () => {
  let device: Wave2;
  let restClient: RestClient;
  const validSn = "KT21*****";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    device = new Wave2(restClient, validSn);

    // @ts-ignore
    restClient.setCommandPlain = jest.fn();
  });

  it("Should be able to construct an instance of Wave2", () => {
    expect(device).toBeTruthy();
    expect(device).toBeInstanceOf(Wave2);
  });

  it("should throw an error if the serial number is invalid", () => {
    expect(() => {
      new Wave2(restClient, "invalid_sn" as any);
    }).toThrowError("Invalid serial number for Wave2 device.");
  });

  it("Should throw an error for invalid data received from api", async () => {
    const data = {
      sn: "fake_sn",
      success: true,
      code: 0,
      message: "Test message",
      time: new Date().getTime(),
    };

    // @ts-ignore
    restClient.getDeviceProperties = jest.fn().mockResolvedValue(data);
    await expect(device.getProperties()).rejects.toThrowError();
  });

  it("should set main mode", async () => {
    expect.assertions(3);
    await device.setMainMode("cooling");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "mainMode",
      params: {
        mainMode: 0,
      },
      sn: validSn,
    });

    await device.setMainMode("heating");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "mainMode",
      params: {
        mainMode: 1,
      },
      sn: validSn,
    });

    await device.setMainMode("fan");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "mainMode",
      params: {
        mainMode: 2,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid main mode values", async () => {
    expect.assertions(1);
    await expect(device.setMainMode("invalid" as any)).rejects.toThrowError();
  });

  it("should set sub mode", async () => {
    expect.assertions(4);
    await device.setSubMode("max");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "subMode",
      params: {
        subMode: 0,
      },
      sn: validSn,
    });

    await device.setSubMode("sleep");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "subMode",
      params: {
        subMode: 1,
      },
      sn: validSn,
    });

    await device.setSubMode("eco");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "subMode",
      params: {
        subMode: 2,
      },
      sn: validSn,
    });

    await device.setSubMode("manual");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "subMode",
      params: {
        subMode: 3,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid sub mode values", async () => {
    expect.assertions(1);
    await expect(device.setSubMode("invalid" as any)).rejects.toThrowError();
  });

  it("should set temperature unit", async () => {
    expect.assertions(2);
    await device.setTemperatureUnit("C");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "tempSys",
      params: {
        mode: 0,
      },
      sn: validSn,
    });

    await device.setTemperatureUnit("F");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "tempSys",
      params: {
        mode: 1,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid temperature unit values", async () => {
    expect.assertions(1);
    await expect(
      device.setTemperatureUnit("invalid" as any),
    ).rejects.toThrowError();
  });
});

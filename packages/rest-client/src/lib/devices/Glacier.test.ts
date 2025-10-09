import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { Glacier } from "./Glacier";
import { glacierProperties } from "../../__fixtures__/glacierProperties";

describe("Glacier", () => {
  let glacier: Glacier;
  let restClient: RestClient;
  const validSn = "BX11xxxx";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    glacier = new Glacier(restClient, validSn);

    // @ts-ignore
    restClient.setCommandPlain = jest.fn();
  });

  it("Should be able to construct an instance of Glacier", () => {
    expect(glacier).toBeTruthy();
    expect(glacier).toBeInstanceOf(Glacier);
  });

  it("should throw an error if the serial number is invalid", () => {
    expect(() => {
      new Glacier(restClient, "invalid_sn" as any);
    }).toThrowError("Invalid serial number for Glacier device.");
  });

  it("should set temperature for right, left and middle zones", async () => {
    expect.assertions(1);
    await glacier.setTemperature({
      right: 20,
      left: 20,
      middle: 20,
    });

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "temp",
      params: {
        tmpR: 20,
        tmpL: 20,
        tmpM: 20,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid temperature values", async () => {
    expect.assertions(6);
    await expect(
      glacier.setTemperature({
        right: -26,
        left: 10,
        middle: 10,
      }),
    ).rejects.toThrowError();

    await expect(
      glacier.setTemperature({
        right: 10,
        left: -26,
        middle: 10,
      }),
    ).rejects.toThrowError();
    await expect(
      glacier.setTemperature({
        right: 10,
        left: 10,
        middle: -26,
      }),
    ).rejects.toThrowError();

    await expect(
      glacier.setTemperature({
        right: 26,
        left: 10,
        middle: 10,
      }),
    ).rejects.toThrowError();

    await expect(
      glacier.setTemperature({
        right: 10,
        left: 26,
        middle: 10,
      }),
    ).rejects.toThrowError();

    await expect(
      glacier.setTemperature({
        right: 10,
        left: 10,
        middle: 26,
      }),
    ).rejects.toThrowError();
  });

  it("should set ECO mode", async () => {
    expect.assertions(2);
    await glacier.enableEcoMode(1);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "ecoMode",
      params: {
        mode: 1,
      },
      sn: validSn,
    });

    await glacier.enableEcoMode(0);

    expect(restClient.setCommandPlain).toHaveBeenLastCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "ecoMode",
      params: {
        mode: 0,
      },
      sn: validSn,
    });
  });

  it("Should throw an error for invalid data received from api", async () => {
    const data = {
      sn: "fake_smart_plug_sn",
      success: true,
      code: 0,
      message: "Test message",
      time: Date.now(),
    };

    // @ts-ignore
    restClient.getDeviceProperties = jest.fn().mockResolvedValue(data);
    await expect(glacier.getProperties()).rejects.toThrowError();
  });

  it("should enable/disable buzzer", () => {
    expect.assertions(2);
    glacier.enableBuzzer(1);
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "beepEn",
      params: {
        flag: 1,
      },
      sn: validSn,
    });

    glacier.enableBuzzer(0);
    expect(restClient.setCommandPlain).toHaveBeenLastCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "beepEn",
      params: {
        flag: 0,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid buzzer values", async () => {
    expect.assertions(2);
    await expect(glacier.enableBuzzer(-1 as any)).rejects.toThrowError();
    await expect(glacier.enableBuzzer(2 as any)).rejects.toThrowError();
  });

  it("should set buzzer beep", async () => {
    expect.assertions(4);
    await glacier.setBuzzerBeep(1);
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "beep",
      params: {
        flag: 1,
      },
      sn: validSn,
    });

    await glacier.setBuzzerBeep(2);
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "beep",
      params: {
        flag: 2,
      },
      sn: validSn,
    });

    await glacier.setBuzzerBeep(3);
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "beep",
      params: {
        flag: 3,
      },
      sn: validSn,
    });

    await glacier.setBuzzerBeep(0);
    expect(restClient.setCommandPlain).toHaveBeenLastCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "beep",
      params: {
        flag: 0,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid buzzer beep values", async () => {
    expect.assertions(2);
    await expect(glacier.setBuzzerBeep(-1 as any)).rejects.toThrowError();
    await expect(glacier.setBuzzerBeep(4 as any)).rejects.toThrowError();
  });

  it("should set screen timeout", async () => {
    expect.assertions(1);
    await glacier.setScreenTimeout(10);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "blTime",
      params: {
        time: 10,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid screen timeout values", async () => {
    expect.assertions(1);
    await expect(glacier.setScreenTimeout(-1)).rejects.toThrowError();
  });

  it("should set correct temperature unit", async () => {
    expect.assertions(2);
    await glacier.setTemperatureUnit("C");
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "tmpUnit",
      params: {
        unit: 0,
      },
      sn: validSn,
    });

    await glacier.setTemperatureUnit("F");
    expect(restClient.setCommandPlain).toHaveBeenLastCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "tmpUnit",
      params: {
        unit: 1,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid temperature unit values", async () => {
    expect.assertions(1);
    await expect(
      glacier.setTemperatureUnit("invalid" as any),
    ).rejects.toThrowError();
  });

  it("should set ice-making", async () => {
    expect.assertions(2);
    await glacier.setIceMaking(1, "small");

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "iceMake",
      params: {
        enable: 1,
        iceShape: 0,
      },
      sn: validSn,
    });

    await glacier.setIceMaking(1, "large");

    expect(restClient.setCommandPlain).toHaveBeenLastCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "iceMake",
      params: {
        enable: 1,
        iceShape: 1,
      },
      sn: validSn,
    });
  });

  it("should throw an error for invalid ice shape values", async () => {
    expect.assertions(1);
    await expect(
      glacier.setIceMaking(1, "invalid" as any),
    ).rejects.toThrowError();
  });

  it("should set ice detaching", async () => {
    const allowedValues = [0, 1, 4, 5];
    expect.assertions(allowedValues.length);

    for (const index in allowedValues) {
      await glacier.setIceDetaching(allowedValues[index] as any);

      expect(restClient.setCommandPlain).toHaveBeenNthCalledWith(+index + 1, {
        id: 123456789,
        version: "1.0",
        moduleType: 1,
        operateType: "deIce",
        params: {
          enable: allowedValues[index],
        },
        sn: validSn,
      });
    }
  });

  it("should throw an error for invalid ice detaching values", async () => {
    expect.assertions(1);
    await expect(glacier.setIceDetaching(2 as any)).rejects.toThrowError();
  });

  it("should set sensor detection blocking", async () => {
    expect.assertions(2);
    await glacier.setSensorDetectionBlocking(1);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "sensorAdv",
      params: {
        sensorAdv: 1,
      },
      sn: validSn,
    });

    await glacier.setSensorDetectionBlocking(0);

    expect(restClient.setCommandPlain).toHaveBeenLastCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "sensorAdv",
      params: {
        sensorAdv: 0,
      },
      sn: validSn,
    });
  });

  it("should set battery protection level", async () => {
    expect.assertions(3);
    await glacier.setBatteryProtectionLevel(0, 0);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "protectBat",
      params: {
        state: 0,
        level: 0,
      },
      sn: validSn,
    });

    await glacier.setBatteryProtectionLevel(1, 1);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "protectBat",
      params: {
        state: 1,
        level: 1,
      },
      sn: validSn,
    });

    await glacier.setBatteryProtectionLevel(1, 2);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      id: 123456789,
      version: "1.0",
      moduleType: 1,
      operateType: "protectBat",
      params: {
        state: 1,
        level: 2,
      },
      sn: validSn,
    });
  });

  it("Should throw an error for invalid data received from api", async () => {
    const data = {
      sn: "fake-sn",
      success: true,
      code: 0,
      message: "Test message",
      time: Date.now(),
    };

    // @ts-ignore
    restClient.getDeviceProperties = jest.fn().mockResolvedValue(data);
    await expect(glacier.getProperties()).rejects.toThrowError();
  });

  it("Should return data if api response could be parsed", async () => {
    // @ts-ignore
    restClient.getDevicePropertiesPlain = jest
      .fn()
      // @ts-ignore
      .mockResolvedValue(glacierProperties);

    await expect(glacier.getProperties()).resolves.toBeDefined();
  });
});

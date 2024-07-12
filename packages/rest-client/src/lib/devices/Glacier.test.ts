import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { Glacier } from "./Glacier";

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
    await glacier.setTemperature(20, 20, 20);

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
    await expect(glacier.setTemperature(-26, 10, 10)).rejects.toThrowError();
    await expect(glacier.setTemperature(10, -26, 10)).rejects.toThrowError();
    await expect(glacier.setTemperature(10, 10, -26)).rejects.toThrowError();

    await expect(glacier.setTemperature(26, 10, 10)).rejects.toThrowError();
    await expect(glacier.setTemperature(10, 26, 10)).rejects.toThrowError();
    await expect(glacier.setTemperature(10, 10, 26)).rejects.toThrowError();
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
      time: new Date().getTime(),
    };

    // @ts-ignore
    restClient.getDeviceProperties = jest.fn().mockResolvedValue(data);
    await expect(glacier.getProperties()).rejects.toThrowError();
  });
});

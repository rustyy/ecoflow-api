import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { DeltaPro } from "./DeltaPro";
import { propertiesFixture } from "../../__fixtures__/deltaProProperties";

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

    // @ts-ignore
    restClient.setCommandPlain = jest.fn();
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
    const data = {
      sn: "fake-sn",
      success: true,
      code: 0,
      message: "Test message",
      time: new Date().getTime(),
    };

    // @ts-ignore
    restClient.getDeviceProperties = jest.fn().mockResolvedValue(data);
    await expect(device.getProperties()).rejects.toThrowError();
  });

  it("Should return data if api response could be parsed", async () => {
    // @ts-ignore
    restClient.getDevicePropertiesPlain = jest
      .fn()
      // @ts-ignore
      .mockResolvedValue(propertiesFixture);

    await expect(device.getProperties()).resolves.toBeDefined();
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
    await device.setMaxChargeLevel(level);
    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      params: {
        cmdSet: 32,
        id: 49,
        maxChgSoc: level,
      },
    });
  });
});

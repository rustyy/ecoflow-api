import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { SmartHomePanel } from "./SmartHomePanel";
import { propertiesFixture } from "../../__fixtures__/shpProperties";

describe("SmartHomePanel", () => {
  let device: SmartHomePanel;
  let restClient: RestClient;
  const validSn = "SP10*****";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    device = new SmartHomePanel(restClient, validSn);

    // @ts-ignore
    restClient.setCommandPlain = jest.fn();
  });

  it("Should be able to construct an instance of SmartHomePanel", () => {
    expect(device).toBeTruthy();
    expect(device).toBeInstanceOf(SmartHomePanel);
  });

  it("should throw an error if the serial number is invalid", () => {
    expect(() => {
      new SmartHomePanel(restClient, "invalid_sn" as any);
    }).toThrowError("Invalid serial number for SmartHomePanel device.");
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
});

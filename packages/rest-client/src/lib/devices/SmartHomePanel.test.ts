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

  it("should update rtc time", async () => {
    const rtcTime = {
      sec: 0,
      min: 0,
      hour: 0,
      day: 0,
      week: 0,
      month: 0,
      year: 0,
    };

    await device.setRtcTime(rtcTime);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 3,
        ...rtcTime,
      },
    });
  });

  it("should set load channel control", async () => {
    const loadChannelControl = {
      ch: 1,
      ctrlMode: 1,
      sta: 1,
    };

    await device.setLoadChannelControl(loadChannelControl);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 16,
        ...loadChannelControl,
      },
    });
  });

  it("should set standby channel control", async () => {
    const data = {
      ch: 1,
      ctrlMode: 1,
      sta: 1,
    };

    await device.setStandbyChannelControl(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 17,
        ...data,
      },
    });
  });
});

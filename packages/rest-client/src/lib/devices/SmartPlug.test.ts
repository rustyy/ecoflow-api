import { SmartPlug } from "./SmartPlug";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { devicePropertiesResponse } from "../../__fixtures__/smartPlugProperties";
import { getPropertiesFailsOnInvalidResponse } from "../../__fixtures__/shared";

describe("SmartPlug", () => {
  let smartPlug: SmartPlug;
  let restClient: RestClient;
  const validSn = "HW5212345678";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    smartPlug = new SmartPlug(restClient, validSn);

    restClient.setCommandPlain = jest.fn<RestClient["setCommandPlain"]>();
    restClient.getDevicePropertiesPlain = jest
      .fn<RestClient["getDevicePropertiesPlain"]>()
      .mockResolvedValue(devicePropertiesResponse);
  });

  it("Should be able to construct an instance of SmartPlug", () => {
    expect(smartPlug).toBeTruthy();
    expect(smartPlug).toBeInstanceOf(SmartPlug);
  });

  it("should throw an error if the serial number is invalid", () => {
    expect(() => {
      new SmartPlug(restClient, "invalid_sn" as any);
    }).toThrowError("Invalid serial number for smart plug device.");
  });

  it("Should be able to turn the smart plug on", async () => {
    expect.assertions(1);

    await smartPlug.switchOn();

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE",
      params: {
        plugSwitch: 1,
      },
      sn: validSn,
    });
  });
  //
  it("Should be able to turn the smart plug off", async () => {
    expect.assertions(1);
    await smartPlug.switchOff();

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE",
      params: {
        plugSwitch: 0,
      },
      sn: validSn,
    });
  });

  it("Should be able to delete Task", async () => {
    expect.assertions(1);
    await smartPlug.deleteTask(42);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SOCKET_DELETE_TIME_TASK",
      params: {
        taskIndex: 42,
      },
      sn: validSn,
    });
  });

  it("Should throw an error for invalid data received from api", async () => {
    await getPropertiesFailsOnInvalidResponse(restClient, smartPlug);
  });

  it("Should return data if api response could be parsed", async () => {
    await expect(smartPlug.getProperties()).resolves.toBeDefined();
  });

  it("returns the requested property", async () => {
    await expect(smartPlug.getProperty("2_1.temp")).resolves.toBe(
      devicePropertiesResponse.data["2_1.temp"],
    );
  });

  it("returns undefined for non existing property", async () => {
    await expect(smartPlug.getProperty("foobar")).resolves.toBeUndefined();
  });

  it("should set led brightness", async () => {
    expect.assertions(1);
    const brightness = 42;
    await smartPlug.setLedBrightness(brightness);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SOCKET_SET_BRIGHTNESS_PACK",
      params: {
        brightness,
      },
      sn: validSn,
    });
  });

  it("should throw for an invalid brightness value", async () => {
    expect.assertions(2);
    await expect(smartPlug.setLedBrightness(5000)).rejects.toThrowError();
    await expect(smartPlug.setLedBrightness(-1)).rejects.toThrowError();
  });
});

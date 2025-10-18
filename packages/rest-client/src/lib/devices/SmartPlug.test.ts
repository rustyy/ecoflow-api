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

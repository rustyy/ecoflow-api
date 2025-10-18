import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { PowerStream } from "./PowerStream";
import { propertiesFixture } from "../../__fixtures__/powerStreamProperties";

describe("PowerStream", () => {
  let powerStream: PowerStream;
  let restClient: RestClient;
  const validSn = "HW5112345678";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    powerStream = new PowerStream(restClient, validSn);

    restClient.setCommandPlain = jest.fn<RestClient["setCommandPlain"]>();
    restClient.getDevicePropertiesPlain = jest
      .fn<RestClient["getDevicePropertiesPlain"]>()
      .mockResolvedValue(propertiesFixture);
  });

  it("should set power supply priority", async () => {
    expect.assertions(1);
    const priority = "powerSupply";
    await powerStream.setPowerSupplyPriority(priority);
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SET_SUPPLY_PRIORITY_PACK",
      params: {
        supplyPriority: 0,
      },
      sn: validSn,
    });
  });

  it("should set battery priority", async () => {
    expect.assertions(1);
    const priority = "battery";
    await powerStream.setPowerSupplyPriority(priority);
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SET_SUPPLY_PRIORITY_PACK",
      params: {
        supplyPriority: 1,
      },
      sn: validSn,
    });
  });

  it("should throw an error for an invalid priority", async () => {
    expect.assertions(1);
    const priority = "some-invalid-value" as any;
    await expect(
      powerStream.setPowerSupplyPriority(priority),
    ).rejects.toThrowError();
  });

  it("should set custom load power", async () => {
    expect.assertions(1);
    const permanentWatts = 42;
    await powerStream.setCustomLoadPower(permanentWatts);
    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SET_PERMANENT_WATTS_PACK",
      params: {
        permanentWatts,
      },
      sn: validSn,
    });
  });

  it("should throw an error for an invalid custom load power value", async () => {
    expect.assertions(1);
    await expect(powerStream.setCustomLoadPower(-1)).rejects.toThrowError();
  });

  it("should set lower battery charging level", async () => {
    expect.assertions(1);
    const lowerLimit = 30;
    await powerStream.setLowerChargingLevel(lowerLimit);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SET_BAT_LOWER_PACK",
      params: {
        lowerLimit,
      },
      sn: validSn,
    });
  });

  it("should throw an error for an invalid lower battery charging level value", async () => {
    expect.assertions(2);
    await expect(powerStream.setLowerChargingLevel(0)).rejects.toThrowError();
    await expect(powerStream.setLowerChargingLevel(31)).rejects.toThrowError();
  });

  it("should set upper battery charging level", async () => {
    expect.assertions(1);
    const upperLimit = 70;
    await powerStream.setUpperChargingLevel(upperLimit);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SET_BAT_UPPER_PACK",
      params: {
        upperLimit,
      },
      sn: validSn,
    });
  });

  it("should throw an error for an invalid upper battery charging level value", async () => {
    expect.assertions(2);
    await expect(powerStream.setUpperChargingLevel(69)).rejects.toThrowError();
    await expect(powerStream.setUpperChargingLevel(101)).rejects.toThrowError();
  });

  it("should set led brightness", async () => {
    expect.assertions(1);
    const brightness = 42;
    await powerStream.setLedBrightness(brightness);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_SET_BRIGHTNESS_PACK",
      params: {
        brightness,
      },
      sn: validSn,
    });
  });

  it("should throw for an invalid brightness value", async () => {
    expect.assertions(2);
    await expect(powerStream.setLedBrightness(1024)).rejects.toThrowError();
    await expect(powerStream.setLedBrightness(-1)).rejects.toThrowError();
  });

  it("Should be able to delete Task", async () => {
    expect.assertions(1);
    await powerStream.deleteTask(9);

    expect(restClient.setCommandPlain).toHaveBeenCalledWith({
      cmdCode: "WN511_DELETE_TIME_TASK",
      params: {
        taskIndex: 9,
      },
      sn: validSn,
    });
  });
});

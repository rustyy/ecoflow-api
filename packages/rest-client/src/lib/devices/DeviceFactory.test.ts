import { beforeEach, describe, expect, it } from "@jest/globals";
import { deviceFactory } from "./DeviceFactory";
import { SmartPlug } from "./SmartPlug";
import { UnknownDevice } from "./UnknownDevice";
import { RestClient } from "../RestClient";

describe("deviceFactory", () => {
  let restClient: RestClient;

  beforeEach(() => {
    restClient = new RestClient({
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    });
  });

  it("returns a SmartPlug instance when the serial number is for a SmartPlug", () => {
    const device = deviceFactory("HW52xxxx", restClient);
    expect(device).toBeInstanceOf(SmartPlug);
    expect(device.sn).toBe("HW52xxxx");
  });

  it("returns a UnknownDevice instance when the serial number can not be mapped to a device", () => {
    const device = deviceFactory("fake_sn", restClient);
    expect(device).toBeInstanceOf(UnknownDevice);
    expect(device.sn).toBe("fake_sn");
  });
});
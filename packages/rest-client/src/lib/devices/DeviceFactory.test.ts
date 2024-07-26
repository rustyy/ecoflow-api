import { beforeEach, describe, expect, it } from "@jest/globals";
import { deviceFactory } from "./DeviceFactory";
import { SmartPlug } from "./SmartPlug";
import { UnknownDevice } from "./UnknownDevice";
import { RestClient } from "../RestClient";
import { PowerStream } from "./PowerStream";
import { Delta2 } from "./Delta2";
import { Glacier } from "./Glacier";
import { SmartHomePanel } from "./SmartHomePanel";
import { DeltaPro } from "./DeltaPro";
import { Wave2 } from "./Wave2";

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
    const device = deviceFactory("HW52*****", restClient);
    expect(device).toBeInstanceOf(SmartPlug);
    expect(device.sn).toBe("HW52*****");
  });

  it("returns a UnknownDevice instance when the serial number can not be mapped to a device", () => {
    const device = deviceFactory("fake_sn", restClient);
    expect(device).toBeInstanceOf(UnknownDevice);
    expect(device.sn).toBe("fake_sn");
  });

  it("returns a PowerStream instance when the serial number is for a PowerStream", () => {
    const sn = "HW51*****";
    const device = deviceFactory(sn, restClient);
    expect(device).toBeInstanceOf(PowerStream);
    expect(device.sn).toBe(sn);
  });

  it("returns a Delta 2 instance when the serial number is for a Delta 2", () => {
    const sn = "R331*****";
    const device = deviceFactory(sn, restClient);
    expect(device).toBeInstanceOf(Delta2);
    expect(device.sn).toBe(sn);
  });

  it("returns a Glacier instance when the serial number is for a Glacier", () => {
    const sn = "BX11*****";
    const device = deviceFactory(sn, restClient);
    expect(device).toBeInstanceOf(Glacier);
    expect(device.sn).toBe(sn);
  });

  it("returns a SHP instance when the serial number is for a SHP", () => {
    const sn = "SP10*****";
    const device = deviceFactory(sn, restClient);
    expect(device).toBeInstanceOf(SmartHomePanel);
    expect(device.sn).toBe(sn);
  });

  it("returns a Delta Pro instance when the serial number is for a DP", () => {
    const sn = "DCABZ*****";
    const device = deviceFactory(sn, restClient);
    expect(device).toBeInstanceOf(DeltaPro);
    expect(device.sn).toBe(sn);
  });

  it("returns a Wave2 instance when the serial number is for a Glacier", () => {
    const sn = "KT21*****";
    const device = deviceFactory(sn, restClient);
    expect(device).toBeInstanceOf(Wave2);
    expect(device.sn).toBe(sn);
  });
});

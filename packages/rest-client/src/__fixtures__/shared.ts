import { expect, jest } from "@jest/globals";
import { Device } from "../lib/devices/Device";
import { RestClient } from "../lib/RestClient";

export const getPropertiesFailsOnInvalidResponse = async (
  restClient: RestClient,
  device: Device<any, any>,
) => {
  const data = {
    sn: "fake-sn",
    success: true,
    code: "0",
    message: "Test message",
    time: Date.now(),
  };

  restClient.getDevicePropertiesPlain = jest
    .fn<RestClient["getDevicePropertiesPlain"]>()
    .mockResolvedValue(data as any);
  await expect(device.getProperties()).rejects.toThrowError();
};

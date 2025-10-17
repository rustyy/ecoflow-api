import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { UnknownDevice } from "./UnknownDevice";

describe("UnkownDevice", () => {
  let device: UnknownDevice;
  let restClient: RestClient;
  const sn = "some-sn";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    device = new UnknownDevice(restClient, sn);

    restClient.setCommandPlain = jest.fn<RestClient["setCommandPlain"]>();
    restClient.getDevicePropertiesPlain = jest
      .fn<RestClient["getDevicePropertiesPlain"]>()
      .mockResolvedValue({
        code: "0" as const,
        message: "Success" as const,
        data: { foo: "bar" },
      });
  });

  it("Should be able to construct an instance of SmartPlug", () => {
    expect(device).toBeTruthy();
    expect(device).toBeInstanceOf(UnknownDevice);
  });

  it("Should return data if api response could be parsed", async () => {
    await expect(device.getProperties()).resolves.toBeDefined();
  });

  it("returns the requested property", async () => {
    await expect(device.getProperty("foo")).resolves.toBe("bar");
  });

  it("returns undefined for non existing property", async () => {
    await expect(device.getProperty("bar")).resolves.toBeUndefined();
  });
});

import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { DeltaPro } from "./DeltaPro";

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
});

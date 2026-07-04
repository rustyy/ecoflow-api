import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { River2Pro } from "./River2Pro";

describe("River2Pro", () => {
  let river2Pro: River2Pro;
  let restClient: RestClient;
  const validSn = "R621xxxx";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    river2Pro = new River2Pro(restClient, validSn);

    restClient.setCommandPlain = jest.fn<RestClient["setCommandPlain"]>();
  });

  describe("constructor", () => {
    it("accepts a valid River2Pro serial number", () => {
      expect.assertions(1);

      expect(() => new River2Pro(restClient, validSn)).not.toThrow();
    });

    it("throws for an invalid River2Pro serial number", () => {
      expect.assertions(1);

      expect(() => new River2Pro(restClient, "R331xxxx" as never)).toThrowError(
        "Invalid serial number for River 2 Pro device.",
      );
    });
  });

  describe(".enable12Vdc()", () => {
    it("sets 12V DC output", async () => {
      expect.assertions(1);
      await river2Pro.enable12Vdc(1);

      expect(restClient.setCommandPlain).toHaveBeenCalledWith({
        id: 123456789,
        version: "1.0",
        moduleType: 5,
        operateType: "mpptCar",
        params: {
          enabled: 1,
        },
        sn: validSn,
      });
    });
  });

  describe(".setAcOutCfg()", () => {
    it("sets AC output configuration", async () => {
      expect.assertions(1);
      await river2Pro.setAcOutCfg({
        enabled: 1,
        xboost: 1,
        out_voltage: 30,
        out_freq: 50,
      });

      expect(restClient.setCommandPlain).toHaveBeenCalledWith({
        id: 123456789,
        version: "1.0",
        moduleType: 5,
        operateType: "acOutCfg",
        params: {
          enabled: 1,
          xboost: 1,
          out_voltage: 30,
          out_freq: 50,
        },
        sn: validSn,
      });
    });
  });

  describe(".setWatthConfigSchema()", () => {
    it("sets energy management configuration", async () => {
      expect.assertions(1);
      await river2Pro.setWatthConfigSchema({
        isConfig: 1,
        bpPowerSoc: 88,
        minDsgSoc: 30,
        minChgSoc: 88,
      });

      expect(restClient.setCommandPlain).toHaveBeenCalledWith({
        id: 123456789,
        version: "1.0",
        moduleType: 1,
        operateType: "watthConfig",
        params: {
          isConfig: 1,
          bpPowerSoc: 88,
          minDsgSoc: 30,
          minChgSoc: 88,
        },
        sn: validSn,
      });
    });
  });

  describe(".setChargeLimit()", () => {
    it("sets charge limit", async () => {
      expect.assertions(1);
      await river2Pro.setChargeLimit(50);

      expect(restClient.setCommandPlain).toHaveBeenCalledWith({
        id: 123456789,
        version: "1.0",
        moduleType: 2,
        operateType: "upsConfig",
        params: {
          maxChgSoc: 50,
        },
        sn: validSn,
      });
    });

    it("throws for invalid charge limit values", async () => {
      expect.assertions(2);
      await expect(river2Pro.setChargeLimit(101)).rejects.toThrowError();
      await expect(river2Pro.setChargeLimit(-1)).rejects.toThrowError();
    });
  });

  describe(".setDischargeLimit()", () => {
    it("sets discharge limit", async () => {
      expect.assertions(1);
      await river2Pro.setDischargeLimit(40);

      expect(restClient.setCommandPlain).toHaveBeenCalledWith({
        id: 123456789,
        version: "1.0",
        moduleType: 2,
        operateType: "dsgCfg",
        params: {
          minDsgSoc: 40,
        },
        sn: validSn,
      });
    });

    it("throws for invalid discharge limit values", async () => {
      expect.assertions(2);
      await expect(river2Pro.setDischargeLimit(101)).rejects.toThrowError();
      await expect(river2Pro.setDischargeLimit(-1)).rejects.toThrowError();
    });
  });
});

import {
  AcOutCfg,
  acOutCfgSchema,
  ChargeLimit,
  DischargeLimit,
  isRiver2ProSerialNumber,
  MpptCar,
  mpptCarSchema,
  River2ProQuotaAll,
  river2ProQuotaAllSchema,
  River2ProSerialNumber,
  WatthConfig,
  watthConfigSchema,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";
import {
  chargeLimitSchema,
  dischargeLimitSchema,
} from "@ecoflow-api/schemas/src/river2Pro/setCommands/bms";

export class River2Pro extends Device<
  River2ProSerialNumber,
  River2ProQuotaAll
> {
  constructor(restClient: RestClient, sn: River2ProSerialNumber) {
    super(restClient, sn);

    if (!isRiver2ProSerialNumber(sn)) {
      throw new Error("Invalid serial number for River 2 Pro device.");
    }
  }

  protected parseProperties(data: any) {
    return river2ProQuotaAllSchema.parse(data);
  }

  #payloadDefaults<T extends 1 | 2 | 3 | 4 | 5>(
    moduleType: T,
  ): {
    moduleType: T;
    id: number;
    version: "1.0";
    sn: River2ProSerialNumber;
  } {
    return {
      moduleType,
      id: 123456789,
      version: "1.0",
      sn: this.sn,
    };
  }

  /**************+********************************************************
   * MPPT Commands
   **************+********************************************************/

  /**
   * 12V DC output on/off（1 on 0 off）
   *
   * @example
   * ```typescript
   *   const client = new RestClient(...);
   *   const device = client.getDevice(sn);
   *   await device.setCarStandByDuration(1);
   * ```
   */
  async enable12Vdc(enabled: MpptCar["params"]["enabled"]) {
    const payload: MpptCar = {
      ...this.#payloadDefaults(5),
      operateType: "mpptCar",
      params: {
        enabled,
      },
    };

    return this.sendCommand(payload, mpptCarSchema);
  }

  /**
   * AC output on/off（enabled）
   * X-Boost on/off
   * AC output voltage，read，unit V
   * AC output frequency（out_freq，1-50Hz、2-60Hz）
   *
   * @example
   * ```typescript
   *   const client = new RestClient(...);
   *   const device = client.getDevice(sn);
   *   await device.setAcOutCfg({
   *     enabled: 1,
   *     xboost: 1,
   *     out_voltage: 30,
   *     out_freq: 50,
   *   });
   * ```
   */
  async setAcOutCfg(params: AcOutCfg["params"]) {
    const payload: AcOutCfg = {
      ...this.#payloadDefaults(5),
      operateType: "acOutCfg",
      params,
    };

    return this.sendCommand(payload, acOutCfgSchema);
  }

  /**************+********************************************************
   * PD Commands
   **************+********************************************************/

  /**
   * Energy management on/off
   *
   * @param params.isConfig - 0: off; 1: on
   * @param params.bpPowerSoc - Backup reserve
   * @param params.minDsgSoc - Discharge limit
   * @param params.minChgSoc - Charge limit
   *
   * @example
   * ```typescript
   *   const client = new RestClient(...);
   *   const device = client.getDevice(sn);
   *   await device.setWatthConfigSchema({
   *      "isConfig": 0,
   *      "bpPowerSoc": 88,
   *      "minDsgSoc": 30,
   *      "minChgSoc": 88
   *   });
   * ```
   */
  async setWatthConfigSchema(params: WatthConfig["params"]) {
    const payload: WatthConfig = {
      ...this.#payloadDefaults(1),
      operateType: "watthConfig",
      params,
    };

    return this.sendCommand(payload, watthConfigSchema);
  }

  /**************+********************************************************
   * BMS Commands
   **************+********************************************************/

  /**
   * Set the charge limit.
   * @param limit
   *
   * @example
   * ```typescript
   *   const client = new RestClient(...);
   *   const device = client.getDevice(sn);
   *   await device.setChargeLimit(50);
   */
  async setChargeLimit(limit: ChargeLimit["params"]["maxChgSoc"]) {
    const payload: ChargeLimit = {
      ...this.#payloadDefaults(2),
      operateType: "upsConfig",
      params: {
        maxChgSoc: limit,
      },
    };

    return this.sendCommand(payload, chargeLimitSchema);
  }

  /**
   * Set the discharge limit.
   * @param limit
   *
   * @example
   * ```typescript
   *   const client = new RestClient(...);
   *   const device = client.getDevice(sn);
   *   await device.setDischargeLimit(50);
   */
  async setDischargeLimit(limit: DischargeLimit["params"]["minDsgSoc"]) {
    const payload: DischargeLimit = {
      ...this.#payloadDefaults(2),
      operateType: "dsgCfg",
      params: {
        minDsgSoc: limit,
      },
    };

    return this.sendCommand(payload, dischargeLimitSchema);
  }
}

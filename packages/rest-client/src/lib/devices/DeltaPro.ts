import {
  DeltaProQuotaAll,
  deltaProQuotaAllSchema,
  DeltaProSerialNumber,
  DeltaProSetCarCharger,
  deltaProSetCarChargerSchema,
  DeltaProSetChargeLevel,
  deltaProSetChargeLevelSchema,
  DeltaProSetXBoost,
  deltaProSetXBoostSchema,
  isDeltaProSerialNumber,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";

export class DeltaPro extends Device<DeltaProSerialNumber, DeltaProQuotaAll> {
  constructor(restClient: RestClient, sn: DeltaProSerialNumber) {
    super(restClient, sn);

    if (!isDeltaProSerialNumber(sn)) {
      throw new Error("Invalid serial number for Delta Pro device.");
    }
  }

  #payloadDefaults<T>(params: T) {
    return {
      sn: this.sn,
      params: {
        cmdSet: 32 as const,
        ...params,
      },
    };
  }

  protected parseProperties(data: any) {
    return deltaProQuotaAllSchema.parse(data);
  }

  /**
   * Enable or disable xboost
   *
   * @param enabled 0 = disable, 1 = enable
   * @param xboost 0 = disable, 1 = enable
   */
  async enableXboost(enabled: 0 | 1, xboost: 0 | 1) {
    const payload: DeltaProSetXBoost = this.#payloadDefaults({
      id: 66 as const,
      enabled,
      xboost,
    });
    return this.sendCommand(payload, deltaProSetXBoostSchema);
  }

  /**
   * Enable or disable the car charger
   * @param enabled
   */
  async enableCharger(enabled: 0 | 1) {
    const payload: DeltaProSetCarCharger = this.#payloadDefaults({
      id: 81 as const,
      enabled,
    });
    return this.sendCommand(payload, deltaProSetCarChargerSchema);
  }

  /**
   * Set the maximum charge level
   * @param level
   */
  async setMaxChargeLevel(level: number) {
    const payload: DeltaProSetChargeLevel = this.#payloadDefaults({
      id: 49 as const,
      maxChgSoc: level,
    });
    return this.sendCommand(payload, deltaProSetChargeLevelSchema);
  }
}

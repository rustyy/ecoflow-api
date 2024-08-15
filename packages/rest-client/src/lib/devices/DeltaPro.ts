import {
  DeltaProQuotaAll,
  deltaProQuotaAllSchema,
  DeltaProSerialNumber,
  DeltaProSetACCharging,
  deltaProSetACChargingSchema,
  DeltaProSetACStandbyTime,
  deltaProSetACStandbyTimeSchema,
  DeltaProSetBeep,
  deltaProSetBeepSchema,
  DeltaProSetBypassACAutoStart,
  deltaProSetBypassACAutoStartSchema,
  DeltaProSetCarCharger,
  deltaProSetCarChargerSchema,
  DeltaProSetCarInputCurrent,
  deltaProSetCarInputCurrentSchema,
  DeltaProSetChargeLevel,
  deltaProSetChargeLevelSchema,
  DeltaProSetDischargeLevel,
  deltaProSetDischargeLevelSchema,
  DeltaProSetPVCharging,
  deltaProSetPVChargingSchema,
  DeltaProSetScreenBrightness,
  deltaProSetScreenBrightnessSchema,
  DeltaProSetScreenTimeout,
  deltaProSetScreenTimeoutSchema,
  DeltaProSetSmartGeneratorAutoOff,
  deltaProSetSmartGeneratorAutoOffSchema,
  DeltaProSetSmartGeneratorAutoOn,
  deltaProSetSmartGeneratorAutoOnSchema,
  DeltaProSetUnitTimeout,
  deltaProSetUnitTimeoutSchema,
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
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.enableXboost(0, 1);
   * ```
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
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.enableCharger(1);
   * ```
   *
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
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setChargeLevel(50);
   * ```
   *
   * @param level
   */
  async setChargeLevel(level: number) {
    const payload: DeltaProSetChargeLevel = this.#payloadDefaults({
      id: 49 as const,
      maxChgSoc: level,
    });
    return this.sendCommand(payload, deltaProSetChargeLevelSchema);
  }

  /**
   * Set the discharge level
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setDischargeLevel(10);
   * ```
   *
   * @param level
   */
  async setDischargeLevel(level: number) {
    const payload: DeltaProSetDischargeLevel = this.#payloadDefaults({
      id: 51 as const,
      minDsgSoc: level,
    });
    return this.sendCommand(payload, deltaProSetDischargeLevelSchema);
  }

  /**
   * Set the car input current
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setCarInput(4000);
   * ```
   *
   * @param input
   */
  async setCarInput(input: number) {
    const payload: DeltaProSetCarInputCurrent = this.#payloadDefaults({
      id: 71 as const,
      currMa: input,
    });
    return this.sendCommand(payload, deltaProSetCarInputCurrentSchema);
  }

  /**
   * Enable or disable the beep
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.enableBeep(1);
   * ```
   *
   * @param enabled 0 = disable, 1 = enable
   */
  async enableBeep(enabled: 0 | 1) {
    const payload: DeltaProSetBeep = this.#payloadDefaults({
      id: 38 as const,
      enabled,
    });
    return this.sendCommand(payload, deltaProSetBeepSchema);
  }

  /**
   * Set the screen brightness
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setScreenBrightness(50);
   * ```
   *
   * @param brightness
   */
  async setScreenBrightness(brightness: number) {
    const payload: DeltaProSetScreenBrightness = this.#payloadDefaults({
      id: 39 as const,
      lcdBrightness: brightness,
    });
    return this.sendCommand(payload, deltaProSetScreenBrightnessSchema);
  }

  /**
   * Setting the lower threshold percentage of smart generator auto on
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setSmartGeneratorAutoOnThreshold(52);
   * ```
   *
   * @param threshold
   */
  async setSmartGeneratorAutoOnThreshold(threshold: number) {
    const payload: DeltaProSetSmartGeneratorAutoOn = this.#payloadDefaults({
      id: 52 as const,
      openOilSoc: threshold,
    });
    return this.sendCommand(payload, deltaProSetSmartGeneratorAutoOnSchema);
  }

  /**
   * Setting the upper threshold percentage of smart generator auto off
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setSmartGeneratorAutoOffThreshold(10);
   * ```
   *
   * @param threshold
   */
  async setSmartGeneratorAutoOffThreshold(threshold: number) {
    const payload: DeltaProSetSmartGeneratorAutoOff = this.#payloadDefaults({
      id: 53 as const,
      closeOilSoc: threshold,
    });
    return this.sendCommand(payload, deltaProSetSmartGeneratorAutoOffSchema);
  }

  /**
   * Set the unit timeout
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setUnitTimeout(10);
   * ```
   *
   * @param timeout
   */
  async setUnitTimeout(timeout: number) {
    const payload: DeltaProSetUnitTimeout = this.#payloadDefaults({
      id: 33 as const,
      standByMode: timeout,
    });
    return this.sendCommand(payload, deltaProSetUnitTimeoutSchema);
  }

  /**
   * Set the screen timeout
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setScreenTimeout(60);
   * ```
   *
   * @param timeout
   */
  async setScreenTimeout(timeout: number) {
    const payload: DeltaProSetScreenTimeout = this.#payloadDefaults({
      id: 39 as const,
      lcdTime: timeout,
    });
    return this.sendCommand(payload, deltaProSetScreenTimeoutSchema);
  }

  /**
   * Setting the AC standby time
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setAcStandbyTime(720);
   * ```
   *
   * @param time
   */
  async setAcStandbyTime(time: number) {
    const payload: DeltaProSetACStandbyTime = this.#payloadDefaults({
      id: 153 as const,
      standByMins: time,
    });
    return this.sendCommand(payload, deltaProSetACStandbyTimeSchema);
  }

  /**
   * AC charging settings
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setAcChargingPower(0);
   * ```
   *
   * @param power
   */
  async setAcChargingPower(power: number) {
    const payload: DeltaProSetACCharging = this.#payloadDefaults({
      id: 69 as const,
      slowChgPower: power,
    });
    return this.sendCommand(payload, deltaProSetACChargingSchema);
  }

  /**
   * Set the pv charging type
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setPvChargingType(0);
   * ```
   *
   * @param type
   */
  async setPvChargingType(type: number) {
    const payload: DeltaProSetPVCharging = this.#payloadDefaults({
      id: 82 as const,
      chgType: type,
    });
    return this.sendCommand(payload, deltaProSetPVChargingSchema);
  }

  /**
   * Enable Bypass AC auto start
   *
   * @example
   * ```typescript
   *   const sn = "DCABZ*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.enableAcAutoStartBypass(1);
   * ```
   *
   * @param enabled
   */
  async enableAcAutoStartBypass(enabled: 0 | 1) {
    const payload: DeltaProSetBypassACAutoStart = this.#payloadDefaults({
      id: 84 as const,
      enabled,
    });
    return this.sendCommand(payload, deltaProSetBypassACAutoStartSchema);
  }
}

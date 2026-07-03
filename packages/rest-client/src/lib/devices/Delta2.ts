import {
  AcAlwaysOn,
  acAlwaysOnSchema,
  AcChargingSettings,
  acChargingSettingsSchema,
  AcDischarge,
  acDischargeSchema,
  AcStandbyTime,
  acStandbyTimeSchema,
  BuzzerSilentMode,
  buzzerSilentModeSchema,
  CarChargerDc,
  carChargerDcSchema,
  CarChargerSwitch,
  carChargerSwitchSchema,
  CarStandBy,
  carStandBySchema,
  DcUsbSwitch,
  dcUsbSwitchSchema,
  Delta2QuotaAll,
  delta2QuotaAllSchema,
  Delta2SerialNumber,
  EnergyManagement,
  EnergyManagementParams,
  energyManagementSchema,
  isDelta2SerialNumber,
  LcdConfig,
  lcdConfigSchema,
  MinDischargeSoc,
  minDischargeSocSchema,
  pdStandByTime,
  PdStandByTime,
  PvPriority,
  pvPrioritySchema,
  SocTurnOffGenerator,
  socTurnOffGeneratorSchema,
  SocTurnOnGenerator,
  socTurnOnGeneratorSchema,
  UpsUpperLimit,
  upsUpperLimitSchema,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";

export class Delta2 extends Device<Delta2SerialNumber, Delta2QuotaAll> {
  constructor(restClient: RestClient, sn: Delta2SerialNumber) {
    super(restClient, sn);

    if (!isDelta2SerialNumber(sn)) {
      throw new Error("Invalid serial number for Delta2 device.");
    }
  }

  protected parseProperties(data: any) {
    return delta2QuotaAllSchema.parse(data);
  }

  #payloadDefaults<T extends 1 | 2 | 3 | 4 | 5>(
    moduleType: T,
  ): {
    moduleType: T;
    id: number;
    version: "1.0";
    sn: `R331${string}`;
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
   * Set AC discharge ("enabled" and X-Boost switch settings)
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *   await delta2.setCarStandByDuration({
   *         enabled: 1,
   *         out_freq: 1,
   *         out_voltage: 30,
   *         xboost: 1,
   *       });
   * ```
   */
  async setAcDischarge(params: {
    enabled: 0 | 1;
    xboost: 0 | 1;
    out_voltage: number;
    out_freq: number;
  }) {
    const payload: AcDischarge = {
      ...this.#payloadDefaults(5),
      operateType: "acOutCfg",
      params,
    };

    return this.sendCommand(payload, acDischargeSchema);
  }

  /**
   * AC charging settings
   * chgPauseFlag:
   *  - 0: AC charging in normal operation
   *  - 1: AC charging paused
   *  (not saved, restored by plugging)
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *   await delta2.setAcCharge({
   *       "chgWatts":100,
   *       "chgPauseFlag":0
   *    });
   * ```
   */
  async setAcCharge(params: { chgWatts: number; chgPauseFlag: 0 | 1 }) {
    const payload: AcChargingSettings = {
      ...this.#payloadDefaults(5),
      operateType: "acChgCfg",
      params,
    };

    return this.sendCommand(payload, acChargingSettingsSchema);
  }

  /**
   * Set the car standby duration.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *   // Standby for 4 hours
   *   await delta2.setCarStandByDuration(240);
   * ```
   * @param standbyMins - Auto shutdown when there is no load, unit: minute
   */
  async setCarStandByDuration(standbyMins: number) {
    const payload: CarStandBy = {
      ...this.#payloadDefaults(5),
      operateType: "carStandby",
      params: { standbyMins },
    };

    return this.sendCommand(payload, carStandBySchema);
  }

  /**
   * Set the silent mode of the buzzer.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setSilentMode(0);
   * ```
   *
   * @param enabled - 1: On; 0: Off
   */
  async setSilentMode(enabled: 0 | 1) {
    const payload: BuzzerSilentMode = {
      ...this.#payloadDefaults(5),
      operateType: "quietMode",
      params: { enabled },
    };

    return this.sendCommand(payload, buzzerSilentModeSchema);
  }

  /**
   * Set the car charger switch.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setCarCharger(0);
   * ```
   *
   * @param enabled - 1: On; 0: Off
   */
  async setCarCharger(enabled: 0 | 1) {
    const payload: CarChargerSwitch = {
      ...this.#payloadDefaults(5),
      operateType: "mpptCar",
      params: { enabled },
    };

    return this.sendCommand(payload, carChargerSwitchSchema);
  }

  /**
   * Set the standby time for the AC.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setAcStandByTime(180);
   * ```
   *
   * @param minutes
   */
  async setAcStandByTime(minutes: number) {
    const payload: AcStandbyTime = {
      ...this.#payloadDefaults(5),
      operateType: "standbyTime",
      params: {
        standbyMins: minutes,
      },
    };

    return this.sendCommand(payload, acStandbyTimeSchema);
  }

  /**
   * Set the car charger input.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setCarInput(8000);
   * ```
   *
   * @param mAmpere - Maximum DC charging current (mA), range: 4000 mA–10000 mA
   */
  async setCarInput(mAmpere: number) {
    const payload: CarChargerDc = {
      ...this.#payloadDefaults(5),
      operateType: "dcChgCfg",
      params: {
        dcChgCfg: mAmpere,
      },
    };

    return this.sendCommand(payload, carChargerDcSchema);
  }

  /**************+********************************************************
   * BMS Commands
   **************+********************************************************/

  /**
   * UPS settings(UPS, upper SoC limit when charging)
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setUpsMaxSoc(50);
   * ```
   *
   * @param soc
   */
  async setUpsMaxSoc(soc: number) {
    const payload: UpsUpperLimit = {
      ...this.#payloadDefaults(2),
      operateType: "upsConfig",
      params: {
        maxChgSoc: soc,
      },
    };

    return this.sendCommand(payload, upsUpperLimitSchema);
  }

  /**
   * SOC lower limit when discharging
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setMinDischargeSoc(50);
   * ```
   *
   * @param soc
   */
  async setMinDischargeSoc(soc: number) {
    const payload: MinDischargeSoc = {
      ...this.#payloadDefaults(2),
      operateType: "dsgCfg",
      params: {
        minDsgSoc: soc,
      },
    };

    return this.sendCommand(payload, minDischargeSocSchema);
  }

  /**
   * SoC that triggers EMS to turn on Smart Generator
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setSocTurnOnGenerator(50);
   * ```
   *
   * @param soc
   */
  async setSocTurnOnGenerator(soc: number) {
    const payload: SocTurnOnGenerator = {
      ...this.#payloadDefaults(2),
      operateType: "openOilSoc",
      params: {
        openOilSoc: soc,
      },
    };

    return this.sendCommand(payload, socTurnOnGeneratorSchema);
  }

  /**
   * SOC that triggers EMS to turn off Smart Generator
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setSocTurnOffGenerator(50);
   * ```
   *
   * @param soc
   */
  async setSocTurnOffGenerator(soc: number) {
    const payload: SocTurnOffGenerator = {
      ...this.#payloadDefaults(2),
      operateType: "closeOilSoc",
      params: {
        closeOilSoc: soc,
      },
    };

    return this.sendCommand(payload, socTurnOffGeneratorSchema);
  }

  /**************+********************************************************
   * PD Commands
   **************+********************************************************/

  /**
   * Set the energy management configuration.
   * - isConfig: energy management configuration, 0: disabled, 1: enabled
   * - bpPowerSoc: backup reserve level;
   * - minDsgSoc: discharge limit (not in use);
   * - minChgSoc: charge limit (not in use))
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.setEnergyManagement({
   *     "isConfig":1,
   *     "bpPowerSoc":95,
   *     "minDsgSoc":255,
   *     "minChgSoc":255
   *   });
   * ```
   */
  async setEnergyManagement(params: EnergyManagementParams) {
    const payload: EnergyManagement = {
      ...this.#payloadDefaults(1),
      operateType: "watthConfig",
      params,
    };

    return this.sendCommand(payload, energyManagementSchema);
  }

  /**
   * Set the standby time for the PD module.
   * The device will power off if no loads are connected to it and
   * no activity is detected in the set period.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   // 2 hours timeout
   *   await delta2.setDeviceTimeout(120);
   * ```
   *
   * @param minutes
   */
  async setDeviceTimeout(minutes: number) {
    const payload: PdStandByTime = {
      ...this.#payloadDefaults(1),
      operateType: "standbyTime",
      params: {
        standbyMin: minutes,
      },
    };

    return this.sendCommand(payload, pdStandByTime);
  }

  /**
   * Enable or disable the USB output.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   // enable usb output
   *   await delta2.enableUsbOutput(1);
   *   // disable usb output
   *   await delta2.enableUsbOutput(0);
   * ```
   *
   * @param enabled
   */
  async enableUsbOutput(enabled: 0 | 1) {
    const payload: DcUsbSwitch = {
      ...this.#payloadDefaults(1),
      operateType: "dcOutCfg",
      params: { enabled },
    };

    return this.sendCommand(payload, dcUsbSwitchSchema);
  }

  /**
   * Set the LCD screen timeout.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   // 10 seconds timeout
   *   await delta2.setLcdTimeout(10);
   * ```
   *
   * @param delayOff - screen timeout, unit: seconds
   */
  async setLcdTimeout(delayOff: number) {
    const payload: LcdConfig = {
      ...this.#payloadDefaults(1),
      operateType: "lcdCfg",
      params: {
        delayOff,
        brightLevel: 3,
      },
    };

    return this.sendCommand(payload, lcdConfigSchema);
  }

  /**
   * Prioritize PV charging
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   await delta2.enablePvChargingPriority(1);
   * ```
   * .
   * @param enabled - 0: Off; 1: On
   */
  async enablePvChargingPriority(enabled: 0 | 1) {
    const payload: PvPriority = {
      ...this.#payloadDefaults(1),
      operateType: "pvChangePrio",
      params: {
        pvChangeSet: enabled,
      },
    };

    return this.sendCommand(payload, pvPrioritySchema);
  }

  /**
   * Set the AC auto out configuration
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const delta2 = client.getDevice(sn);
   *
   *   // enable ac auto out with minimum SOC of 50%
   *   await delta2.setAcAutoOutConfig(1, 50);
   * ```
   *
   * @param enabled - 0: Off; 1: On
   * @param minSoc - Minimum SOC for AC auto out
   */
  async setAcAutoOutConfig(enabled: 0 | 1, minSoc: number) {
    const payload: AcAlwaysOn = {
      ...this.#payloadDefaults(1),
      operateType: "acAutoOutConfig",
      params: {
        acAutoOutConfig: enabled,
        minAcOutSoc: minSoc,
      },
    };

    return this.sendCommand(payload, acAlwaysOnSchema);
  }
}

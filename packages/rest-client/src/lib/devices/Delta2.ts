import {
  AcAlwaysOn,
  acAlwaysOnSchema,
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
  isDelta2SerialNumber,
  LcdConfig,
  lcdConfigSchema,
  pdStandByTime,
  PdStandByTime,
  PvPriority,
  pvPrioritySchema,
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
   * @todo Implement MPPT commands:
   *    - "operateType":"acOutCfg"
   *    - "operateType":"acChgCfg"
   **************+********************************************************/

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

    return this.restClient.setCommandPlain(carStandBySchema.parse(payload));
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

    return this.restClient.setCommandPlain(
      buzzerSilentModeSchema.parse(payload),
    );
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

    return this.restClient.setCommandPlain(
      carChargerSwitchSchema.parse(payload),
    );
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

    return this.restClient.setCommandPlain(acStandbyTimeSchema.parse(payload));
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

    return this.restClient.setCommandPlain(carChargerDcSchema.parse(payload));
  }

  /**************+********************************************************
   * BMS Commands
   * @todo Implement BMS commands:
   *    - "operateType":"upsConfig"
   *    - "operateType":"dsgCfg"
   *    - "operateType":"openOilSoc"
   *    - "operateType":"closeOilSoc"
   **************+********************************************************/

  /**************+********************************************************
   * PD Commands
   * @todo Implement PD commands:
   *    - "operateType":"watthConfig"
   **************+********************************************************/

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

    return this.restClient.setCommandPlain(pdStandByTime.parse(payload));
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

    return this.restClient.setCommandPlain(dcUsbSwitchSchema.parse(payload));
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

    return this.restClient.setCommandPlain(lcdConfigSchema.parse(payload));
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

    return this.restClient.setCommandPlain(pvPrioritySchema.parse(payload));
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

    return this.restClient.setCommandPlain(acAlwaysOnSchema.parse(payload));
  }
}

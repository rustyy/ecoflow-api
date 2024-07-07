import {
  AcStandbyTime,
  acStandbyTimeSchema,
  BuzzerSilentMode,
  buzzerSilentModeSchema,
  CarChargerDc,
  carChargerDcSchema,
  CarChargerSwitch,
  carChargerSwitchSchema,
  Delta2QuotaAll,
  delta2QuotaAllSchema,
  Delta2SerialNumber,
  isDelta2SerialNumber,
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
   * Set the silent mode of the buzzer.
   *
   * @example
   * ```typescript
   *   const sn = "R331xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: https://api-e.ecoflow.com,
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

    await this.restClient.setCommandPlain(
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
   *     host: https://api-e.ecoflow.com,
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

    await this.restClient.setCommandPlain(
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
   *     host: https://api-e.ecoflow.com,
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

    await this.restClient.setCommandPlain(acStandbyTimeSchema.parse(payload));
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
   *     host: https://api-e.ecoflow.com,
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
      id: 123456789,
      version: "1.0",
      sn: this.sn,
      moduleType: 5,
      operateType: "dcChgCfg",
      params: {
        dcChgCfg: mAmpere,
      },
    };

    await this.restClient.setCommandPlain(carChargerDcSchema.parse(payload));
  }
}

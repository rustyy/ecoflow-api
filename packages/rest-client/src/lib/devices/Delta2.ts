import {
  BuzzerSilentMode,
  buzzerSilentModeSchema,
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
      id: 123456789,
      version: "1.0",
      sn: this.sn,
      moduleType: 5,
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
      id: 123456789,
      version: "1.0",
      sn: this.sn,
      moduleType: 5,
      operateType: "mpptCar",
      params: { enabled },
    };

    await this.restClient.setCommandPlain(
      carChargerSwitchSchema.parse(payload),
    );
  }
}

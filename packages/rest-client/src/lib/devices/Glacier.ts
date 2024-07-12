import {
  GlacierQuotaAll,
  glacierQuotaAllSchema,
  GlacierSerialNumber,
  GlacierSetEcoMode,
  glacierSetEcoModeSchema,
  GlacierSetTemperature,
  glacierSetTemperatureSchema,
  isGlacierSerialNumber,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";

export class Glacier extends Device<GlacierSerialNumber, GlacierQuotaAll> {
  constructor(restClient: RestClient, sn: GlacierSerialNumber) {
    super(restClient, sn);

    if (!isGlacierSerialNumber(sn)) {
      throw new Error("Invalid serial number for Glacier device.");
    }
  }

  protected parseProperties(data: any) {
    return glacierQuotaAllSchema.parse(data);
  }

  #payloadDefaults(): {
    moduleType: 1;
    id: number;
    version: "1.0";
    sn: GlacierSerialNumber;
  } {
    return {
      moduleType: 1,
      id: 123456789,
      version: "1.0",
      sn: this.sn,
    };
  }

  /**
   * Set temperature for right, left and middle zones
   *
   * @param right - Temperature for right zone
   * @param left - Temperature for left zone
   * @param middle - Temperature for middle zone
   */
  async setTemperature(right: number, left: number, middle: number) {
    const payload: GlacierSetTemperature = {
      ...this.#payloadDefaults(),
      operateType: "temp",
      params: {
        tmpR: right,
        tmpL: left,
        tmpM: middle,
      },
    };

    return this.restClient.setCommandPlain(
      glacierSetTemperatureSchema.parse(payload),
    );
  }

  /**
   * Enable or disable ECO mode
   * @param enable - 1: ECO; 0: Normal
   */
  async enableEcoMode(enable: 0 | 1) {
    const payload: GlacierSetEcoMode = {
      ...this.#payloadDefaults(),
      operateType: "ecoMode",
      params: {
        mode: enable,
      },
    };

    return this.restClient.setCommandPlain(
      glacierSetEcoModeSchema.parse(payload),
    );
  }
}

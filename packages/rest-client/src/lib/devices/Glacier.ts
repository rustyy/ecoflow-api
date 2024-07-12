import {
  GlacierQuotaAll,
  glacierQuotaAllSchema,
  GlacierSerialNumber,
  GlacierSetBuzzer,
  GlacierSetBuzzerCommand,
  glacierSetBuzzerCommandSchema,
  glacierSetBuzzerSchema,
  GlacierSetEcoMode,
  glacierSetEcoModeSchema,
  GlacierSetScreenTimeout,
  glacierSetScreenTimeoutSchema,
  GlacierSetTemperature,
  glacierSetTemperatureSchema,
  GlacierSetTemperatureUnit,
  glacierSetTemperatureUnitSchema,
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

  /**
   * Enable or disable the buzzer
   * @param enabled - 0: Disable; 1: Enable
   */
  async enableBuzzer(enabled: 0 | 1) {
    const payload: GlacierSetBuzzer = {
      ...this.#payloadDefaults(),
      operateType: "beepEn",
      params: {
        flag: enabled,
      },
    };

    return this.restClient.setCommandPlain(
      glacierSetBuzzerSchema.parse(payload),
    );
  }

  /**
   * Set buzzer beep
   * @param flag - 0: always beep; 1: beep once; 2: Beep twice; 3: Beep three times
   */
  async setBuzzerBeep(flag: 0 | 1 | 2 | 3) {
    const payload: GlacierSetBuzzerCommand = {
      ...this.#payloadDefaults(),
      operateType: "beep",
      params: {
        flag: flag,
      },
    };

    return this.restClient.setCommandPlain(
      glacierSetBuzzerCommandSchema.parse(payload),
    );
  }

  /**
   * Set screen timeout
   *
   * @param time - Timeout in seconds - 0: screen always on
   */
  async setScreenTimeout(time: number) {
    const payload: GlacierSetScreenTimeout = {
      ...this.#payloadDefaults(),
      operateType: "blTime",
      params: {
        time,
      },
    };
    return this.restClient.setCommandPlain(
      glacierSetScreenTimeoutSchema.parse(payload),
    );
  }

  /**
   * Set temperature unit
   * @param unit - "C" for Celsius, "F" for Fahrenheit
   */
  async setTemperatureUnit(unit: "C" | "F") {
    if (unit !== "C" && unit !== "F") {
      throw new Error(
        "Invalid temperature unit. Use 'C' for Celsius or 'F' for Fahrenheit",
      );
    }

    const payload: GlacierSetTemperatureUnit = {
      ...this.#payloadDefaults(),
      operateType: "tmpUnit",
      params: {
        unit: unit === "C" ? 0 : 1,
      },
    };

    return this.restClient.setCommandPlain(
      glacierSetTemperatureUnitSchema.parse(payload),
    );
  }
}

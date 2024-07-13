import {
  GlacierQuotaAll,
  glacierQuotaAllSchema,
  GlacierSerialNumber,
  GlacierSetBatteryProtection,
  glacierSetBatteryProtectionSchema,
  GlacierSetBuzzer,
  GlacierSetBuzzerCommand,
  glacierSetBuzzerCommandSchema,
  glacierSetBuzzerSchema,
  GlacierSetEcoMode,
  glacierSetEcoModeSchema,
  GlacierSetIceDetaching,
  glacierSetIceDetachingSchema,
  GlacierSetIceMaking,
  glacierSetIceMakingSchema,
  GlacierSetScreenTimeout,
  glacierSetScreenTimeoutSchema,
  GlacierSetSensorDetection,
  glacierSetSensorDetectionSchema,
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
  async setTemperature({
    right,
    left,
    middle,
  }: {
    right: number;
    left: number;
    middle: number;
  }) {
    const payload: GlacierSetTemperature = {
      ...this.#payloadDefaults(),
      operateType: "temp",
      params: {
        tmpR: right,
        tmpL: left,
        tmpM: middle,
      },
    };

    return this.sendCommand(payload, glacierSetTemperatureSchema);
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

    return this.sendCommand(payload, glacierSetEcoModeSchema);
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

    return this.sendCommand(payload, glacierSetBuzzerSchema);
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

    return this.sendCommand(payload, glacierSetBuzzerCommandSchema);
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
    return this.sendCommand(payload, glacierSetScreenTimeoutSchema);
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

    return this.sendCommand(payload, glacierSetTemperatureUnitSchema);
  }

  /**
   * Set ice making
   * @param enable - 0: Disable; 1: Enable
   * @param iceShape - "small" or "large" ice-cubes
   */
  async setIceMaking(enable: 0 | 1, iceShape: "small" | "large") {
    if (iceShape !== "small" && iceShape !== "large") {
      throw new Error("Invalid ice shape. Use 'small' or 'large'");
    }

    const payload: GlacierSetIceMaking = {
      ...this.#payloadDefaults(),
      operateType: "iceMake",
      params: {
        enable,
        iceShape: iceShape === "small" ? 0 : 1,
      },
    };

    return this.sendCommand(payload, glacierSetIceMakingSchema);
  }

  /**
   * Set ice detaching
   * @param enable - 0: Invalid, 1: Detach iceiceTm: Duration of ice detaching; unit: secfsmState, 4: Detaching ice, 5: Detaching completed
   */
  async setIceDetaching(enable: 0 | 1 | 4 | 5) {
    const payload: GlacierSetIceDetaching = {
      ...this.#payloadDefaults(),
      operateType: "deIce",
      params: {
        enable,
      },
    };

    return this.sendCommand(payload, glacierSetIceDetachingSchema);
  }

  /**
   * Set sensor detection blocking
   *
   * @param blocked - 0: Unblocked, 1: Blocked
   */
  async setSensorDetectionBlocking(blocked: 0 | 1) {
    const payload: GlacierSetSensorDetection = {
      ...this.#payloadDefaults(),
      operateType: "sensorAdv",
      params: {
        sensorAdv: blocked,
      },
    };

    return this.sendCommand(payload, glacierSetSensorDetectionSchema);
  }

  /**
   * Set battery protection level
   *
   * @param enabled - 0: Disable, 1: Enable
   * @param level - 0: Low, 1: Medium, 2: High
   */
  async setBatteryProtectionLevel(enabled: 0 | 1, level: 0 | 1 | 2) {
    const payload: GlacierSetBatteryProtection = {
      ...this.#payloadDefaults(),
      operateType: "protectBat",
      params: {
        level,
        state: enabled,
      },
    };

    return this.sendCommand(payload, glacierSetBatteryProtectionSchema);
  }
}

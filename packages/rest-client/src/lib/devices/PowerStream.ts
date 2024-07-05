import { Device } from "./Device";
import {
  CustomLoadPowerSettings,
  customLoadPowerSettingsSchema,
  IndicatorLightBrightness,
  indicatorLightBrightnessSchema,
  isPowerStreamSerialNumber,
  LowerChargingLevel,
  lowerChargingLevelSchema,
  PowerStreamDeleteTask,
  powerStreamDeleteTaskSchema,
  PowerStreamQuotaAll,
  powerStreamQuotaAllSchema,
  PowerStreamSerialNumber,
  PowerSupplyPriority,
  powerSupplyPrioritySchema,
  UpperChargingLevel,
  upperChargingLevelSchema,
} from "@ecoflow-api/schemas";
import { RestClient } from "../RestClient";

/**
 * Represents a smart plug device.
 * @extends Device
 */
export class PowerStream extends Device<
  PowerStreamSerialNumber,
  PowerStreamQuotaAll
> {
  constructor(restClient: RestClient, sn: PowerStreamSerialNumber) {
    super(restClient, sn);

    if (!isPowerStreamSerialNumber(sn)) {
      throw new Error("Invalid serial number for powerStream device.");
    }
  }

  protected parseProperties(data: any) {
    return powerStreamQuotaAllSchema.parse(data);
  }

  /**
   * Set the power supply priority either to power supply or battery/storage.
   *
   * @example
   * ```typescript
   *   const sn = "HW51xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: https://api-e.ecoflow.com,
   *   });
   *
   *   const powerStream = client.getDevice(sn);
   *
   *   await powerStream.setPowerSupplyPriority("powerSupply");
   *   // or
   *   await powerStream.setPowerSupplyPriority("battery");
   * ```
   *
   * @param priority - The priority to set.
   */
  async setPowerSupplyPriority(priority: "powerSupply" | "battery") {
    const mapping = {
      powerSupply: 0,
      battery: 1,
    } as const;

    const payload: PowerSupplyPriority = {
      cmdCode: "WN511_SET_SUPPLY_PRIORITY_PACK",
      params: {
        supplyPriority: mapping[priority],
      },
      sn: this.sn,
    };

    await this.restClient.setCommandPlain(
      powerSupplyPrioritySchema.parse(payload),
    );
  }

  /**
   * Set the custom load power.
   *
   * @example
   * ```typescript
   *   const sn = "HW51xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: https://api-e.ecoflow.com,
   *   });
   *
   *   const powerStream = client.getDevice(sn);
   *   await powerStream.setCustomLoadPower(80);
   * ```
   *
   * @param {number} permanentWatts - The custom load power to set. Must be between 0 and 600.
   */
  async setCustomLoadPower(permanentWatts: number) {
    const payload: CustomLoadPowerSettings = {
      cmdCode: "WN511_SET_PERMANENT_WATTS_PACK",
      params: {
        permanentWatts,
      },
      sn: this.sn,
    };

    return await this.restClient.setCommandPlain(
      customLoadPowerSettingsSchema.parse(payload),
    );
  }

  /**
   * Set the lower charging level.
   *
   *  @example
   * ```typescript
   *   const sn = "HW51xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: https://api-e.ecoflow.com,
   *   });
   *
   *   const powerStream = client.getDevice(sn);
   *   await powerStream.setLowerChargingLevel(20);
   * ```
   *
   * @param {number} lowerLimit - The lower limit to set. Must be between 1 and 30.
   */
  async setLowerChargingLevel(lowerLimit: number) {
    const payload: LowerChargingLevel = {
      cmdCode: "WN511_SET_BAT_LOWER_PACK",
      params: {
        lowerLimit,
      },
      sn: this.sn,
    };

    return await this.restClient.setCommandPlain(
      lowerChargingLevelSchema.parse(payload),
    );
  }

  /**
   * Set the upper charging level.
   *
   * @example
   * ```typescript
   *   const sn = "HW51xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: https://api-e.ecoflow.com,
   *   });
   *
   *   const powerStream = client.getDevice(sn);
   *   await powerStream.setUpperChargingLevel(80);
   * ```
   *
   * @param {number} upperLimit - The upper limit to set. Must be between 70 and 100.
   */
  async setUpperChargingLevel(upperLimit: number) {
    const payload: UpperChargingLevel = {
      cmdCode: "WN511_SET_BAT_UPPER_PACK",
      params: {
        upperLimit,
      },
      sn: this.sn,
    };

    return await this.restClient.setCommandPlain(
      upperChargingLevelSchema.parse(payload),
    );
  }

  /**
   * Set the brightness of the indicator light.
   *
   * @example
   * ```typescript
   *   const sn = "HW51xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: https://api-e.ecoflow.com,
   *   });
   *
   *   const powerStream = client.getDevice(sn);
   *   await powerStream.setLedBrightness(80);
   * ```
   *
   * @param {number} brightness - The brightness value to set. Must be between 0 and 1023.
   */
  async setLedBrightness(brightness: number) {
    const payload: IndicatorLightBrightness = {
      sn: this.sn,
      cmdCode: "WN511_SET_BRIGHTNESS_PACK",
      params: {
        brightness,
      },
    };

    return this.sendCommand(indicatorLightBrightnessSchema.parse(payload));
  }

  /**
   * Delete a task by its index.
   *
   * @example
   * ```typescript
   *   const sn = "HW51xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: https://api-e.ecoflow.com,
   *   });
   *
   *   const powerStream = client.getDevice(sn);
   *   await powerStream.deleteTask(2);
   * ```
   *
   * @param {number} taskIndex - The index of the task to delete.
   */
  async deleteTask(taskIndex: number) {
    const payload: PowerStreamDeleteTask = {
      sn: this.sn,
      cmdCode: "WN511_DELETE_TIME_TASK",
      params: {
        taskIndex,
      },
    };

    return this.sendCommand(powerStreamDeleteTaskSchema.parse(payload));
  }
}

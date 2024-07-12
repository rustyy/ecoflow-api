import { Device } from "./Device";
import {
  isSmartPlugSn,
  SmartPlugDeleteTimeTaskCommand,
  SmartPlugDeleteTimeTaskCommandSchema,
  SmartPlugIndicatorBrightnessCommand,
  SmartPlugIndicatorBrightnessCommandSchema,
  SmartPlugQuotaAll,
  smartPlugQuotaAllSchema,
  SmartPlugSn,
  SmartPlugSwitchOnOffCommand,
  smartPlugSwitchOnOffCommandSchema,
} from "@ecoflow-api/schemas";
import { RestClient } from "../RestClient";

/**
 * Represents a smart plug device.
 * @extends Device
 */
export class SmartPlug extends Device<SmartPlugSn, SmartPlugQuotaAll> {
  constructor(restClient: RestClient, sn: SmartPlugSn) {
    super(restClient, sn);

    if (!isSmartPlugSn(sn)) {
      throw new Error("Invalid serial number for smart plug device.");
    }
  }

  protected parseProperties(data: any) {
    return smartPlugQuotaAllSchema.parse(data);
  }

  /**
   * Remove a task.
   *
   * @example
   * ```typescript
   *   const sn = "HW52xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const smartPlug = client.getDevice(sn);
   *   await smartPlug.deleteTask(1);
   * ```
   * @param taskIndex
   */
  async deleteTask(taskIndex: number) {
    const payload: SmartPlugDeleteTimeTaskCommand = {
      sn: this.sn,
      cmdCode: "WN511_SOCKET_DELETE_TIME_TASK",
      params: {
        taskIndex,
      },
    };

    return this.sendCommand(payload, SmartPlugDeleteTimeTaskCommandSchema);
  }

  /**
   * Sets the brightness of the LED indicator on the smart plug.
   *
   * @example
   * ```typescript
   *   const sn = "HW52xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const smartPlug = client.getDevice(sn);
   *   await smartPlug.setLedBrightness(200);
   * ```
   *
   * @param {number} brightness - The brightness value to set. Must be between 0 and 1023.
   */
  async setLedBrightness(brightness: number) {
    const payload: SmartPlugIndicatorBrightnessCommand = {
      sn: this.sn,
      cmdCode: "WN511_SOCKET_SET_BRIGHTNESS_PACK",
      params: {
        brightness,
      },
    };

    return this.sendCommand(payload, SmartPlugIndicatorBrightnessCommandSchema);
  }

  /**
   * Turns the smart plug on.
   *
   * @example
   * ```typescript
   *   const sn = "HW52xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const smartPlug = client.getDevice(sn);
   *   await smartPlug.switchOn();
   * ```
   */
  async switchOn() {
    return this.#toggle(1);
  }

  /**
   * Turns the smart plug off.
   *
   * @example
   * ```typescript
   *   const sn = "HW52xxxx";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const smartPlug = client.getDevice(sn);
   *   await smartPlug.switchOff();
   * ```
   */
  async switchOff() {
    return this.#toggle(0);
  }

  /**
   * Toggles the smart plug on or off.
   * @param state
   * @private
   */
  async #toggle(state: 0 | 1) {
    const payload: SmartPlugSwitchOnOffCommand = {
      sn: this.sn,
      cmdCode: "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE",
      params: {
        plugSwitch: state,
      },
    };

    return this.sendCommand(payload, smartPlugSwitchOnOffCommandSchema);
  }
}

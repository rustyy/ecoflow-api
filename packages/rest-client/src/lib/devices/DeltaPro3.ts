import {
  DeltaPro3AcOutFreqCommand,
  deltaPro3AcOutFreqCommandSchema,
  DeltaPro3AcTimeoutCommand,
  deltaPro3AcTimeoutCommandSchema,
  DeltaPro3BeepEnCommand,
  deltaPro3BeepEnCommandSchema,
  DeltaPro3Dc12vOutOpenCommand,
  deltaPro3Dc12vOutOpenCommandSchema,
  DeltaPro3DcTimeoutCommand,
  deltaPro3DcTimeoutCommandSchema,
  DeltaPro3DeviceTimeoutCommand,
  deltaPro3DeviceTimeoutCommandSchema,
  DeltaPro3EnergyBackupCommand,
  deltaPro3EnergyBackupCommandSchema,
  DeltaPro3HvAcOutOpenCommand,
  deltaPro3HvAcOutOpenCommandSchema,
  DeltaPro3LvAcOutOpenCommand,
  deltaPro3LvAcOutOpenCommandSchema,
  DeltaPro3MaxChgSocCommand,
  deltaPro3MaxChgSocCommandSchema,
  DeltaPro3MinDsgSocCommand,
  deltaPro3MinDsgSocCommandSchema,
  DeltaPro3PowerOffCommand,
  deltaPro3PowerOffCommandSchema,
  DeltaPro3QuotaAll,
  deltaPro3QuotaAllSchema,
  DeltaPro3ScreenBrightnessCommand,
  deltaPro3ScreenBrightnessCommandSchema,
  DeltaPro3ScreenTimeoutCommand,
  deltaPro3ScreenTimeoutCommandSchema,
  DeltaPro3SerialNumber,
  DeltaPro3XboostEnCommand,
  deltaPro3XboostEnCommandSchema,
  isDeltaPro3SerialNumber
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";

export class DeltaPro3 extends Device<
  DeltaPro3SerialNumber,
  DeltaPro3QuotaAll
> {
  constructor(restClient: RestClient, sn: DeltaPro3SerialNumber) {
    super(restClient, sn);

    if (!isDeltaPro3SerialNumber(sn)) {
      throw new Error("Invalid serial number for Delta Pro 3 device.");
    }
  }

  #payloadDefaults<T>(params: T) {
    const defaults = {
      sn: this.sn,
      cmdFunc: 254,
      dest: 2,
      dirDest: 1,
      needAck: true,
      dirSrc: 1,
      cmdId: 17,
    } as const;

    return {
      ...defaults,
      params: {
        ...params,
      },
    };
  }

  protected parseProperties(data: any) {
    return deltaPro3QuotaAllSchema.parse(data);
  }

  /**
   * Sets the beeper switch
   *
   * @example
   * ```typescript
   *   await device.enableBeep(false);
   *   await device.enableBeep(true);
   * ```
   *
   * @param enabled
   */
  async enableBeep(enabled: boolean) {
    const payload: DeltaPro3BeepEnCommand = this.#payloadDefaults({
      cfgBeepEn: enabled,
    });

    return this.sendCommand(payload, deltaPro3BeepEnCommandSchema);
  }

  /**
   * Sets AC timeout
   *
   * @example
   * ```typescript
   *   await device.setAcTimeout(120);
   * ```
   *
   * @param minutes
   */
  async setAcTimeout(minutes: number) {
    const payload: DeltaPro3AcTimeoutCommand = this.#payloadDefaults({
      cfgAcStandbyTime: minutes,
    });

    return this.sendCommand(payload, deltaPro3AcTimeoutCommandSchema);
  }

  /**
   * Sets DC timeout
   *
   * @example
   * ```typescript
   *   await device.setDcTimeout(120);
   * ```
   *
   * @param minutes
   */
  async setDcTimeout(minutes: number) {
    const payload: DeltaPro3DcTimeoutCommand = this.#payloadDefaults({
      cfgDcStandbyTime: minutes,
    });
    return this.sendCommand(payload, deltaPro3DcTimeoutCommandSchema);
  }

  /**
   * Sets the screen timeout (s).
   *
   * @example
   * ```typescript
   *   await device.setScreenTimeout(30);
   * ```
   *
   * @param seconds
   */
  async setScreenTimeout(seconds: number) {
    const payload: DeltaPro3ScreenTimeoutCommand = this.#payloadDefaults({
      cfgScreenOffTime: seconds,
    });

    return this.sendCommand(payload, deltaPro3ScreenTimeoutCommandSchema);
  }

  /**
   * Sets the device timeout (min).
   *
   * @example
   * ```typescript
   *   await device.setDeviceTimeout(30);
   * ```
   *
   * @param minutes
   */
  async setDeviceTimeout(minutes: number) {
    const payload: DeltaPro3DeviceTimeoutCommand = this.#payloadDefaults({
      cfgDevStandbyTime: minutes,
    });

    return this.sendCommand(payload, deltaPro3DeviceTimeoutCommandSchema);
  }

  /**
   * Sets screen brightness
   *
   * @example
   * ```typescript
   *   await device.setScreenBrightness(30);
   * ```
   *
   * @param brightness
   */
  async setScreenBrightness(brightness: number) {
    const payload: DeltaPro3ScreenBrightnessCommand = this.#payloadDefaults({
      cfgLcdLight: brightness,
    });

    return this.sendCommand(payload, deltaPro3ScreenBrightnessCommandSchema);
  }

  /**
   * High-voltage AC output switch.
   *
   * @example
   * ```typescript
   *   await device.enableHighVoltageAcOutput(true);
   * ```
   *
   * @param enabled
   */
  async enableHighVoltageAcOutput(enabled: boolean) {
    const payload: DeltaPro3HvAcOutOpenCommand = this.#payloadDefaults({
      cfgHvAcOutOpen: enabled,
    });

    return this.sendCommand(payload, deltaPro3HvAcOutOpenCommandSchema);
  }

  /**
   * Low-voltage AC output switch
   *
   * @example
   * ```typescript
   *   await device.enableLowVoltageAcOutput(true);
   * ```
   *
   * @param enabled
   */
  async enableLowVoltageAcOutput(enabled: boolean) {
    const payload: DeltaPro3LvAcOutOpenCommand = this.#payloadDefaults({
      cfgLvAcOutOpen: enabled,
    });

    return this.sendCommand(payload, deltaPro3LvAcOutOpenCommandSchema);
  }

  /**
   * Sets the AC output frequency (50Hz/60Hz).
   *
   * @example
   * ```typescript
   *   await device.setAcFrequency(50);
   * ```
   *
   * @param freq - 50 or 60 Hz
   */
  async setAcFrequency(freq: 50 | 60) {
    const payload: DeltaPro3AcOutFreqCommand = this.#payloadDefaults({
      cfgAcOutFreq: freq,
    });

    return this.sendCommand(payload, deltaPro3AcOutFreqCommandSchema);
  }

  /**
   * 12V output switch.
   *
   * @example
   * ```typescript
   *   await device.enable12VOut(true);
   * ```
   *
   * @param enabled
   */
  async enable12VOut(enabled: boolean) {
    const payload: DeltaPro3Dc12vOutOpenCommand = this.#payloadDefaults({
      cfgDc12vOutOpen: enabled,
    });

    return this.sendCommand(payload, deltaPro3Dc12vOutOpenCommandSchema);
  }

  /**
   * X-Boost switch.
   *
   * @example
   * ```typescript
   *   await device.enableXboost(true);
   * ```
   *
   * @param enabled
   */
  async enableXboost(enabled: boolean) {
    const payload: DeltaPro3XboostEnCommand = this.#payloadDefaults({
      cfgXboostEn: enabled,
    });

    return this.sendCommand(payload, deltaPro3XboostEnCommandSchema);
  }

  /**
   * Shuts down the device.
   *
   * @example
   * ```typescript
   *   await device.shutdown();
   * ```
   */
  async shutdown() {
    const payload: DeltaPro3PowerOffCommand = this.#payloadDefaults({
      cfgPowerOff: true,
    });
    return this.sendCommand(payload, deltaPro3PowerOffCommandSchema);
  }

  /**
   * Sets the charge limit.
   *
   * @example
   * ```typescript
   *   await device.setChargeLimit(70);
   * ```
   */
  async setChargeLimit(limit: number) {
    const payload: DeltaPro3MaxChgSocCommand = this.#payloadDefaults({
      cfgMaxChgSoc: limit,
    });
    return this.sendCommand(payload, deltaPro3MaxChgSocCommandSchema);
  }

  /**
   * Sets the discharge limit.
   *
   * @example
   * ```typescript
   *   await device.setDischargeLimit(70);
   * ```
   */
  async setDischargeLimit(limit: number) {
    const payload: DeltaPro3MinDsgSocCommand = this.#payloadDefaults({
      cfgMinDsgSoc: limit,
    });
    return this.sendCommand(payload, deltaPro3MinDsgSocCommandSchema);
  }

  /**
   * Sets the backup reserve level.
   *
   * @example
   * ```typescript
   *   await device.setBackupReserveLevel(70,true);
   * ```
   */
  async setBackupReserveLevel(start: number, enabled: boolean) {
    const payload: DeltaPro3EnergyBackupCommand = this.#payloadDefaults({
      cfgEnergyBackup: {
        energyBackupStartSoc: start,
        energyBackupEn: enabled,
      },
    });
    return this.sendCommand(payload, deltaPro3EnergyBackupCommandSchema);
  }
}

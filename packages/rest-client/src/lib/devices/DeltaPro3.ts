import {
  DeltaPro3AcEnergySavingModeCommand,
  deltaPro3AcEnergySavingModeCommandSchema,
  DeltaPro3AcOutFreqCommand,
  deltaPro3AcOutFreqCommandSchema,
  DeltaPro3AcTimeoutCommand,
  deltaPro3AcTimeoutCommandSchema,
  DeltaPro3BatterChargingOrderCommand,
  deltaPro3BatterChargingOrderCommandSchema,
  DeltaPro3BeepEnCommand,
  deltaPro3BeepEnCommandSchema,
  DeltaPro3BleStandbyTimeCommand,
  deltaPro3BleStandbyTimeCommandSchema,
  DeltaPro3CmsOilOffSocCommand,
  deltaPro3CmsOilOffSocCommandSchema,
  DeltaPro3CmsOilOnSocCommand,
  deltaPro3CmsOilOnSocCommandSchema,
  DeltaPro3CmsOilSelfStartCommand,
  deltaPro3CmsOilSelfStartCommandSchema,
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
  DeltaPro3LlcGFCIFlagCommand,
  deltaPro3LlcGFCIFlagCommandSchema,
  DeltaPro3LvAcOutOpenCommand,
  deltaPro3LvAcOutOpenCommandSchema,
  DeltaPro3MaxChargingPowIOCommand,
  deltaPro3MaxChargingPowIOCommandSchema,
  DeltaPro3MaxChgSocCommand,
  deltaPro3MaxChgSocCommandSchema,
  DeltaPro3MinDsgSocCommand,
  deltaPro3MinDsgSocCommandSchema,
  DeltaPro3PlugInInfoPvHDcAmpMaxCommand,
  deltaPro3PlugInInfoPvHDcAmpMaxCommandSchema,
  DeltaPro3PlugInInfoPvLDcAmpMaxCommand,
  deltaPro3PlugInInfoPvLDcAmpMaxCommandSchema,
  DeltaPro3PowerOffCommand,
  deltaPro3PowerOffCommandSchema,
  DeltaPro3QuotaAll,
  deltaPro3QuotaAllSchema,
  DeltaPro3ScreenBrightnessCommand,
  deltaPro3ScreenBrightnessCommandSchema,
  DeltaPro3ScreenTimeoutCommand,
  deltaPro3ScreenTimeoutCommandSchema,
  DeltaPro3SerialNumber,
  DeltaPro3SetMaxAcChargingPowCommand,
  deltaPro3SetMaxAcChargingPowCommandSchema,
  DeltaPro3XboostEnCommand,
  deltaPro3XboostEnCommandSchema,
  isDeltaPro3SerialNumber,
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

  /**
   * Sets the maximum input current of the low-voltage PV port.
   *
   * @example
   * ```typescript
   *   await device.setLowVoltageMaxInput(7);
   * ```
   */
  async setLowVoltageMaxInput(input: number) {
    const payload: DeltaPro3PlugInInfoPvLDcAmpMaxCommand =
      this.#payloadDefaults({
        cfgPlugInInfoPvLDcAmpMax: input,
      });
    return this.sendCommand(
      payload,
      deltaPro3PlugInInfoPvLDcAmpMaxCommandSchema,
    );
  }

  /**
   * Sets the maximum input current of the high-voltage PV port.
   *
   * @example
   * ```typescript
   *   await device.setHighVoltageMaxInput(12);
   * ```
   */
  async setHighVoltageMaxInput(input: number) {
    const payload: DeltaPro3PlugInInfoPvHDcAmpMaxCommand =
      this.#payloadDefaults({
        cfgPlugInInfoPvHDcAmpMax: input,
      });
    return this.sendCommand(
      payload,
      deltaPro3PlugInInfoPvHDcAmpMaxCommandSchema,
    );
  }

  /**
   * Sets the maximum AC charging power.
   *
   * @example
   * ```typescript
   *   await device.setMaxAcChargingPower(3000);
   * ```
   */
  async setMaxAcChargingPower(input: number) {
    const payload: DeltaPro3SetMaxAcChargingPowCommand = this.#payloadDefaults({
      cfgPlugInInfoAcInChgPowMax: input,
    });
    return this.sendCommand(payload, deltaPro3SetMaxAcChargingPowCommandSchema);
  }

  /**
   * Maximum charging power of the Power In/Out port.
   *
   * @example
   * ```typescript
   *   await device.setMaxChargingPowerIOPort(1800);
   * ```
   */
  async setMaxChargingPowerIOPort(input: number) {
    const payload: DeltaPro3MaxChargingPowIOCommand = this.#payloadDefaults({
      cfgPlugInInfo5p8ChgPowMax: input,
    });
    return this.sendCommand(payload, deltaPro3MaxChargingPowIOCommandSchema);
  }

  /**
   * Smart Generator auto start/stop switch.
   *
   * @example
   * ```typescript
   *   await device.enableSmartGeneratorAutoStart(true);
   * ```
   */
  async enableSmartGeneratorAutoStart(input: boolean) {
    const payload: DeltaPro3CmsOilSelfStartCommand = this.#payloadDefaults({
      cfgCmsOilSelfStart: input,
    });
    return this.sendCommand(payload, deltaPro3CmsOilSelfStartCommandSchema);
  }

  /**
   * Sets the SOC that automatically starts the Smart Generator.
   *
   * @example
   * ```typescript
   *   await device.setSmartGeneratorAutoStartSOC(30);
   * ```
   */
  async setSmartGeneratorAutoStartSOC(input: number) {
    const payload: DeltaPro3CmsOilOnSocCommand = this.#payloadDefaults({
      cfgCmsOilOnSoc: input,
    });
    return this.sendCommand(payload, deltaPro3CmsOilOnSocCommandSchema);
  }

  /**
   * Sets the SOC that automatically stops the Smart Generator.
   *
   * @example
   * ```typescript
   *   await device.setSmartGeneratorAutoOffSOC(30);
   * ```
   */
  async setSmartGeneratorAutoOffSOC(input: number) {
    const payload: DeltaPro3CmsOilOffSocCommand = this.#payloadDefaults({
      cfgCmsOilOffSoc: input,
    });
    return this.sendCommand(payload, deltaPro3CmsOilOffSocCommandSchema);
  }

  /**
   * GFCI switch.
   *
   * @example
   * ```typescript
   *   await device.enableGFCI(true);
   * ```
   */
  async enableGFCI(input: boolean) {
    const payload: DeltaPro3LlcGFCIFlagCommand = this.#payloadDefaults({
      cfgLlcGFCIFlag: input,
    });
    return this.sendCommand(payload, deltaPro3LlcGFCIFlagCommandSchema);
  }

  /**
   * Sets Bluetooth timeout.
   *
   * @example
   * ```typescript
   *   await device.setBluetoothTimeout(200);
   * ```
   */
  async setBluetoothTimeout(input: number) {
    const payload: DeltaPro3BleStandbyTimeCommand = this.#payloadDefaults({
      cfgBleStandbyTime: input,
    });
    return this.sendCommand(payload, deltaPro3BleStandbyTimeCommandSchema);
  }

  /**
   * AC energy-saving mode switch.
   *
   * @example
   * ```typescript
   *   await device.enableAcEnergySavingMode(true);
   * ```
   */
  async enableAcEnergySavingMode(input: boolean) {
    const payload: DeltaPro3AcEnergySavingModeCommand = this.#payloadDefaults({
      cfgAcEnergySavingOpen: input,
    });
    return this.sendCommand(payload, deltaPro3AcEnergySavingModeCommandSchema);
  }

  /**
   * Battery charging/discharging order.
   * 0: default
   * 1: The device will automatically decide the charge and discharge order based on each battery's voltage.
   * 2: The main battery is prioritized during charging, and extra batteries are prioritized during discharging.
   *
   * @example
   * ```typescript
   *   await device.setBatteryChargingDischargingOrder(1);
   * ```
   */
  async setBatteryChargingDischargingOrder(input: number) {
    const payload: DeltaPro3BatterChargingOrderCommand = this.#payloadDefaults({
      cfgMultiBpChgDsgMode: input,
    });
    return this.sendCommand(payload, deltaPro3BatterChargingOrderCommandSchema);
  }
}

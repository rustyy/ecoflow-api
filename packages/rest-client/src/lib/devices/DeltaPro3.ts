import {
  DeltaPro3AcTimeoutCommand,
  deltaPro3AcTimeoutCommandSchema,
  DeltaPro3BeepEnCommand,
  deltaPro3BeepEnCommandSchema,
  DeltaPro3DcTimeoutCommand,
  deltaPro3DcTimeoutCommandSchema,
  DeltaPro3QuotaAll,
  deltaPro3QuotaAllSchema,
  DeltaPro3SerialNumber,
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
}

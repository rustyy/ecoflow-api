import {
  isSmartHomePanelSerialNumber,
  ShpLoadChannelControl,
  shpLoadChannelControlSchema,
  ShpQuotaAll,
  shpQuotaAllSchema,
  ShpRtcTimeUpdate,
  shpRtcTimeUpdateSchema,
  SmartHomePanelSerialNumber,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";
import { z } from "zod";

export class SmartHomePanel extends Device<
  SmartHomePanelSerialNumber,
  ShpQuotaAll
> {
  constructor(restClient: RestClient, sn: SmartHomePanelSerialNumber) {
    super(restClient, sn);

    if (!isSmartHomePanelSerialNumber(sn)) {
      throw new Error("Invalid serial number for SmartHomePanel device.");
    }
  }

  protected parseProperties(data: any) {
    return shpQuotaAllSchema.parse(data);
  }

  #payloadDefaults<T>(params: T) {
    return {
      sn: this.sn,
      operateType: "TCP" as const,
      params: {
        cmdSet: 11 as const,
        ...params,
      },
    };
  }

  /**
   * Update RTC time
   *
   * @example
   * ```typescript
   *   const sn = "SP10*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setRtcTime({
   *     sec: 10,
   *     min: 10,
   *     hour: 10,
   *     day: 5,
   *     week: 6,
   *     month: 10,
   *     year: 2024,
   *   });
   * ```
   */
  async setRtcTime({
    sec,
    min,
    hour,
    day,
    week,
    month,
    year,
  }: {
    sec: number;
    min: number;
    hour: number;
    day: number;
    week: number;
    month: number;
    year: number;
  }) {
    const payload: ShpRtcTimeUpdate = this.#payloadDefaults({
      id: 3 as const,
      sec,
      min,
      hour,
      day,
      week,
      month,
      year,
    });

    return this.sendCommand(payload, shpRtcTimeUpdateSchema);
  }

  /**
   * Load channel control
   *
   * @example
   * ```typescript
   *   const sn = "SP10*****";
   *   const client = new RestClient({
   *     accessKey: "my-access-key",
   *     secretKey: "my-secret-key",
   *     host: "https://api-e.ecoflow.com",
   *   });
   *
   *   const device = client.getDevice(sn);
   *   await device.setLoadChannelControl({ch:1, ctrlMode:1, sta:1});
   * ```
   */
  async setLoadChannelControl({
    ch,
    ctrlMode,
    sta,
  }: {
    ch: number;
    ctrlMode: number;
    sta: number;
  }) {
    const payload: ShpLoadChannelControl = this.#payloadDefaults({
      id: 16 as const,
      ch,
      ctrlMode,
      sta,
    });

    return this.sendCommand(payload, shpLoadChannelControlSchema);
  }
}

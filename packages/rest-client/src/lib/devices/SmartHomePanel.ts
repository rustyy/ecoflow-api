import {
  isSmartHomePanelSerialNumber,
  ShpChannelCurrentConfig,
  shpChannelCurrentConfigSchema,
  ShpGridPowerParamConfig,
  shpGridPowerParamConfigSchema,
  ShpLoadChannelControl,
  shpLoadChannelControlSchema,
  ShpQuotaAll,
  shpQuotaAllSchema,
  ShpRtcTimeUpdate,
  shpRtcTimeUpdateSchema,
  ShpSplitPhaseInfoCfgList,
  ShpSplitPhaseInfoConfig,
  shpSplitPhaseInfoConfigSchema,
  ShpStandbyChannelControl,
  shpStandbyChannelControlSchema,
  SmartHomePanelSerialNumber,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";

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

  /**
   * Standby channel control
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
   *   await device.setStandbyChannelControl({ch:1, ctrlMode:1, sta:1});
   * ```
   */
  async setStandbyChannelControl({
    ch,
    ctrlMode,
    sta,
  }: {
    ch: number;
    ctrlMode: number;
    sta: number;
  }) {
    const payload: ShpStandbyChannelControl = this.#payloadDefaults({
      id: 17 as const,
      ch,
      ctrlMode,
      sta,
    });

    return this.sendCommand(payload, shpStandbyChannelControlSchema);
  }

  /**
   * Set split phase info config
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
   *   await device.setSplitPhaseInfoConfig([
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *      {linkCh: 0, linkMark: 0},
   *   ]);
   * ```
   */
  async setSplitPhaseInfoConfig(cfgList: ShpSplitPhaseInfoCfgList) {
    const payload: ShpSplitPhaseInfoConfig = this.#payloadDefaults({
      id: 18 as const,
      cfgList,
    });

    return this.sendCommand(payload, shpSplitPhaseInfoConfigSchema);
  }

  /**
   * Set channel current configuration
   */
  async setChannelCurrentConfiguration({
    channel,
    cur,
  }: {
    channel: number;
    cur: 6 | 13 | 16 | 20 | 30;
  }) {
    const payload: ShpChannelCurrentConfig = this.#payloadDefaults({
      id: 20 as const,
      chNum: channel,
      cur,
    });

    return this.sendCommand(payload, shpChannelCurrentConfigSchema);
  }

  /**
   * Set grid power configuration
   */
  async setGridPowerConfiguration({
    gridVol,
    gridFreq,
  }: {
    gridVol: number;
    gridFreq: number;
  }) {
    const payload: ShpGridPowerParamConfig = this.#payloadDefaults({
      id: 22 as const,
      gridVol,
      gridFreq,
    });

    return this.sendCommand(payload, shpGridPowerParamConfigSchema);
  }
}

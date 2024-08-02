import {
  ChSta,
  isSmartHomePanelSerialNumber,
  ShpChannelCurrentConfig,
  shpChannelCurrentConfigSchema,
  ShpChannelEnableStatusConfig,
  shpChannelEnableStatusConfigSchema,
  ShpEmergencyMode,
  shpEmergencyModeSchema,
  ShpEpsModeConfig,
  shpEpsModeConfigSchema,
  ShpGridPowerParamConfig,
  shpGridPowerParamConfigSchema,
  ShpLoadChannelControl,
  shpLoadChannelControlSchema,
  ShpLoadChannelInfoConfig,
  shpLoadChannelInfoConfigSchema,
  ShpPushStandbyChargeDischargeParams,
  shpPushStandbyChargeDischargeParamsSchema,
  ShpQuotaAll,
  shpQuotaAllSchema,
  ShpRegionInfoConfig,
  shpRegionInfoConfigSchema,
  ShpRtcTimeUpdate,
  shpRtcTimeUpdateSchema,
  ShpScheduledChargingJob,
  ShpScheduledChargingJobCfg,
  shpScheduledChargingJobSchema,
  ShpScheduledDischargingJob,
  ShpScheduledDischargingJobCfg,
  shpScheduledDischargingJobSchema,
  ShpSetConfigStatus,
  shpSetConfigStatusSchema,
  ShpSplitPhaseInfoCfgList,
  ShpSplitPhaseInfoConfig,
  shpSplitPhaseInfoConfigSchema,
  ShpStandbyChannelControl,
  shpStandbyChannelControlSchema,
  ShpStartSelfCheck,
  shpStartSelfCheckSchema,
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
   *   await device.setChannelCurrentConfiguration({
   *    channel: 2,
   *    cur: 6,
   *   });
   * ```
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
   *   await device.setGridPowerConfiguration({
   *    gridVol: 220,
   *    gridFreq: 50,
   *   });
   * ```
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

  /**
   * EPS mode configuration (eps: 0: off, 1: on)
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
   *   await device.enableEpsMode(1);
   * ```
   */
  async enableEpsMode(enabled: 0 | 1) {
    const payload: ShpEpsModeConfig = this.#payloadDefaults({
      id: 24 as const,
      eps: enabled,
    });

    return this.sendCommand(payload, shpEpsModeConfigSchema);
  }

  /**
   * Enable channel status
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
   *   await device.enableChannelStatus({
   *    channel: 1,
   *    enable: 1,
   *   });
   * ```
   */
  async enableChannelStatus({
    channel,
    enable,
  }: {
    channel: number;
    enable: 0 | 1;
  }) {
    const payload: ShpChannelEnableStatusConfig = this.#payloadDefaults({
      id: 26 as const,
      isEnable: enable,
      chNum: channel,
    });

    return this.sendCommand(payload, shpChannelEnableStatusConfigSchema);
  }

  /**
   * Set load channel info
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
   *   await device.setLoadChannelInfo({
   *    channel: 1,
   *    channelName: "my-channel",
   *    iconInfo: 10,
   *   });
   * ```
   */
  async setLoadChannelInfo({
    channel,
    channelName,
    iconInfo,
  }: {
    channel: number;
    channelName: string;
    iconInfo: number;
  }) {
    const payload: ShpLoadChannelInfoConfig = this.#payloadDefaults({
      id: 32 as const,
      chNum: channel,
      info: {
        chName: channelName,
        iconInfo,
      },
    });

    return this.sendCommand(payload, shpLoadChannelInfoConfigSchema);
  }

  /**
   * Set region info
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
   *   await device.setRegionInfo("US,somewhere");
   * ```
   */
  async setRegionInfo(area: string) {
    const payload: ShpRegionInfoConfig = this.#payloadDefaults({
      id: 34 as const,
      area,
    });

    return this.sendCommand(payload, shpRegionInfoConfigSchema);
  }

  /**
   * Set emergency mode
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
   *   await device.setEmergencyMode({
   *    isCfg: 1,
   *    backupMode: 1,
   *    overloadMode: 1,
   *    chSta: [
   *      { "priority": 1, "isEnable": 1 },
   *      { "priority": 1, "isEnable": 1 },
   *      { "priority": 2, "isEnable": 1 },
   *      { "priority": 3, "isEnable": 1 },
   *      { "priority": 4, "isEnable": 1 },
   *      { "priority": 5, "isEnable": 1 },
   *      { "priority": 6, "isEnable": 1 },
   *      { "priority": 7, "isEnable": 1 },
   *      { "priority": 8, "isEnable": 1 },
   *      { "priority": 9, "isEnable": 1 }
   *    ]
   *   });
   * ```
   */
  async setEmergencyMode({
    isCfg,
    backupMode,
    overloadMode,
    chSta,
  }: {
    isCfg: 0 | 1;
    backupMode: 0 | 1;
    overloadMode: 0 | 1;
    chSta: ChSta[];
  }) {
    const payload: ShpEmergencyMode = this.#payloadDefaults({
      id: 64 as const,
      isCfg,
      backupMode,
      overloadMode,
      chSta,
    });

    return this.sendCommand(payload, shpEmergencyModeSchema);
  }

  /**
   * Set scheduled charging job
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
   *   await device.setScheduledChargingJob({
   *     cfgIndex: 1,
   *     cfg: {
   *       "param": {
   *         "lowBattery": 95,
   *         "chChargeWatt": 2000,
   *         "chSta": [
   *           1,
   *           0
   *         ],
   *         "hightBattery": 100
   *       },
   *       "comCfg": {
   *         "timeScale": [
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           255,
   *           127
   *         ],
   *         "isCfg": 1,
   *         "type": 1,
   *         "timeRange": {
   *           "isCfg": 1,
   *           "startTime": {
   *             "sec": 0,
   *             "min": 0,
   *             "week": 4,
   *             "hour": 0,
   *             "month": 1,
   *             "year": 2023,
   *             "day": 11
   *           },
   *           "timeMode": 0,
   *           "endTime": {
   *             "sec": 59,
   *             "min": 59,
   *             "week": 7,
   *             "hour": 23,
   *             "month": 1,
   *             "year": 2023,
   *             "day": 22
   *           },
   *           "mode1": {
   *             "thur": 0,
   *             "sat": 0,
   *             "wed": 0,
   *             "tues": 0,
   *             "fri": 0,
   *             "sun": 0,
   *             "mon": 0
   *           },
   *           "isEnable": 1
   *         },
   *         "isEnable": 1,
   *         "setTime": {
   *           "sec": 35,
   *           "min": 53,
   *           "week": 4,
   *           "hour": 15,
   *           "month": 1,
   *           "year": 2023,
   *           "day": 11
   *         }
   *       }
   *     }
   *   });
   * ```
   */
  async setScheduledChargingJob({
    cfgIndex,
    cfg,
  }: {
    cfgIndex: number;
    cfg: ShpScheduledChargingJobCfg;
  }) {
    const payload: ShpScheduledChargingJob = this.#payloadDefaults({
      id: 81 as const,
      cfgIndex,
      cfg,
    });

    return this.sendCommand(payload, shpScheduledChargingJobSchema);
  }

  /**
   * Set scheduled discharging job
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
   *   await device.setScheduledChargingJob({
   *    cfgIndex: 1,
   *    cfg: {
   *       "chSta": [
   *         1,
   *         1,
   *         1,
   *         1,
   *         1,
   *         1,
   *         1,
   *         1,
   *         1,
   *         1
   *       ],
   *       "comCfg": {
   *         "timeScale": [
   *           1,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0,
   *           0
   *         ],
   *         "isCfg": 1,
   *         "type": 2,
   *         "timeRange": {
   *           "isCfg": 1,
   *           "timeMode": 0,
   *           "startTime": {
   *             "sec": 0,
   *             "min": 0,
   *             "week": 2,
   *             "hour": 0,
   *             "month": 10,
   *             "year": 2022,
   *             "day": 24
   *           },
   *           "endTime": {
   *             "sec": 59,
   *             "min": 59,
   *             "week": 2,
   *             "hour": 23,
   *             "month": 10,
   *             "year": 2022,
   *             "day": 25
   *           },
   *           "isEnable": 1
   *         },
   *         "isEnable": 1,
   *         "setTime": {
   *           "sec": 61,
   *           "min": 9,
   *           "week": 7,
   *           "hour": 16,
   *           "month": 11,
   *           "year": 2022,
   *           "day": 15
   *         }
   *       }
   *     }
   *   });
   * ```
   */
  async setScheduledDischargingJob({
    cfgIndex,
    cfg,
  }: {
    cfgIndex: number;
    cfg: ShpScheduledDischargingJobCfg;
  }) {
    const payload: ShpScheduledDischargingJob = this.#payloadDefaults({
      id: 82 as const,
      cfgIndex,
      cfg,
    });

    return this.sendCommand(payload, shpScheduledDischargingJobSchema);
  }

  /**
   * Set configuration status
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
   *   await device.setConfigurationStatus(1);
   * ```
   */
  async setConfigurationStatus(cfgSta: number) {
    const payload: ShpSetConfigStatus = this.#payloadDefaults({
      id: 7 as const,
      cfgSta,
    });

    return this.sendCommand(payload, shpSetConfigStatusSchema);
  }

  /**
   * Start self check
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
   *   await device.setStartSelfCheck(1);
   * ```
   */
  async setStartSelfCheck(selfCheckType: number) {
    const payload: ShpStartSelfCheck = this.#payloadDefaults({
      id: 112 as const,
      selfCheckType,
    });

    return this.sendCommand(payload, shpStartSelfCheckSchema);
  }

  /**
   * Set standby charging and discharging parameters
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
   *   await device.setStandByChargingDischargingParameters({
   *     discLower: 10,
   *     forceChargeHigh: 20,
   *   });
   * ```
   */
  async setStandByChargingDischargingParameters({
    discLower,
    forceChargeHigh,
  }: {
    discLower: number;
    forceChargeHigh: number;
  }) {
    const payload: ShpPushStandbyChargeDischargeParams = this.#payloadDefaults({
      id: 29 as const,
      discLower,
      forceChargeHigh,
    });

    return this.sendCommand(payload, shpPushStandbyChargeDischargeParamsSchema);
  }
}

import { z } from "zod";
import { smartHomePanelSerialNumberSchema } from "./serialNumber";
import { secToYear, zeroOrOne } from "../shared";

const defaultSchema = z.object({
  sn: smartHomePanelSerialNumberSchema,
  operateType: z.literal("TCP"),
});

/**
 * RTC time update
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *        "cmdSet": 11,
 *        "id": 3,
 *        "week": 2,
 *        "sec": 17,
 *        "min": 38,
 *        "hour": 18,
 *        "day": 16,
 *        "month": 11,
 *        "year": 2022
 *    }
 * }
 * ```
 */
export const shpRtcTimeUpdateSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(3),
    week: z.number().int(),
    sec: z.number().int(),
    min: z.number().int(),
    hour: z.number().int(),
    day: z.number().int(),
    month: z.number().int(),
    year: z.number().int(),
  }),
});

export type ShpRtcTimeUpdate = z.infer<typeof shpRtcTimeUpdateSchema>;

/**
 * Load channel control
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *      "cmdSet": 11,
 *      "id": 16,
 *      "ch": 1,
 *      "ctrlMode": 1,
 *      "sta": 1
 *    }
 * }
 * ```
 */
export const shpLoadChannelControlSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(16),
    ch: z.number().int(),
    ctrlMode: z.number().int(),
    sta: z.number().int(),
  }),
});

export type ShpLoadChannelControl = z.infer<typeof shpLoadChannelControlSchema>;

/**
 * Standby channel control
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *        "cmdSet": 11,
 *        "id": 17,
 *        "ch": 10,
 *        "ctrlMode": 1,
 *        "sta": 1
 *    }
 * }
 * ```
 */
export const shpStandbyChannelControlSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(17),
    ch: z.number().int(),
    ctrlMode: z.number().int(),
    sta: z.number().int(),
  }),
});

export type ShpStandbyChannelControl = z.infer<
  typeof shpStandbyChannelControlSchema
>;

/**
 * Split-phase information configuration
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *        "cmdSet": 11,
 *        "id": 18,
 *        "cfgList": [
 *            { "linkMark": 1, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 },
 *            { "linkMark": 0, "linkCh": 0 }
 *       ]
 *    }
 * }
 * ```
 */
export const shpSplitPhaseInfoCfgListSchema = z.array(
  z.object({
    linkMark: z.number().int(),
    linkCh: z.number().int(),
  }),
);

export type ShpSplitPhaseInfoCfgList = z.infer<
  typeof shpSplitPhaseInfoCfgListSchema
>;

export const shpSplitPhaseInfoConfigSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(18),
    cfgList: shpSplitPhaseInfoCfgListSchema,
  }),
});

export type ShpSplitPhaseInfoConfig = z.infer<
  typeof shpSplitPhaseInfoConfigSchema
>;

/**
 * Channel current configuration (cur: 6, 13, 16, 20, 30)
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *       "cmdSet": 11,
 *       "id": 20,
 *       "chNum": 0,
 *       "cur": 6
 *    }
 * }
 * ```
 */
export const shpChannelCurrentConfigSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(20),
    chNum: z.number().int(),
    cur: z
      .literal(6)
      .or(z.literal(13))
      .or(z.literal(16))
      .or(z.literal(20))
      .or(z.literal(30)),
  }),
});

export type ShpChannelCurrentConfig = z.infer<
  typeof shpChannelCurrentConfigSchema
>;

/**
 * Grid power parameter configuration (gridVol: 220 230 240)
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *        "cmdSet": 11,
 *        "id": 22,
 *        "gridVol": 230,
 *        "gridFreq": 50
 *    }
 * }
 * ```
 */
export const shpGridPowerParamConfigSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(22),
    gridVol: z.number().int().min(220).max(240),
    gridFreq: z.number().int(),
  }),
});

export type ShpGridPowerParamConfig = z.infer<
  typeof shpGridPowerParamConfigSchema
>;

/**
 * EPS mode configuration (eps: 0: off, 1: on)
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *        "cmdSet": 11,
 *        "id": 24,
 *        "eps": 1
 *    }
 * }
 * ```
 */
export const shpEpsModeConfigSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(24),
    eps: zeroOrOne,
  }),
});

export type ShpEpsModeConfig = z.infer<typeof shpEpsModeConfigSchema>;

/**
 * Channel enable status configuration(chNum: 0–9, isEnable, 0: off, 1: on)
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *      "cmdSet": 11,
 *      "id": 26,
 *      "isEnable": 1,
 *      "chNum": 1
 *    }
 * }
 * ```
 */
export const shpChannelEnableStatusConfigSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(26),
    isEnable: zeroOrOne,
    chNum: z.number().int().min(0).max(9),
  }),
});

export type ShpChannelEnableStatusConfig = z.infer<
  typeof shpChannelEnableStatusConfigSchema
>;

/**
 * Load channel information configuration(chNum 0~9 )
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *        "cmdSet": 11,
 *        "id": 32,
 *        "chNum": 1,
 *        "info": {
 *            "chName": "test",
 *            "iconInfo": 10
 *        }
 *    }
 * }
 * ```
 */
export const shpLoadChannelInfoConfigSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(32),
    chNum: z.number().int().min(0).max(9),
    info: z.object({
      chName: z.string(),
      iconInfo: z.number().int(),
    }),
  }),
});

export type ShpLoadChannelInfoConfig = z.infer<
  typeof shpLoadChannelInfoConfigSchema
>;

/**
 * Region information configuration
 *
 * @example
 * ```json
 * {
 *    "sn": "SP10*****",
 *    "operateType": "TCP",
 *    "params": {
 *      "cmdSet": 11,
 *      "id": 34,
 *      "area": "US, China"
 *    }
 * }
 * ```
 */
export const shpRegionInfoConfigSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(34),
    area: z.string(),
  }),
});

export type ShpRegionInfoConfig = z.infer<typeof shpRegionInfoConfigSchema>;

/**
 * Setting the emergency mode
 *
 * @example
 * ```json
 * {
 *      "sn": "SP10*****",
 *      "operateType": "TCP",
 *      "params": {
 *          "cmdSet": 11,
 *          "id": 64,
 *          "isCfg": 1,
 *          "backupMode": 1,
 *          "overloadMode": 1,
 *          "chSta": [
 *              { "priority": 1, "isEnable": 1 },
 *              { "priority": 1, "isEnable": 1 },
 *              { "priority": 2, "isEnable": 1 },
 *              { "priority": 3, "isEnable": 1 },
 *              { "priority": 4, "isEnable": 1 },
 *              { "priority": 5, "isEnable": 1 },
 *              { "priority": 6, "isEnable": 1 },
 *              { "priority": 7, "isEnable": 1 },
 *              { "priority": 8, "isEnable": 1 },
 *              { "priority": 9, "isEnable": 1 }
 *          ]
 *      }
 * }
 * ```
 */
export const chStaSchema = z.object({
  priority: z.number().int(),
  isEnable: zeroOrOne,
});

export type ChSta = z.infer<typeof chStaSchema>;

export const shpEmergencyModeSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(64),
    isCfg: zeroOrOne,
    backupMode: zeroOrOne,
    overloadMode: zeroOrOne,
    chSta: chStaSchema.array(),
  }),
});

export type ShpEmergencyMode = z.infer<typeof shpEmergencyModeSchema>;

/**
 * Setting the scheduled charging job
 *
 * @example
 * ```json
 * {
 *   "sn": "SP10*****",
 *   "operateType": "TCP",
 *   "params": {
 *     "cfg": {
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
 *     },
 *     "cfgIndex": 1,
 *     "cmdSet": 11,
 *     "id": 81
 *   }
 * }
 * ```
 */
export const shpScheduledChargingJobCfgSchema = z.object({
  param: z.object({
    lowBattery: z.number().int(),
    chChargeWatt: z.number().int(),
    chSta: z.array(z.number().int()),
    hightBattery: z.number().int(),
  }),
  comCfg: z.object({
    timeScale: z.array(z.number().int()),
    isCfg: zeroOrOne,
    type: z.number().int(),
    timeRange: z.object({
      isCfg: zeroOrOne,
      startTime: secToYear,
      timeMode: z.number().int(),
      endTime: secToYear,
      mode1: z.object({
        thur: z.number().int(),
        sat: z.number().int(),
        wed: z.number().int(),
        tues: z.number().int(),
        fri: z.number().int(),
        sun: z.number().int(),
        mon: z.number().int(),
      }),
      isEnable: zeroOrOne,
    }),
    isEnable: zeroOrOne,
    setTime: secToYear,
  }),
});

export type ShpScheduledChargingJobCfg = z.infer<
  typeof shpScheduledChargingJobCfgSchema
>;

export const shpScheduledChargingJobSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(81),
    cfgIndex: z.number().int(),
    cfg: shpScheduledChargingJobCfgSchema,
  }),
});

export type ShpScheduledChargingJob = z.infer<
  typeof shpScheduledChargingJobSchema
>;

/**
 * Setting the scheduled discharging job
 *
 * @example
 * ```json
 * {
 *   "sn": "SP10*****",
 *   "operateType": "TCP",
 *   "params": {
 *     "cfg": {
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
 *     },
 *     "cfgIndex": 0,
 *     "cmdSet": 11,
 *     "id": 82
 *   }
 * }
 * ```
 */
export const shpScheduledDischargingJobCfgSchema = z.object({
  chSta: z.array(z.number().int()),
  comCfg: z.object({
    timeScale: z.array(z.number().int()),
    isCfg: zeroOrOne,
    type: z.number().int(),
    timeRange: z.object({
      isCfg: zeroOrOne,
      timeMode: z.number().int(),
      startTime: secToYear,
      endTime: secToYear,
      isEnable: zeroOrOne,
    }),
    isEnable: zeroOrOne,
    setTime: secToYear,
  }),
});
export type ShpScheduledDischargingJobCfg = z.infer<
  typeof shpScheduledDischargingJobCfgSchema
>;

export const shpScheduledDischargingJobSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(82),
    cfgIndex: z.number().int(),
    cfg: shpScheduledDischargingJobCfgSchema,
  }),
});

export type ShpScheduledDischargingJob = z.infer<
  typeof shpScheduledDischargingJobSchema
>;

/**
 * Setting the configuration status
 *
 * @example
 * ```json
 * {
 *   "sn": "SP10*****",
 *   "operateType": "TCP",
 *   "params": {
 *     "cmdSet": 11,
 *     "id": 7,
 *     "cfgSta": 1
 *   }
 * }
 * ```
 */
export const shpSetConfigStatusSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(7),
    cfgSta: z.number().int(),
  }),
});

export type ShpSetConfigStatus = z.infer<typeof shpSetConfigStatusSchema>;

/**
 * Start self-check information pushing
 *
 * @example
 * ```json
 * {
 *   "sn": "SP10*****",
 *   "operateType": "TCP",
 *   "params": {
 *     "cmdSet": 11,
 *     "id": 112,
 *     "selfCheckType": 1
 *   }
 * }
 * ```
 */
export const shpStartSelfCheckSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(112),
    selfCheckType: z.number().int(),
  }),
});

export type ShpStartSelfCheck = z.infer<typeof shpStartSelfCheckSchema>;

/**
 * Pushing standby charging/discharging parameters
 *
 * @example
 * ```json
 * {
 *   "sn": "SP10*****",
 *   "operateType": "TCP",
 *   "params": {
 *     "cmdSet": 11,
 *     "id": 29,
 *     "forceChargeHigh": 0,
 *     "discLower": 0
 *   }
 * }
 * ```
 */
export const shpPushStandbyChargeDischargeParamsSchema = defaultSchema.extend({
  params: z.object({
    cmdSet: z.literal(11),
    id: z.literal(29),
    forceChargeHigh: z.number().int(),
    discLower: z.number().int(),
  }),
});

export type ShpPushStandbyChargeDischargeParams = z.infer<
  typeof shpPushStandbyChargeDischargeParamsSchema
>;

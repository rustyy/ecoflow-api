import { z } from "zod";
import { deltaProSerialNumberSchema } from "./serialNumber";
import { integer, zeroOrOne } from "../shared";

const defaultSchema = z.object({
  sn: deltaProSerialNumberSchema,
});

const defaultParams = z.object({
  cmdSet: z.literal(32),
});

/**
 * Setting the X-Boost switch
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *       "cmdSet": 32,
 *       "id": 66,
 *       "enabled": 0,
 *       "xboost": 0
 *    }
 * }
 * ```
 */
export const deltaProSetXBoostSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(66),
    enabled: zeroOrOne,
    xboost: zeroOrOne,
  }),
});

export type DeltaProSetXBoost = z.infer<typeof deltaProSetXBoostSchema>;

/**
 * Setting the car charger switch
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *      "cmdSet": 32,
 *      "id": 81,
 *      "enabled": 1
 *    }
 * }
 * ```
 */
export const deltaProSetCarChargerSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(81),
    enabled: zeroOrOne,
  }),
});

export type DeltaProSetCarCharger = z.infer<typeof deltaProSetCarChargerSchema>;

/**
 * Setting the charge level
 *
 * @example
 *
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *        "cmdSet": 32,
 *        "id": 49,
 *        "maxChgSoc": 100
 *    }
 * }
 * ```
 */
export const deltaProSetChargeLevelSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(49),
    maxChgSoc: z.number().int().min(0).max(100),
  }),
});

export type DeltaProSetChargeLevel = z.infer<
  typeof deltaProSetChargeLevelSchema
>;

/**
 * Setting the discharge level
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *        "cmdSet": 32,
 *        "id": 51,
 *        "minDsgSoc": 10
 *    }
 * }
 * ```
 */
export const deltaProSetDischargeLevelSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(51),
    minDsgSoc: z.number().int().min(0).max(100),
  }),
});

export type DeltaProSetDischargeLevel = z.infer<
  typeof deltaProSetDischargeLevelSchema
>;

/**
 * Setting the car input current
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *       "cmdSet": 32,
 *       "id": 71,
 *       "currMa": 4000
 *    }
 * }
 * ```
 */
export const deltaProSetCarInputCurrentSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(71),
    currMa: z.number().int(),
  }),
});

export type DeltaProSetCarInputCurrent = z.infer<
  typeof deltaProSetCarInputCurrentSchema
>;

/**
 * Setting the beep switch
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *      "cmdSet": 32,
 *      "id": 38,
 *      "enabled": 1
 *    }
 * }
 * ```
 */
export const deltaProSetBeepSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(38),
    enabled: zeroOrOne,
  }),
});

export type DeltaProSetBeep = z.infer<typeof deltaProSetBeepSchema>;

/**
 * Setting the screen brightness
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *      "cmdSet": 32,
 *      "id": 39,
 *      "lcdBrightness": 100
 *    }
 * }
 * ```
 */
export const deltaProSetScreenBrightnessSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(39),
    lcdBrightness: z.number().int(),
  }),
});

export type DeltaProSetScreenBrightness = z.infer<
  typeof deltaProSetScreenBrightnessSchema
>;

/**
 * Setting the lower threshold percentage of smart generator auto on
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *       "cmdSet": 32,
 *       "id": 52,
 *       "openOilSoc": 52
 *    }
 * }
 * ```
 */
export const deltaProSetSmartGeneratorAutoOnSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(52),
    openOilSoc: z.number().int().min(0).max(100),
  }),
});

export type DeltaProSetSmartGeneratorAutoOn = z.infer<
  typeof deltaProSetSmartGeneratorAutoOnSchema
>;

/**
 * Setting the upper threshold percentage of smart generator auto off
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *      "cmdSet": 32,
 *      "id": 53,
 *      "closeOilSoc": 10
 *    }
 * }
 * ```
 */
export const deltaProSetSmartGeneratorAutoOffSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(53),
    closeOilSoc: z.number().int().min(0).max(100),
  }),
});

export type DeltaProSetSmartGeneratorAutoOff = z.infer<
  typeof deltaProSetSmartGeneratorAutoOffSchema
>;

/**
 * Setting the unit timeout
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *      "cmdSet": 32,
 *      "id": 33,
 *      "standByMode": 0
 *    }
 * }
 * ```
 */
export const deltaProSetUnitTimeoutSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(33),
    standByMode: integer,
  }),
});

export type DeltaProSetUnitTimeout = z.infer<
  typeof deltaProSetUnitTimeoutSchema
>;

/**
 * Setting the screen timeout
 *
 * @example
 * ```json
 * {
 *  "sn": "DCABZ*****",
 *  "params": {
 *    "cmdSet": 32,
 *    "id": 39,
 *    "lcdTime": 60
 *  }
 * }
 * ```
 */
export const deltaProSetScreenTimeoutSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(39),
    lcdTime: integer,
  }),
});

export type DeltaProSetScreenTimeout = z.infer<
  typeof deltaProSetScreenTimeoutSchema
>;

/**
 * Setting the AC standby time
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *      "cmdSet": 32,
 *      "id": 153,
 *      "standByMins": 720
 *    }
 * }
 * ```
 */
export const deltaProSetACStandbyTimeSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(153),
    standByMins: integer,
  }),
});

export type DeltaProSetACStandbyTime = z.infer<
  typeof deltaProSetACStandbyTimeSchema
>;

/**
 * AC charging settings
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *      "cmdSet": 32,
 *      "id": 69,
 *      "slowChgPower": 0
 *    }
 * }
 * ```
 */
export const deltaProSetACChargingSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(69),
    slowChgPower: integer,
  }),
});

export type DeltaProSetACCharging = z.infer<typeof deltaProSetACChargingSchema>;

/**
 * PV charging type
 *
 * @example
 * ```json
 * {
 *    "sn": "DCABZ*****",
 *    "params": {
 *      "cmdSet": 32,
 *      "id": 82,
 *      "chgType": 0
 *    }
 * }
 * ```
 */
export const deltaProSetPVChargingSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(82),
    chgType: integer,
  }),
});

export type DeltaProSetPVCharging = z.infer<typeof deltaProSetPVChargingSchema>;

/**
 * Bypass AC auto start
 *
 * @example
 * ```json
 * {
 *  "sn": "DCABZ*****",
 *  "params": {
 *    "cmdSet": 32,
 *    "id": 84,
 *    "enabled": 0
 *  }
 * }
 * ```
 */
export const deltaProSetBypassACAutoStartSchema = defaultSchema.extend({
  params: defaultParams.extend({
    id: z.literal(84),
    enabled: zeroOrOne,
  }),
});

export type DeltaProSetBypassACAutoStart = z.infer<
  typeof deltaProSetBypassACAutoStartSchema
>;

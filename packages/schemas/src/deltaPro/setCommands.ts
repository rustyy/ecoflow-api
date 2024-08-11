import { z } from "zod";
import { deltaProSerialNumberSchema } from "./serialNumber";
import { zeroOrOne } from "../shared";

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

// Setting the upper threshold percentage of smart generator auto off
// {
// "sn": "DCABZ*****",
// "params": {
// "cmdSet": 32, "id": 53, "closeOilSoc": 10
// }
// }

// Setting the unit timeout
// {
// "sn": "DCABZ*****",
// "params": {
// "cmdSet": 32, "id": 33, "standByMode": 0
// }
// }

// Setting the screen timeout
// {
// "sn": "DCABZ*****",
// "params": {
// "cmdSet": 32, "id": 39, "lcdTime": 60
// }
// }

// Setting the AC standby time
// {
// "sn": "DCABZ*****",
// "params": {
// "cmdSet": 32, "id": 153, "standByMins": 720
// }
// }

// AC charging settings
// {
// "sn": "DCABZ*****",
// "params": {
// "cmdSet": 32, "id": 69, "slowChgPower": 0
// }
// }

// PV charging type
// {
// "sn": "DCABZ*****",
// "params": {
// "cmdSet": 32, "id": 82, "chgType": 0
// }
// }

// Bypass AC auto start
// {
// "sn": "DCABZ*****",
// "params": {
// "cmdSet": 32, "id": 84, "enabled": 0
// }
// }

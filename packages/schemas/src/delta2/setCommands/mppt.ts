/**
 * @file contains all commands for MPPT module (Module type: 5)
 */

import { defaultSchema } from "./shared";
import { z } from "zod";

/**
 * Represents a schema for the MPPT command.
 */
const mpptCommandSchema = defaultSchema.extend({
  moduleType: z.literal(5),
});

/**
 * Schema for the buzzer silent mode command.
 *
 * ```json
 * {
 *      "id": 123456789,
 *      "version":"1.0",
 *      "sn": "R331XXXXXX",
 *      "moduleType": 5,
 *      "operateType": "quietMode",
 *      "params": { "enabled":1 }
 * }
 * ```
 *
 * @extends mpptCommandSchema
 */
export const buzzerSilentModeSchema = mpptCommandSchema.extend({
  operateType: z.literal("quietMode"),
  params: z.object({
    enabled: z.literal(0).or(z.literal(1)),
  }),
});

export type BuzzerSilentMode = z.infer<typeof buzzerSilentModeSchema>;

/**
 * Set car charger switch (1: On; 0: Off)
 *
 * ```json
 * {
 *      "id": 123456789,
 *      "version":"1.0",
 *      "sn": "R331XXXXXX",
 *      "moduleType": 5,
 *      "operateType": "mpptCar",
 *      "params": {
 *          "enabled":1
 *      }
 * }
 * ```
 */
export const carChargerSwitchSchema = mpptCommandSchema.extend({
  operateType: z.literal("mpptCar"),
  params: z.object({
    enabled: z.literal(0).or(z.literal(1)),
  }),
});

export type CarChargerSwitch = z.infer<typeof carChargerSwitchSchema>;

/**
 * A schema for the AC discharge command.
 * Set AC discharge ("enabled" and X-Boost switch settings)
 *
 * ```json
 * {
 *    "id": 123456789,
 *    "version":"1.0",
 *    "sn": "R331XXXXXX",
 *    "moduleType": 5,
 *    "operateType": "acOutCfg",
 *    "params": {
 *       "enabled":0,
 *       "xboost":0,
 *       "out_voltage":30,
 *       "out_freq":1
 *    }
 * }
 * ```
 */
export const acDischargeSchema = mpptCommandSchema.extend({
  operateType: z.literal("acOutCfg"),
  params: z.object({
    enabled: z.literal(0).or(z.literal(1)),
    xboost: z.literal(0).or(z.literal(1)),
    out_voltage: z.number().int(),
    out_freq: z.number().int(),
  }),
});

export type AcDischarge = z.infer<typeof acDischargeSchema>;

/**
 * AC charging settings - chgPauseFlag: 0: AC charging in normal operation
 *
 * ```json
 * {
 *    "id": 123456789,
 *    "version":"1.0",
 *    "sn": "R331XXXXXX",
 *    "moduleType": 5,
 *    "operateType": "acChgCfg",
 *    "params": {
 *       "chgWatts":100,
 *       "chgPauseFlag":0
 *    }
 * }
 * ```
 */
export const acChargingSettingsSchema = mpptCommandSchema.extend({
  operateType: z.literal("acChgCfg"),
  params: z.object({
    chgWatts: z.number().int(),
    chgPauseFlag: z.literal(0).or(z.literal(1)),
  }),
});

export type AcChargingSettings = z.infer<typeof acChargingSettingsSchema>;

/**
 * AC standby time when there is no load
 * (0: never shuts down, default value: 12 x 60 mins, unit: minute)
 *
 * ```json
 * {
 *      "id": 123456789,
 *      "version":"1.0",
 *      "sn": "R331XXXXXX",
 *      "moduleType": 5,
 *      "operateType": "standbyTime",
 *      "params": {
 *          "standbyMins": 180
 *      }
 * }
 * ```
 */
export const acStandbyTimeSchema = mpptCommandSchema.extend({
  operateType: z.literal("standbyTime"),
  params: z.object({
    standbyMins: z.number().int().min(0),
  }),
});

export type AcStandbyTime = z.infer<typeof acStandbyTimeSchema>;

/**
 * Set 12 V DC (car charger) charging current
 * (Maximum DC charging current (mA), range: 4000 mA–10000 mA, default value: 8000 mA)
 *
 * ```json
 * {
 *      "id": 123456789,
 *      "version":"1.0",
 *      "sn": "R331XXXXXX",
 *      "moduleType": 5,
 *      "operateType": "dcChgCfg",
 *      "params": {
 *          "dcChgCfg": 5000
 *      }
 * }
 * ```
 */
export const carChargerDcSchema = mpptCommandSchema.extend({
  operateType: z.literal("dcChgCfg"),
  params: z.object({
    dcChgCfg: z.number().int().min(4000).max(10000),
  }),
});

export type CarChargerDc = z.infer<typeof carChargerDcSchema>;

/**
 * Discriminated union for MPPT commands.
 */
export const delta2MPPTSetCommandSchema = z.discriminatedUnion("operateType", [
  buzzerSilentModeSchema,
  carChargerSwitchSchema,
  acDischargeSchema,
  acChargingSettingsSchema,
  acStandbyTimeSchema,
  carChargerDcSchema,
]);

export type Delta2MPPTSetCommand = z.infer<typeof delta2MPPTSetCommandSchema>;

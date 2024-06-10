import { z } from "zod";
import { delta2SerialNumberSchema } from "./serialNumber";

/**
 * moduleType
 * 1: PD
 * 2: BMS
 * 3: INV
 * 4: BMS_SLAVE
 * 5: MPPT
 */

/**
 * Represents the default schema for an object.
 */
const defaultSchema = z.object({
    sn: delta2SerialNumberSchema,
    id: z.number().int(),
    version: z.literal("1.0"),
});

/**************************************************
 * MPPT
 **************************************************/

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
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"R331ZEB4ZEAL0528",
 *      "moduleType":5,
 *      "operateType":"quietMode",
 *      "params": { "enabled":1 }
 * }
 * ```
 *
 * @extends mpptCommandSchema
 */
const buzzerSilentModeSchema = mpptCommandSchema.extend({
    operateType: z.literal("quietMode"),
    params: z.object({
        enabled: z.literal(0).or(z.literal(1)),
    }),
});

/**
 * Set car charger switch (1: On; 0: Off)
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"R331ZEB4ZEAL0528",
 *      "moduleType":5,
 *      "operateType":"mpptCar",
 *      "params":{ "enabled":1 }
 * }
 * ```
 */
const carChargerSwitchSchema = mpptCommandSchema.extend({
    operateType: z.literal("mpptCar"),
    params: z.object({
        enabled: z.literal(0).or(z.literal(1)),
    }),
});

/**
 * A schema for the AC discharge command.
 * Set AC discharge ("enabled" and X-Boost switch settings)
 *
 * ```json
 * {
 *    "id":123456789,
 *    "version":"1.0",
 *    "sn":"R331ZEB4ZEAL0528",
 *    "moduleType":5,
 *    "operateType":"acOutCfg",
 *    "params": {
 *       "enabled":0,
 *       "xboost":0,
 *       "out_voltage":30,
 *       "out_freq":1
 *    }
 * }
 * ```
 */
const acDischargeSchema = mpptCommandSchema.extend({
    operateType: z.literal("acOutCfg"),
    params: z.object({
        enabled: z.literal(0).or(z.literal(1)),
        xboost: z.literal(0).or(z.literal(1)),
        out_voltage: z.number().int(),
        out_freq: z.number().int(),
    }),
});

/**
 * AC charging settings - chgPauseFlag: 0: AC charging in normal operation
 *
 * ```json
 * {
 *    "id":123456789,
 *    "version":"1.0",
 *    "sn":"R331ZEB4ZEAL0528",
 *    "moduleType":5,
 *    "operateType":"acChgCfg",
 *    "params": {
 *       "chgWatts":100,
 *       "chgPauseFlag":0
 *    }
 * }
 * ```
 */
const acChargingSettingsSchema = mpptCommandSchema.extend({
    operateType: z.literal("acChgCfg"),
    params: z.object({
        chgWatts: z.number().int(),
        chgPauseFlag: z.literal(0).or(z.literal(0)),
    }),
});

/**
 * Discriminated union for all available delta 2 commands.
 */
export const delta2MPPTSetCommandSchema = z.discriminatedUnion("moduleType", [
    buzzerSilentModeSchema,
    carChargerSwitchSchema,
    acDischargeSchema,
    acChargingSettingsSchema,
]);

/**
 * Represents a command object used to perform a delta set operation.
 */
export type Delta2SetCommand = z.infer<typeof delta2MPPTSetCommandSchema>;

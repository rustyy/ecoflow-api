/**
 * @file contains all commands for BMS module (module type: 2)
 */

import { defaultSchema } from "./shared";
import { z } from "zod";
import { delta2PDCommandSchema } from "./pd";

/**
 * Represents a schema for the BMS commands.
 */
const bmsCommandSchema = defaultSchema.extend({
  moduleType: z.literal(2),
});

/**
 * UPS settings (UPS, upper SoC limit when charging)
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"R331XXXXXXX",
 *      "moduleType":2,
 *      "operateType":"upsConfig",
 *      "params":{ "maxChgSoc":50 }
 * }
 * ```
 */
export const upsUpperLimitSchema = bmsCommandSchema.extend({
  operateType: z.literal("upsConfig"),
  params: z.object({
    maxChgSoc: z.number().positive(),
  }),
});

export type UpsUpperLimit = z.infer<typeof upsUpperLimitSchema>;

/**
 * State of charge (SOC) lower limit when discharging
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"R331XXXXXXX",
 *      "moduleType":2,
 *      "operateType":"dsgCfg",
 *      "params":{ "minDsgSoc":19 }
 * }
 * ```
 */
export const upsLowerLimitSchema = bmsCommandSchema.extend({
  operateType: z.literal("dsgCfg"),
  params: z.object({
    minDsgSoc: z.number().positive(),
  }),
});

export type UpsLowerLimit = z.infer<typeof upsLowerLimitSchema>;

/**
 * SoC that triggers EMS to turn on Smart Generator
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"R331XXXXXXX",
 *      "moduleType":2,
 *      "operateType":"openOilSoc",
 *      "params": { "openOilSoc":40 }
 * }
 * ```
 */
export const socTurnOnGeneratorSchema = bmsCommandSchema.extend({
  operateType: z.literal("openOilSoc"),
  params: z.object({
    openOilSoc: z.number().positive(),
  }),
});

export type SocTurnOnGenerator = z.infer<typeof socTurnOnGeneratorSchema>;

/**
 * SOC that triggers EMS to turn off Smart Generator
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"R331XXXXXXX",
 *      "moduleType":2,
 *      "operateType":"closeOilSoc",
 *      "params": { "closeOilSoc":80 }
 * }
 * ```
 */
export const socTurnOffGeneratorSchema = bmsCommandSchema.extend({
  operateType: z.literal("closeOilSoc"),
  params: z.object({
    closeOilSoc: z.number().positive(),
  }),
});

export type SocTurnOffGenerator = z.infer<typeof socTurnOffGeneratorSchema>;

export const delta2BMSCommandSchema = z.discriminatedUnion("operateType", [
  upsUpperLimitSchema,
  upsLowerLimitSchema,
  socTurnOnGeneratorSchema,
  socTurnOffGeneratorSchema,
]);

export type Delta2BMSSetCommand = z.infer<typeof delta2PDCommandSchema>;

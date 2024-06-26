/**
 * @file contains all commands for PD module (module type: 1)
 */
import { defaultSchema } from "./shared";
import { z } from "zod";

const pdCommandSchema = defaultSchema.extend({
  moduleType: z.literal(1),
});

/**
 * Set standby time
 * (0 for never standby; other values indicate the standby time; in minutes)
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"R331ZEB4ZEAL0528",
 *      "moduleType":1,
 *      "operateType": "standbyTime",
 *      "params":{ "standbyMin":0 } }
 * ```
 */
const pdStandByTime = pdCommandSchema.extend({
  operateType: z.literal("standbyTime"),
  params: z.object({
    standbyMin: z.number().int().positive(),
  }),
});

/**
 * Set DC(USB) switch (0: off, 1: on)
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"R331ZEB4ZEAL0528",
 *      "moduleType":1,
 *      "operateType":"dcOutCfg",
 *      "params":{ "enabled": 0 } }
 * ```
 */
const dcUsbSwitchSchema = pdCommandSchema.extend({
  operateType: z.literal("dcOutCfg"),
  params: z.object({
    enabled: z.literal(0).or(z.literal(1)),
  }),
});

/**
 * LCD screen
 * (delayOff: screen timeout, unit: seconds;brightLevel: must be set to 3; other values are invalid.)
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "moduleType":1,
 *      "operateType":"lcdCfg",
 *      "params": {
 *          "delayOff":60,
 *          "brighLevel":1
 *      }
 * }
 * ```
 */
const lcdConfigSchema = pdCommandSchema.extend({
  operateType: z.literal("lcdCfg"),
  params: z.object({
    delayOff: z.number().int().positive(),
    brightLevel: z.literal(3),
  }),
});

/**
 * Prioritize solar charging
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "moduleType":1,
 *      "operateType":"pvChangePrio",
 *      "params":{ "pvChangeSet":1 }
 * }
 * ```
 */
const pvPrioritySchema = pdCommandSchema.extend({
  operateType: z.literal("pvChangePrio"),
  params: z.object({
    pvChangeSet: z.literal(0).or(z.literal(1)),
  }),
});

/**
 * Set energy management
 * - isConfig: energy management configuration, 0: disabled, 1: enabled
 * - bpPowerSoc: backup reserve level;
 * - minDsgSoc: discharge limit (not in use);
 * - minChgSoc: charge limit (not in use))
 *
 * @todo: from the docs it is totally unclear whether this command should be used at all,
 *        minDsgSoc/minChgSoc -> not in use ?
 *        -> as of now this type is just defined for documentation purposes but not exposed to be used.
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "moduleType":1,
 *      "operateType": "watthConfig",
 *      "params": {
 *          "isConfig":1,
 *          "bpPowerSoc":95,
 *          "minDsgSoc":255,
 *          "minChgSoc":255
 *       }
 * }
 * ```
 */
const energyManagementSchema = pdCommandSchema.extend({
  operateType: z.literal("watthConfig"),
  params: z.object({
    isConfig: z.literal(0).or(z.literal(1)),
    // Note that bpPowerSoc depends on minDsgSoc, minChgSoc value.
    bpPowerSoc: z.number().int().positive().min(0).max(100),
    minDsgSoc: z.number().int(),
    minChgSoc: z.number().int(),
  }),
});

/**
 * Set AC always on
 * - acAutoOutConfig: 0: disabled; 1: enabled;
 * - minAcOutSoc: minimum SoC for turning on "AC always on"
 *
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "moduleType":1,
 *      "operateType":"acAutoOutConfig",
 *      "params": {
 *          "acAutoOutConfig":0,
 *          "minAcOutSoc":20
 *      }
 * }
 * ```
 */
const acAlwaysOnSchema = pdCommandSchema.extend({
  operateType: z.literal("acAutoOutConfig"),
  params: z.object({
    acAutoOutConfig: z.literal(0).or(z.literal(1)),
    minAcOutSoc: z.number().int().positive(),
  }),
});

export const delta2PDCommandSchema = z.discriminatedUnion("operateType", [
  pdStandByTime,
  dcUsbSwitchSchema,
  lcdConfigSchema,
  pvPrioritySchema,
  acAlwaysOnSchema,
]);

export type Delta2PDSetCommand = z.infer<typeof delta2PDCommandSchema>;

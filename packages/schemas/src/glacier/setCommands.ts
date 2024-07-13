import { z } from "zod";
import { glacierSerialNumberSchema } from "./serialNumber";

const defaultSchema = z.object({
  id: z.number().int(),
  version: z.literal("1.0"),
  sn: glacierSerialNumberSchema,
  moduleType: z.literal(1),
});

/**
 * Set temperature(tmpR indicates the temperature of the right side of the refrigerator,
 * tmpL indicates the temperature of the left side, and tmpM indicates the temperature setting after the middle
 * partition is removed. The difference between tmpR and tmpL cannot exceed 25°C.)
 *
 * @example
 * ```json
 *  {
 *   "id":123456789,
 *   "version":"1.0",
 *   "sn":"BX11ZCB4EF2E0002",
 *   "moduleType":1,
 *   "operateType":"temp",
 *   "params": {
 *       "tmpR":-19,
 *       "tmpL":0,
 *       "tmpM":0
 *    }
 *  }
 * ```
 */
export const glacierSetTemperatureSchema = defaultSchema.extend({
  operateType: z.literal("temp"),
  params: z.object({
    tmpR: z.number().int().min(-25).max(25),
    tmpL: z.number().int().min(-25).max(25),
    tmpM: z.number().int().min(-25).max(25),
  }),
});

export type GlacierSetTemperature = z.infer<typeof glacierSetTemperatureSchema>;

/**
 * Set ECO mode(mode: 1: ECO; 0: Normal)
 *
 * @exmaple
 * ```json
 *      {
 *          "id":123456789,
 *          "version":"1.0",
 *          "sn":"BX11ZCB4EF2E0002",
 *          "moduleType":1,
 *          "operateType":"ecoMode",
 *          "params": {
 *              "mode":1
 *          }
 *     }
 * ```
 */
export const glacierSetEcoModeSchema = defaultSchema.extend({
  operateType: z.literal("ecoMode"),
  params: z.object({
    mode: z.number().int().min(0).max(1),
  }),
});

export type GlacierSetEcoMode = z.infer<typeof glacierSetEcoModeSchema>;

/**
 * Set buzzer enabling status (0: Disable; 1: Enable)
 *
 * @example
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"BX11ZCB4EF2E0002",
 *      "moduleType":1,
 *      "operateType":"beepEn",
 *      "params": {
 *          "flag":1
 *       }
 * }
 * ```
 */
export const glacierSetBuzzerSchema = defaultSchema.extend({
  operateType: z.literal("beepEn"),
  params: z.object({
    flag: z.number().int().min(0).max(1),
  }),
});

export type GlacierSetBuzzer = z.infer<typeof glacierSetBuzzerSchema>;

/**
 * Buzzer commands(1: Beep once; 2: Beep twice; 3: Beep three times; 0: Always beeping)
 *
 * @example
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"BX11ZCB4EF2E0002",
 *      "moduleType":1,
 *      "operateType":"beep",
 *      "params": {
 *          "flag": 1
 *      }
 * }
 * ```
 */
export const glacierSetBuzzerCommandSchema = defaultSchema.extend({
  operateType: z.literal("beep"),
  params: z.object({
    flag: z.number().int().min(0).max(3),
  }),
});

export type GlacierSetBuzzerCommand = z.infer<
  typeof glacierSetBuzzerCommandSchema
>;

/**
 * Set screen timeout(unit: sec; when set to 0, the screen is always on)
 *
 * @example
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"BX11ZCB4EF2E0002",
 *      "moduleType":1,
 *      "operateType":"blTime",
 *      "params": {
 *           "time": 600
 *      }
 * }
 * ```
 */
export const glacierSetScreenTimeoutSchema = defaultSchema.extend({
  operateType: z.literal("blTime"),
  params: z.object({
    time: z.number().int().min(0),
  }),
});

export type GlacierSetScreenTimeout = z.infer<
  typeof glacierSetScreenTimeoutSchema
>;

/**
 * Set temperature unit(0: Celsius; 1: Fahrenheit）
 * @example
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"BX11ZCB4EF2E0002",
 *      "moduleType":1,
 *      "operateType":"tmpUnit",
 *      "params": {
 *          "unit": 0
 *      }
 * }
 * ```
 */
export const glacierSetTemperatureUnitSchema = defaultSchema.extend({
  operateType: z.literal("tmpUnit"),
  params: z.object({
    unit: z.number().int().min(0).max(1),
  }),
});

export type GlacierSetTemperatureUnit = z.infer<
  typeof glacierSetTemperatureUnitSchema
>;

/**
 * Set ice making
 * If "enable"=0, ice making is disabled.
 * If "enable"=1 and "iceShape"=0, the device will make small ice cubes.
 * If "enable"=1 and "iceShape"=1, the device will make large ice cubes.
 *
 * @example
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"BX11ZCB4EF2E0002",
 *      "moduleType":1,
 *      "operateType":"iceMake",
 *      "params": {
 *          "enable": 1,
 *          "iceShape":1
 *      }
 * }
 * ```
 */
export const glacierSetIceMakingSchema = defaultSchema.extend({
  operateType: z.literal("iceMake"),
  params: z.object({
    enable: z.number().int().min(0).max(1),
    iceShape: z.number().int().min(0).max(1),
  }),
});

export type GlacierSetIceMaking = z.infer<typeof glacierSetIceMakingSchema>;

/**
 * Set ice detaching
 * enable:
 * 0: Invalid
 * 1: Detach iceiceTm: Duration of ice detaching; unit: secfsmState:
 * 4: Detaching ice,
 * 5: Detaching completed
 *
 * @example
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"BX11ZCB4EF2E0002",
 *      "moduleType":1,
 *      "operateType":"deIce",
 *      "params": {
 *          "enable": 0
 *      }
 * }
 * ```
 */
export const glacierSetIceDetachingSchema = defaultSchema.extend({
  operateType: z.literal("deIce"),
  params: z.object({
    enable: z.literal(0).or(z.literal(1)).or(z.literal(4)).or(z.literal(5)),
  }),
});

export type GlacierSetIceDetaching = z.infer<
  typeof glacierSetIceDetachingSchema
>;

/**
 * Sensor detection blocking (0: Unblocked; 1: Blocked)
 *
 * @example
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"BX11ZCB4EF2E0002",
 *      "moduleType":1,
 *      "operateType":"sensorAdv",
 *      "params": {
 *          "sensorAdv":1
 *      }
 * }
 * ```
 */
export const glacierSetSensorDetectionSchema = defaultSchema.extend({
  operateType: z.literal("sensorAdv"),
  params: z.object({
    sensorAdv: z.number().int().min(0).max(1),
  }),
});

export type GlacierSetSensorDetection = z.infer<
  typeof glacierSetSensorDetectionSchema
>;

/**
 * Set battery low voltage protection level
 * state:
 *  0: Disabled;
 *  1: Enabled;
 * level:
 *  0: Low;
 *  1: Medium;
 *  2: High
 *
 * @example
 * ```json
 * {
 *      "id":123456789,
 *      "version":"1.0",
 *      "sn":"BX11ZCB4EF2E0002",
 *      "moduleType":1,
 *      "operateType":"protectBat",
 *      "params": {
 *          "state": 1,
 *          "level": 0
 *      }
 * }
 * ```
 */
export const glacierSetBatteryProtectionSchema = defaultSchema.extend({
  operateType: z.literal("protectBat"),
  params: z.object({
    state: z.number().int().min(0).max(1),
    level: z.number().int().min(0).max(2),
  }),
});

export type GlacierSetBatteryProtection = z.infer<
  typeof glacierSetBatteryProtectionSchema
>;

export const glacierSetCommandsSchema = z.discriminatedUnion("operateType", [
  glacierSetTemperatureSchema,
  glacierSetEcoModeSchema,
  glacierSetBuzzerSchema,
  glacierSetBuzzerCommandSchema,
  glacierSetScreenTimeoutSchema,
  glacierSetTemperatureUnitSchema,
  glacierSetIceMakingSchema,
  glacierSetIceDetachingSchema,
  glacierSetSensorDetectionSchema,
  glacierSetBatteryProtectionSchema,
]);

export type GlacierSetCommands = z.infer<typeof glacierSetCommandsSchema>;

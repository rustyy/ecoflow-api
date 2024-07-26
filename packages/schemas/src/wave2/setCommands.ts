import { z } from "zod";
import { wave2SerialNumberSchema } from "./serialNumber";
import { zeroOrOne, zeroOrOneOrTwo } from "../shared";

const defaultSchema = z.object({
  id: z.number().int(),
  version: z.literal("1.0"),
  sn: wave2SerialNumberSchema,
  moduleType: z.literal(1),
});

/**
 * Set main mode(0: Cool, 1: Heat, 2: Fan)
 *
 * @example
 * ```json
 * {
 *    "id": 123456789,
 *    "version": "1.0",
 *    "sn": "KT21ZCH2ZF170012",
 *    "moduleType": 1,
 *    "operateType": "mainMode",
 *    "params": {
 *      "mainMode": 1
 *    }
 * }
 * ```
 */
export const wave2SetMainModeSchema = defaultSchema.extend({
  operateType: z.literal("mainMode"),
  params: z.object({
    mainMode: zeroOrOneOrTwo,
  }),
});

export type Wave2SetMainMode = z.infer<typeof wave2SetMainModeSchema>;

/**
 * Set sub-mode(0: Max, 1: Sleep, 2: Eco, 3: Manual)
 *
 * @example
 * ```json
 * {
 *    "id": 123456789,
 *    "version": "1.0",
 *    "sn": "KT21ZCH2ZF170012",
 *    "operateType": "subMode",
 *    "params": {
 *       "subMode": 3
 *     }
 * }
 * ```
 */
export const wave2SetSubModeSchema = defaultSchema.extend({
  operateType: z.literal("subMode"),
  params: z.object({
    subMode: z.number().int().min(0).max(3),
  }),
});

export type Wave2SetSubMode = z.infer<typeof wave2SetSubModeSchema>;

/**
 * Set unit of temperature(0: Celsius, 1: Fahrenheit)
 *
 * @example
 * ```json
 * {
 *    "id": 123456789,
 *    "version": "1.0",
 *    "sn": "KT21ZCH2ZF170012",
 *    "operateType": "tempSys",
 *    "params": {
 *       "mode": 1
 *    }
 * }
 * ```
 */
export const wave2SetTemperatureSystemSchema = defaultSchema.extend({
  operateType: z.literal("tempSys"),
  params: z.object({
    mode: zeroOrOne,
  }),
});

export type Wave2SetTemperatureSystem = z.infer<
  typeof wave2SetTemperatureSystemSchema
>;

/**
 * Set screen timeout (time unit: sec; Always on: "idleTime": 0, "idleMode": 0)
 *
 * @example
 * ```json
 * {
 *    "id": 123456789,
 *    "version": "1.0",
 *    "sn": "KT21ZCH2ZF170012",
 *    "operateType": "display",
 *    "params": {
 *        "idleTime": 5,
 *        "idleMode": 1
 *    }
 * }
 * ```
 */
export const wave2SetScreenTimeoutSchema = defaultSchema.extend({
  operateType: z.literal("display"),
  params: z.object({
    idleTime: z.number().int().min(0),
    idleMode: z.number().int().min(0),
  }),
});

export type Wave2SetScreenTimeout = z.infer<typeof wave2SetScreenTimeoutSchema>;

/**
 * Set timer(timeSet: 0-65535; Unit: min;timeEn: 0: Turn off 1: Turn on)
 *
 * @example
 * ```json
 * {
 *    "id": 123456789,
 *    "version": "1.0",
 *    "sn": "KT21ZCH2ZF170012",
 *    "operateType": "sacTiming",
 *    "params": {
 *      "timeSet": 10,
 *      "timeEn": 1
 *    }
 * }
 * ```
 */
export const wave2SetTimerSchema = defaultSchema.extend({
  operateType: z.literal("sacTiming"),
  params: z.object({
    timeSet: z.number().int().min(0).max(65535),
    timeEn: zeroOrOne,
  }),
});

export type Wave2SetTimer = z.infer<typeof wave2SetTimerSchema>;

/**
 * Enable buzzer (0: Disable; 1: Enable)
 *
 * @example
 * ```json
 * {
 *    "id": 123456789,
 *    "version": "1.0",
 *    "sn": "KT21ZCH2ZF170012",
 *    "operateType": "beepEn",
 *    "params": {
 *      "en": 1
 *    }
 * }
 * ```
 */
export const wave2SetBuzzerSchema = defaultSchema.extend({
  operateType: z.literal("beepEn"),
  params: z.object({
    en: zeroOrOne,
  }),
});

export type Wave2SetBuzzer = z.infer<typeof wave2SetBuzzerSchema>;

/**
 * Set temperature(16-30 °C）
 *
 * @example
 * ```json
 * {
 *    "id":123456789,
 *    "version":"1.0",
 *    "sn":"KT21ZCH2ZF170012",
 *    "moduleType":1,
 *    "operateType":"setTemp",
 *    "params":{
 *       "setTemp":27
 *    }
 * }
 * ```
 */
export const wave2SetTemperatureSchema = defaultSchema.extend({
  operateType: z.literal("setTemp"),
  params: z.object({
    setTemp: z.number().int().min(16).max(30),
  }),
});

export type Wave2SetTemperature = z.infer<typeof wave2SetTemperatureSchema>;

/**
 * Set temperature display (0: Display ambient temperature; 1: Display air outlet temperature)
 *
 * @example
 * ```json
 * {
 *    "id": 123456789,
 *    "version": "1.0",
 *    "sn": "KT21ZCH2ZF170012",
 *    "moduleType" :1,
 *    "operateType": "tempDisplay",
 *    "params": {
 *        "tempDisplay":0
 *     }
 * }
 * ```
 */
export const wave2SetTemperatureDisplaySchema = defaultSchema.extend({
  operateType: z.literal("tempDisplay"),
  params: z.object({
    tempDisplay: zeroOrOne,
  }),
});

export type Wave2SetTemperatureDisplay = z.infer<
  typeof wave2SetTemperatureDisplaySchema
>;

/**
 * Set wind speed (0: Low; 1: Medium; 2: High)
 *
 * @example
 * ```json
 * {
 *    "id":123456789,
 *    "version":"1.0",
 *    "sn":"KT21ZCH2ZF170012",
 *    "operateType":"fanValue",
 *    "params":{
 *       "fanValue":1
 *    }
 * }
 * ```
 */
export const wave2SetFanValueSchema = defaultSchema.extend({
  operateType: z.literal("fanValue"),
  params: z.object({
    fanValue: zeroOrOneOrTwo,
  }),
});

export type Wave2SetFanValue = z.infer<typeof wave2SetFanValueSchema>;

/**
 * Set automatic drainage
 * In Cool/Fan mode:
 * - 0: Turn on Manual drainage，
 * - 1: Turn on No drainage,
 * - 2: Turn off Manual drainage,
 * - 3: Turn off No drainage
 *
 * In Heat Mode:
 * - 0: Turn off,
 * - 1: Turn on Manual drainage，
 * - 3: Turn off Manual drainage
 *
 * @example
 * ```json
 * {
 *    "id":123456789,
 *    "version":"1.0",
 *    "sn" :"KT21ZCH2ZF170012",
 *    "operateType" :"wteFthEn",
 *    "params": {
 *      "wteFthEn":3
 *    }
 * }
 * ```
 */
export const wave2SetAutomaticDrainageSchema = defaultSchema.extend({
  operateType: z.literal("wteFthEn"),
  params: z.object({
    wteFthEn: z.number().int().min(0).max(3),
  }),
});

export type Wave2SetAutomaticDrainage = z.infer<
  typeof wave2SetAutomaticDrainageSchema
>;

/**
 * Light strip settings (0: Follow the screen; 1: Always on; 2: Always off; other parameters indicate “Always off”)
 *
 * @example
 * ```json
 * {
 *    "id": 123456789,
 *    "version": "1.0",
 *    "sn": "KT21ZCH2ZF170012",
 *    "moduleType": 1,
 *    "operateType": "rgbState",
 *    "params": { "rgbState": 1 } }
 * ```
 */
export const wave2SetLightStripSchema = defaultSchema.extend({
  operateType: z.literal("rgbState"),
  params: z.object({
    rgbState: zeroOrOneOrTwo,
  }),
});

export type Wave2SetLightStrip = z.infer<typeof wave2SetLightStripSchema>;

/**
 * Remote startup/shutdown (1: Startup; 2: Standby; 3: Shutdown)
 *
 * @example
 * ```json
 * {
 *  "id": 123456789,
 *  "version": "1.0",
 *  "sn": "KT21ZCH2ZF170012",
 *  "moduleType": 1,
 *  "operateType": "powerMode",
 *  "params": { "powerMode": 2 } }
 * ```
 */
export const wave2SetPowerModeSchema = defaultSchema.extend({
  operateType: z.literal("powerMode"),
  params: z.object({
    powerMode: z.literal(1).or(z.literal(2)).or(z.literal(3)),
  }),
});

export type Wave2SetPowerMode = z.infer<typeof wave2SetPowerModeSchema>;

export const wave2SetCommandsSchema = z.discriminatedUnion("operateType", [
  wave2SetMainModeSchema,
  wave2SetSubModeSchema,
  wave2SetTemperatureSystemSchema,
  wave2SetScreenTimeoutSchema,
  wave2SetTimerSchema,
  wave2SetBuzzerSchema,
  wave2SetTemperatureSchema,
  wave2SetTemperatureDisplaySchema,
  wave2SetFanValueSchema,
  wave2SetAutomaticDrainageSchema,
  wave2SetLightStripSchema,
  wave2SetPowerModeSchema,
]);

export type Wave2SetCommands = z.infer<typeof wave2SetCommandsSchema>;

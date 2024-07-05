import { z } from "zod";
import { powerStreamSerialNumberSchema } from "./serialNumber";

/*********************************************
 * Set commands
 *
 * - Power supply priority settings(0: prioritize power supply; 1: prioritize power storage)
 * - Custom load power settings(Range: 0 W–600 W; unit: 0.1 W)
 * - Lower limit settings for battery discharging(lowerLimit: 1-30)
 * - Upper limit settings for battery charging(upperLimit: 70-100)
 * - Indicator light brightness adjustment(rgb brightness: 0-1023 (the larger the value, the higher the brightness); default value: 1023)
 * - Deleting scheduled switching tasks(taskIndex: 0-9)
 *********************************************/

const defaultSchema = z.object({
  sn: powerStreamSerialNumberSchema,
});

// Power supply.
// 0: prioritize power supply; 1: prioritize power storage
// Example:
//
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_SUPPLY_PRIORITY_PACK",
//   "params": {"supplyPriority": 0}
// }

export const powerSupplyPrioritySchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_SUPPLY_PRIORITY_PACK"),
  params: z.object({
    supplyPriority: z.literal(0).or(z.literal(1)),
  }),
});

export type PowerSupplyPriority = z.infer<typeof powerSupplyPrioritySchema>;

// Custom load power settings.
// Range: 0 W–600 W; unit: 0.1 W
// Example:
//
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_PERMANENT_WATTS_PACK",
//   "params": {"permanentWatts": 20}
// }

export const customLoadPowerSettingsSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_PERMANENT_WATTS_PACK"),
  params: z.object({
    permanentWatts: z.number().min(0).max(600),
  }),
});

export type CustomLoadPowerSettings = z.infer<
  typeof customLoadPowerSettingsSchema
>;

// Lower batter charging level
// lowerLimit: 1-30
// Example:
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_BAT_LOWER_PACK",
//   "params": {"lowerLimit": 20}
// }

export const lowerChargingLevelSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_BAT_LOWER_PACK"),
  params: z.object({
    lowerLimit: z.number().int().min(1).max(30),
  }),
});

export type LowerChargingLevel = z.infer<typeof lowerChargingLevelSchema>;

// Upper batter charging level
// upperLimit: 70-100
// Example:
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_BAT_UPPER_PACK",
//   "params": {"upperLimit": 70}
// }

export const upperChargingLevelSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_BAT_UPPER_PACK"),
  params: z.object({
    upperLimit: z.number().int().min(70).max(100),
  }),
});

export type UpperChargingLevel = z.infer<typeof upperChargingLevelSchema>;

// Indicator light brightness
// rgb brightness: 0-1023 (the larger the value, the higher the brightness)
// default value: 1023
//
// Example:
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_BRIGHTNESS_PACK",
//   "params": {"brightness": 200}
// }

export const indicatorLightBrightnessSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_BRIGHTNESS_PACK"),
  params: z.object({
    brightness: z.number().int().min(0).max(1023),
  }),
});

export type IndicatorLightBrightness = z.infer<
  typeof indicatorLightBrightnessSchema
>;

// Deleting task
// Example:
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_DELETE_TIME_TASK",
//   "params": {"taskIndex": 1}
// }

export const powerStreamDeleteTaskSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_DELETE_TIME_TASK"),
  params: z.object({
    taskIndex: z.number().int().min(0),
  }),
});

export type PowerStreamDeleteTask = z.infer<typeof powerStreamDeleteTaskSchema>;

export const powerStreamSetCommandSchema = z.discriminatedUnion("cmdCode", [
  powerSupplyPrioritySchema,
  customLoadPowerSettingsSchema,
  lowerChargingLevelSchema,
  upperChargingLevelSchema,
  indicatorLightBrightnessSchema,
  powerStreamDeleteTaskSchema,
]);

export type PowerStreamSetCommand = z.infer<typeof powerStreamSetCommandSchema>;

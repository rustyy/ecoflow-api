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
// Example:
//
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_SUPPLY_PRIORITY_PACK",
//   "params": {"supplyPriority": 0}
// }

const powerSupplyPrioritySchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_SUPPLY_PRIORITY_PACK"),
  params: z.object({
    supplyPriority: z.literal(0).or(z.literal(1)),
  }),
});

// Custom load power settings.
// Example:
//
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_PERMANENT_WATTS_PACK",
//   "params": {"permanentWatts": 20}
// }

const customLoadPowerSettingsSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_PERMANENT_WATTS_PACK"),
  params: z.object({
    permanentWatts: z.number().int().min(0).max(600),
  }),
});

// Lower batter charging level
// Example:
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_BAT_LOWER_PACK",
//   "params": {"lowerLimit": 20}
// }

const lowerChargingLevelSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_BAT_LOWER_PACK"),
  params: z.object({
    lowerLimit: z.number().int().min(1).max(30),
  }),
});

// Upper batter charging level
// Example:
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_BAT_UPPER_PACK",
//   "params": {"upperLimit": 70}
// }

const upperChargingLevelSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_BAT_UPPER_PACK"),
  params: z.object({
    lowerLimit: z.number().int().min(70).max(100),
  }),
});

// Indicator light brightness
// Example:
// {
//   "sn": "HW5123456789",
//   "cmdCode": "WN511_SET_BRIGHTNESS_PACK",
//   "params": {"brightness": 200}
// }

const indicatorLightBrightnessSchema = defaultSchema.extend({
  cmdCode: z.literal("WN511_SET_BRIGHTNESS_PACK"),
  params: z.object({
    lowerLimit: z.number().int().min(0).max(1023),
  }),
});

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
    taskIndex: z.number().int().min(0).max(9),
  }),
});

export const powerStreamSetCommandSchema = z.discriminatedUnion("cmdCode", [
  powerSupplyPrioritySchema,
  customLoadPowerSettingsSchema,
  lowerChargingLevelSchema,
  upperChargingLevelSchema,
  indicatorLightBrightnessSchema,
  powerStreamDeleteTaskSchema,
]);

export type PowerStreamSetCommand = z.infer<typeof powerStreamSetCommandSchema>;

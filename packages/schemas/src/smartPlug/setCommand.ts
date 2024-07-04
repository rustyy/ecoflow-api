import { z } from "zod";
import { smartPlugSerialNumberSchema } from "./serialNumber";

/*********************************************
 * Set commands
 *
 * At the moment there are 3 commands available for smart-plug
 * - switch sp on/off
 * - set led brightness
 * - removing a configured task
 *********************************************/

export const smartPlugSwitchOnOffCommandSchema = z.object({
  sn: smartPlugSerialNumberSchema,
  cmdCode: z.literal("WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE"),
  params: z
    .object({
      plugSwitch: z.literal(0).or(z.literal(1)),
    })
    .strict(),
});

export type SmartPlugSwitchOnOffCommand = z.infer<
  typeof smartPlugSwitchOnOffCommandSchema
>;

export const SmartPlugIndicatorBrightnessCommandSchema = z.object({
  sn: smartPlugSerialNumberSchema,
  cmdCode: z.literal("WN511_SOCKET_SET_BRIGHTNESS_PACK"),
  params: z
    .object({
      brightness: z.number().int().min(0).max(1023),
    })
    .strict(),
});

export type SmartPlugIndicatorBrightnessCommand = z.infer<
  typeof SmartPlugIndicatorBrightnessCommandSchema
>;

export const SmartPlugDeleteTimeTaskCommandSchema = z.object({
  sn: smartPlugSerialNumberSchema,
  cmdCode: z.literal("WN511_SOCKET_DELETE_TIME_TASK"),
  params: z
    .object({
      taskIndex: z.number().int().min(0),
    })
    .strict(),
});

export type SmartPlugDeleteTimeTaskCommand = z.infer<
  typeof SmartPlugDeleteTimeTaskCommandSchema
>;

export const smartPlugSetCommandSchema = z.discriminatedUnion("cmdCode", [
  smartPlugSwitchOnOffCommandSchema,
  SmartPlugIndicatorBrightnessCommandSchema,
  SmartPlugDeleteTimeTaskCommandSchema,
]);

export type SmartPlugSetCommand = z.infer<typeof smartPlugSetCommandSchema>;

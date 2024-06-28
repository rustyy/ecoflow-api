import { z } from "zod";
import { smartPlugSerialNumberSchema } from "./serialNumber";

/*********************************************
 * Set commands
 *
 * At the moment there are 3 commands available for smart-plug
 * - turning sp on/off
 * - set led brightness
 * - removing a configured task
 *********************************************/

export const smartPlugSetCommandSchema = z.discriminatedUnion("cmdCode", [
  z.object({
    sn: smartPlugSerialNumberSchema,
    cmdCode: z.literal("WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE"),
    params: z
      .object({
        plugSwitch: z.literal(0).or(z.literal(1)),
      })
      .strict(),
  }),
  z.object({
    sn: smartPlugSerialNumberSchema,
    cmdCode: z.literal("WN511_SOCKET_SET_BRIGHTNESS_PACK"),
    params: z
      .object({
        brightness: z.number().int().min(0).max(1023),
      })
      .strict(),
  }),
  z.object({
    sn: smartPlugSerialNumberSchema,
    cmdCode: z.literal("WN511_SOCKET_DELETE_TIME_TASK"),
    params: z
      .object({
        taskIndex: z.number().int().min(0).max(9),
      })
      .strict(),
  }),
]);

export type SmartPlugSetCommand = z.infer<typeof smartPlugSetCommandSchema>;

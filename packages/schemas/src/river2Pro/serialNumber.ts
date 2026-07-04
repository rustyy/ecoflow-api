import { z } from "zod";

/*********************************************
 * Serial number
 * River 2 Pro serial number to start with "R621"
 *********************************************/

export const river2ProSerialNumberSchema = z.custom<`R621${string}`>((val) => {
  return typeof val === "string" ? val.startsWith("R621") : false;
});

export type River2ProSerialNumber = z.infer<typeof river2ProSerialNumberSchema>;

export const isRiver2ProSerialNumber = (
  x: unknown,
): x is River2ProSerialNumber => {
  return river2ProSerialNumberSchema.safeParse(x).success;
};

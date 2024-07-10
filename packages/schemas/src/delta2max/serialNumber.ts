import { z } from "zod";

/*********************************************
 * Serial number
 * Delta 2 Max serial number to start with "R351"
 *********************************************/

export const delta2MaxSerialNumberSchema = z.custom<`R351${string}`>((val) => {
  return typeof val === "string" ? /^R351/.test(val) : false;
});

export type Delta2MaxSerialNumber = z.infer<typeof delta2MaxSerialNumberSchema>;

export const isDelta2SerialNumber = (
  x: unknown,
): x is Delta2MaxSerialNumber => {
  return delta2MaxSerialNumberSchema.safeParse(x).success;
};

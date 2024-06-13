import { z } from "zod";

/*********************************************
 * Serial number
 * Delta 2 serial number to start with "R331"
 *********************************************/

export const delta2SerialNumberSchema = z.custom<`R331${string}`>((val) => {
  return typeof val === "string" ? /^R331/.test(val) : false;
});

export type Delta2SerialNumber = z.infer<typeof delta2SerialNumberSchema>;

export const isDelta2SerialNumber = (x: unknown): x is Delta2SerialNumber => {
  return delta2SerialNumberSchema.safeParse(x).success;
};

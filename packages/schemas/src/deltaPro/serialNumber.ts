import { z } from "zod";

/*********************************************
 * Serial number
 * Delta Pro serial number to start with "DCABZ"
 *********************************************/

export const deltaProSerialNumberSchema = z.custom<`DCABZ${string}`>((val) => {
  return typeof val === "string" ? /^DCABZ/.test(val) : false;
});

export type DeltaProSerialNumber = z.infer<typeof deltaProSerialNumberSchema>;

export const isDeltaProSerialNumber = (
  x: unknown,
): x is DeltaProSerialNumber => {
  return deltaProSerialNumberSchema.safeParse(x).success;
};

import { z } from "zod";

/*********************************************
 * Serial number
 * Delta Pro 3 serial number to start with "MR51"
 *********************************************/

export const deltaPro3SerialNumberSchema = z.custom<`MR51${string}`>((val) => {
  return typeof val === "string" ? val.startsWith("MR51") : false;
});

export type DeltaPro3SerialNumber = z.infer<typeof deltaPro3SerialNumberSchema>;

export const isDeltaPro3SerialNumber = (
  x: unknown,
): x is DeltaPro3SerialNumber => {
  return deltaPro3SerialNumberSchema.safeParse(x).success;
};

import { z } from "zod";

/*********************************************
 * Serial number
 * Powerstream serial number to start with "HW51"
 *********************************************/

export const powerStreamSerialNumberSchema = z.custom<`HW51${string}`>(
  (val) => {
    return typeof val === "string" ? val.startsWith("HW51") : false;
  },
);

export type PowerStreamSerialNumber = z.infer<
  typeof powerStreamSerialNumberSchema
>;

export const isPowerStreamSerialNumber = (
  x: unknown,
): x is PowerStreamSerialNumber => {
  return powerStreamSerialNumberSchema.safeParse(x).success;
};

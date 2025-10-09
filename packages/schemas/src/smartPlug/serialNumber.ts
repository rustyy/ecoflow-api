import { z } from "zod";

/*********************************************
 * Serial number
 * Smart-Plug serial numbers to start with "HW52"
 *********************************************/

export const smartPlugSerialNumberSchema = z.custom<`HW52${string}`>((val) => {
  return typeof val === "string" ? val.startsWith("HW52") : false;
});

export type SmartPlugSn = z.infer<typeof smartPlugSerialNumberSchema>;

export const isSmartPlugSn = (x: unknown): x is SmartPlugSn => {
  return smartPlugSerialNumberSchema.safeParse(x).success;
};

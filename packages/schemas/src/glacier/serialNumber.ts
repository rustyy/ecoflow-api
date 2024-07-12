import { z } from "zod";

/*********************************************
 * Serial number
 * Glacier serial number to start with "BX11"
 *********************************************/

export const glacierSerialNumberSchema = z.custom<`BX11${string}`>((val) => {
  return typeof val === "string" ? /^BX11/.test(val) : false;
});

export type GlacierSerialNumber = z.infer<typeof glacierSerialNumberSchema>;

export const isGlacierSerialNumber = (x: unknown): x is GlacierSerialNumber => {
  return glacierSerialNumberSchema.safeParse(x).success;
};

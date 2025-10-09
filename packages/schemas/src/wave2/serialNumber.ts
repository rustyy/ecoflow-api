import { z } from "zod";

/*********************************************
 * Serial number
 * Wave2 serial number to start with "KT21"
 *********************************************/

export const wave2SerialNumberSchema = z.custom<`KT21${string}`>((val) => {
  return typeof val === "string" ? val.startsWith("KT21") : false;
});

export type Wave2SerialNumber = z.infer<typeof wave2SerialNumberSchema>;

export const isWave2SerialNumber = (x: unknown): x is Wave2SerialNumber => {
  return wave2SerialNumberSchema.safeParse(x).success;
};

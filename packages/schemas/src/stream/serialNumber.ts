import { z } from "zod";

/*********************************************
 * Serial number
 * Stream serial number to start with "BK"
 *********************************************/

export const streamSerialNumberSchema = z.custom<`BK${string}`>((val) => {
  return typeof val === "string" ? val.startsWith("BK") : false;
});

export type StreamSerialNumber = z.infer<typeof streamSerialNumberSchema>;

export const isStreamSerialNumber = (x: unknown): x is StreamSerialNumber => {
  return streamSerialNumberSchema.safeParse(x).success;
};

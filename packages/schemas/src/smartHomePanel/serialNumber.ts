import { z } from "zod";

/*********************************************
 * Serial number
 * SmartHomePanel serial number to start with "SP10"
 *********************************************/

export const smartHomePanelSerialNumberSchema = z.custom<`SP10${string}`>(
  (val) => {
    return typeof val === "string" ? val.startsWith("SP10") : false;
  },
);

export type SmartHomePanelSerialNumber = z.infer<
  typeof smartHomePanelSerialNumberSchema
>;

export const isSmartHomePanelSerialNumber = (
  x: unknown,
): x is SmartHomePanelSerialNumber => {
  return smartHomePanelSerialNumberSchema.safeParse(x).success;
};

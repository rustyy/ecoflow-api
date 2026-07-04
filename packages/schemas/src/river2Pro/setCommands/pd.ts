import { z } from "zod";
import { defaultSchema } from "./shared";
import { integer, zeroOrOne } from "../../shared";

/**
 * Energy management on/off (isConfig: 0 off 1 on；
 * bpPowerSoc：Backup reserve；
 * minDsgSoc：Discharge limit
 * minChgSoc：Charge limit
 */
export const watthConfigSchema = defaultSchema.extend({
  moduleType: z.literal(1),
  operateType: z.literal("watthConfig"),
  params: z.object({
    isConfig: zeroOrOne,
    bpPowerSoc: integer.min(0).max(100),
    minDsgSoc: integer.min(0).max(100),
    minChgSoc: integer.min(0).max(100),
  }),
});

export type WatthConfig = z.infer<typeof watthConfigSchema>;

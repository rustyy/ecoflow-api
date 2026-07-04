import { z } from "zod";
import { defaultSchema } from "./shared";
import { integer, zeroOrOne } from "../../shared";

const mpptSchema = defaultSchema.extend({
  moduleType: z.literal(5),
});

/**
 * 12V DC output on/off（1 on 0 off）
 */
export const mpptCarSchema = mpptSchema.extend({
  operateType: z.literal("mpptCar"),
  params: z.object({
    enabled: zeroOrOne,
  }),
});

export type MpptCar = z.infer<typeof mpptCarSchema>;

/**
 * AC output on/off（enabled）
 * X-Boost on/off
 * AC output voltage，read，unit V
 * AC output frequency（out_freq，1-50Hz、2-60Hz）
 */
export const acOutCfgSchema = mpptSchema.extend({
  operateType: z.literal("acOutCfg"),
  params: z.object({
    enabled: zeroOrOne,
    xboost: zeroOrOne,
    out_voltage: integer.min(0),
    out_freq: integer.min(1).max(60),
  }),
});

export type AcOutCfg = z.infer<typeof acOutCfgSchema>;

import { z } from "zod";
import { defaultSchema } from "./shared";
import { integer } from "../../shared";

const bmsSchema = defaultSchema.extend({
  moduleType: z.literal(2),
});

/**
 * Charge limit
 */
export const chargeLimitSchema = bmsSchema.extend({
  operateType: z.literal("upsConfig"),
  params: z.object({
    maxChgSoc: integer.min(0).max(100),
  }),
});

export type ChargeLimit = z.infer<typeof chargeLimitSchema>;

/**
 * Discharge limit
 */
export const dischargeLimitSchema = bmsSchema.extend({
  operateType: z.literal("dsgCfg"),
  params: z.object({
    minDsgSoc: integer.min(0).max(100),
  }),
});

export type DischargeLimit = z.infer<typeof dischargeLimitSchema>;

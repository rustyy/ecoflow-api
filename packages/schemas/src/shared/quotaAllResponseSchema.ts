import { z } from "zod";

export const quotaAllResponseSchema = z.object({
  code: z.literal("0"),
  message: z.literal("Success"),
  data: z.record(z.string(), z.any()).optional(),
});

export type QuotaAllResponse = z.infer<typeof quotaAllResponseSchema>;

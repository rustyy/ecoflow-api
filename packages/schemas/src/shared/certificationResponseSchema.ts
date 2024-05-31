import { z } from "zod";

export const certificationErrorResponseSchema = z.object({
  code: z.string().regex(/^[1-9]\d*$/),
  message: z.string(),
});

export const certificationResponseSchema = z.object({
  code: z.literal("0"),
  message: z.literal("Success"),
  data: z.object({
    certificateAccount: z.string(),
    certificatePassword: z.string(),
    url: z.string(),
    port: z.string(),
    protocol: z.literal("mqtts"),
  }),
});

import { z } from "zod";

export const errorResponseSchema = z.object({
  code: z.string().regex(/^[1-9]\d*$/),
  message: z.string(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

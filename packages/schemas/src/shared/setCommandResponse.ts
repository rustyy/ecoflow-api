/**
 * @file Define setCmd-response types as this type is identical across the devices
 */

import { z } from "zod";

const setCommandSuccessResponseSchema = z.object({
  code: z.literal("0"),
  message: z.literal("Success"),
  eagleEyeTraceId: z.string(),
  tid: z.string(),
});

const setCommandFailureResponseSchema = z.object({
  code: z.string().regex(/\d+/),
  message: z.string(),
  eagleEyeTraceId: z.string(),
  tid: z.string(),
});

export const setCommandResponseSchema = z.union([
  setCommandSuccessResponseSchema,
  setCommandFailureResponseSchema,
]);

export type SetCommandResponse = z.infer<typeof setCommandResponseSchema>;

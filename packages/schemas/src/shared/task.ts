import { z } from "zod";

/**
 * Task schema seems to identical across all device types.
 */

const timeSchema = z
  .object({
    sec: z.number().int(),
    week: z.number().int(),
    min: z.number().int(),
    hour: z.number().int(),
    month: z.number().int(),
    year: z.number().int(),
    day: z.number().int(),
  })
  .passthrough();

export const taskSchema = z
  .object({
    taskIndex: z.number().int(),
    type: z.number().int(),
    timeRange: z
      .object({
        isConfig: z.boolean(),
        isEnabled: z.boolean().optional(),
        timeData: z.number().int(),
        timeMode: z.number().int(),
        startTime: timeSchema,
        stopTime: timeSchema,
      })
      .passthrough(),
  })
  .passthrough();

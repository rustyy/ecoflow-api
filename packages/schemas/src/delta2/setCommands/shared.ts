import { delta2SerialNumberSchema } from "../serialNumber";
import { z } from "zod";

/**
 * Represents the default schema for an object.
 */
export const defaultSchema = z.object({
  sn: delta2SerialNumberSchema,
  id: z.number().int(),
  version: z.literal("1.0"),
});

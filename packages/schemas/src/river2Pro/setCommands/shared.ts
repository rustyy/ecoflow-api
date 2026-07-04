import { z } from "zod";
import { river2ProSerialNumberSchema } from "../serialNumber";
import { integer } from "../../shared";

export const defaultSchema = z.object({
  sn: river2ProSerialNumberSchema,
  id: integer,
  version: z.literal("1.0"),
});

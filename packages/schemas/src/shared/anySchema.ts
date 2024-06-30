import { z } from "zod";

export type AnySchema = z.ZodTypeAny;
export type inferSchema<T extends z.ZodTypeAny> = z.infer<T>;

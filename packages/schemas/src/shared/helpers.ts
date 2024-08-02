import { z } from "zod";

export const integer = z.number().int();
export const zeroOrOne = z.literal(0).or(z.literal(1));
export const oneOrTwo = z.literal(1).or(z.literal(2));
export const zeroOrOneOrTwo = z.literal(0).or(z.literal(1)).or(z.literal(2));

export const secToYear = z.object({
  sec: z.number().int(),
  min: z.number().int(),
  hour: z.number().int(),
  day: z.number().int(),
  week: z.number().int(),
  month: z.number().int(),
  year: z.number().int(),
});

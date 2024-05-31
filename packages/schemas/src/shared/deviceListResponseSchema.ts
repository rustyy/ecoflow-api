import { z } from "zod";

/**
 * Describes response from device list endpoint
 * https://${host}/iot-open/sign/device/list
 * @see https://developer-eu.ecoflow.com/us/document/generalInfo
 */

export const deviceListResponseSchema = z.object({
  code: z.literal("0"),
  message: z.literal("Success"),
  data: z.array(
    z.object({
      sn: z.string(),
      online: z.literal(0).or(z.literal(1)),
      deviceName: z.string().optional(),
    }),
  ),
});

export type DeviceListResponse = z.infer<typeof deviceListResponseSchema>;

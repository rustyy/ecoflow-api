import { z } from "zod";
import { zeroOrOne } from "./helpers";

/**
 * Describes response from device list endpoint
 * https://${host}/iot-open/sign/device/list
 * @see https://developer-eu.ecoflow.com/us/document/generalInfo
 */

export const deviceListResponseSchema = z.object({
  code: z.literal("0"),
  message: z.literal("Success"),
  data: z.array(
    z
      .object({
        sn: z.string(),
        online: zeroOrOne,
        deviceName: z.string().optional(),
        productName: z.string().optional(),
      })
      .passthrough(),
  ),
});

export type DeviceListResponse = z.infer<typeof deviceListResponseSchema>;

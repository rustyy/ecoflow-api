import { z } from "zod";
import { streamSerialNumberSchema } from "./serialNumber";
import { integer, oneOrTwo } from "../shared";

const defaultSchema = z.object({
  sn: streamSerialNumberSchema,
  cmdId: z.literal(17),
  cmdFunc: z.literal(254),
  dirDest: z.literal(1),
  dirSrc: z.literal(1),
  dest: z.literal(2),
  needAck: z.literal(true),
});

/**
 * AC1 switch
 * Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US);
 * Unsupported devices: STREAM Max, STREAM AC
 * (On: true Off: false)
 */
export const streamAC1SwitchSchema = defaultSchema.extend({
  params: z.object({
    cfgRelay2Onoff: z.boolean(),
  }),
});

export type StreamAC1Switch = z.infer<typeof streamAC1SwitchSchema>;

/**
 * AC2 switch
 * Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US);
 * Unsupported devices: STREAM Max, STREAM AC
 * (On: true Off: false)
 */
export const streamAC2SwitchSchema = defaultSchema.extend({
  params: z.object({
    cfgRelay3Onoff: z.boolean(),
  }),
});

export type StreamAC2Switch = z.infer<typeof streamAC2SwitchSchema>;

/**
 * AC switch
 * Supported devices: STREAM Max;
 * Unsupported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM AC, STREAM Ultra X, STREAM Ultra (US);
 * (On: true Off: false)
 */
export const streamACSwitchSchema = streamAC1SwitchSchema;

export type StreamACSwitch = z.infer<typeof streamACSwitchSchema>;

/**
 * Backup reserve level
 * Recommended level: 3–95%
 * The backup reserve level should be greater than the discharging level and less than the charging level;
 * Due to device restrictions, the backup reserve level should be 3% higher than the discharging level;
 * The recommended maximum charging level is 95%;
 * If there are multiple devices, use the API to obtain the serial number of the main device
 */
export const streamBatteryReserveLevelSchema = defaultSchema.extend({
  params: z.object({
    cfgBackupReverseSoc: integer.min(0).max(100),
  }),
});

export type StreamBatteryReserveLevel = z.infer<
  typeof streamBatteryReserveLevelSchema
>;

/**
 * Operating mode — Self-powered
 * If there are multiple devices, use the API to obtain the serial number of the main device
 */
export const streamOperationModeSelfPoweredSchema = defaultSchema.extend({
  params: z.object({
    cfgEnergyStrategyOperateMode: z.object({
      operateSelfPoweredOpen: z.boolean(),
    }),
  }),
});

export type StreamOperationModeSelfPowered = z.infer<
  typeof streamOperationModeSelfPoweredSchema
>;

/**
 * Operating mode — AI Mode
 * If there are multiple devices, use the API to obtain the serial number of the main device;
 */
export const streamOperationModeAiModeSchema = defaultSchema.extend({
  params: z.object({
    cfgEnergyStrategyOperateMode: z.object({
      operateIntelligentScheduleModeOpen: z.boolean(),
    }),
  }),
});

export type StreamOperationModeAiMode = z.infer<
  typeof streamOperationModeAiModeSchema
>;

/**
 * Feed-in control
 * (1-off, 2-on)
 * If there are multiple devices, use the API to obtain the serial number of the main device
 */
export const streamFeedInControlSchema = defaultSchema.extend({
  params: z.object({
    cfgFeedGridMode: oneOrTwo,
  }),
});

export type StreamFeedInControl = z.infer<typeof streamFeedInControlSchema>;

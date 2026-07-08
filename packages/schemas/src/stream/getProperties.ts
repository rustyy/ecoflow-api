import { z } from "zod";
import { integer } from "../shared";

export const streamQuotaAllSchema = z
  .object({
    //（AC）bool AC switch, 0-off, 1-on; Supported devices: STREAM Max; Unsupported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM AC, STREAM Ultra X, STREAM Ultra (US);
    //（AC1）bool AC1 switch, 0-off, 1-on; Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US); Unsupported devices: STREAM Max, STREAM AC
    relay2Onoff: z.boolean(),
    // (AC2） bool AC2 switch, 0-off, 1-on; Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US); Unsupported devices: STREAM Max, STREAM AC
    relay3Onoff: z.boolean(),
    // float System real-time PV power, unit: W
    powGetPvSum: z.number(),
    // int System feed-in control switch (1-off, 2-on)
    feedGridMode: integer,
    // float Grid port active power (input power is positive, feed-in power is negative), unit: W
    gridConnectionPower: z.number(),
    // bool System operating mode — AI Mode, false-off, true-on For self-powered mode and AI mode, one of them must be "true" and the other must be "false".
    "energyStrategyOperateMode.operateIntelligentScheduleModeOpen": z.boolean(),
    // bool System operating mode — Self-powered, false-off, true-on For self-powered mode and AI mode, one of them must be "true" and the other must be "false".
    "energyStrategyOperateMode.operateSelfPoweredOpen": z.boolean(),
    // float System real-time load power, unit: W
    powGetSysGrid: z.number(),
    // float System real-time load power, unit: W
    powGetSysLoad: z.number(),
    // float System real-time load power, unit: W
    cmsBattSoc: z.number(),
    // float Real-time aggregated battery power of the system. Positive values refer to the battery's charging power, while negative values refer to the discharging power. Unit: W
    powGetBpCms: z.number(),
    // int System backup reserve level. Recommended level: 3–95%
    backupReverseSoc: integer,
    // int Charge limit
    cmsMaxChgSoc: integer,
    // int Discharge limit
    cmsMinDsgSoc: integer,
    // dateTime Heartbeat report time
    quota_cloud_ts: z.string(),
  })
  .passthrough();

export type StreamQuotaAll = z.infer<typeof streamQuotaAllSchema>;

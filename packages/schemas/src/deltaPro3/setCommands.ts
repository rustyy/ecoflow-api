import { z } from "zod";
import { deltaPro3SerialNumberSchema } from "./serialNumber";
import { integer } from "../shared";

export const deltaPro3BaseSchema = z.object({
  sn: deltaPro3SerialNumberSchema,
  cmdId: z.literal(17),
  dirDest: z.literal(1),
  dirSrc: z.literal(1),
  cmdFunc: z.literal(254),
  dest: z.literal(2),
  needAck: z.literal(true),
});

export type DeltaPro3BaseCommand = z.infer<typeof deltaPro3BaseSchema>;

/**
 * Sets the beeper switch. (true: on, false: off.)
 * {
 *   sn: "MR51ZAS2PG330026",
 *   cmdId: 17,
 *   dirDest: 1,
 *   dirSrc: 1,
 *   cmdFunc: 254,
 *   dest: 2,
 *   needAck: true,
 *   params: {
 *     cfgBeepEn: true,
 *   },
 * }
 */
export const deltaPro3BeepEnCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgBeepEn: z.boolean(),
  }),
});

export type DeltaPro3BeepEnCommand = z.infer<
  typeof deltaPro3BeepEnCommandSchema
>;

/**
 * Sets AC timeout (min).
 *
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgAcStandbyTime": 120
 *     }
 * }
 */
export const deltaPro3AcTimeoutCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgAcStandbyTime: integer.min(0),
  }),
});

export type DeltaPro3AcTimeoutCommand = z.infer<
  typeof deltaPro3AcTimeoutCommandSchema
>;

/**
 * Sets DC timeout (min).
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgDcStandbyTime": 120
 *     }
 * }
 */
export const deltaPro3DcTimeoutCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgDcStandbyTime: integer.min(0),
  }),
});

export type DeltaPro3DcTimeoutCommand = z.infer<
  typeof deltaPro3DcTimeoutCommandSchema
>;

/**
 * Sets the screen timeout (s).
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgScreenOffTime": 30
 *     }
 * }
 */
export const deltaPro3ScreenTimeoutCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgScreenOffTime: integer.min(0),
  }),
});

export type DeltaPro3ScreenTimeoutCommand = z.infer<
  typeof deltaPro3ScreenTimeoutCommandSchema
>;

/**
 * Sets the device timeout (min).
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgDevStandbyTime": 30
 *     }
 * }
 */
export const deltaPro3DeviceTimeoutCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgDevStandbyTime: integer.min(0),
  }),
});

export type DeltaPro3DeviceTimeoutCommand = z.infer<
  typeof deltaPro3DeviceTimeoutCommandSchema
>;

/**
 * Sets screen brightness.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgLcdLight": 30
 *     }
 * }
 */
export const deltaPro3ScreenBrightnessCommandSchema =
  deltaPro3BaseSchema.extend({
    params: z.object({
      cfgLcdLight: integer.min(0),
    }),
  });

export type DeltaPro3ScreenBrightnessCommand = z.infer<
  typeof deltaPro3ScreenBrightnessCommandSchema
>;

/**
 * High-voltage AC output switch.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgHvAcOutOpen": true
 *     }
 * }
 */
export const deltaPro3HvAcOutOpenCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgHvAcOutOpen: z.boolean(),
  }),
});

export type DeltaPro3HvAcOutOpenCommand = z.infer<
  typeof deltaPro3HvAcOutOpenCommandSchema
>;

/**
 * Low-voltage AC output switch.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgLvAcOutOpen": true
 *     }
 * }
 */
export const deltaPro3LvAcOutOpenCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgLvAcOutOpen: z.boolean(),
  }),
});

export type DeltaPro3LvAcOutOpenCommand = z.infer<
  typeof deltaPro3LvAcOutOpenCommandSchema
>;

/**
 * Sets the AC output frequency (50Hz/60Hz).
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgAcOutFreq": 50
 *     }
 * }
 */
export const deltaPro3AcOutFreqCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgAcOutFreq: z.literal(50).or(z.literal(60)),
  }),
});

export type DeltaPro3AcOutFreqCommand = z.infer<
  typeof deltaPro3AcOutFreqCommandSchema
>;

/**
 * 12V output switch.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgDc12vOutOpen": true
 *     }
 * }
 */
export const deltaPro3Dc12vOutOpenCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgDc12vOutOpen: z.boolean(),
  }),
});

export type DeltaPro3Dc12vOutOpenCommand = z.infer<
  typeof deltaPro3Dc12vOutOpenCommandSchema
>;

/**
 * X-Boost switch.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgXboostEn": true
 *     }
 * }
 */
export const deltaPro3XboostEnCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgXboostEn: z.boolean(),
  }),
});

export type DeltaPro3XboostEnCommand = z.infer<
  typeof deltaPro3XboostEnCommandSchema
>;

/**
 * Shuts down the device.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgPowerOff": true
 *     }
 * }
 */
export const deltaPro3PowerOffCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgPowerOff: z.boolean(),
  }),
});

export type DeltaPro3PowerOffCommand = z.infer<
  typeof deltaPro3PowerOffCommandSchema
>;

/**
 * Sets the charge limit.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgMaxChgSoc": 70
 *     }
 * }
 */
export const deltaPro3MaxChgSocCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgMaxChgSoc: z.number().int().min(0).max(100),
  }),
});

export type DeltaPro3MaxChgSocCommand = z.infer<
  typeof deltaPro3MaxChgSocCommandSchema
>;

/**
 * Sets the discharge limit.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgMinDsgSoc": 30
 *     }
 * }
 */
export const deltaPro3MinDsgSocCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgMinDsgSoc: z.number().int().min(0).max(100),
  }),
});

export type DeltaPro3MinDsgSocCommand = z.infer<
  typeof deltaPro3MinDsgSocCommandSchema
>;

/**
 * Sets the backup reserve level.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgEnergyBackup": {
 *             "energyBackupStartSoc": 40,
 *             "energyBackupEn": true
 *         }
 *     }
 * }
 */
export const deltaPro3EnergyBackupCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgEnergyBackup: z.object({
      energyBackupStartSoc: z.number().int().min(0).max(100),
      energyBackupEn: z.boolean(),
    }),
  }),
});

export type DeltaPro3EnergyBackupCommand = z.infer<
  typeof deltaPro3EnergyBackupCommandSchema
>;

/**
 * Sets the maximum input current of the low-voltage PV port.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgPlugInInfoPvLDcAmpMax": 7
 *     }
 * }
 */
export const deltaPro3PlugInInfoPvLDcAmpMaxCommandSchema =
  deltaPro3BaseSchema.extend({
    params: z.object({
      cfgPlugInInfoPvLDcAmpMax: z.number().int(),
    }),
  });

export type DeltaPro3PlugInInfoPvLDcAmpMaxCommand = z.infer<
  typeof deltaPro3PlugInInfoPvLDcAmpMaxCommandSchema
>;

/**
 * Sets the maximum input current of the high-voltage PV port.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgPlugInInfoPvHDcAmpMax": 12
 *     }
 * }
 */
export const deltaPro3PlugInInfoPvHDcAmpMaxCommandSchema =
  deltaPro3BaseSchema.extend({
    params: z.object({
      cfgPlugInInfoPvHDcAmpMax: z.number().int(),
    }),
  });

export type DeltaPro3PlugInInfoPvHDcAmpMaxCommand = z.infer<
  typeof deltaPro3PlugInInfoPvHDcAmpMaxCommandSchema
>;

/**
 * Sets the maximum AC charging power.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgPlugInInfoAcInChgPowMax": 3000
 *     }
 * }
 */
export const deltaPro3SetMaxAcChargingPowCommandSchema =
  deltaPro3BaseSchema.extend({
    params: z.object({
      cfgPlugInInfoAcInChgPowMax: z.number().int(),
    }),
  });

export type DeltaPro3SetMaxAcChargingPowCommand = z.infer<
  typeof deltaPro3SetMaxAcChargingPowCommandSchema
>;

/**
 * Maximum charging power of the Power In/Out port.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgPlugInInfo5p8ChgPowMax": 1800
 *     }
 * }
 */
export const deltaPro3MaxChargingPowIOCommandSchema =
  deltaPro3BaseSchema.extend({
    params: z.object({
      cfgPlugInInfo5p8ChgPowMax: z.number().int(),
    }),
  });

export type DeltaPro3MaxChargingPowIOCommand = z.infer<
  typeof deltaPro3MaxChargingPowIOCommandSchema
>;

/**
 * Smart Generator auto start/stop switch.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgCmsOilSelfStart": true
 *     }
 * }
 */
export const deltaPro3CmsOilSelfStartCommandSchema = deltaPro3BaseSchema.extend(
  {
    params: z.object({
      cfgCmsOilSelfStart: z.boolean(),
    }),
  },
);

export type DeltaPro3CmsOilSelfStartCommand = z.infer<
  typeof deltaPro3CmsOilSelfStartCommandSchema
>;

/**
 * Sets the SOC that automatically starts the Smart Generator.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgCmsOilOnSoc": 36
 *     }
 * }
 */
export const deltaPro3CmsOilOnSocCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgCmsOilOnSoc: z.number().int().min(0).max(100),
  }),
});

export type DeltaPro3CmsOilOnSocCommand = z.infer<
  typeof deltaPro3CmsOilOnSocCommandSchema
>;

/**
 * Sets the SOC that automatically stops the Smart Generator.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgCmsOilOffSoc": 67
 *     }
 * }
 */
export const deltaPro3CmsOilOffSocCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgCmsOilOffSoc: z.number().int().min(0).max(100),
  }),
});

export type DeltaPro3CmsOilOffSocCommand = z.infer<
  typeof deltaPro3CmsOilOffSocCommandSchema
>;

/**
 * GFCI switch.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgLlcGFCIFlag": true
 *     }
 * }
 */
export const deltaPro3LlcGFCIFlagCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgLlcGFCIFlag: z.boolean(),
  }),
});

export type DeltaPro3LlcGFCIFlagCommand = z.infer<
  typeof deltaPro3LlcGFCIFlagCommandSchema
>;

/**
 * Sets Bluetooth timeout.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgBleStandbyTime": 200
 *     }
 * }
 */
export const deltaPro3BleStandbyTimeCommandSchema = deltaPro3BaseSchema.extend({
  params: z.object({
    cfgBleStandbyTime: z.number().int().min(0).max(10000),
  }),
});

export type DeltaPro3BleStandbyTimeCommand = z.infer<
  typeof deltaPro3BleStandbyTimeCommandSchema
>;

/**
 * AC energy-saving mode switch.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgAcEnergySavingOpen": true
 *     }
 * }
 */
export const deltaPro3AcEnergySavingModeCommandSchema =
  deltaPro3BaseSchema.extend({
    params: z.object({
      cfgAcEnergySavingOpen: z.boolean(),
    }),
  });

export type DeltaPro3AcEnergySavingModeCommand = z.infer<
  typeof deltaPro3AcEnergySavingModeCommandSchema
>;

/**
 * Battery charging/discharging order.
 * 0: default
 * 1: The device will automatically decide the charge and discharge order based on each battery's voltage.
 * 2: The main battery is prioritized during charging, and extra batteries are prioritized during discharging.
 * {
 *     "sn": "MR51ZAS2PG330026",
 *     "cmdId": 17,
 *     "dirDest": 1,
 *     "dirSrc": 1,
 *     "cmdFunc": 254,
 *     "dest": 2,
 *     "needAck": true,
 *     "params": {
 *         "cfgMultiBpChgDsgMode": 1
 *     }
 * }
 */
export const deltaPro3BatterChargingOrderCommandSchema =
  deltaPro3BaseSchema.extend({
    params: z.object({
      cfgMultiBpChgDsgMode: z.number().int().min(0).max(2),
    }),
  });

export type DeltaPro3BatterChargingOrderCommand = z.infer<
  typeof deltaPro3BatterChargingOrderCommandSchema
>;

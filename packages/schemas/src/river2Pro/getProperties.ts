import { z } from "zod";
import { integer, zeroOrOne } from "../shared";

export const river2ProQuotaAllSchema = z
  .object({
    /**
     * Battery Management System
     */

    // Remaining charge time.
    "bms_bmsStatus.remainTime": integer,
    // Battery time remaining.
    "bms_emsStatus.dsgRemainTime": integer,
    // Charge limit.
    "bms_emsStatus.maxChargeSoc": z.number().min(0).max(100),
    // Discharge limit.
    "bms_emsStatus.minDsgSoc": z.number().min(0).max(100),

    /**
     * Inverter
     */

    // AC input real-time power.
    "inv.inputWatts": integer,
    // AC output real-time power.
    "inv.outputWatts": integer,

    /**
     * MPPT
     */

    // AC output on/off: 1 on, 0 off.
    "mppt.cfgAcEnabled": zeroOrOne,
    // X-Boost on/off: 1 on, 0 off.
    "mppt.cfgAcXboost": zeroOrOne,
    // AC output voltage.
    "mppt.cfgAcOutVol": integer,
    // AC output frequency.
    "mppt.cfgAcOutFreq": integer,
    // DC input real-time power.
    "mppt.inWatts": integer,

    /**
     * PD Module
     */

    // Total output real-time power.
    "pd.wattsOutSum": integer,
    // DC output real-time power.
    "pd.carWatts": integer,
    // USB-A output real-time power.
    "pd.usb1Watts": integer,
    // USB-C input real-time power.
    "pd.typecChaWatts": integer,
    // USB-C output real-time power.
    "pd.typec1Watts": integer,
    // Battery level.
    "pd.soc": z.number().min(0).max(100),
    // 12V DC output on/off.
    "pd.carState": zeroOrOne,
    // Energy management on/off.
    "pd.watchIsConfig": zeroOrOne,
    // Backup reserve.
    "pd.bpPowerSoc": integer,
  })
  .passthrough();

export type River2ProQuotaAll = z.infer<typeof river2ProQuotaAllSchema>;

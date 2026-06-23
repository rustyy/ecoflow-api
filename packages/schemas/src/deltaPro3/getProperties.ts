import { z } from "zod";
import { integer, zeroOrOne, zeroOrOneOrTwo } from "../shared";

export const deltaPro3QuotaAllSchema = z
  .object({
    // int - Device error code
    errcode: integer,
    // int - Sleep status
    devSleepState: integer,
    // int - Device timeout (min).
    // 0: the device will never sleep
    devStandbyTime: integer,
    // int - DC timeout (min).
    // 0: DC output ports will never time out
    dcStandbyTime: integer,
    // int - Bluetooth timeout (h).
    // 0: Bluetooth will never time out
    bleStandbyTime: integer,
    // int - AC timeout (min).
    // 0: AC output ports will never time out.
    acStandbyTime: integer,
    // int - Discharge limit.
    cmsMinDsgSoc: integer,
    // int - Charging/Discharging status.
    // 0: not charging or discharging,
    // 1: discharging,
    // 2: charging.
    cmsChgDsgState: zeroOrOneOrTwo,
    // int - On/Off status. 0: off, 1: on.
    cmsBmsRunState: zeroOrOne,
    // float - Overall SOC
    cmsBattSoc: z.number().min(0).max(100),
    // int - Charge limit
    cmsMaxChgSoc: integer,
    // int - Remaining charging time (min)
    cmsChgRemTime: integer,
    // bool - Smart Generator auto start/stop switch.
    cmsOilSelfStart: zeroOrOne,
    // int - SOC for automatically stopping the Smart Generator.
    cmsOilOffSoc: integer,
    // int - Remaining discharging time (min).
    cmsDsgRemTime: integer,
    // int - SOC for automatically stopping the Smart Generator.
    cmsOilOnSoc: integer,
    // int - Remaining charging time of the main battery (min).
    bmsChgRemTime: integer,
    // int - Battery capacity (mAh).
    bmsDesignCap: integer,
    // int - Temperature of the main battery (°C).
    bmsMaxCellTemp: integer,
    // float - SOC of the main battery.
    bmsBattSoc: z.number().min(0).max(100),
    // int - Charging/Discharging status of the main battery.
    // 0: not charging/discharging,
    // 1: discharging,
    // 2: charging.
    bmsChgDsgState: zeroOrOneOrTwo,
    // int - Minimum temperature of the main battery (°C).
    bmsMinCellTemp: integer,
    // int - Remaining discharging time (min).
    bmsDsgRemTime: integer,
    // float - Total input power (W).
    powInSumW: z.number(),
    // float - Total output power (W).
    powOutSumW: z.number(),
    // float - Real-time grid power (W).
    powGetAcHvOut: z.number(),
    // float - Real-time AC power (W).
    powGetAc: z.number(),
    // float - Real-time power of Type-C port 1 (W).
    powGetTypec1: z.number(),
    // float - Real-time power of Type-C port 2 (W).
    powGetTypec2: z.number(),
    // float - Real-time 12V power (W).
    powGet12v: z.number(),
    // float - Real-time 24V power (W).
    powGet24v: z.number(),
    // float - Real-time low-voltage AC output power (W).
    powGetAcLvOut: z.number(),
    // float - Real-time power of the Power In/Out port (W).
    powGet5p8: z.number(),
    // float - Real-time power of the USB 1 port (W).
    powGetQcusb1: z.number(),
    // float - Real-time power of the USB 2 port (W).
    powGetQcusb2: z.number(),
    // float - Real-time power of Extra Battery Port 1 (W).
    powGet4p81: z.number(),
    // float - Real-time power of Extra Battery Port 2 (W).
    powGet4p82: z.number(),
    // float - Real-time power of the low-voltage AC output port (W).
    powGetAcLvTt30Out: z.number(),
    // float - Real-time high-voltage PV power (W).
    powGetPvH: z.number(),
    // float - Real-time AC input power (W).
    powGetAcIn: z.number(),
    // float - Real-time low-voltage PV power (W).
    powGetPvL: z.number(),
    // int - Maximum AC charging power.
    plugInInfoAcInChgHalPowMax: integer,
    // bool - PV connection status.
    // 0: disconnected,
    // 1: connected.
    plugInInfoPvHChargerFlag: zeroOrOne,
    // int - Indicates whether the Extra Battery port is connected.
    // 0: disconnected,
    // 1: connected.
    plugInInfo4p82InFlag: zeroOrOne,
    // int - Maximum charging current of the PV port.
    plugInInfoPvLChgAmpMax: integer,
    // int - AC input frequency.
    plugInInfoAcInFeq: integer,
    // int - PV port charging mode.
    // 1: car charging,
    // 2: solar charging,
    // 3: DC charging.
    plugInInfoPvLType: z.literal(1).or(z.literal(2)).or(z.literal(3)),
    // int - Operating status of the device connected to the Power In/Out port.
    plugInInfo5p8RunState: integer,
    // int - Operating status of the device connected to Extra Battery Port 2.
    plugInInfo4p82RunState: integer,
    // bool - Identifier of charger connection to Extra Battery Port 1. 0: disconnected, 1: connected.
    plugInInfo4p81ChargerFlag: zeroOrOne,
    // int - Operating status of the device connected to the Power In/Out port.
    plugInInfo5p8ChgHalPowMax: integer,
    // int - Maximum charging current of the high-voltage PV port (A).
    plugInInfoPvHChgAmpMax: integer,
    // int - Maximum discharging power of the Power In/Out port.
    plugInInfo5p8DsgPowMax: integer,
    // int - Maximum AC charging power (W).
    plugInInfoAcInChgPowMax: integer,
    // int - High-voltage PV port charging mode. 1: car charging, 2: solar charging, 3: DC charging.
    plugInInfoPvHType: z.literal(1).or(z.literal(2)).or(z.literal(3)),
    // bool - Operating status of the device connected to the Power In/Out port.
    plugInInfo5p8ChargerFlag: zeroOrOne,
    // int - Indicates whether the AC charging port is connected. 0: disconnected, 1: connected.
    plugInInfoAcInFlag: zeroOrOne,
    // int - Charging/Discharging type of Extra Battery Port 1.
    // 0: reserved,
    // 1: charging/discharging,
    // 2: charging only,
    // 3: discharging only.
    plugInInfo4p81DsgChgType: z
      .literal(0)
      .or(z.literal(1))
      .or(z.literal(2))
      .or(z.literal(3)),
    // bool - Indicates whether the charger is connected to the AC port.
    // 0: disconnected,
    // 1: connected.
    plugInInfoAcChargerFlag: zeroOrOne,
    // int - Indicates whether the high-voltage PV port is connected.
    // 0: disconnected,
    // 1: connected.
    plugInInfoPvHFlag: zeroOrOne,
    // string - SN of the device connected to the Extra Battery port.
    plugInInfo4p81Sn: z.string(),
    // int - Charging/Discharging type of Extra Battery Port 2.
    // 1: charging/discharging,
    // 2: charging only,
    // 3: discharging only.
    plugInInfo4p82DsgChgType: z.literal(1).or(z.literal(2)).or(z.literal(3)),
    // int - Maximum DC input current of the high-voltage PV port (A).
    plugInInfoPvHDcAmpMax: integer,
    // int - Indicates whether Extra Battery Port 1 is connected.
    // 0: disconnected,
    // 1: connected.
    plugInInfo4p81InFlag: zeroOrOne,
    // bool - Identifier of charger connection to Extra Battery Port 2.
    // 0: disconnected,
    // 1: connected.
    plugInInfo4p82ChargerFlag: zeroOrOne,
    // int - Maximum charging voltage of the low-voltage PV port (V).
    plugInInfoPvLChgVolMax: integer,
    // int - Maximum DC input current of the low-voltage PV port (A).
    plugInInfoPvLDcAmpMax: integer,
    // int - Indicates whether the Power In/Out port is connected.
    // 0: disconnected,
    // 1: connected.
    plugInInfo5p8Flag: zeroOrOne,
    // int - Maximum AC discharging power.
    plugInInfoAcOutDsgPowMax: integer,
    // string - SN of the device connected to the Power In/Out port.
    plugInInfo5p8Sn: z.string(),
    // bool - Identifier of charger connection to the low-voltage PV port.
    // 0: disconnected,
    // 1: connected.
    plugInInfoPvLChargerFlag: zeroOrOne,
    // string - SN of the ecosystem product connected to Extra Battery Port 2.
    plugInInfo4p82Sn: z.string(),
    // int - Maximum charging power of the Power In/Out port.
    plugInInfo5p8ChgPowMax: integer,
    // int - Indicates whether the low-voltage PV port is connected.
    // 0: disconnected,
    // 1: connected.
    plugInInfoPvLFlag: zeroOrOne,
    // int - Operating status of the device connected to Extra Battery Port 1.
    plugInInfo4p81RunState: integer,
    // int - Maximum charging voltage of the high-voltage PV port (V).
    plugInInfoPvHChgVolMax: integer,
    // int - Charging/Discharging type of the Power In/Out port.
    plugInInfo5p8DsgChg: integer,
    // int - Low-voltage PV switch status. (0: off, 2: on.)
    flowInfoPvL: z.literal(0).or(z.literal(2)),
    // int - High-voltage PV switch status. (0: off, 2: on.)
    flowInfoPvH: z.literal(0).or(z.literal(2)),
    // int - Type-C port 1 switch status. (0: off, 2: on.)
    flowInfoTypec1: z.literal(0).or(z.literal(2)),
    // int - Type-C port 2 switch status. (0: off, 2: on.)
    flowInfoTypec2: z.literal(0).or(z.literal(2)),
    // int - AC low-voltage output switch status. (0: off, 2: on.)
    flowInfoAcLvOut: z.literal(0).or(z.literal(2)),
    // int - Extra Battery port output switch status. (0: off, 2: on.)
    flowInfo4p82Out: z.literal(0).or(z.literal(2)),
    // int - AC input switch status. (0: off, 2: on.)
    flowInfoAcIn: z.literal(0).or(z.literal(2)),
    // int - High-voltage AC output switch status. (0: off, 2: on.)
    flowInfoAcHvOut: z.literal(0).or(z.literal(2)),
    // int - 12V output switch status. (0: off, 2: on.)
    flowInfo12v: z.literal(0).or(z.literal(2)),
    // int - 24V output switch status. (0: off, 2: on.)
    flowInfo24v: z.literal(0).or(z.literal(2)),
    // int - Extra Battery Port 1 input switch status. (0: off, 2: on.)
    flowInfo4p81In: z.literal(0).or(z.literal(2)),
    // int - USB output port 1 switch status. (0: off, 2: on.)
    flowInfoQcusb1: z.literal(0).or(z.literal(2)),
    // int - USB output port 2 switch status. (0: off, 2: on.)
    flowInfoQcusb2: z.literal(0).or(z.literal(2)),
    // int - Extra Battery Port 2 input switch status. (0: off, 2: on.)
    flowInfo4p82In: z.literal(0).or(z.literal(2)),
    // int - Power In/Out port switch status. (0: off, 2: on.)
    flowInfo5p8In: z.literal(0).or(z.literal(2)),
    // int - Extra Battery Port 1 switch status. (0: off, 2: on.)
    flowInfo4p81Out: z.literal(0).or(z.literal(2)),
    // int - Power In/Out port switch status. (0: off, 2: on.)
    flowInfo5p8Out: z.literal(0).or(z.literal(2)),
    // bool - AC energy-saving mode switch. 0: off, 1: on.
    acEnergySavingOpen: zeroOrOne,
    // int - Battery charging/discharging order.
    // 0: default
    // 1: The device will automatically decide the charge and discharge order based on each battery's voltage.
    // 2: The main battery is prioritized during charging, and extra batteries are prioritized during discharging.
    multiBpChgDsgMode: zeroOrOneOrTwo,
    // int - Fast charging slider switch.
    // 0: fast charging;
    // 1: custom charging power.
    fastChargeSwitch: zeroOrOne,
    // int - Screen brightness.
    lcdLight: integer,
    // bool - Backup reserve function switch.
    // 0: off,
    // 1: on.
    energyBackupEn: zeroOrOne,
    // int - AC output frequency.
    acOutFreq: integer,
    // bool - X-Boost switch. 0: off, 1: on.
    xboostEn: zeroOrOne,
    // int - High-voltage/Low-voltage AC identifier.
    llcHvLvFlag: integer,
    // bool - GFCI switch.
    llcGFCIFlag: zeroOrOne,
    // bool - AC Always-on.
    acLvAlwaysOn: zeroOrOne,
    // int - Screen timeout (s).
    // 0: The screen will never time out. Other values: using the value you set (unit: s).
    screenOffTime: integer,
    // int - Backup reserve level.
    energyBackupStartSoc: integer,
    // bool - Sets the High-voltage AC Always-on function. 0: off. 1: on.
    acHvAlwaysOn: zeroOrOne,
    // int - Sets the minimum SOC to enable the AC Always-on function.
    acAlwaysOnMiniSoc: integer,
    // bool - Indicates whether the beeper is turned on. 0: off, 1: on.
    enBeep: zeroOrOne,
    // bool - Generator and solar energy hybrid mode. 0: off, 1: on.
    generatorPvHybridModeOpen: zeroOrOne,
    // bool - Night care mode switch. 0: off, 1: on.
    generatorCareModeOpen: zeroOrOne,
    // int - Maximum SOC in the generator and solar energy hybrid mode
    generatorPvHybridModeSocMax: integer,
  })
  .passthrough();

export type DeltaPro3QuotaAll = z.infer<typeof deltaPro3QuotaAllSchema>;

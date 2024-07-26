import { z } from "zod";
import { integer, taskSchema, zeroOrOne } from "../shared";

export const powerStreamQuotaAllSchema = z.object({
  /**********
   * PV 1
   **********/

  // Micro-inverter PV1 error code
  "20_1.pv1ErrCode": integer,
  // Micro-inverter PV1 warning code
  "20_1.pv1WarnCode": integer,
  // Micro-inverter PV1 operating status
  "20_1.pv1Statue": integer,
  // Micro-inverter relay status
  "20_1.pv1RelayStatus": integer,
  // PV1 input current: 0.1 A
  "20_1.pv1InputCur": integer.nonnegative(),
  // PV1 input voltage: 0.1 V
  "20_1.pv1InputVolt": integer.nonnegative(),
  // PV1 temperature: 0.1°C
  "20_1.pv1Temp": integer,
  // PV1 input power: 0.1 W
  "20_1.pv1InputWatts": integer.nonnegative(),
  // PV1 output voltage: 0.1 V
  "20_1.pv1OpVolt": integer.nonnegative(),

  // @todo: Not documented in the official docs.
  "20_1.pv1CtrlMpptOffFlag": integer,

  /**********
   * PV 2
   **********/

  // PV2 error code
  "20_1.pv2ErrCode": integer,
  // PV2 warning code
  "20_1.pv2WarningCode": integer,
  // Micro-inverter relay status
  "20_1.pv2RelayStatus": integer,
  // Micro-inverter PV2 operating status
  "20_1.pv2Statue": integer,
  // PV2 temperature: 0.1°C
  "20_1.pv2Temp": integer,
  // PV2 output voltage: 0.1 V
  "20_1.pv2OpVolt": integer.nonnegative(),
  // PV2 input current: 0.1 A
  "20_1.pv2InputCur": integer.nonnegative(),
  // PV2 input power: 0.1 W
  "20_1.pv2InputWatts": integer.nonnegative(),
  // PV2 input voltage: 0.1 V
  "20_1.pv2InputVolt": integer.nonnegative(),

  // @todo: Not documented in the official docs.
  "20_1.pv2CtrlMpptOffFlag": integer,

  /**********
   * LLC
   **********/

  // Micro-inverter LLC operating status: 1: IDEL; 2: START; ...check inv_logic
  "20_1.llcStatue": integer,
  // LLC output voltage: 0.1 V
  "20_1.llcOpVolt": integer.nonnegative(),
  // LLC temperature: 0.1°C
  "20_1.llcTemp": integer,
  // LLC error code
  "20_1.llcErrCode": integer,
  // LLC input voltage: 0.1 V
  "20_1.llcInputVolt": integer.nonnegative(),
  // LLC warning code
  "20_1.llcWarningCode": integer,

  // @todo: Not documented in the official docs.
  "20_1.llcOffFlag": integer,

  /**********
   * BAT
   **********/

  // BAT input voltage: 0.1 V
  "20_1.batInputVolt": integer.nonnegative(),
  // BAT output voltage: 0.1 V
  "20_1.batOpVolt": integer.nonnegative(),
  // Battery type: 0: no battery; 1: secondary pack; 2: primary pack; 3: primary pack
  "20_1.bpType": integer.min(0).max(3),
  // BAT warning code
  "20_1.batWarningCode": integer,
  // BAT input power: 0.1 W; positive for discharging and negative for charging
  "20_1.batInputWatts": integer,
  // BAT error code
  "20_1.batErrCode": integer,
  // Battery level
  "20_1.batSoc": integer.nonnegative(),
  // Micro-inverter BAT operating status
  "20_1.batStatue": integer,
  // BAT temperature: 0.1°C
  "20_1.batTemp": integer,
  // BAT input current: 0.1 A; positive for discharging and negative for charging
  "20_1.batInputCur": integer,

  // @todo: Not documented in the official docs.
  "20_1.batErrorInvLoadLimit": integer.nonnegative(),
  // @todo: Not documented in the official docs.
  "20_1.batLoadLimitFlag": integer,
  // @todo: Not documented in the official docs.
  "20_1.batOutputLoadLimit": integer,
  // @todo: Not documented in the official docs.
  "20_1.batOffFlag": integer,
  // @todo: Not documented in the official docs.
  "20_1.batSystem": integer,

  /**********
   * INV
   **********/

  // INV input power: 0.1 W; positive for discharging and negative for charging
  "20_1.invOutputWatts": integer,
  // Micro-inverter switch: 0: off; 1: on
  "20_1.invOnOff": zeroOrOne,
  // INV output voltage: 0.1 V; ac_voltage
  "20_1.invOpVolt": integer.nonnegative(),
  // INV input current: 0.1 A; positive for discharging and negative for charging
  "20_1.invOutputCur": integer,
  // Micro-inverter LED brightness adjustment
  "20_1.invBrightness": integer,
  // Micro-inverter Wireless warning code
  "20_1.wirelessWarnCode": integer,
  // Micro-inverter AC error code
  "20_1.invErrCode": integer,
  // INV input voltage: 0.1 V; DC voltage
  "20_1.invInputVolt": integer.nonnegative(),
  // INV frequency: 0.1 Hz
  "20_1.invFreq": integer.nonnegative(),
  // INV temperature: 0.1°C
  "20_1.invTemp": integer,
  // Micro-inverter Wireless error code
  "20_1.wirelessErrCode": integer,
  // Micro-inverter INV operating status: 1: IDEL; 2: START; ...check inv_logic; 6: successful grid connection
  "20_1.invStatue": integer.nonnegative(),
  // Micro-inverter relay status
  "20_1.invRelayStatus": integer,
  // Micro-inverter AC warning code
  "20_1.invWarnCode": integer,

  // @todo: Not documented in the official docs.
  "20_1.invOutputLoadLimit": integer,
  // @todo: Not documented in the official docs.
  "20_1.invToPlugWatts": integer,
  // @todo: Not documented in the official docs.
  "20_1.invDemandWatts": integer,
  // @todo: Not documented in the official docs.
  "20_1.invLoadLimitFlag": integer,
  // @todo: Not documented in the official docs.
  "20_1.invToOtherWatts": integer,

  /**********
   * Tasks
   **********/

  "20_134.task1": taskSchema,
  "20_134.task2": taskSchema,
  "20_134.task3": taskSchema,
  "20_134.task4": taskSchema,
  "20_134.task5": taskSchema,
  "20_134.task6": taskSchema,
  "20_134.task7": taskSchema,
  "20_134.task8": taskSchema,
  "20_134.task9": taskSchema,
  "20_134.task10": taskSchema,
  "20_134.task11": taskSchema,

  /**********
   * Misc
   **********/

  // Remaining charging time
  "20_1.chgRemainTime": integer,
  // Remaining discharging time
  "20_1.dsgRemainTime": integer.nonnegative(),
  // Dynamic power adjustment
  "20_1.dynamicWatts": integer.nonnegative(),
  // Micro-inverter heartbeat frequency
  "20_1.heartbeatFrequency": integer.nonnegative(),
  // Country
  "20_1.installCountry": integer.nonnegative(),
  // City
  "20_1.installTown": integer.nonnegative(),
  // Custom load power (power of loads not connected to smart plugs)
  "20_1.permanentWatts": integer.nonnegative(),
  // Rated power
  "20_1.ratedPower": integer,
  // Change time
  "20_1.updateTime": z.string(),
  // Power supply priority: 0: prioritize power supply; 1: prioritize power storage
  "20_1.supplyPriority": zeroOrOne,
  // Discharge limit
  "20_1.lowerLimit": integer,
  // Charge Level
  "20_1.upperLimit": integer.nonnegative(),

  // @todo: Not documented in the official docs.
  "20_1.mqttTlsLastErr": integer,
  // @todo: Not documented in the official docs.
  "20_1.consNum": integer,
  // @todo: Not documented in the official docs.
  "20_1.feedProtect": integer,
  // @todo: Not documented in the official docs.
  "20_1.mqttSockErrno": integer.nonnegative(),
  // @todo: Not documented in the official docs.
  "20_1.pvToInvWatts": integer,
  // @todo: Not documented in the official docs.
  "20_1.geneNum": integer,
  // @todo: Not documented in the official docs.
  "20_1.meshId": integer,
  // @todo: Not documented in the official docs.
  "20_1.mqttTlsStackErr": integer,
  // @todo: Not documented in the official docs.
  "20_1.acOffFlag": integer,
  // @todo: Not documented in the official docs.
  "20_1.mqttErrTime": integer,
  // @todo: Not documented in the official docs - looks like, can be negative
  "20_1.staIpAddr": integer,
  // @todo: Not documented in the official docs.
  "20_1.uwlowLightFlag": integer,
  // @todo: Not documented in the official docs - looks like, can be negative
  "20_1.consWatt": integer,
  // @todo: Not documented in the official docs.
  "20_1.meshLayel": integer,
  // @todo: Not documented in the official docs.
  "20_1.uwloadLimitFlag": integer,
  // @todo: Not documented in the official docs.
  "20_1.floadLimitOut": integer,
  // @todo: Not documented in the official docs.
  "20_134.updateTime": z.string(),
  // @todo: Not documented in the official docs.
  "20_1.wifiErrTime": integer.nonnegative(),
  // @todo: Not documented in the official docs.
  "20_1.stackMinFree": integer,
  // @todo: Not documented in the official docs.
  "20_1.resetCount": integer,
  // @todo: Not documented in the official docs.
  "20_1.uwsocFlag": integer,
  // @todo: Not documented in the official docs.
  "20_1.plugTotalWatts": integer.nonnegative(),
  // @todo: Not documented in the official docs.
  "20_1.resetReason": integer,
  // @todo: Not documented in the official docs.
  "20_1.stackFree": integer,
  // @todo: Not documented in the official docs.
  "20_1.selfMac": integer,
  // @todo: Not documented in the official docs.
  "20_1.gridConsWatts": integer,
  // @todo: Not documented in the official docs.
  "20_1.geneWatt": integer,
  // @todo: Not documented in the official docs.
  "20_1.bmsReqChgVol": integer,
  // @todo: Not documented in the official docs.
  "20_1.interfaceConnFlag": integer,
  // @todo: Not documented in the official docs.
  "20_1.spaceDemandWatts": integer.nonnegative(),
  // @todo: Not documented in the official docs.
  "20_1.bmsReqChgAmp": integer,
  // @todo: Not documented in the official docs.
  "20_1.antiBackFlowFlag": integer,
  // @todo: Not documented in the official docs.
  "20_1.mqttErr": integer,
  // @todo: Not documented in the official docs.
  "20_1.wifiErr": integer,
  // @todo: Not documented in the official docs.
  "20_1.wifiRssi": integer,
  // @todo: Not documented in the official docs.
  "20_1.pvPowerLimitAcPower": integer,
  // @todo: Not documented in the official docs.
  "20_1.parentMac": integer,
});

export type PowerStreamQuotaAll = z.infer<typeof powerStreamQuotaAllSchema>;

import { z } from "zod";
import { integer, taskSchema, zeroOrOne } from "../shared";

export const powerStreamQuotaAllSchema = z
  .object({
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
    // PV1 on/off status: 0: off; 1: on
    "20_1.pv1CtrlMpptOffFlag": zeroOrOne,

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
    // PV2 on/off status: 0: off; 1: on
    "20_1.pv2CtrlMpptOffFlag": zeroOrOne,

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
    // LLC on/off status: 0: off; 1: on
    "20_1.llcOffFlag": zeroOrOne,

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
    // Limited DC output power when DC power is low. Unit: 0.1W
    "20_1.batErrorInvLoadLimit": integer.nonnegative(),
    // Whether the BAT module is derated.0: no; 1: yes
    "20_1.batLoadLimitFlag": zeroOrOne,
    // BAT power after derating. Unit: 0.1W
    "20_1.batOutputLoadLimit": integer,
    // Battery on/off status: 0: off; 1: on
    "20_1.batOffFlag": zeroOrOne,
    // Whether PowerStream is connected to a power station or an EV 0: power station; 1: EV
    "20_1.batSystem": zeroOrOne,

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
    // PV power after derating. Unit: 0.1W
    "20_1.invOutputLoadLimit": integer,
    // @todo: Not documented in the official docs.
    "20_1.invToPlugWatts": integer,
    // @todo: Not documented in the official docs.
    "20_1.invDemandWatts": integer,
    // Whether the PV module is derated.0: no; 1: yes
    "20_1.invLoadLimitFlag": zeroOrOne,
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

    // MQTT network error code
    "20_1.mqttTlsLastErr": integer.nonnegative(),
    // Number of devices consuming power
    "20_1.consNum": integer,
    // Feed-in control: 0: off; 1: on
    "20_1.feedProtect": zeroOrOne,
    // MQTT network error code
    "20_1.mqttSockErrno": integer.nonnegative(),
    // @todo: Not documented in the official docs.
    "20_1.pvToInvWatts": integer,
    // Number of devices generating power
    "20_1.geneNum": integer,
    // Mesh ID
    "20_1.meshId": integer,
    // MQTT network error code
    "20_1.mqttTlsStackErr": integer,
    // INV on/off status: 0: off; 1: on
    "20_1.acOffFlag": zeroOrOne,
    // Timestamp of the MQQT error code
    "20_1.mqttErrTime": integer,
    // Static IP address, for determining whether devices are in the same LAN
    "20_1.staIpAddr": integer,
    // Whether anti-backflow is triggered due to low light.0: no; 1: yes
    "20_1.uwlowLightFlag": zeroOrOne,
    // Power consumed by Smart Plugs
    "20_1.consWatt": integer,
    // Mesh layer
    "20_1.meshLayel": integer,
    // Whether the INV module is derated.0: no; 1: yes
    "20_1.uwloadLimitFlag": zeroOrOne,
    // INV power after derating. Unit: 0.1W
    "20_1.floadLimitOut": integer,
    // @todo: Not documented in the official docs.
    "20_134.updateTime": z.string(),
    // Timestamp of the Wi-Fi error code
    "20_1.wifiErrTime": integer.nonnegative(),
    // Minimal stack space remaining
    "20_1.stackMinFree": integer,
    // Number of restarts
    "20_1.resetCount": integer,
    // Whether anti-backflow is triggered by the battery.0: no; 1: yes
    "20_1.uwsocFlag": zeroOrOne,
    // @todo: Not documented in the official docs.
    "20_1.plugTotalWatts": integer.nonnegative(),
    // Cause of restart
    "20_1.resetReason": integer,
    // Stack space remaining
    "20_1.stackFree": integer,
    // MAC address
    "20_1.selfMac": integer,
    // @todo: Not documented in the official docs.
    "20_1.gridConsWatts": integer,
    // Power generated
    "20_1.geneWatt": integer,
    // BMS requesting voltage
    "20_1.bmsReqChgVol": integer,
    // Port connection flag: bit0: AC connected; bit1: BAT connected; bit2: PV1connected; bit3: PV2 connected
    "20_1.interfaceConnFlag": integer,
    // @todo: Not documented in the official docs.
    "20_1.spaceDemandWatts": integer.nonnegative(),
    // BMS requesting current
    "20_1.bmsReqChgAmp": integer,
    // Whether anti-backflow is triggered.0: no; 1: yes
    "20_1.antiBackFlowFlag": zeroOrOne,
    // MQQT error code
    "20_1.mqttErr": integer,
    // Wi-Fi error code
    "20_1.wifiErr": integer,
    // Wi-Fi signal strength of the parent node
    "20_1.wifiRssi": integer,
    // Limited AC output power when PV power is low. Unit: 0.1W
    "20_1.pvPowerLimitAcPower": integer,
    // MAC address of the parent node
    "20_1.parentMac": integer,
  })
  .passthrough();

export type PowerStreamQuotaAll = z.infer<typeof powerStreamQuotaAllSchema>;

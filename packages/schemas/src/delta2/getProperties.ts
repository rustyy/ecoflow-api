import { z } from "zod";

const integer = z.number().int();

export const delta2QuotaAllSchema = z.object({
    /**
     * Battery Management System
     */

    // Current (mA)
    "bms_bmsStatus.amp": integer,
    // BMS permanent fault
    "bms_bmsStatus.bmsFault": integer,
    // BQ hardware protection register
    "bms_bmsStatus.bqSysStatReg": integer,
    // Cell material LI/LFP/LA, battery capacity type: 1: 2.5 Ah per battery; 2: 2 Ah per battery
    "bms_bmsStatus.cellId": z.literal(1).or(z.literal(2)),
    // Design capacity (mAh)
    "bms_bmsStatus.designCap": integer,
    // Global error code
    "bms_bmsStatus.errCode": integer,
    // Battery level SOC_float
    "bms_bmsStatus.f32ShowSoc": z.number(),
    // Full capacity (mAh)
    "bms_bmsStatus.fullCap": integer,
    // Input power [key indicator]
    "bms_bmsStatus.inputWatts": integer,
    // Maximum cell temperature
    "bms_bmsStatus.maxCellTemp": integer,
    // Maximum cell voltage
    "bms_bmsStatus.maxCellVol": integer,
    // Maximum MOS temperature
    "bms_bmsStatus.maxMosTemp": integer,
    // Minimum cell temperature
    "bms_bmsStatus.minCellTemp": integer,
    // int  Minimum cell voltage
    "bms_bmsStatus.minCellVol": integer,
    // Minimum MOS temperature
    "bms_bmsStatus.minMosTemp": integer,
    // int  BMS number: 0–2
    "bms_bmsStatus.num": integer,
    // Battery pack enabling status
    "bms_bmsStatus.openBmsIdx": integer,
    // Output power
    "bms_bmsStatus.outputWatts": integer,
    // Remaining capacity (mAh)
    "bms_bmsStatus.remainCap": integer,
    // Time remaining
    "bms_bmsStatus.remainTime": integer,
    // Battery level
    "bms_bmsStatus.soc": integer,
    // Health status
    "bms_bmsStatus.soh": integer,
    // System version
    "bms_bmsStatus.sysVer": integer,
    // Target charging current
    "bms_bmsStatus.tagChgAmp": integer,
    // Temperature (°C)
    "bms_bmsStatus.temp": integer,
    // BMS type: 1: lithium battery; 2: oil-powered
    "bms_bmsStatus.type": z.literal(1).or(z.literal(2)),
    // Voltage (mV)
    "bms_bmsStatus.vol": integer,
    // BMS in-place signal (3 byte): BIT0: Hardware in-place signal; BIT1: Software in-place signal
    "bms_emsStatus.bmsIsConnt": integer,
    // BMS model [key indicator]
    "bms_emsStatus.bmsModel": integer,
    // BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag
    "bms_emsStatus.bmsWarState": integer,
    // Charging current
    "bms_emsStatus.chgAmp": integer,
    // Charge command
    "bms_emsStatus.chgCmd": integer,
    // Remaining charging time (min)
    "bms_emsStatus.chgRemainTime": integer,
    // Charging status
    "bms_emsStatus.chgState": integer,
    // Charging voltage
    "bms_emsStatus.chgVol": integer,
    // Discharge command
    "bms_emsStatus.dsgCmd": integer,
    // Remaining discharging time (min)
    "bms_emsStatus.dsgRemainTime": integer,
    // 0:sleep 1:normal
    "bms_emsStatus.emsIsNormalFlag": z.literal(0).or(z.literal(1)),
    // SoC value displayed on LCD - used for displaying SOC with decimal point [key indicator]
    "bms_emsStatus.f32LcdShowSoc": z.number(),
    // Fan level
    "bms_emsStatus.fanLevel": integer,
    // SoC value displayed on LCD [key indicator]
    "bms_emsStatus.lcdShowSoc": integer,
    // Maximum available quantity
    "bms_emsStatus.maxAvailNum": integer,
    // Maximum charging SOC
    "bms_emsStatus.maxChargeSoc": integer,
    // Disable SOC of Smart Generator [key indicator]
    "bms_emsStatus.maxCloseOilEb": integer,
    // Minimum discharge SoC [key indicator]
    "bms_emsStatus.minDsgSoc": integer,
    // Enable SOC of Smart Generator [key indicator]
    "bms_emsStatus.minOpenOilEb": integer,
    // Battery pack enabling status
    "bms_emsStatus.openBmsIdx": integer,
    // UPS mode enable flag
    "bms_emsStatus.openUpsFlag": integer,
    // Maximum voltage when two devices work in parallel
    "bms_emsStatus.paraVolMax": integer,
    // Minimum voltage when two devices work in parallel
    "bms_emsStatus.paraVolMin": integer,

    /**
     * Inverter
     */

    // Maximum charging power for AC fast charging (W)
    "inv.FastChgWatts": integer,
    // AC fast/slow charging dip switch: 0: unknown; 1: fast charging mode; 2: slow charging mode
    "inv.acDipSwitch": z.literal(0).or(z.literal(1)).or(z.literal(2)),
    //  Inverter input current (mA)
    "inv.acInAmp": integer,
    //  Inverter input frequency (Hz)
    "inv.acInFreq": integer,
    // Inverter input voltage (mV)
    "inv.acInVol": integer,
    // AC switch: 0: off; 1: on
    "inv.cfgAcEnabled": z.literal(0).or(z.literal(1)),
    // Configured output frequency for inverter (Hz) [key indicator]
    "inv.cfgAcOutFreq": integer,
    // Output voltage configured for the inverter (V)
    "inv.cfgAcOutVol": integer,
    // AC charging mode: 0: full power; 1: mute
    "inv.cfgAcWorkMode": z.literal(0).or(z.literal(1)),
    // X-Boost switch: 0: off; 1: on
    "inv.cfgAcXboost": z.literal(0).or(z.literal(1)),
    // Charger type: 1: AC charging; 2: DC adapter charging; 3: solar charging; 4: CC; 5: BC
    "inv.chargerType": z
        .literal(1)
        .or(z.literal(2))
        .or(z.literal(3))
        .or(z.literal(4))
        .or(z.literal(5)),
    // PV charging pause flag bit: 1: charging stopped
    "inv.chgPauseFlag": integer,
    // DC input current (mA)
    "inv.dcInAmp": integer,
    // DC temperature (°C)
    "inv.dcInTemp": integer,
    // DC input voltage (mV)
    "inv.dcInVol": integer,
    // Discharging type: 1: AC discharging; 2: PR; 3: BC
    "inv.dischargeType": z.literal(1).or(z.literal(2)).or(z.literal(3)),
    // Global error code
    "inv.errCode": integer,
    // Fan status: 0: disabled; 1: Level 1; 2: Level 2; 3: Level 3
    "inv.fanState": z
        .literal(0)
        .or(z.literal(1))
        .or(z.literal(2))
        .or(z.literal(3)),
    // Charging power (W)
    "inv.inputWatts": integer,
    // Inverter output current (mA)
    "inv.invOutAmp": integer,
    // Inverter output frequency (Hz): 50 or 60;
    "inv.invOutFreq": z.literal(50).or(z.literal(60)),
    // Inverter actual output voltage (mV)
    "inv.invOutVol": integer,
    // PSDR model code (corresponds to dip Switch and high-low voltage switch)
    "inv.invType": integer,
    // INV temperature (°C)
    "inv.outTemp": integer,
    // Discharging power (W)
    "inv.outputWatts": integer,
    // Reserve 8 bytes
    "inv.reserved": integer,
    // Auto shutdown when there is no load: 0: never shut down, default value: 12 x 60 mins, unit: minutes
    "inv.standbyMins": integer,
    // System version
    "inv.sysVer": integer,

    /**
     * MPPT
     */

    // Auto shutdown when there is no load: 0: Never shut down; default: 12*60mins; unit: min [key indicator]
    "mppt.acStandbyMins": integer,
    // Buzzer status: 0: Default; 1: Silent mode [Key Indicators]
    "mppt.beepState": z.literal(0).or(z.literal(1)),
    // Car charger output current (mA)
    "mppt.carOutAmp": integer,
    // Car charger output voltage (mV)
    "mppt.carOutVol": integer,
    // Car charger output power (W)
    "mppt.carOutWatts": integer,
    // Auto shutdown when there is no load: 0: Never shut down; default value: 12*60mins; unit: min [key indicator]
    "mppt.carStandbyMin": integer,
    // Car charger switch status: 0: Off; 1: On [key indicator]
    "mppt.carState": z.literal(0).or(z.literal(1)),
    // Car charging temperature (°C)
    "mppt.carTemp": integer,
    // AC switch: 0: off; 1: on
    "mppt.cfgAcEnabled": z.literal(0).or(z.literal(1)),
    // Output frequency configured for the inverter (Hz)
    "mppt.cfgAcOutFreq": integer,
    // Output voltage configured for the inverter (V)
    "mppt.cfgAcOutVol": integer,
    // X-Boost switch: 1: On; 0: Off [key indicator]
    "mppt.cfgAcXboost": z.literal(0).or(z.literal(1)),
    // Configured charging type, which is valid when xt60_chg_type is 0: 0: Auto; 1: MPPT; 2: Adapter
    "mppt.cfgChgType": z.literal(0).or(z.literal(1)).or(z.literal(2)),
    // C maximum charging power (W) [key indicator]
    "mppt.cfgChgWatts": integer,
    // PV charging pause flag bit: 1: charging stopped
    "mppt.chgPauseFlag": integer,
    // Charging status: 0: Off; 1: Charging; 2: Standby (during AC charging, DC charging stops)
    "mppt.chgState": z.literal(0).or(z.literal(1)).or(z.literal(2)),
    // Actual charging type: 0: null; 1: Adapter (adapter/DC power); 2: MPPT (solar energy); 3: AC (grid charging); 4: Gas (petrol and electricity); 5: Wind (wind power) [key indicator]
    "mppt.chgType": z
        .literal(0)
        .or(z.literal(1))
        .or(z.literal(2))
        .or(z.literal(3))
        .or(z.literal(4))
        .or(z.literal(5)),
    // DCDC 24 V switch status: 0: off; 1: on
    "mppt.dc24vState": z.literal(0).or(z.literal(1)),
    // DCDC 24 V temperature (°C)
    "mppt.dc24vTemp": integer,
    // DC maximum charging current (mA) [key indicator]
    "mppt.dcChgCurrent": integer,
    // DC 12 V 30 A output current (mA)
    "mppt.dcdc12vAmp": integer,
    // DC 12 V 30 A output voltage (mV)
    "mppt.dcdc12vVol": integer,
    // DC 12 V 30 A output power (W)
    "mppt.dcdc12vWatts": integer,
    // Discharging type: 1: AC discharging; 2: PR; 3: BC
    "mppt.dischargeType": z.literal(1).or(z.literal(2)).or(z.literal(3)),
    // Error code: byte0: mppt_fault; byte1: car_fault; byte2: dc24v_fault "swVer":"uint32", //mppt version number
    "mppt.faultCode": integer,
    // PV input current (mA)
    "mppt.inAmp": integer,
    // PV input voltage (mV)
    "mppt.inVol": integer,
    // PV input power (W) [key indicator]
    "mppt.inWatts": integer,
    // MPPT temperature (°C)
    "mppt.mpptTemp": integer,
    // PV output current (mA)
    "mppt.outAmp": integer,
    // PV output voltage (mV)
    "mppt.outVol": integer,
    // PV output power (W)
    "mppt.outWatts": integer,
    // Auto shutdown when there is no load: 0: Never shut down; default: 12*60mins; unit: min
    "mppt.powStandbyMin": integer,
    // Reserve 10 bytes
    "mppt.res": integer,
    // Auto shutdown when there is no load: 0: never shut down, default value: 12 x 60 mins, unit: minutes
    "mppt.scrStandbyMin": integer,
    // MPPT version number
    "mppt.swVer": integer,
    // XT60 paddle status: 0: Not detected; 1: MPPT; 2: Adapter
    "mppt.x60ChgType": z.literal(0).or(z.literal(1)).or(z.literal(2)),

    /**
     * PD Module
     */

    // BEEP mode: 0: Normal; 1: Silent
    "pd.beepMode": z.literal(0).or(z.literal(1)),
    // LCD brightness level: 0-3 levels
    "pd.brightLevel": integer,
    // CAR button status: 0: OFF; 1: ON
    "pd.carState": z.literal(0).or(z.literal(1)),
    // CAR temperature (°C)
    "pd.carTemp": integer,
    // CAR use time (s)
    "pd.carUsedTime": integer,
    // Car output power (W) [key indicator]
    "pd.carWatts": integer,
    // Charging/discharging status on screen: 1: discharging; 2: charging
    "pd.chgDsgState": z.literal(0).or(z.literal(1)).or(z.literal(2)),
    // Cumulative AC charge (wall socket) (Wh)
    "pd.chgPowerAC": integer,
    // Cumulative DC charge (adapter) (Wh)
    "pd.chgPowerDC": integer,
    // Cumulative solar charge capacity (Wh)
    "pd.chgSunPower": integer,
    // DC charging time (s)
    "pd.dcInUsedTime": integer,
    // DC button status: 0: OFF; 1: ON [key indicator]
    "pd.dcOutState": z.literal(0).or(z.literal(1)),
    // Cumulative AC power discharged (Wh)
    "pd.dsgPowerAC": integer,
    // Cumulative DC discharge capacity (Wh)
    "pd.dsgPowerDC": integer,
    // Global error code
    "pd.errCode": integer,
    // 3+8 ports: 0: NULL; 1: CC; 2: PR; 3: SP (BC)
    "pd.ext3p8Port": z
        .literal(0)
        .or(z.literal(1))
        .or(z.literal(2))
        .or(z.literal(3)),
    // 4+8 ports; only supports left port status identification: 0: NULL; 1: Extra battery; 2: Smart generator
    "pd.ext4p8Port": z.literal(0).or(z.literal(1)).or(z.literal(2)),
    // RJ45 port: 0: NULL; 1: RC(BLE_CTL)
    "pd.extRj45Port": z.literal(0).or(z.literal(1)),
    // ICO flag bit: BYTE0-BYTE13
    "pd.icoBytes": integer,
    // Inverter use time (s)
    "pd.invUsedTime": integer,
    // LCD screen timeout: 0: Always on [key indicator]
    "pd.lcdOffSec": integer,
    // Product model: see ems_model enumeration for details
    "pd.model": integer,
    // MPPT use time (s)
    "pd.mpptUsedTime": integer,
    // qc_usb1 output power (W)
    "pd.qcUsb1Watts": integer,
    // qc_usb2 output power (W)
    "pd.qcUsb2Watts": integer,
    // Available time (min): >0: Time remaining before full charging; <0: Time remaining before full discharge [key indicator]
    "pd.remainTime": integer,
    // Reserve 2 bytes
    "pd.reserved": integer,
    // Display SOC [key indicator]
    "pd.soc": integer,
    // Standby auto shutdown time (min): 0: Never standby; maximum 5999 minutes (99 hours and 59 minutes) [key indicator]
    "pd.standbyMin": integer,
    // System version: 0x0102002F = V1.2.0.47
    "pd.sysVer": integer,
    // Type-C 1 temperature (°C)
    "pd.typec1Temp": integer,
    // Type-C 1 output power (W) [key indicator]
    "pd.typec1Watts": integer,
    // Type-C 2 temperature (°C)
    "pd.typec2Temp": integer,
    // Type-C 2 output power (W)
    "pd.typec2Watts": integer,
    // Type-C use time (s)
    "pd.typecUsedTime": integer,
    // Common USB1 output power (W)
    "pd.usb1Watts": integer,
    // Normal USB2 output power (W)
    "pd.usb2Watts": integer,
    // USB use time (s)
    "pd.usbUsedTime": integer,
    // USB QC use time (s)
    "pd.usbqcUsedTime": integer,
    // Total input power (W) [key indicator]
    "pd.wattsInSum": integer,
    // Total output power (W) [key indicator]
    "pd.wattsOutSum": integer,
    // 1: Wi-Fi automatically restores the last usage mode (STA/AP) after being powered on; 0: Default mode (STA)
    "pd.wifiAutoRcvy": integer,
    // Wi-Fi signal strength
    "pd.wifiRssi": integer,
    // Wi-Fi version: 0x00000405 = V0.4.5
    "pd.wifiVer": integer,
    // Wireless charging output power (W); reserved and not in use
    "pd.wireWatts": integer,
});

export type Delta2QuotaAll = z.infer<typeof delta2QuotaAllSchema>;

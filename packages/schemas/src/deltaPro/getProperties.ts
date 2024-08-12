import { z } from "zod";
import { integer, oneOrTwo, zeroOrOne, zeroOrOneOrTwo } from "../shared";

export const deltaProQuotaAllSchema = z
  .object({
    // Current
    "bmsMaster.amp": z.number(),
    // BMS permanent fault
    "bmsMaster.bmsFault": z.number(),
    // BQ hardware protection register
    "bmsMaster.bqSysStatReg": z.number(),
    // Battery capacity type: 1: 2.5 Ah per battery; 2: 2 Ah per battery
    "bmsMaster.cellId": oneOrTwo,
    // Design capacity (mAh)
    "bmsMaster.designCap": integer,
    // Global error code
    "bmsMaster.errCode": integer,
    // SOC
    "bmsMaster.f32ShowSoc": z.number(),
    // Full capacity (mAh)
    "bmsMaster.fullCap": integer,
    // Input power
    "bmsMaster.inputWatts": z.number(),
    // Maximum cell temperature
    "bmsMaster.maxCellTemp": integer,
    // Maximum cell voltage
    "bmsMaster.maxCellVol": integer,
    // Maximum MOS temperature
    "bmsMaster.maxMosTemp": integer,
    // Minimum cell temperature
    "bmsMaster.minCellTemp": integer,
    // Minimum cell voltage
    "bmsMaster.minCellVol": integer,
    // Minimum MOS temperature
    "bmsMaster.minMosTemp": integer,
    // BMS number
    "bmsMaster.num": integer,
    // Battery pack enable state
    "bmsMaster.openBmsIdx": integer,
    // Output power
    "bmsMaster.outputWatts": integer,
    // Remaining capacity (mAh)
    "bmsMaster.remainCap": integer,
    // Time remaining
    "bmsMaster.remainTime": integer,
    // Remaining battery percentage
    "bmsMaster.soc": integer,
    // Health status
    "bmsMaster.soh": integer,
    // System version
    "bmsMaster.sysVer": integer,
    // Target charging current
    "bmsMaster.tagChgAmp": integer,
    // Temperature °C
    "bmsMaster.temp": integer,
    // BMS type: 1. Lithium battery; 2. Oil-powered
    "bmsMaster.type": oneOrTwo,
    // Voltage
    "bmsMaster.vol": z.number(),
    // BMS online signal: BIT0: hardware online signal; BIT1: software online signal
    "ems.bms0Online": integer,
    // BMS online signal: BIT0: hardware online signal; BIT1: software online signal
    "ems.bms1Online": integer,
    // BMS online signal: BIT0: hardware online signal; BIT1: software online signal
    "ems.bms2Online": integer,
    // BMS model
    "ems.bmsModel": integer,
    // BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag
    "ems.bmsWarningState": integer,
    // Charging current
    "ems.chgAmp": integer,
    // Charge command
    "ems.chgCmd": integer,
    // Remaining charging time (mins)
    "ems.chgRemainTime": integer,
    // Charging state
    "ems.chgState": integer,
    // Charging voltage
    "ems.chgVol": integer,
    // Discharge command
    "ems.dsgCmd": integer,
    // Remaining discharging time (mins)
    "ems.dsgRemainTime": integer,
    // Energy storage state: 0: sleep; 1: normal
    "ems.emsIsNormalFlag": zeroOrOne,
    // SOC on LCD
    "ems.f32LcdShowSoc": z.number(),
    // Fan level
    "ems.fanLevel": integer,
    // SOC on LCD
    "ems.lcdShowSoc": integer,
    // Maximum available quantity
    "ems.maxAvailableNum": integer,
    // Charge upper limit
    "ems.maxChargeSoc": integer,
    // The lower threshold of smart generator auto off Range: 0~100
    "ems.maxCloseOilEbSoc": integer.min(0).max(100),
    // Discharge lower limit
    "ems.minDsgSoc": integer,
    // The upper threshold of smart generator auto on Range: 0~100
    "ems.minOpenOilEbSoc": integer.min(0).max(100),
    // Open BMS index
    "ems.openBmsIdx": integer,
    // UPS mode enable flag
    "ems.openUpsFlag": integer,
    // Maximum parallel voltage
    "ems.paraVolMax": integer,
    // Minimum parallel voltage
    "ems.paraVolMin": integer,
    // AC fast/slow charging dip switch: 0: unknown; 1: fast charging mode; 2: slow charging mode
    "inv.acDipSwitch": zeroOrOneOrTwo,
    // Inverter input current (mA)
    "inv.acInAmp": integer,
    // Inverter input frequency (Hz)
    "inv.acInFreq": integer,
    // Inverter input voltage (mV)
    "inv.acInVol": integer,
    // AC discharge switch setting 0 off, 1 on
    "inv.cfgAcEnabled": zeroOrOne,
    // Inverter output frequency (Hz): 1: 50 Hz; 2: 60 Hz; 0xff: ignored
    "inv.cfgAcOutFreq": oneOrTwo,
    // Inverter output voltage (V): 0xffffffff: ignored
    "inv.cfgAcOutVoltage": integer,
    // AC charging mode: 0: full power; 1: mute
    "inv.cfgAcWorkMode": zeroOrOne,
    // X-Boost switch: 0: off; 1: on; 0xff: ignored
    "inv.cfgAcXboost": zeroOrOne,
    // Maximum charging power for AC fast charging (W): DELTA2000 (100 W–1400 W); DELTA MINI (TBD); DELTA3000 (TBD)
    "inv.cfgFastChgWatts": integer,
    // Maximum charging power for AC slow charging (W): DELTA2000 (100 W–700 W); DELTA MINI (TBD); DELTA3000 (TBD)
    "inv.cfgSlowChgWatts": integer,
    // AC standby time /min 0 Never standby 720 Default value
    "inv.cfgStandbyMin": integer,
    // Charger type: 1: AC charging; 2: DC adapter charging; 3: solar charging; 4: CC; 5: BC
    "inv.chargerType": integer.min(0).max(5),
    // AC charging pause flag: 1: charging stopped
    "inv.chgPauseFlag": zeroOrOne,
    // DC input current (mA)
    "inv.dcInAmp": integer,
    // DC temperature (°C)
    "inv.dcInTemp": integer,
    // DC input voltage (mV)
    "inv.dcInVol": integer,
    // Discharging type: 1: AC discharging; 2: PR; 3: BC
    "inv.dischargeType": integer.min(0).max(3),
    // Global error code
    "inv.errCode": integer,
    // Fan state: 0: disabled; 1: Level 1; 2: Level 2; 3: Level 3
    "inv.fanState": integer.min(0).max(3),
    // Charging power (W)
    "inv.inputWatts": integer,
    // Inverter output current (mA)
    "inv.invOutAmp": integer,
    // Inverter output frequency (Hz)
    "inv.invOutFreq": integer,
    // Actual inverter output voltage (mV)
    "inv.invOutVol": integer,
    // PSDR model code
    "inv.invType": integer,
    // Inverter temperature (°C)
    "inv.outTemp": integer,
    // Discharging power (W)
    "inv.outputWatts": integer,
    // System version
    "inv.sysVer": integer,
    // Car charging output current (mA)
    "mppt.carOutAmp": integer,
    // Car charging output voltage (mV)
    "mppt.carOutVol": integer,
    // Car charging output power (W)
    "mppt.carOutWatts": integer,
    // Car charger switch setting 0 off, 1 on
    "mppt.carState": zeroOrOne,
    // Car charging temperature (°C)
    "mppt.carTemp": integer,
    // Configured charging type: This parameter is valid when xt60_chg_type is 0. 0: auto; 1: MPPT; 2: adapter
    "mppt.cfgChgType": zeroOrOneOrTwo,
    // On-board charging current /mA
    "mppt.cfgDcChgCurrent": integer,
    // PV charging pause flag: 1: charging stopped
    "mppt.chgPauseFlag": zeroOrOne,
    // Charging state: 0: disabled; 1: charging; 2: standby (DC charging stopped during AC charging)
    "mppt.chgState": zeroOrOneOrTwo,
    // Actual charging type: 0: null; 1: adapter (adapter/DC source); 2: MPPT (solar); 3: AC (mains supply); 4: gas; 5: wind
    "mppt.chgType": integer.min(0).max(5),
    // DCDC24 switch state: 0: off; 1: on
    "mppt.dc24vState": zeroOrOne,
    // DCDC24V temperature (°C)
    "mppt.dc24vTemp": integer,
    // DC12V30A output current (mA), which is valid only for DELTA Pro
    "mppt.dcdc12vAmp": integer,
    // DC12V30A output voltage (mV), which is valid only for DELTA Pro
    "mppt.dcdc12vVol": integer,
    // DC12V30A output power (W), which is valid only for DELTA Pro
    "mppt.dcdc12vWatts": integer,
    // Error code: byte0: mppt_fault; byte1: car_fault; byte2: dc24v_fault
    "mppt.faultCode": integer,
    // PV input current (mA)
    "mppt.inAmp": integer,
    // PV input voltage (mV)
    "mppt.inVol": integer,
    // PV input power (W)
    "mppt.inWatts": integer,
    // MPPT temperature (℃)
    "mppt.mpptTemp": integer,
    // PV output current (mA)
    "mppt.outAmp": integer,
    // PV output voltage (mV)
    "mppt.outVol": integer,
    // PV output power (W)
    "mppt.outWatts": integer,
    // Reserved
    "mppt.reserved": integer.array(),
    // Version number
    "mppt.swVer": integer,
    // XT60 charging type: 0: not detected; 1: MPPT; 2: adapter
    "mppt.xt60ChgType": zeroOrOneOrTwo,
    // Beep status 0 Normal, 1 Quiet
    "pd.beepState": zeroOrOne,
    // LCD brightness level: 0–3
    "pd.brightnessLevel": integer.min(0).max(3),
    // CAR button state: 0: off; 1: on
    "pd.carState": zeroOrOne,
    // CAR temperature (°C)
    "pd.carTemp": integer,
    // Car use time (s)
    "pd.carUsedTime": integer,
    // CAR output power (W)
    "pd.carWatts": integer,
    // Cumulative AC power charged (Wh) (wall socket)
    "pd.chgPowerAc": integer,
    // Cumulative DC power charged (Wh) (adapter)
    "pd.chgPowerDc": integer,
    // Cumulative solar power charged (Wh)
    "pd.chgSunPower": integer,
    // DC charging time (s)
    "pd.dcInUsedTime": integer,
    // DC button state: 0: off; 1: on
    "pd.dcOutState": zeroOrOne,
    // Cumulative AC power discharged (Wh)
    "pd.dsgPowerAc": integer,
    // Cumulative DC power discharged (Wh)
    "pd.dsgPowerDc": integer,
    // Global error code
    "pd.errCode": integer,
    // Infinity port
    "pd.ext3p8Port": integer,
    // Extra battery port. Only the status of the leftmost port can be identified.
    "pd.ext4p8Port": integer,
    // RJ45 port
    "pd.extRj45Port": integer,
    // AC icon mode: 0: normal; 1: blinking
    "pd.iconAcFreqMode": zeroOrOne,
    // AC icon state: 0: off; 1: 50 Hz; 2: 60 Hz. This parameter is valid only when the AC icon mode is 0.
    "pd.iconAcFreqState": zeroOrOneOrTwo,
    // Exclamation mark icon mode: 0: normal; 1: blinking
    "pd.iconBmsErrMode": zeroOrOne,
    // Exclamation mark icon state: 0: off; 1: on. This parameter is valid only when the exclamation mark icon mode is 0.
    "pd.iconBmsErrState": zeroOrOne,
    // BMS parallel icon mode: 0: normal; 1: blinking
    "pd.iconBmsParallelMode": zeroOrOne,
    // BMS parallel icon state: 0: off; 1: on. This parameter is valid only when the BMS parallel icon mode is 0.
    "pd.iconBmsParallelState": zeroOrOne,
    // Bluetooth icon mode: 0: normal; 1: blinking
    "pd.iconBtMode": zeroOrOne,
    // Bluetooth icon state: 0: off; 1: on. This parameter is valid only when the Bluetooth icon mode is 0.
    "pd.iconBtState": zeroOrOne,
    // CAR icon mode: 0: normal; 1: blinking
    "pd.iconCarMode": zeroOrOne,
    // CAR icon state: 0: off; 1: on. This parameter is valid only when the CAR icon mode is 0.
    "pd.iconCarState": zeroOrOne,
    // Charging pile icon mode: 0: normal; 1: blinking
    "pd.iconChgStationMode": zeroOrOne,
    // Charging pile icon state: 0: off; 1: on. This parameter is valid only when the charging pile icon mode is 0.
    "pd.iconChgStationState": zeroOrOne,
    // CO toxic gas icon mode: 0: normal; 1: blinking
    "pd.iconCoGasMode": zeroOrOne,
    // CO toxic gas icon state: 0: off; 1: on. This parameter is valid only when the CO toxic gas icon mode is 0.
    "pd.iconCoGasState": zeroOrOne,
    // ECO icon mode: 0: normal; 1: blinking
    "pd.iconEcoMode": zeroOrOne,
    // ECO icon state: 0: off; 1: on. This parameter is valid only when the ECO icon mode is 0.
    "pd.iconEcoState": zeroOrOne,
    // Factory icon mode: 0: normal; 1: blinking
    "pd.iconFactoryMode": zeroOrOne,
    // Factory icon state: 0: off; 1: on. This parameter is valid only when the factory icon mode is 0.
    "pd.iconFactoryState": zeroOrOne,
    // Fan icon mode: 0: normal; 1: blinking
    "pd.iconFanMode": zeroOrOne,
    // Fan icon state: 0: off; 1: Level 1; 2: Level 2; 3: Level 3. This parameter is valid only when the fan icon mode is 0.
    "pd.iconFanState": integer.min(0).max(3),
    // Oil-powered generation icon mode: 0: normal; 1: blinking
    "pd.iconGasGenMode": zeroOrOne,
    // Oil-powered generation icon state: 0: off; 1: on. This parameter is valid only when the oil-powered generation icon mode is 0.
    "pd.iconGasGenState": zeroOrOne,
    // High temperature icon mode: 0: normal; 1: blinking
    "pd.iconHiTempMode": zeroOrOne,
    // High temperature icon state: 0: off; 1: on. This parameter is valid only when the high temperature icon mode is 0.
    "pd.iconHiTempState": zeroOrOne,
    // Inverter parallel icon mode: 0: normal; 1: blinking
    "pd.iconInvParallelMode": zeroOrOne,
    // Inverter parallel icon state: 0: off; 1: on. This parameter is valid only when the inverter parallel icon mode is 0.
    "pd.iconInvParallelState": zeroOrOne,
    // Low temperature icon mode: 0: normal; 1: blinking
    "pd.iconLowTempMode": zeroOrOne,
    // Low temperature icon state: 0: off; 1: on. This parameter is valid only when the low temperature icon mode is 0.
    "pd.iconLowTempState": zeroOrOne,
    // OVERLOAD icon mode: 0: normal; 1: blinking
    "pd.iconOverloadMode": zeroOrOne,
    // OVERLOAD icon state: 0: off; 1: on. This parameter is valid only when the OVERLOAD icon mode is 0.
    "pd.iconOverloadState": zeroOrOne,
    // Battery heater icon mode: 0: normal; 1: blinking
    "pd.iconPackHeaterMode": zeroOrOne,
    // Battery heater icon state: 0: off; 1: on. This parameter is valid only when the battery heater icon mode is 0.
    "pd.iconPackHeaterState": zeroOrOne,
    // Remote control icon mode: 0: normal; 1: blinking
    "pd.iconRcMode": zeroOrOne,
    //Remote control icon state: 0: off; 1: on; 2: one signal bar; 3: two signal bars; 4: searching signal. This parameter is valid only when the remote control icon mode is 0.
    "pd.iconRcState": integer.min(0).max(4),
    // Charge icon mode: 0: normal; 1: blinking
    "pd.iconRechgTimeMode": zeroOrOne,
    // Charge icon state: 0: off; 1: on. This parameter is valid only when the charge icon mode is 0.
    "pd.iconRechgTimeState": zeroOrOne,
    // UPS icon mode: 0: normal; 1: blinking
    "pd.iconSocUpsMode": zeroOrOne,
    // UPS icon state: 0: off; 1: on. This parameter is valid only when the UPS icon mode is 0.
    "pd.iconSocUpsState": zeroOrOne,
    // Solar panel tracking bracket icon mode: 0: normal; 1: blinking
    "pd.iconSolarBracketMode": zeroOrOne,
    // Solar panel tracking bracket icon state: 0: off; 1: on. This parameter is valid only when the solar panel tracking bracket icon mode is 0.
    "pd.iconSolarBracketState": zeroOrOne,
    // Solar panel icon mode: 0: normal; 1: blinking
    "pd.iconSolarPanelMode": zeroOrOne,
    // Solar panel icon state: 0: off; 1: on. This parameter is valid only when the solar panel icon mode is 0.
    "pd.iconSolarPanelState": zeroOrOne,
    // Transfer switch icon mode: 0: normal; 1: blinking
    "pd.iconTransSwMode": zeroOrOne,
    // Transfer switch icon state: 0: off; 1: on. This parameter is valid only when the transfer switch icon mode is 0.
    "pd.iconTransSwState": zeroOrOne,
    // Type-C icon mode: 0: normal; 1: blinking
    "pd.iconTypecMode": zeroOrOne,
    // Type-C icon state: 0: off; 1: on. This parameter is valid only when the Type-C icon mode is 0.
    "pd.iconTypecState": zeroOrOne,
    // USB icon mode: 0: normal; 1: blinking
    "pd.iconUsbMode": zeroOrOne,
    // USB icon state: 0: off; 1: on. This parameter is valid only when the USB icon mode is 0.
    "pd.iconUsbState": zeroOrOne,
    // Wi-Fi icon mode: 0: normal; 1: blinking
    "pd.iconWifiMode": zeroOrOne,
    // Wi-Fi icon state: 0: off; 1: on. This parameter is valid only when the Wi-Fi icon mode is 0.
    "pd.iconWifiState": zeroOrOne,
    // Wind power generation icon mode: 0: normal; 1: blinking
    "pd.iconWindGenMode": zeroOrOne,
    // Wind power generation icon state: 0: off; 1: on. This parameter is valid only when the wind power generation icon mode is 0.
    "pd.iconWindGenState": zeroOrOne,
    // Wireless charging icon mode: 0: normal; 1: blinking
    "pd.iconWirelessChgMode": zeroOrOne,
    // Wireless charging icon state: 0: off; 1: on. This parameter is valid only when the wireless charging icon mode is 0.
    "pd.iconWirelessChgState": zeroOrOne,
    // Inverter use time (s)
    "pd.invUsedTime": integer,
    // Screen brightness Range：0~100 Input 128(0x11111111), indicates turned on the automatic brightness adjustment
    "pd.lcdBrightness": integer,
    // LCD screen-off duration: 0: never off
    "pd.lcdOffSec": integer,
    // Product model
    "pd.model": integer,
    // MPPT use time (s)
    "pd.mpptUsedTime": integer,
    // Quick charge usb1 output power /W
    "pd.qcUsb1Watts": integer,
    // Quick charge usb2 output power /W
    "pd.qcUsb2Watts": integer,
    // Time remaining (min) > 0: remaining charging time; time remaining (min) < 0: remaining discharging time
    "pd.remainTime": integer,
    // Displayed SOC
    "pd.soc": integer,
    // Device standby time /min 0 Never standby 5999 Max value
    "pd.standByMode": integer,
    // Charging/discharging state on screen: 1: discharged; 2: charged
    "pd.sysChgDsgState": oneOrTwo,
    // System version
    "pd.sysVer": integer,
    // Type-C use time (s)
    "pd.typccUsedTime": integer,
    // Type-C 1 temperature (°C)
    "pd.typec1Temp": integer,
    // Typec1 output power /W
    "pd.typec1Watts": integer,
    // Type-C 2 temperature (°C)
    "pd.typec2Temp": integer,
    // Typec2 output power /W
    "pd.typec2Watts": integer,
    // Common usb1 output power /W
    "pd.usb1Watts": integer,
    // Common usb2 output power /W
    "pd.usb2Watts": integer,
    // USB use time (s)
    "pd.usbUsedTime": integer,
    // USB QC use time (s)
    "pd.usbqcUsedTime": integer,
    // Total input power (W)
    "pd.wattsInSum": integer,
    // Total output power (W)
    "pd.wattsOutSum": integer,
    // Wi-Fi auto mode: 0: default mode (STA); 1: The Wi-Fi network is automatically restored to the last mode (STA/AP) after powering on.
    "pd.wifiAutoRcvy": zeroOrOne,
    // Wi-Fi signal intensity
    "pd.wifiRssi": integer,
    // Wi-Fi version
    "pd.wifiVer": integer,
    // Wireless charging output power (W): Reserved, not available
    "pd.wirelessWatts": integer,
  })
  .passthrough();

export type DeltaProQuotaAll = z.infer<typeof deltaProQuotaAllSchema>;

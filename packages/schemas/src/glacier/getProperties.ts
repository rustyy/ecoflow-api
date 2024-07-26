import { z } from "zod";
import { integer, oneOrTwo, zeroOrOne, zeroOrOneOrTwo } from "../shared";

export const glacierQuotaAllSchema = z.object({
  // int 	Current (mA)
  "bms_bmsStatus.amp": integer,
  // BMS permanent fault
  "bms_bmsStatus.bmsFault": integer,
  // BQ hardware protection register
  "bms_bmsStatus.bqStatReg": integer,
  // Cell material LI/LFP/LA
  "bms_bmsStatus.cellId": integer,
  // Design capacity (mAh)
  "bms_bmsStatus.designCap": integer,
  // Global error code
  "bms_bmsStatus.err": integer,
  // Battery level SOC
  "bms_bmsStatus.f32ShowSoc": z.number(),
  // Full capacity (mAh)
  "bms_bmsStatus.fullCap": integer,
  // Input power
  "bms_bmsStatus.inWatts": integer,
  // Maximum cell temperature
  "bms_bmsStatus.maxCellTmp": integer,
  // Maximum cell voltage
  "bms_bmsStatus.maxCellVol": integer,
  // Maximum MOS temperature
  "bms_bmsStatus.maxMosTmp": integer,
  // Minimum cell temperature
  "bms_bmsStatus.minCellTmp": integer,
  // Minimum cell voltage
  "bms_bmsStatus.minCellVol": integer,
  // Minimum MOS temperature
  "bms_bmsStatus.minMosTmp": integer,
  // BMS number: 0-2
  "bms_bmsStatus.num": zeroOrOneOrTwo,
  // Battery pack status: 0: Not enabled; 1: Enabled
  "bms_bmsStatus.openBmsIdx": zeroOrOne,
  // Output power
  "bms_bmsStatus.outWatts": integer,
  // Remaining capacity (mAh)
  "bms_bmsStatus.remainCap": integer,
  // Time remaining
  "bms_bmsStatus.remainTime": integer,
  // Battery level
  "bms_bmsStatus.soc": integer,
  // Health status
  "bms_bmsStatus.soh": integer,
  // Target charging current
  "bms_bmsStatus.tagChgAmp": integer,
  // Temperature (°C)
  "bms_bmsStatus.tmp": integer,
  // BMS type: 1: Lithium battery; 2: Oil powered
  "bms_bmsStatus.type": oneOrTwo,
  // System version
  "bms_bmsStatus.ver": integer,
  // Voltage (mV)
  "bms_bmsStatus.vol": integer,
  // BMS online signal: BIT0: hardware online signal; BIT1: software online signal
  "bms_emsStatus.bmsIsConnt": integer,
  // BMS model
  "bms_emsStatus.bmsModel": integer,
  // Charge command
  "bms_emsStatus.chgCmd": integer,
  // Remaining charging time (min)
  "bms_emsStatus.chgRemain": integer,
  // Charging voltage
  "bms_emsStatus.chgVol": integer,
  // SOC for turning off Smart Generator
  "bms_emsStatus.closeOilEbSocMax": integer,
  // Discharge command
  "bms_emsStatus.dsgCmd": integer,
  // Remaining discharging time (min)
  "bms_emsStatus.dsgRemain": integer,
  // 0: sleep 1: normal
  "bms_emsStatus.emsFlag": zeroOrOne,
  // Fan level
  "bms_emsStatus.fanLvl": integer,
  // SoC value displayed on LCD
  "bms_emsStatus.lcdSoc": integer,
  // Maximum available quantity
  "bms_emsStatus.maxAvailNum": integer,
  // Maximum charging SOC
  "bms_emsStatus.maxChgSoc": integer,
  // Minimum discharging SOC
  "bms_emsStatus.minDsgSoc": integer,
  // BMS enable index: bit0: host (#1); bit1: #2; bit2: #3
  "bms_emsStatus.openBmsIdx": integer,
  // SoC for turning on Smart Generator
  "bms_emsStatus.openOilEbSocMin": integer,
  // Maximum voltage when battery packs work in parallel
  "bms_emsStatus.paraVolMax": integer,
  // Minimum voltage when battery packs work in parallel
  "bms_emsStatus.paraVolMin": integer,
  // UPS mode enable flag
  "bms_emsStatus.upsFlag": integer,
  // BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag
  "bms_emsStatus.warnState": integer,
  // 12 V auxiliary supply voltage
  "pd.A12Val": integer,
  // Ambient temperature
  "pd.ambientTmp": integer,
  // Count of turning off buzzer through app
  "pd.appOpCountBeepOff": integer,
  // Count of enabling buzzer through app
  "pd.appOpCountBeepOn": integer,
  // Count of setting different screen timeout through app: BL_TIME_MAX
  "pd.appOpCountBlTime": integer.array(),
  // Count of ice detaching through app
  "pd.appOpCountDeIce": integer,
  // Count of ice making through app when ice making is disabled
  "pd.appOpCountDntMakeIce": integer,
  // Count of powering off through app
  "pd.appOpCountPowerOff": integer,
  // Count of powering on through app
  "pd.appOpCountPowerOn": integer,
  // Count of setting degrees in Celsius through app
  "pd.appOpCountTempUnitC": integer,
  // Count of setting degrees in Fahrenheit through app
  "pd.appOpCountTempUnitF": integer,
  // Count of each work mode set through app: WORK_MODE_MAX
  "pd.appOpCountWorkMode": integer.array(),
  // Screen timeout set through app: BL_TIME_MAX
  "pd.appOpTimeBlTime": integer.array(),
  // Duration of sensor blocking: SENSOR_ADV_MAX
  "pd.appSensorAdv": integer.array(),
  // Battery pack in-place status: 0: Not in place; 1: In place
  "pd.batFlag": zeroOrOne,
  // Battery level (%)
  "pd.batPct": integer,
  // Unit: min; a negative value indicates a discharging time, and positive value indicates a charging time
  "pd.batTime": integer,
  // 0: Buzzer disabled; 1: Buzzer enabled
  "pd.beepEn": zeroOrOne,
  // Screen timeout (unit: sec)
  "pd.blTime": integer,
  // Ice making limit on compressor: 0: Ice making is allowed; 1: Ice making is not allowed
  "pd.bldcDntIce": zeroOrOne,
  // Compressor work limit: 0: Allow to work; 1: Do not allow to work
  "pd.bldcDntWork": zeroOrOne,
  // BMS in-place flag, detected through BMS->PD heartbeat packet: 0: Not in place; 1: In place
  "pd.bmsInFlag": integer,
  // Count of long presses: USER_BEHAVIOR_BUTTON_MAX
  "pd.buttonLong": integer.array(),
  // Count of short pressings: USER_BEHAVIOR_BUTTON_MAX
  "pd.buttonShort": integer.array(),
  // Car charger battery protection reminder: 0: Do not remind; 1: Remind
  "pd.carBatLow": zeroOrOne,
  // Count of working while charging
  "pd.chargeWorkCount": integer,
  // Duration of working while charging
  "pd.chargeWorkTime": integer,
  // Count of each type of charging power supply on XT60: POWER_TYPE_MAX
  "pd.chargeXt60Count": integer.array(),
  // Duration of each type of charging power supply on XT60: POWER_TYPE_MAX
  "pd.chargeXt60Time": integer.array(),
  // Charger type
  // Charger type:
  // 0: NULL;
  // 1: XT150 charging;
  // 2: Adapter charging (hardware detection);
  // 3: Car charging (hardware detection);
  // 4: Solar panel charging (hardware detection);
  // 5: Car charging (software detection);
  // 6: Solar panel charging (software detection);
  // 7: Input source cannot be identified (0xff): the charging cable is connected, but it actually does not work due to charging being disabled.
  "pd.chgType": z
    .literal(0)
    .or(z.literal(1))
    .or(z.literal(2))
    .or(z.literal(3))
    .or(z.literal(4))
    .or(z.literal(5))
    .or(z.literal(6))
    .or(z.literal(7)),
  // Count of cooling zone openings
  "pd.coolCoverCount": integer,
  // Duration of cooling zone being opened
  "pd.coolCoverTime": integer,
  // 0: Normal; 1: Eco
  "pd.coolMode": zeroOrOne,
  // Count of dual temperature zones
  "pd.coolZoneDoubleCount": integer,
  // Duration of dual temperature zone
  "pd.coolZoneDoubleTime": integer,
  // Count of single temperature zone
  "pd.coolZoneSingleCount": integer,
  // Single temperature zone duration
  "pd.coolZoneSingleTime": integer,
  // Average count of consecutive ice making actions
  "pd.countinueMakeIceAve": integer,
  // Maximum count of consecutive ice making
  "pd.countinueMakeIceMax": integer,
  // Count of pressing the ice making button when ice making is disabled
  "pd.dntMakeIceDevice": integer,
  // Door status detection. 1: Open; 0: Closed
  "pd.doorStat": zeroOrOne,
  // EMS charging flag
  "pd.emsChgFlg": integer,
  // Error code
  "pd.err": integer,
  // BLDC fault code
  "pd.errBldc": integer,
  // BMS fault code
  "pd.errBms": integer,
  // Error code
  "pd.errCode": integer,
  // Fault code displayed on LCD screen
  "pd.errLcd": integer,
  // PD fault code
  "pd.errPd": integer,
  // POWER fault code
  "pd.errPwr": integer,
  // Count of each type of fault in BLDC module: ERROR_MAX_BLDC
  "pd.errorCountBldc": integer.array(),
  // Count of each type of fault in BMS module: ERROR_MAX_PD
  "pd.errorCountBms": integer.array(),
  // Count of each fault in PD module: ERROR_MAX_PD
  "pd.errorCountPd": integer.array(),
  // Count of each type of fault in POWER module: ERROR_MAX_POWER
  "pd.errorCountPower": integer.array(),
  // Duration of each type of fault in BMS module: ERROR_MAX_BMS
  "pd.errorTimeBms": integer.array(),
  // Duration of each type of fault in PD module: ERROR_MAX_PD
  "pd.errorTimePd": integer.array(),
  // Duration of each type of fault in the POWER module: ERROR_MAX_POWER
  "pd.errorTimePower": integer.array(),
  // Exhaust pipe wall temperature
  "pd.exhaustTmp": integer,
  // Fan level
  "pd.fanLvl": integer,
  // Ambient temperature reliability: 0: Unreliable; 1: Reliable
  "pd.flagAmbintReady": zeroOrOne,
  // Partition detection
  "pd.flagTwoZone": integer,
  // Real-time running status
  "pd.fsmState": integer,
  // Ice taking reminder: 0: Do not remind; 1: Remind
  "pd.iceAlert": zeroOrOne,
  // Large/small ice cube status:
  // 0: Small ice cube (in preparation);
  // 1: Large ice cube (in preparation);
  // 2: Small ice cube (ice making in progress; cannot be changed);
  // 3: Large ice cube (ice making in progress)
  "pd.iceMkMode": z
    .literal(0)
    .or(z.literal(1))
    .or(z.literal(2))
    .or(z.literal(3)),
  // Ice making progress (%)
  "pd.icePercent": integer,
  // Duration of the current ice making (for app and LCD effect display)
  "pd.iceTm": integer,
  // The ice making target time (used for app and LCD effect display)
  "pd.iceTmTag": integer,
  // Total count of ice making
  "pd.makeIceCount": integer,
  // mA
  "pd.motorCur": integer,
  // Motor speed
  "pd.motorSpeed": integer,
  // mv
  "pd.motorVol": integer,
  // Waiting for compressor: 0: No need to wait; 1: Need to wait
  "pd.motorWait": zeroOrOne,
  // w
  "pd.motorWat": integer,
  // Count of being networked: NETWORK_TYPE_MAX
  "pd.networkTypeCount": integer.array(),
  // Duration of being networked: NETWORK_TYPE_MAX
  "pd.networkTypeTime": integer.array(),
  // Count of battery pack in place
  "pd.powerBatInCount": integer,
  // Duration of battery pack in place
  "pd.powerBatInTime": integer,
  // Duration of battery pack not in place
  "pd.powerBatOutTime": integer,
  // Battery protection level
  "pd.powerPbLevel": integer,
  // Count of each type of power supply on XT60: POWER_TYPE_MAX
  "pd.powerXt60Count": integer.array(),
  // Duration of each type of power supply on XT60: POWER_TYPE_MAX
  "pd.powerXt60Time": integer.array(),
  // Battery protection switch: 0: Disable; 1: Enable
  "pd.pwrPbEn": integer,
  // 0: Powered off; 1: Powered on
  "pd.pwrState": integer,
  // Reserve 2 bytes
  "pd.resvB": integer.array(),
  // Reserve 1 byte
  "pd.resvD": integer.array(),
  // Reserve 5 bytes
  "pd.resvP": integer.array(),
  // Operating status:
  // 0: Normal (24 V output, 40 V output);
  // 1: Charging suspended (or when there is no input) (24 V off, 40 V output);
  // 2: Standby (24 V off, 40 V off)
  "pd.runState": zeroOrOneOrTwo,
  // Sensor status; refer to @ST_SENSOR for data explanation; bit 1: Error; bit 0: Normal
  "pd.sensor": integer,
  // Sensor detection blocking. Refer to @ST_SENSOR for data explanation. Bit: 1: Blocked; 0: Unblocked.
  "pd.sensorAdv": integer,
  // Length of time when ambient temperature falls in each interval: TEMP_AMBIENT_MAX
  "pd.tempAmbientTime": integer.array(),
  // Length of time when the set temperature of the cooling zone falls in each interval: COOL_ZONE_MAX*TEMP_COOL_SET_MAX
  "pd.tempCoolSetTime": integer.array(),
  // Length of time when the actual temperature of the cooling zone falls in each interval: COOL_ ZONE_ MAX*TEMP_ COOL_ MAX
  "pd.tempCoolTime": integer.array(),
  // Length of time when temperature of the ice-making zone falls in each interval: TEMP_ICE_MAX
  "pd.tempIceTime": integer.array(),
  // Water temperature of the ice making zone: the data is 10 times the actual temperature value
  "pd.tempWater": integer,
  // Refrigerant flow direction flag bit
  "pd.threeWayState": integer,
  // Real-time temperature of single temperature zone, amplified 10 times
  "pd.tmpAver": integer,
  // Real-time temperature of the left temperature zone, amplified 10 times
  "pd.tmpL": integer,
  // Set temperature of the left temperature zone (valid when partition is inserted)
  "pd.tmpLSet": integer,
  // Combined temperature zone settings (valid when the partition is removed)
  "pd.tmpMSet": integer,
  // Real-time temperature of the right temperature zone, amplified 10 times
  "pd.tmpR": integer,
  // Right temperature zone setting value (works when partition is inserted)
  "pd.tmpRSet": integer,
  // 0: Celsius; 1: Fahrenheit
  "pd.tmpUnit": zeroOrOne,
  // Warning: BIT0: Over-temperature; BIT1: Under-temperature; BIT2: Overload; BIT3: Charging error; BIT4: Fan error; BIT5: BLCD communication error
  "pd.warnInfo": integer,
  // Ice making zone water level: 0-3 levels
  "pd.waterLine": integer,
  // Count of entering each state of state machine: USER_BEHAVIOR_FSM_MAX
  "pd.workFsmCount": integer.array(),
  // Running duration of state machine under each state: USER_BEHAVIOR_FSM_MAX
  "pd.workFsmTime": integer.array(),
  // Count of entering each work mode; WORK_MODE_MAX
  "pd.workModeCount": integer,
  // Running duration of each work mode; WORK_MODE_MAX
  "pd.workModeTime": integer.array(),
  // 0:no input, 1:has input
  "pd.xt150InState": zeroOrOne,
  // 0: no input, 1: has input
  "pd.xt60InState": zeroOrOne,
});

export type GlacierQuotaAll = z.infer<typeof glacierQuotaAllSchema>;

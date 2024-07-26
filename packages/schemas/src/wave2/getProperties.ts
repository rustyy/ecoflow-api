import { z } from "zod";
import { integer, oneOrTwo, zeroOrOne, zeroOrOneOrTwo } from "../shared";

export const wave2QuotaAllSchema = z.object({
  // Count of pressing button for wakeup
  "bms.awakeCnt": integer,
  // BMS error code
  "bms.bmsBatErrCode": integer,
  // 0:idle,1:chg 2:dsg
  "bms.bmsChgDsgSts": zeroOrOneOrTwo,
  // BMS charging duration (min)
  "bms.bmsChgTime": integer,
  // BMS current (1 mA)
  "bms.bmsCur": integer,
  // Time displayed in BMS (min)
  "bms.bmsDisplayTime": integer,
  // BMS discharging time (min)
  "bms.bmsDsgTime": integer,
  // Hardware in place
  "bms.bmsHwFlag": integer,
  // UPS maximum charging SOC
  "bms.bmsMaxChgSoc": integer,
  // UPS minimum discharge SoC
  "bms.bmsMinDsgSoc": integer,
  // BMS request current (unit: 1 mA)
  "bms.bmsReqCur": integer,
  // BMS request voltage (unit: 1 mV)
  "bms.bmsReqVol": integer,
  // Battery SoC
  "bms.bmsSoc": integer,
  // Software in place
  "bms.bmsSwFlag": integer,
  // 0:master,1:slaver
  "bms.bmsType": zeroOrOne,
  // BMS voltage (unit: 1mV)
  "bms.bmsVol": integer,
  // Length of time (sec) when the charging power falls in each of the four intervals
  "bms.chgWattRangeTime": integer.array(),
  // Maximum cell temperature
  "bms.maxCellTemp": integer,
  // Maximum cell voltage
  "bms.maxCellVol": integer,
  // Minimum cell temperature
  "bms.minCellTemp": integer,
  // Minimum cell voltage
  "bms.minCellVol": integer,
  // Count of pressing button for shutdown
  "bms.powerOffCnt": integer,
  // Count of pressing button for startup
  "bms.powerOnCnt": integer,
  // Remaining capacity
  "bms.remainCap": integer,
  // Reserved bytes: 16 bytes
  "bms.resv": integer.array(),
  // Count of pressing the Sleep button
  "bms.sleepCnt": integer,
  // Count of XT150 connections
  "bms.xt150AccessCnt": integer,
  // Count of rear fan blocking
  "motor.backFanBlockCnt": integer,
  // Working duration of rear fan (sec)
  "motor.backFanWorkTime": integer,
  // Motor operating mode
  "motor.commcAck": integer,
  // Compressor speed feedback
  "motor.compressorRpm": integer,
  // Working duration of compressor (sec)
  "motor.compressorWorkTime": integer,
  // Condensing fan speed feedback
  "motor.condeFanRpm": integer,
  // Working duration in the ECO mode of Cool mode (sec)
  "motor.coolEcoTime": integer,
  // Working duration in the Max mode of Cool mode (sec)
  "motor.coolMaxTime": integer,
  // Working duration in the Normal mode of Cool mode (sec)
  "motor.coolNormalTime": integer,
  // Working duration in the Sleep mode of Cool mode (sec)
  "motor.coolSleepTime": integer,
  // Count of outward drainage
  "motor.drainageCnt": integer,
  // Duration of outward drainage (sec)
  "motor.drainageTime": integer,
  // Energy-saving shutdown protection flag bit
  "motor.ecoStopFlag": integer,
  // Error code
  "motor.errCode": integer,
  // Evaporative fan speed feedback
  "motor.evapFanRpm": integer,
  // foc id
  "motor.focId": integer,
  // Status of the four-way valve
  "motor.fourWayState": integer,
  // Count of four-way valve switching
  "motor.fourWaySwitchCnt": integer,
  // Working duration of four-way valve (sec)
  "motor.fourWayWorkTime": integer,
  // Count of front fan blocking
  "motor.frontFanBlockCnt": integer,
  // Working duration of front fan (sec)
  "motor.frontFanWorkTime": integer,
  // Working duration in the ECO mode of the Heat mode (sec)
  "motor.hotEcoTime": integer,
  // Working duration in the Max mode of Heat mode (sec)
  "motor.hotMaxTime": integer,
  // Working duration in Normal mode of the Heat mode (sec)
  "motor.hotNormalTime": integer,
  // Working duration in the Sleep mode of Heat mode (sec)
  "motor.hotSleepTime": integer,
  // High pressure protection flag bit
  "motor.hpProtFlg": integer,
  // MOS tube temperature feedback
  "motor.mosTemp": integer,
  // Current state of main state machine
  "motor.motorFsmState": integer,
  // Reserved motor field: 32 bytes
  "motor.motorResv": integer.array(),
  // Current state of the service state machine
  "motor.mtrLogicErr": integer,
  // Motor communication counter
  "motor.pMtrCnt": integer,
  // Motor operating power
  "motor.power": integer,
  // Shutdown protection flag bit
  "motor.protFlag": integer,
  // Reserved 10 bytes
  "motor.resv": integer.array(),
  // Service shutdown error code
  "motor.serveCtrlErr": integer,
  // Current state of the service state machine
  "motor.serveFsmState": integer,
  // Compressor speed settings
  "motor.setCompressorRpm": integer,
  // Set condensing fan speed
  "motor.setCondFanRpm": integer,
  // Opening of electronic expansion valve
  "motor.setEleExpansStep": integer,
  // Set evaporative fan speed
  "motor.setEvapFanRpm": integer,
  // Water pump speed settings
  "motor.setWaterRpm": integer,
  // Three-way valve status
  "motor.threeWayState": integer,
  // 24 V voltage feedback
  "motor.v24": integer,
  // Bus voltage feedback
  "motor.vBus": integer,
  // Working duration of water pump (sec)
  "motor.waterPumpWorkTime": integer,
  // Water level: 0: Level 1; 1: Level 2; 2: Full
  "motor.waterValue": zeroOrOneOrTwo,
  // Working duration in fan mode (sec)
  "motor.windTime": integer,
  // Count of temperature sensor errors at the compressor discharge pipe
  "pd.CompressorTempCnt": integer,
  // RMS value of the AC input current (mA)
  "pd.acCurrRms": integer,
  // AC input frequency
  "pd.acFreq": integer,
  // AC input power (W)
  "pd.acPwrIn": integer,
  // RMS value of the AC input voltage (unit: 0.1 V)
  "pd.acVoltRms": integer,
  // Evaporation zone return air temperature, magnified 100 times
  "pd.airInTemp": integer,
  // Count of temperature sensor errors at the rear copper pipe
  "pd.backPipeTempErrCnt": integer,
  // Remaining battery charging time
  "pd.batChgRemain": integer,
  // Battery charging/discharging status
  "pd.batChgStatus": integer,
  // Battery current (mA)
  "pd.batCurr": integer,
  // Remaining battery discharging time
  "pd.batDsgRemain": integer,
  // Battery power
  "pd.batPower": integer,
  // Count of using battery provided with the air conditioner
  "pd.batPowerSupplyCnt": integer,
  // Duration of using battery provided with the air conditioner (min)
  "pd.batPowerSupplyTime": integer,
  // Battery output power (W)
  "pd.batPwrOut": integer,
  // Battery SoC (0-100)
  "pd.batSoc": integer.min(0).max(100),
  // Battery voltage (unit: 0.01 V)
  "pd.batVolt": integer,
  // Buzzer enabling status: 0: Disabled; 1: Enabled
  "pd.beepEn": zeroOrOne,
  // Upper and lower limits on main battery pack charging and discharging: 0: Normal charging and discharging; 1: Upper limit on charging
  "pd.bmsBoundFlag": zeroOrOne,
  // BMS error code
  "pd.bmsErr": integer,
  // Product ID of BMS
  "pd.bmsPid": integer,
  // Battery undervoltage flag bit: 0: Normal; 1: Undervoltage
  "pd.bmsUnderVoltage": zeroOrOne,
  // Bus voltage
  "pd.busVol": integer,
  // Bus voltage
  "pd.busVolt": integer,
  // Condensation temperature, magnified 100 times
  "pd.condTemp": integer,
  // Count of setting the ECO mode in Cool mode
  "pd.coolEcoCnt": integer,
  // Air outlet temperature, magnified 100 times
  "pd.coolEnv": integer,
  // Count of setting the Max mode in Cool mode
  "pd.coolMaxCnt": integer,
  // Count of setting the Normal mode in Cool mode
  "pd.coolNormalCnt": integer,
  // Count of setting the Sleep mode in Cool mode
  "pd.coolSleepCnt": integer,
  // Air outlet temperature
  "pd.coolTemp": z.number(),
  // Name
  "pd.deviceName": z.string(),
  // Count of using DELTA Max as the power source
  "pd.dmPowerSupplyCnt": integer,
  // Duration of using DELTA Max as the power source (min)
  "pd.dmPowerSupplyTime": integer,
  // Count of using DELTA 2 as the power source
  "pd.dp2PowerSupplyCnt": integer,
  // Duration of using DELTA 2 as the power source (min)
  "pd.dp2PowerSupplyTime": integer,
  // Count of using DELTA Pro as the power source
  "pd.dpPowerSupplyCnt": integer,
  // Duration of using DELTA Pro as the power source (min)
  "pd.dpPowerSupplyTime": integer,
  // Ambient temperature
  "pd.envTemp": z.number(),
  // Count of ambient temperature intervals; the range is 0-55 degrees Celsius;
  // each interval covers 5 degrees; it is counted every time the button is pressed to power on.
  "pd.envTempRangeCnt": integer.array(),
  // Total count of errors
  "pd.errAllCnt": integer,
  // Error code
  "pd.errCode": integer,
  // Count of motor communication errors
  "pd.errMotorCommCnt": integer,
  // Count of power communication errors
  "pd.errPowerCommCnt": integer,
  // Count of Wi-Fi communication errors
  "pd.errWifiCommCnt": integer,
  // Evaporation temperature, magnified 100 times
  "pd.evapTemp": integer,
  // Fan speed level: 0-4; 0 for non-rotation
  "pd.fanSts": integer.min(0).max(4),
  // Wind speed in the current mode: 0: Low; 1: Medium; 2: High
  "pd.fanValue": zeroOrOneOrTwo,
  // Count of temperature sensor errors at the front copper bar
  "pd.frontBarTempErrCnt": integer,
  // Count of temperature sensor errors at the front air inlet
  "pd.frontInTempErrCnt": integer,
  // Count of temperature sensor errors at the front air outlet
  "pd.frontOutTempErrCnt": integer,
  // Count of temperature sensor errors at the front copper pipe
  "pd.frontPipeTempErrCnt": integer,
  // Return air temperature in condensation zone, magnified 100 times
  "pd.heatEnv": integer,
  // Count of setting high wind speed
  "pd.highWindSpeedCnt": integer,
  // Count of setting the ECO mode in Heat mode
  "pd.hotEcoCnt": integer,
  // Count of setting the Max mode in Heat mode
  "pd.hotMaxCnt": integer,
  // Count of setting the Normal mode in Heat mode
  "pd.hotNormalCnt": integer,
  // Count of setting the Sleep mode in Heat mode
  "pd.hotSleepCnt": integer,
  // Screen timeout: 0: Disable; 1: Enable
  "pd.idleMode": zeroOrOne,
  // Screen timeout (sec)
  "pd.idleTime": integer,
  // Screen enabling bit
  "pd.lcdStatus": integer,
  // LLC output current
  "pd.llcCurr": z.number(),
  // Count of setting low wind speed
  "pd.lowWindSpeedCnt": integer,
  // Main mode: 0: Cool; 1: Heat; 2: Fan
  "pd.mainMode": zeroOrOneOrTwo,
  // Count of setting medium wind speed
  "pd.midWindSpeedCnt": integer,
  // Exhaust temperature, magnified 100 times
  "pd.motorOutTemp": integer,
  // PV current (mA)
  "pd.mpptCur": integer,
  // PV input power
  "pd.mpptPwr": integer,
  // PV execution status
  "pd.mpptSts": integer,
  // PV voltage (unit: 0.01 V)
  "pd.mpptVol": integer,
  // MPPT operating status; 1: Car charging; 2: Solar charging
  "pd.mpptWork": oneOrTwo,
  // Error code
  "pd.pdErrCode": integer,
  // Set mode
  "pd.pdMainMode": integer,
  // Reserved pd field: 32 bytes
  "pd.pdResv": integer.array(),
  // Set sub-mode
  "pd.pdSubMode": integer,
  // Unit of temperature
  "pd.pdTempSys": integer,
  // Remotely power on/off: 1: Power on; 2: Power off,
  "pd.powerMode": oneOrTwo,
  // Count of shutdown
  "pd.powerOffCounts": integer,
  // Count of startup
  "pd.powerOnCounts": integer,
  // Input source: bit0: AC; bit1: MPTT; bit2: Battery main pack; bit3: Battery slave pack
  "pd.powerSrc": integer,
  // Power supply status
  "pd.powerSts": integer,
  // Communication counter
  "pd.psdrCnt": integer,
  // Power supply power
  "pd.psdrPower": integer,
  // PV charging power
  "pd.pvPower": integer,
  // Reserved 15 bytes
  "pd.recv": integer.array(),
  // Cool/Heat enabling flag: 0: Cool/Heat mode cannot be set; 1: Cool/Heat mode can be set
  "pd.refEn": zeroOrOne,
  // Reserved field: 20 bytes
  "pd.reserved": integer.array(),
  // Reserved bytes: 31 bytes
  "pd.resv": integer.array(),
  // Light strip settings: 0: Follow the screen; 1: Always on; 2: Always off
  "pd.rgbState": zeroOrOneOrTwo,
  // bit0 soft start rly; bit1 ac rly; 1: Closed; 0: Open
  "pd.rlySts": integer,
  // bit0 ac_in; bit1 pfc; bit2 llc; bit3 mppt: 1: Run; 0: Not run
  "pd.runSts": integer,
  // Device standby time
  "pd.sacIdleTime": integer,
  // Length of time the device power falls in each interval (sec).
  // The intervals include 101 W-200 W, 201 W-300 W, 301 W-400 W, 401 W-500 W, 501 W-600 W, and 601 W-700 W.
  "pd.sacWattRangeTime": integer.array(),
  // Device working duration
  "pd.sacWorkTime": integer,
  // Fan speed
  "pd.setFanVal": integer,
  // Temperature set in current mode
  "pd.setTemp": integer,
  // Set temperature in degrees Celsius
  "pd.setTempCel": integer,
  // Set temperature in degrees Fahrenheit
  "pd.setTempfah": integer,
  // Set sub-mode
  "pd.subMode": integer,
  // System power
  "pd.sysPowerWatts": integer,
  // Temperature display: 0: Display ambient temperature; 1: Display air outlet temperature
  "pd.tempDisplay": zeroOrOne,
  // NTC temperature (unit: 0.1°C)
  "pd.tempNtc": integer,
  // Unit of temperature: 0: Celsius; 1: Fahrenheit
  "pd.tempSys": zeroOrOne,
  // 0: Timer off; 1: Timer on
  "pd.timeEn": zeroOrOne,
  // Remaining time in current mode (min)
  "pd.timeRemain": integer,
  // Time set for current mode (min)
  "pd.timeSet": integer,
  // Version of drainage logic
  "pd.ver": integer,
  // Water level: 0: Level 1; 1: Level 2; 2: Full
  "pd.waterValue": zeroOrOneOrTwo,
  // Count of setting in Fan mode
  "pd.windCnt": integer,
  // bit1 (main switch of automatic drainage function): 0: On; 1: Off bit0: (in Cool/Fan mode): 0: Manual drainage; 1: No drainage (in Heat mode): 0: Off; 1: Physical drainage
  "pd.wteFthEn": integer,
  // RMS value of the AC input current (mA)
  "power.acCurrRms": integer,
  // AC input frequency
  "power.acFreq": integer,
  // Count of using AC power supply
  "power.acPowerSupplyCnt": integer,
  // AC input power (W)
  "power.acPwrIn": integer,
  // RMS value of the AC input voltage (unit: 0.1 V)
  "power.acVoltRms": integer,
  // Length of time when AC power falls in interval 0 (101 W-200 W), measured in seconds
  "power.acWattsRange0Time": integer,
  // Length of time when AC power falls in interval 1 (201 W-300 W), measured in seconds
  "power.acWattsRange1Time": integer,
  // Length of time when AC power falls in interval 2 (301 W-400 W), measured in seconds
  "power.acWattsRange2Time": integer,
  // Length of time when AC power falls in interval 3 (401 W-500 W), measured in seconds
  "power.acWattsRange3Time": integer,
  // Length of time when AC power falls in interval 4 (501 W-600 W), measured in seconds
  "power.acWattsRange4Time": integer,
  // Length of time when AC power falls in interval 5 (601 W-700 W), measured in seconds
  "power.acWattsRange5Time": integer,
  // Battery current (mA)
  "power.batCurr": integer,
  // Battery output power (W)
  "power.batPwrOut": integer,
  // Battery voltage
  "power.batVolt": integer,
  // Bus voltage (unit: 0.1 V)
  "power.busVol": integer,
  // Bus voltage
  "power.busVolt": integer,
  // Count of car charging
  "power.carPowerSupplyCnt": integer,
  // Fault error
  "power.errCode": integer,
  // Error lock
  "power.errLock": integer,
  // Fan speed level: 0-4; 0 for non-rotation
  "power.fanSts": integer.min(0).max(4),
  // LLC output current
  "power.llcCurr": z.number(),
  // Count of LLC overcurrent
  "power.llcOcpInt": integer,
  // PV current (mA)
  "power.mpptCur": integer,
  // MPPT lock flag
  "power.mpptLockFlag": integer,
  // PV input power (W)
  "power.mpptPwr": integer,
  // PV execution status
  "power.mpptSts": integer,
  // PV voltage (unit: 0.01 V)
  "power.mpptVol": integer,
  // Length of time when MPPT power supply voltage falls in interval 0 (11 V-20 V), measured in seconds
  "power.mpptVolRange0Time": integer,
  // Length of time when MPPT power supply voltage falls in interval 1 (21 V-30 V), measured in seconds
  "power.mpptVolRange1Time": integer,
  // Length of time when MPPT power supply voltage falls in interval 2 (31 V-40 V), measured in seconds
  "power.mpptVolRange2Time": integer,
  // Length of time when MPPT power supply voltage falls in interval 3 (41 V-50 V), measured in seconds
  "power.mpptVolRange3Time": integer,
  // Length of time when MPPT power supply voltage falls in interval 4 (51 V-60 V), measured in seconds
  "power.mpptVolRange4Time": integer,
  // Length of time when MPPT power supply falls in interval 0 (101 W-200 W), measured in seconds
  "power.mpptWattsRange0Time": integer,
  // Length of time when MPPT power supply falls in interval 1 (201 W-300 W), measured in seconds
  "power.mpptWattsRange1Time": integer,
  // Length of time when MPPT power supply falls in interval 2 (301 W-400 W), measured in seconds
  "power.mpptWattsRange2Time": integer,
  // MPPT operating status; 1: Car charging; 2: Solar charging
  "power.mpptWork": oneOrTwo,
  // Count of PFC software overcurrent
  "power.pfcOcpS": integer,
  // Reserved power field: 32 bytes
  "power.powerResv": integer.array(),
  // Communication counter
  "power.psdrCnt": integer,
  // Count of PV overcurrent
  "power.pvOcpHw": integer,
  // Count of using PV power supply
  "power.pvPowerSupplyCnt": integer,
  // Reserved bytes: 31 bytes
  "power.resv": integer.array(),
  // bit0 soft start rly; bit1 ac rly; 1: Closed; 0: Open
  "power.rlySts": integer,
  // bit0 ac_in; bit1 pfc; bit2 llc; bit3 mppt: 1: Run; 0: Not run
  "power.runSts": integer,
  // The highest temperature among the four temperatures: MPPT temperature, PFC temperature,
  // LLC high-voltage side temperature, and LLC low-voltage side temperature
  "power.tempMax": integer,
  // The minimum temperature value among the four temperatures: MPPT temperature, PFC temperature,
  // LLC high-voltage side temperature, and LLC low-voltage side temperature
  "power.tempMin": integer,
  // NTC temperature (unit: 0.1°C)
  "power.tempNtc": integer,
});

export type Wave2QuotaAll = z.infer<typeof wave2QuotaAllSchema>;

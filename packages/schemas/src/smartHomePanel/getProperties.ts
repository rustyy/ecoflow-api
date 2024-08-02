import { z } from "zod";
import { integer, zeroOrOne } from "../shared";

export const shpQuotaAllSchema = z.object({
  "heartbeat.errorCodes": integer.array(),
  "backupLoadWatt.rtc": z.string(),
  "cfgSta.sta": integer,
  "heartbeat.backupCmdChCtrlInfos": z
    .object({
      powCh: integer,
      ctrlSta: integer,
      ctrlMode: integer,
      priority: integer,
    })
    .array(),
  "chUseInfo.cmdSet": integer,
  "heartbeat.id": integer,
  "backupChaDiscCfg.id": integer,
  "selfCheck.id": integer,
  "splitPhaseInfo.id": integer,
  "channelPower.time.min": integer,
  "channelPower.time.sec": integer,
  "selfCheck.cmdSet": integer,
  "selfCheck.vOut": z.number().array(),
  "loadChCurInfo.cur": integer.array(),
  "backupLoadWatt.cmdSet": integer,
  "topupLoadWatt.rtc": z.string(),
  "heartbeat.backupFullCap": integer.positive(),
  "channelPower.cmdSet": integer,
  loadChInfo: z.object({
    info: z
      .object({
        iconNum: integer,
        chName: z.string(),
      })
      .array(),
  }),
  "heartbeat.loadCmdChCtrlInfos": z
    .object({
      powCh: integer,
      ctrlSta: integer,
      ctrlMode: integer,
      priority: integer,
    })
    .array(),
  "topupLoadWatt.watth": z.array(integer.array()),
  "chUseInfo.id": integer,
  "backupLoadWatt.id": integer,
  "heartbeat.time.month": integer,
  "gridInfo.gridFreq": integer,
  "areaInfo.cmdSet": integer,
  "channelPower.time.week": integer,
  "gridInfo.gridVol": integer,
  "channelPower.time.month": integer,
  "cfgSta.id": integer,
  "areaInfo.area": z.string(),
  "selfCheck.chErrorSta": z.number().array(),
  "emergencyStrategy.chSta": z
    .object({
      priority: integer,
      isEnable: zeroOrOne,
    })
    .array(),
  "selfCheck.phaseType": z.number().array(),
  "gridInfo.cmdSet": integer,
  "emergencyStrategy.id": integer,
  "loadChCurInfo.cmdSet": integer,
  "heartbeat.time.sec": integer,
  "selfCheck.vIn": z.number().array(),
  "heartbeat.time.min": integer,
  "mainsLoadWatt.watth": z.array(integer.array()),
  "backupChaDiscCfg.forceChargeHigh": integer,
  "heartbeat.time.week": integer,
  "topupLoadWatt.cmdSet": integer,
  "emergencyStrategy.backupMode": integer,
  "cfgSta.cmdSet": integer,
  "heartbeat.time.hour": integer,
  "splitPhaseInfo.cfgList": z
    .object({
      linkCh: integer,
      linkMark: integer,
    })
    .array(),
  "emergencyStrategy.isCfg": integer,
  "emergencyStrategy.cmdSet": integer,
  "selfCheck.result": integer,
  "mainsLoadWatt.cmdSet": integer,
  "epsModeInfo.eps": z.boolean(),
  "areaInfo.id": integer,
  "channelPower.id": integer,
  "splitPhaseInfo.cmdSet": integer,
  "heartbeat.cmdSet": integer,
  "backupChaDiscCfg.cmdSet": integer,
  "channelPower.infoList": z
    .object({
      powType: integer,
      chWatt: z.number(),
    })
    .array(),
  "gridInfo.id": integer,
  "heartbeat.gridDayWatth": z.number(),
  "mainsLoadWatt.rtc": z.string(),
  "heartbeat.backupChaTime": integer,
  "epsModeInfo.cmdSet": integer,
  "emergencyStrategy.overloadMode": integer,
  "channelPower.time.hour": integer,
  "heartbeat.backupDayWatth": z.number(),
  "selfCheck.flag": integer,
  "chUseInfo.isEnable": z.boolean().array(),
  "heartbeat.backupBatPer": integer,
  "backupChaDiscCfg.discLower": integer,
  "channelPower.time.day": integer,
  "heartbeat.energyInfos": z
    .object({
      dischargeTime: integer,
      mulPackNum: integer,
      stateBean: z.object({
        isPowerOutput: zeroOrOne,
        isGridCharge: zeroOrOne,
        isConnect: zeroOrOne,
        isMpptCharge: zeroOrOne,
        isAcOpen: zeroOrOne,
        isEnable: zeroOrOne,
      }),
      outputPower: integer,
      lcdInputWatts: integer,
      fullCap: integer,
      chargeTime: integer,
      emsChgFlag: integer,
      type: integer,
      emsBatTemp: integer,
      ratePower: integer,
      batteryPercentage: integer,
      oilPackNum: integer,
    })
    .array(),
  "epsModeInfo.id": integer,
  "channelPower.time.year": integer,
  "heartbeat.time.year": integer,
  "topupLoadWatt.id": integer,
  "mainsLoadWatt.id": integer,
  "heartbeat.gridSta": integer,
  "heartbeat.time.day": integer,
  "backupLoadWatt.watth": z.array(integer.array()),
  "loadChCurInfo.id": integer,
  "heartbeat.workTime": integer,
});

export type ShpQuotaAll = z.infer<typeof shpQuotaAllSchema>;

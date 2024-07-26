import { z } from "zod";
import { integer, taskSchema } from "../shared";

/*********************************************
 * Quota
 *********************************************/

export const smartPlugQuotaAllSchema = z.object({
  // RGB light brightness: 0–1023 (the larger the value, the higher the brightness)
  "2_1.brightness": integer,
  // Country
  "2_1.country": integer.nonnegative(),
  // Operating current (mA)
  "2_1.current": integer.nonnegative(),
  // Error code
  "2_1.errCode": integer,
  // Operating frequency (Hz)
  "2_1.freq": integer,
  // Maximum output current: 0.1 A
  "2_1.maxCur": integer,
  // Smart plug switch status
  "2_1.switchSta": z.boolean(),
  // Smart plug temperature
  "2_1.temp": integer,
  // City
  "2_1.town": integer.nonnegative(),
  // Update time
  "2_1.updateTime": z.string(),
  // Operating voltage (V)
  "2_1.volt": integer.nonnegative(),
  // Smart plug warning code
  "2_1.warnCode": integer,
  // Operating output power: 0.1 W
  "2_1.watts": integer.nonnegative(),
  "2_2.task1": taskSchema,
  "2_2.task2": taskSchema,
  "2_2.task3": taskSchema,
  "2_2.task4": taskSchema,
  "2_2.task5": taskSchema,
  "2_2.task6": taskSchema,
  "2_2.task7": taskSchema,
  "2_2.task8": taskSchema,
  "2_2.task9": taskSchema,
  "2_2.task10": taskSchema,
  "2_2.task11": taskSchema,

  // @todo: Not documented in the official docs.
  "2_1.consNum": integer,
  // @todo: Not documented in the official docs. can be negative
  "2_1.consWatt": integer,
  // @todo: Not documented in the official docs.
  "2_1.geneNum": integer,
  // @todo: Not documented in the official docs.
  "2_1.geneWatt": integer,
  // @todo: Not documented in the official docs.
  "2_1.heartbeatFrequency": integer.nonnegative(),
  // @todo: Not documented in the official docs.
  "2_1.lanState": integer,
  // @todo: Not documented in the official docs.
  "2_1.matterFabric": integer,
  // @todo: Not documented in the official docs.
  "2_1.maxWatts": integer,
  // @todo: Not documented in the official docs.
  "2_1.meshEnable": integer,
  // @todo: Not documented in the official docs.
  "2_1.meshId": integer,
  // @todo: Not documented in the official docs.
  "2_1.meshLayel": integer,
  // @todo: Not documented in the official docs.
  "2_1.mqttErr": integer,
  // @todo: Not documented in the official docs.
  "2_1.mqttErrTime": integer,
  // @todo: Not documented in the official docs.
  "2_1.otaDlErr": integer,
  // @todo: Not documented in the official docs.
  "2_1.otaDlTlsErr": integer,
  // @todo: Not documented in the official docs.
  "2_1.parentMac": integer,
  // @todo: Not documented in the official docs.
  "2_1.parentWifiRssi": integer,
  // @todo: Not documented in the official docs.
  "2_1.resetCount": integer,
  // @todo: Not documented in the official docs.
  "2_1.resetReason": integer,
  // @todo: Not documented in the official docs.
  "2_1.rtcResetReason": integer,
  // @todo: Not documented in the official docs.
  "2_1.runTime": integer,
  // @todo: Not documented in the official docs.
  "2_1.selfEmsSwitch": integer,
  // @todo: Not documented in the official docs.
  "2_1.selfMac": integer,
  // @todo: Not documented in the official docs. can be negative
  "2_1.staIpAddr": integer,
  // @todo: Not documented in the official docs.
  "2_1.stackFree": integer,
  // @todo: Not documented in the official docs.
  "2_1.stackMinFree": integer,
  // @todo: Not documented in the official docs.
  "2_1.wifiErr": integer,
  // @todo: Not documented in the official docs.
  "2_1.wifiErrTime": integer,
  // @todo: Not documented in the official docs.
  "2_2.updateTime": z.string(),
});

export type SmartPlugQuotaAll = z.infer<typeof smartPlugQuotaAllSchema>;

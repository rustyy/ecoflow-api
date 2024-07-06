import {
  Delta2SerialNumber,
  isDelta2SerialNumber,
  isPowerStreamSerialNumber,
  isSmartPlugSn,
  PowerStreamSerialNumber,
  SmartPlugSn,
} from "@ecoflow-api/schemas";
import { SmartPlug } from "./SmartPlug";
import { UnknownDevice } from "./UnknownDevice";
import { RestClient } from "../RestClient";
import { PowerStream } from "./PowerStream";
import { Delta2 } from "./Delta2";

export type DeviceFactoryReturnType<T extends string> = T extends SmartPlugSn
  ? SmartPlug
  : T extends PowerStreamSerialNumber
    ? PowerStream
    : T extends Delta2SerialNumber
      ? Delta2
      : UnknownDevice;

/**
 * Factory function to create a device based on the serial number.
 * @param sn
 * @param restClient
 */
export function deviceFactory<T extends string, R = DeviceFactoryReturnType<T>>(
  sn: T,
  restClient: RestClient,
): R {
  if (isSmartPlugSn(sn)) {
    return new SmartPlug(restClient, sn) as R;
  }

  if (isPowerStreamSerialNumber(sn)) {
    return new PowerStream(restClient, sn) as R;
  }

  if (isDelta2SerialNumber(sn)) {
    return new Delta2(restClient, sn) as R;
  }

  return new UnknownDevice(restClient, sn) as R;
}

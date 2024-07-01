import { isSmartPlugSn, SmartPlugSn } from "@ecoflow-api/schemas";
import { SmartPlug } from "./SmartPlug";
import { UnknownDevice } from "./UnknownDevice";
import { RestClient } from "../RestClient";

type DeviceFactoryReturnType<T extends string> = T extends SmartPlugSn
  ? SmartPlug
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

  return new UnknownDevice(restClient, sn) as R;
}

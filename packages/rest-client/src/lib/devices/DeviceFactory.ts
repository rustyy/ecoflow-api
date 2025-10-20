import {
  Delta2SerialNumber,
  DeltaPro3SerialNumber,
  GlacierSerialNumber,
  isDelta2SerialNumber,
  isDeltaPro3SerialNumber,
  isDeltaProSerialNumber,
  isGlacierSerialNumber,
  isPowerStreamSerialNumber,
  isSmartHomePanelSerialNumber,
  isSmartPlugSn,
  PowerStreamSerialNumber,
  SmartHomePanelSerialNumber,
  SmartPlugSn,
} from "@ecoflow-api/schemas";
import { SmartPlug } from "./SmartPlug";
import { UnknownDevice } from "./UnknownDevice";
import { RestClient } from "../RestClient";
import { PowerStream } from "./PowerStream";
import { Delta2 } from "./Delta2";
import { Glacier } from "./Glacier";
import { SmartHomePanel } from "./SmartHomePanel";
import { DeltaPro } from "./DeltaPro";
import { DeltaPro3 } from "./DeltaPro3";

// prettier-ignore
export type DeviceFactoryReturnType<T extends string> =
  T extends SmartPlugSn ? SmartPlug :
  T extends PowerStreamSerialNumber ? PowerStream :
  T extends Delta2SerialNumber ? Delta2 :
  T extends GlacierSerialNumber ? Glacier :
  T extends SmartHomePanelSerialNumber ? SmartHomePanel :
  T extends DeltaPro3SerialNumber ? DeltaPro3 :
  UnknownDevice;

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

  if (isGlacierSerialNumber(sn)) {
    return new Glacier(restClient, sn) as R;
  }

  if (isSmartHomePanelSerialNumber(sn)) {
    return new SmartHomePanel(restClient, sn) as R;
  }

  if (isDeltaProSerialNumber(sn)) {
    return new DeltaPro(restClient, sn) as R;
  }

  if (isDeltaPro3SerialNumber(sn)) {
    return new DeltaPro3(restClient, sn) as R;
  }

  return new UnknownDevice(restClient, sn) as R;
}

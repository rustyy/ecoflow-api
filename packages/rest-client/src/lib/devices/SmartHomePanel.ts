import {
  isSmartHomePanelSerialNumber,
  ShpQuotaAll,
  shpQuotaAllSchema,
  SmartHomePanelSerialNumber,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";

export class SmartHomePanel extends Device<
  SmartHomePanelSerialNumber,
  ShpQuotaAll
> {
  constructor(restClient: RestClient, sn: SmartHomePanelSerialNumber) {
    super(restClient, sn);

    if (!isSmartHomePanelSerialNumber(sn)) {
      throw new Error("Invalid serial number for SmartHomePanel device.");
    }
  }

  protected parseProperties(data: any) {
    return shpQuotaAllSchema.parse(data);
  }
}

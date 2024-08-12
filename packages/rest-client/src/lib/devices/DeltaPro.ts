import {
  DeltaProQuotaAll,
  deltaProQuotaAllSchema,
  DeltaProSerialNumber,
  isDeltaProSerialNumber,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";

export class DeltaPro extends Device<DeltaProSerialNumber, DeltaProQuotaAll> {
  constructor(restClient: RestClient, sn: DeltaProSerialNumber) {
    super(restClient, sn);

    if (!isDeltaProSerialNumber(sn)) {
      throw new Error("Invalid serial number for Delta Pro device.");
    }
  }

  protected parseProperties(data: any) {
    return deltaProQuotaAllSchema.parse(data);
  }
}

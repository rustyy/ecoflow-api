import {
  isWave2SerialNumber,
  Wave2QuotaAll,
  wave2QuotaAllSchema,
  Wave2SerialNumber,
  Wave2SetMainMode,
  wave2SetMainModeSchema,
  Wave2SetSubMode,
  wave2SetSubModeSchema,
  Wave2SetTemperatureSystem,
  wave2SetTemperatureSystemSchema,
} from "@ecoflow-api/schemas";
import { Device } from "./Device";
import { RestClient } from "../RestClient";

export class Wave2 extends Device<Wave2SerialNumber, Wave2QuotaAll> {
  constructor(restClient: RestClient, sn: Wave2SerialNumber) {
    super(restClient, sn);

    if (!isWave2SerialNumber(sn)) {
      throw new Error("Invalid serial number for Wave2 device.");
    }
  }

  protected parseProperties(data: any) {
    return wave2QuotaAllSchema.parse(data);
  }

  #payloadDefaults(): {
    moduleType: 1;
    id: number;
    version: "1.0";
    sn: Wave2SerialNumber;
  } {
    return {
      moduleType: 1,
      id: 123456789,
      version: "1.0",
      sn: this.sn,
    };
  }

  async setMainMode(mode: "cooling" | "heating" | "fan") {
    const conf = {
      cooling: 0,
      heating: 1,
      fan: 2,
    } as const;

    const payload: Wave2SetMainMode = {
      ...this.#payloadDefaults(),
      operateType: "mainMode",
      params: {
        mainMode: conf[mode],
      },
    };
    return this.sendCommand(payload, wave2SetMainModeSchema);
  }

  async setSubMode(mode: "max" | "sleep" | "eco" | "manual") {
    const conf = {
      max: 0,
      sleep: 1,
      eco: 2,
      manual: 3,
    } as const;

    const payload: Wave2SetSubMode = {
      ...this.#payloadDefaults(),
      operateType: "subMode",
      params: {
        subMode: conf[mode],
      },
    };
    return this.sendCommand(payload, wave2SetSubModeSchema);
  }

  async setTemperatureUnit(unit: "C" | "F") {
    const conf = {
      C: 0,
      F: 1,
    } as const;

    const payload: Wave2SetTemperatureSystem = {
      ...this.#payloadDefaults(),
      operateType: "tempSys",
      params: {
        mode: conf[unit],
      },
    };

    return this.sendCommand(payload, wave2SetTemperatureSystemSchema);
  }
}

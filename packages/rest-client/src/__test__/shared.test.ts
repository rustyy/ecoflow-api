import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { SmartPlug } from "../lib/devices/SmartPlug";
import { RestClient, RestClientOptions } from "../lib/RestClient";
import { devicePropertiesResponse } from "../__fixtures__/smartPlugProperties";
import { getPropertiesFailsOnInvalidResponse } from "../__fixtures__/shared";
import { QuotaAllResponse } from "@ecoflow-api/schemas";
import { Glacier } from "../lib/devices/Glacier";
import { glacierProperties } from "../__fixtures__/glacierProperties";
import { Device } from "../lib/devices/Device";
import { PowerStream } from "../lib/devices/PowerStream";
import { propertiesFixture } from "../__fixtures__/powerStreamProperties";
import { Delta2 } from "../lib/devices/Delta2";
import { delta2properties } from "../__fixtures__/delta2Properties";
import { SmartHomePanel } from "../lib/devices/SmartHomePanel";
import { shpProperties } from "../__fixtures__/shpProperties";
import { DeltaPro } from "../lib/devices/DeltaPro";
import { deltaProProperties } from "../__fixtures__/deltaProProperties";

type DeviceTestData<T> = [
  // device name
  string,
  // device class
  new (restClient: RestClient, sn: any) => T,
  // valid serial number
  string,
  // quota all response
  Record<string, unknown>,
  // error message
  string,
  // test property
  string,
][];

const devices: DeviceTestData<any> = [
  [
    "Smart Plug",
    SmartPlug,
    "HW52*****",
    devicePropertiesResponse,
    "Invalid serial number for smart plug device.",
    "2_1.temp",
  ],
  [
    "Glacier",
    Glacier,
    "BX11*****",
    glacierProperties,
    "Invalid serial number for Glacier device.",
    "bms_emsStatus.dsgCmd",
  ],
  [
    "PowerStream",
    PowerStream,
    "HW51*****",
    propertiesFixture,
    "Invalid serial number for powerStream device.",
    "20_1.pv1InputWatts",
  ],
  [
    "Delta 2",
    Delta2,
    "R331*****",
    delta2properties,
    "Invalid serial number for Delta2 device.",
    "bms_bmsStatus.f32ShowSoc",
  ],
  [
    "Smart Home Panel",
    SmartHomePanel,
    "SP10*****",
    shpProperties,
    "Invalid serial number for SmartHomePanel device.",
    "areaInfo.cmdSet",
  ],
  [
    "Delta Pro",
    DeltaPro,
    "DCABZ*****",
    deltaProProperties,
    "Invalid serial number for Delta Pro device.",
    "bmsMaster.soc",
  ],
];

describe.each(devices)(
  "%s",
  (name, Class, sn, quotaAllResponse, errorMsg, testProp) => {
    let device: Device<any, any>;
    let restClient: RestClient;
    const validSn = sn;

    beforeEach(() => {
      const restClientOptions: RestClientOptions = {
        host: "https://api-a.ecoflow.com",
        accessKey: "fake_access",
        secretKey: "fake_secret",
      };

      restClient = new RestClient(restClientOptions);
      device = new Class(restClient, validSn);

      restClient.setCommandPlain = jest.fn<RestClient["setCommandPlain"]>();
      restClient.getDevicePropertiesPlain = jest
        .fn<RestClient["getDevicePropertiesPlain"]>()
        .mockResolvedValue(quotaAllResponse as QuotaAllResponse);
    });

    it("instantiates", () => {
      expect(device).toBeTruthy();
      expect(device).toBeInstanceOf(Class);
    });

    it("Throws an error for invalid serial number", () => {
      expect(() => {
        new Class(restClient, "invalid_sn" as any);
      }).toThrowError(errorMsg);
    });

    it("Throws an error for invalid data received from api", async () => {
      await getPropertiesFailsOnInvalidResponse(restClient, device);
    });

    it("Returns data if api response could be parsed", async () => {
      await expect(device.getProperties()).resolves.toBeDefined();
    });

    it("Returns the requested property", async () => {
      await expect(device.getProperty(testProp)).resolves.toBe(
        (quotaAllResponse.data as any)[testProp],
      );
    });

    it("Returns undefined for non existing property", async () => {
      await expect(device.getProperty("foobar")).resolves.toBeUndefined();
    });
  },
);

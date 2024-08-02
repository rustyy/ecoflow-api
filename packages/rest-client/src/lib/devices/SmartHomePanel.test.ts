import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { RestClient, RestClientOptions } from "../RestClient";
import { SmartHomePanel } from "./SmartHomePanel";
import { propertiesFixture } from "../../__fixtures__/shpProperties";

describe("SmartHomePanel", () => {
  let device: SmartHomePanel;
  let restClient: RestClient;
  const validSn = "SP10*****";

  beforeEach(() => {
    const restClientOptions: RestClientOptions = {
      host: "https://api-a.ecoflow.com",
      accessKey: "fake_access",
      secretKey: "fake_secret",
    };

    restClient = new RestClient(restClientOptions);
    device = new SmartHomePanel(restClient, validSn);

    // @ts-ignore
    restClient.setCommandPlain = jest.fn();
  });

  it("Should be able to construct an instance of SmartHomePanel", () => {
    expect(device).toBeTruthy();
    expect(device).toBeInstanceOf(SmartHomePanel);
  });

  it("should throw an error if the serial number is invalid", () => {
    expect(() => {
      new SmartHomePanel(restClient, "invalid_sn" as any);
    }).toThrowError("Invalid serial number for SmartHomePanel device.");
  });

  it("Should throw an error for invalid data received from api", async () => {
    const data = {
      sn: "fake-sn",
      success: true,
      code: 0,
      message: "Test message",
      time: new Date().getTime(),
    };

    // @ts-ignore
    restClient.getDeviceProperties = jest.fn().mockResolvedValue(data);
    await expect(device.getProperties()).rejects.toThrowError();
  });

  it("Should return data if api response could be parsed", async () => {
    // @ts-ignore
    restClient.getDevicePropertiesPlain = jest
      .fn()
      // @ts-ignore
      .mockResolvedValue(propertiesFixture);

    await expect(device.getProperties()).resolves.toBeDefined();
  });

  it("should update rtc time", async () => {
    const rtcTime = {
      sec: 0,
      min: 0,
      hour: 0,
      day: 0,
      week: 0,
      month: 0,
      year: 0,
    };

    await device.setRtcTime(rtcTime);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 3,
        ...rtcTime,
      },
    });
  });

  it("should set load channel control", async () => {
    const loadChannelControl = {
      ch: 1,
      ctrlMode: 1,
      sta: 1,
    };

    await device.setLoadChannelControl(loadChannelControl);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 16,
        ...loadChannelControl,
      },
    });
  });

  it("should set standby channel control", async () => {
    const data = {
      ch: 1,
      ctrlMode: 1,
      sta: 1,
    };

    await device.setStandbyChannelControl(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 17,
        ...data,
      },
    });
  });

  it("should set Split-phase information configuration", async () => {
    const data = [
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
      { linkCh: 0, linkMark: 0 },
    ];

    await device.setSplitPhaseInfoConfig(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 18,
        cfgList: data,
      },
    });
  });

  it("should set channel current configuration", async () => {
    await device.setChannelCurrentConfiguration({ channel: 10, cur: 6 });

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 20,
        chNum: 10,
        cur: 6,
      },
    });
  });

  it("should set Grid power parameter configuration", async () => {
    const data = {
      gridFreq: 50,
      gridVol: 220,
    };

    await device.setGridPowerConfiguration(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 22,
        ...data,
      },
    });
  });

  it("should set EPS mode", async () => {
    await device.enableEpsMode(1);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 24,
        eps: 1,
      },
    });
  });

  it("should set channel status", async () => {
    await device.enableChannelStatus({ channel: 1, enable: 1 });

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 26,
        isEnable: 1,
        chNum: 1,
      },
    });
  });

  it("should set load channel info", async () => {
    const data = {
      channel: 1,
      iconInfo: 1,
      channelName: "test",
    };

    await device.setLoadChannelInfo(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 32,
        chNum: 1,
        info: {
          chName: "test",
          iconInfo: 1,
        },
      },
    });
  });

  it("should set region info", async () => {
    await device.setRegionInfo("test");

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 34,
        area: "test",
      },
    });
  });

  it("should set emergency mode", async () => {
    const data = {
      isCfg: 1 as const,
      backupMode: 1 as const,
      overloadMode: 0 as const,
      chSta: [{ priority: 1, isEnable: 1 as const }],
    };

    await device.setEmergencyMode(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 64,
        ...data,
      },
    });
  });

  it("should set scheduled charging job", async () => {
    const data = {
      cfgIndex: 1,
      cfg: {
        param: {
          lowBattery: 95,
          chChargeWatt: 2000,
          chSta: [1, 0],
          hightBattery: 100,
        },
        comCfg: {
          timeScale: [
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 127,
          ],
          isCfg: 1 as const,
          type: 1,
          timeRange: {
            isCfg: 1 as const,
            startTime: {
              sec: 0,
              min: 0,
              week: 4,
              hour: 0,
              month: 1,
              year: 2023,
              day: 11,
            },
            timeMode: 0,
            endTime: {
              sec: 59,
              min: 59,
              week: 7,
              hour: 23,
              month: 1,
              year: 2023,
              day: 22,
            },
            mode1: {
              thur: 0,
              sat: 0,
              wed: 0,
              tues: 0,
              fri: 0,
              sun: 0,
              mon: 0,
            },
            isEnable: 1 as const,
          },
          isEnable: 1 as const,
          setTime: {
            sec: 35,
            min: 53,
            week: 4,
            hour: 15,
            month: 1,
            year: 2023,
            day: 11,
          },
        },
      },
    };

    await device.setScheduledChargingJob(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 81,
        ...data,
      },
    });
  });

  it("should set scheduled discharging job", async () => {
    const data = {
      cfgIndex: 1,
      cfg: {
        chSta: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        comCfg: {
          timeScale: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          isCfg: 1 as const,
          type: 2,
          timeRange: {
            isCfg: 1 as const,
            timeMode: 0,
            startTime: {
              sec: 0,
              min: 0,
              week: 2,
              hour: 0,
              month: 10,
              year: 2022,
              day: 24,
            },
            endTime: {
              sec: 59,
              min: 59,
              week: 2,
              hour: 23,
              month: 10,
              year: 2022,
              day: 25,
            },
            isEnable: 1 as const,
          },
          isEnable: 1 as const,
          setTime: {
            sec: 61,
            min: 9,
            week: 7,
            hour: 16,
            month: 11,
            year: 2022,
            day: 15,
          },
        },
      },
    };

    await device.setScheduledDischargingJob(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 82,
        ...data,
      },
    });
  });

  it("should set configuration status", async () => {
    await device.setConfigurationStatus(1);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 7,
        cfgSta: 1,
      },
    });
  });

  it("should set start self check", async () => {
    await device.setStartSelfCheck(1);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 112,
        selfCheckType: 1,
      },
    });
  });

  it("should set standby charging/discharging parameters", async () => {
    const data = {
      discLower: 1,
      forceChargeHigh: 1,
    };

    await device.setStandByChargingDischargingParameters(data);

    expect(restClient.setCommandPlain).toBeCalledWith({
      sn: validSn,
      operateType: "TCP",
      params: {
        cmdSet: 11,
        id: 29,
        ...data,
      },
    });
  });
});

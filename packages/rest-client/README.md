# @ecoflow-api/rest-client

This module provides a rest client to communicate with the official Ecoflow API via NodeJS.
To use this client you need to set up an account at https://developer.ecoflow.com and generate a key pair of access- and secret-key.

## Installation

Run `npm install @ecoflow-api/rest-client`

## Reference

See: https://rustyy.github.io/ecoflow-api/modules/_ecoflow_api_rest_client.html

## Current device support

All devices that are supported by the EcoFlow API itself are supposed to work with this client.
You can use ```client.getDevicesPlain()```, ```client.getDevicePropertiesPlain("<sn>")```, 
```client.getSerialNumbers()```, ```client.getMqttCredentials()```
and ```client.setCommandPlain({...})``` to request or set any information 
officially supported by the EcoFlow API.

See https://developer-eu.ecoflow.com/us/document/ for more information.

Apart from this, the client provides specific device instances that come with specific device functionality.
Depending on the serial number of the device, the client will return a specific device instance that simplifies requests against the api (see examples below).

At the moment the following devices are supported with specific instances:

- Smart Plug
- PowerStream
- Delta 2
- Glacier

More devices to come.

## Usage

### Basic usage

```ts
import {RestClient} from '@ecoflow-api/rest-client';

const client = new RestClient({
    accessKey: "your-access",
    secretKey: "your-secret",
    host: "https://api-e.ecoflow.com"
})

// get plain response from api 
const plainDevices = await client.getDevicesPlain();

// Get a specific device instance based on the serial number.
// e.g. a smart plug
const smartPlug = await client.getDevice("HW52*****");
smartPlug.turnOn();
```

### Plain methods

```ts
import {RestClient} from '@ecoflow-api/rest-client';

const client = new RestClient({
    accessKey: "your-access",
    secretKey: "your-secret",
    host: "https://api-e.ecoflow.com"
})

// Request the mqtt credentials 
const mqttCredentials = await client.getMqttCredentials();

// get plain response from api 
const plainDevices = await client.getDevicesPlain();

// Get all serial numbers bound to the account
const serialNumbers = await client.getSerialNumbers();

// Send a command to the api to set a property
// See https://developer-eu.ecoflow.com/us/document/ for more information
await client.setCommandPlain({...});

// Request properties for the given serial number.
const properties = await client.getDevicePropertiesPlain("sn");

// Request a specific device instance that comes with specific device functionality,
// that simplify requests againt the api.
const device = await client.getDevice("sn");

// Request device instances for all registered devices.
const devices = await client.getDevices();
```

### Device Instances

#### Smart Plug

Serial number must start with _HW52_

```ts
import {RestClient} from '@ecoflow-api/rest-client';

const client = new RestClient({
    accessKey: "your-access",
    secretKey: "your-secret",
    host: "https://api-e.ecoflow.com"
})

const plainDevices = await client.getDevicesPlain();

// Get a specific device instance based on the serial number.
const smartPlug = await client.getDevice("HW52*****");

// request all properties of the smart plug
const properties = await smartPlug.getProperties()

// Turn on and off the smart plug
await smartPlug.switchOn();
await smartPlug.switchOff();

// Set brigthness for the led indicator
await smartPlug.setLedBrightness(100);

// Delete a task from the smart plug
await smartPlug.deleteTask(1)
```

#### PowerStream

Serial number must start with _HW51_

```ts
import {RestClient} from '@ecoflow-api/rest-client';

const client = new RestClient({
    accessKey: "your-access",
    secretKey: "your-secret",
    host: "https://api-e.ecoflow.com"
})

// Get a specific device instance based on the serial number.
const powerStream = await client.getDevice("HW51*****");

// request all properties of the powerStream
const properties = await powerStream.getProperties()

// Set the power supply priority
await powerStream.setPowerSupplyPriority("powerSupply");
// Set power supply priority to battery.
await powerStream.setPowerSupplyPriority("battery");

// Set the custom load power
// Note: at the moment this seems to have no effect, 
// although the api returns a success message.
await powerStream.setCustomLoadPower(600);

// Set the lower charging level
await powerStream.setLowerChargingLevel(20);

// Set the upper charging level
await powerStream.setUpperChargingLevel(80);

// Set brigthness for the led indicator
await powerStream.setLedBrightness(100);

// Delete a task from the smart plug
await powerStream.deleteTask(1)
```

#### Delta 2

Serial number must start with _R331_

Note: not all commands have been implemented yet.

Todo:
- "operateType":"acOutCfg"
- "operateType":"acChgCfg"
- "operateType":"upsConfig"
- "operateType":"dsgCfg"
- "operateType":"openOilSoc"
- "operateType":"closeOilSoc"
- "operateType":"watthConfig"

```ts
import {RestClient} from '@ecoflow-api/rest-client';

const client = new RestClient({
    accessKey: "your-access",
    secretKey: "your-secret",
    host: "https://api-e.ecoflow.com"
})

// Get a specific device instance based on the serial number.
const delta2 = await client.getDevice("R331*****");

// request all properties of the delta2
const properties = await delta2.getProperties();

// Disable silent mode (beep)
await delta2.setSilentMode(0);
// Enable silent mode (beep)
await delta2.setSilentMode(1);

// Disable the car charger 12V
await delta2.setCarCharger(0);
// Enable the car charger 12V
await delta2.setCarCharger(1);

// Set ac standy by time to 120 minutes
await delta2.setAcStandByTime(120);

// Set the car input to 4000mA
await delta2.setCarInput(4000);

// Set the device timeout to 120 minutes
await delta2.setDeviceTimeout(120);

// enable ac auto out with minimum SOC of 50%
await delta2.setAcAutoOutConfig(1, 50);

// Enable the pv charging priority
await delta2.enablePvChargingPriority(1);

// 10 seconds timeout for lcd display
await delta2.setLcdTimeout(10);

// enable usb output
await delta2.enableUsbOutput(1);
// disable usb output
await delta2.enableUsbOutput(0);

// Car standby for 4 hours
await delta2.setCarStandByDuration(240);

```

#### Glacier

Serial number must start with _BX11_

```ts
import {RestClient} from '@ecoflow-api/rest-client';

const client = new RestClient({
    accessKey: "your-access",
    secretKey: "your-secret",
    host: "https://api-e.ecoflow.com"
})

// Get a specific device instance based on the serial number.
const glacier = await client.getDevice("BX11*****");

// request all properties of the glacier
const properties = await glacier.getProperties();

// Set the temperature of right, left and middle zone
await glacier.setTemperature({right:5,left:5,middle:5});

// Enable eco mode
await glacier.enableEcoMode(1)
// Disable eco mode
await glacier.enableEcoMode(0)

// Enable buzzer
await glacier.enableBuzzer(1)
// Disable buzzer
await glacier.enableBuzzer(0)

// 0: always beep; 1: beep once; 2: Beep twice; 3: Beep three times
await glacier.setBuzzerBeep(0)
await glacier.setBuzzerBeep(1)
await glacier.setBuzzerBeep(2)
await glacier.setBuzzerBeep(3)

// Screen timeout in seconds - 0: screen always on
await glacier.setScreenTimeout(10);

// Set the temperature unit to Celsius or Fahrenheit
await glacier.setTemperatureUnit("C")
await glacier.setTemperatureUnit("F")

// set ice making
// enable -  0: Disable; 1: Enable
// iceShape - "small" or "large" ice-cubes
await glacier.setIceMaking(1,"large")

// set ice detaching
await glacier.setIceDetaching(4)

// 0: Unblocked, 1: Blocked
await glacier.setSensorDetectionBlocking(1)

// enabled - 0: Disable, 1: Enable
// level - 0: Low, 1: Medium, 2: High
await glacier.setBatteryProtectionLevel(1,3)
```

#### Smart Home Panel

Serial number must start with _SP10_

```ts
import {RestClient} from '@ecoflow-api/rest-client';

const client = new RestClient({
    accessKey: "your-access",
    secretKey: "your-secret",
    host: "https://api-e.ecoflow.com"
})

// Get a specific device instance based on the serial number.
const shp = await client.getDevice("SP10*****");

// request all properties of the shp
const properties = await shp.getProperties();

// Update RTC time
await shp.setRtcTime({
    sec: 10,
    min: 10,
    hour: 10,
    day: 5,
    week: 6,
    month: 10,
    year: 2024,
});

// Load channel control
await shp.setLoadChannelControl({ch:1, ctrlMode:1, sta:1});

// Standby channel control
await shp.setStandbyChannelControl({ch:1, ctrlMode:1, sta:1});

// Set split phase info config
await shp.setSplitPhaseInfoConfig([
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
    {linkCh: 0, linkMark: 0},
]);

// Set channel current configuration
await shp.setChannelCurrentConfiguration({
    channel: 2,
    cur: 6,
});


await shp.setGridPowerConfiguration({
    gridVol: 220,
    gridFreq: 50,
});

// Set grid power configuration
await shp.setGridPowerConfiguration({
    gridVol: 220,
    gridFreq: 50,
});

// EPS mode configuration (eps: 0: off, 1: on)
await shp.enableEpsMode(1);

// Enable channel status
await shp.enableChannelStatus({
    channel: 1,
    enable: 1,
});

// Set load channel info
await shp.setLoadChannelInfo({
    channel: 1,
    channelName: "my-channel",
    iconInfo: 10,
});

// Set region info
await shp.setRegionInfo("US,somewhere");

// Set emergency mode
await shp.setEmergencyMode({
    isCfg: 1,
    backupMode: 1,
    overloadMode: 1,
    chSta: [
        { "priority": 1, "isEnable": 1 },
        { "priority": 1, "isEnable": 1 },
        { "priority": 2, "isEnable": 1 },
        { "priority": 3, "isEnable": 1 },
        { "priority": 4, "isEnable": 1 },
        { "priority": 5, "isEnable": 1 },
        { "priority": 6, "isEnable": 1 },
        { "priority": 7, "isEnable": 1 },
        { "priority": 8, "isEnable": 1 },
        { "priority": 9, "isEnable": 1 }
    ]
});

// Set scheduled charging job
await shp.setScheduledChargingJob({
    cfgIndex: 1,
    cfg: {
        "param": {
            "lowBattery": 95,
            "chChargeWatt": 2000,
            "chSta": [
                1,
                0
            ],
            "hightBattery": 100
        },
        "comCfg": {
            "timeScale": [
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                255,
                127
            ],
            "isCfg": 1,
            "type": 1,
            "timeRange": {
                "isCfg": 1,
                "startTime": {
                    "sec": 0,
                    "min": 0,
                    "week": 4,
                    "hour": 0,
                    "month": 1,
                    "year": 2023,
                    "day": 11
                },
                "timeMode": 0,
                "endTime": {
                    "sec": 59,
                    "min": 59,
                    "week": 7,
                    "hour": 23,
                    "month": 1,
                    "year": 2023,
                    "day": 22
                },
                "mode1": {
                    "thur": 0,
                    "sat": 0,
                    "wed": 0,
                    "tues": 0,
                    "fri": 0,
                    "sun": 0,
                    "mon": 0
                },
                "isEnable": 1
            },
            "isEnable": 1,
            "setTime": {
                "sec": 35,
                "min": 53,
                "week": 4,
                "hour": 15,
                "month": 1,
                "year": 2023,
                "day": 11
            }
        }
    }
});

// Set scheduled discharging job
await shp.setScheduledChargingJob({
    cfgIndex: 1,
    cfg: {
        "chSta": [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ],
        "comCfg": {
            "timeScale": [
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "isCfg": 1,
            "type": 2,
            "timeRange": {
                "isCfg": 1,
                "timeMode": 0,
                "startTime": {
                    "sec": 0,
                    "min": 0,
                    "week": 2,
                    "hour": 0,
                    "month": 10,
                    "year": 2022,
                    "day": 24
                },
                "endTime": {
                    "sec": 59,
                    "min": 59,
                    "week": 2,
                    "hour": 23,
                    "month": 10,
                    "year": 2022,
                    "day": 25
                },
                "isEnable": 1
            },
            "isEnable": 1,
            "setTime": {
                "sec": 61,
                "min": 9,
                "week": 7,
                "hour": 16,
                "month": 11,
                "year": 2022,
                "day": 15
            }
        }
    }
});

// Set configuration status
await shp.setConfigurationStatus(1);

// Start self check
await shp.setStartSelfCheck(1);

// Set standby charging and discharging parameters
await shp.setStandByChargingDischargingParameters({
    discLower: 10,
    forceChargeHigh: 20,
});
```

#### Unknown device

If device type could not be determined, an UnknownDevice instance will be returned or can be used.

```ts
import {RestClient} from '@ecoflow-api/rest-client';

const client = new RestClient({
    accessKey: "your-access",
    secretKey: "your-secret",
    host: "https://api-e.ecoflow.com"
})

const device = await client.getDevice("some-unsupported-sn");

// request all properties of the powerStream
const properties = await device.getProperties()
```

## Disclaimer

This open-source software is not affiliated with or endorsed by the company Ecoflow in any way.

Use of the software is at your own risk and discretion, 
and I assume no liability for any potential damages or issues that may arise from using the software.

It is important to be aware that using this open-source software comes 
without direct support or guarantees from the company Ecoflow.
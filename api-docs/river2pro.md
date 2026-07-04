# River 2 Pro

## ModuleType definition

| Field      | Field's Type | Description                                          |
|------------|--------------|------------------------------------------------------|
| moduleType | `int`        | 1: PD<br>2: BMS<br>3: INV<br>4: BMS_SLAVE<br>5: MPPT |


## HTTP communication mode

### Set & Get Quota

How to transfer request parameters by these two HTTP API.

PUT: /iot-open/sign/device/quota: SetCmdRequest

GET: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse

### MPPT

| Set Command                                                                                                                            | SetCmdRequest                                                                                                                                                                                                                                                                                                                                                                                                         | GetCmdRequest                                                                                                                                                                                                                                                                                                                                                                                                             | GetCmdResponse                                                                                                                                                                                                                                                                                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 12V DC output on/off<br>(1 on, 0 off)                                                                                                  | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"id": 123,<br>&nbsp;&nbsp;"version": "1.0",<br>&nbsp;&nbsp;"moduleType": 5,<br>&nbsp;&nbsp;"operateType": "mpptCar",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"enabled": 0<br>&nbsp;&nbsp;}<br>}</code>                                                                                                                                  | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"quotas": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pd.carState"<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;}<br>}</code>                                                                                                                                                                                         | <code>{<br>&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;"message": "Success",<br>&nbsp;&nbsp;"data": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"pd.carState": 0<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"eagleEyeTraceId": "",<br>&nbsp;&nbsp;"tid": ""<br>}</code>                                                                                                                                                                 |
| AC output on/off (enabled)<br>X-Boost on/off<br>AC output voltage (read, unit V)<br>AC output frequency (out_freq, 1 = 50Hz, 2 = 60Hz) | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"id": 126,<br>&nbsp;&nbsp;"version": "1.0",<br>&nbsp;&nbsp;"moduleType": 5,<br>&nbsp;&nbsp;"operateType": "acOutCfg",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"enabled": 0,<br>&nbsp;&nbsp;&nbsp;&nbsp;"xboost": 0,<br>&nbsp;&nbsp;&nbsp;&nbsp;"out_voltage": 30,<br>&nbsp;&nbsp;&nbsp;&nbsp;"out_freq": 1<br>&nbsp;&nbsp;}<br>}</code> | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"quotas": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mppt.cfgAcEnabled",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mppt.cfgAcXboost",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mppt.cfgAcOutVol",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mppt.cfgAcOutFreq"<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;}<br>}</code> | <code>{<br>&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;"message": "Success",<br>&nbsp;&nbsp;"data": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"mppt.cfgAcOutVol": 230,<br>&nbsp;&nbsp;&nbsp;&nbsp;"mppt.cfgAcXboost": 1,<br>&nbsp;&nbsp;&nbsp;&nbsp;"mppt.cfgAcEnabled": 1,<br>&nbsp;&nbsp;&nbsp;&nbsp;"mppt.cfgAcOutFreq": 50<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"eagleEyeTraceId": "",<br>&nbsp;&nbsp;"tid": ""<br>}</code> |

### PD

| Set Command                                                                                                                              | SetCmdRequest                                                                                                                                                                                                                                                                                                                                                                                                                  | GetCmdRequest                                                                                                                                                                                                                                                                                  | GetCmdResponse                                                                                                                                                                                                                                                                                  |
|------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Energy management on/off<br>isConfig: 0 off, 1 on<br>bpPowerSoc: backup reserve<br>minDsgSoc: discharge limit<br>minChgSoc: charge limit | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"id": 126,<br>&nbsp;&nbsp;"version": "1.0",<br>&nbsp;&nbsp;"moduleType": 1,<br>&nbsp;&nbsp;"operateType": "watthConfig",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"isConfig": 0,<br>&nbsp;&nbsp;&nbsp;&nbsp;"bpPowerSoc": 88,<br>&nbsp;&nbsp;&nbsp;&nbsp;"minDsgSoc": 30,<br>&nbsp;&nbsp;&nbsp;&nbsp;"minChgSoc": 88<br>&nbsp;&nbsp;}<br>}</code> | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"quotas": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pd.watchIsConfig",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pd.bpPowerSoc"<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;}<br>}</code> | <code>{<br>&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;"message": "Success",<br>&nbsp;&nbsp;"data": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"pd.watchIsConfig": 0,<br>&nbsp;&nbsp;&nbsp;&nbsp;"pd.bpPowerSoc": 88<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"eagleEyeTraceId": "",<br>&nbsp;&nbsp;"tid": ""<br>}</code> |

### BMS

| Set Command     | SetCmdRequest                                                                                                                                                                                                                                                                             | GetCmdRequest                                                                                                                                                                                                                                    | GetCmdResponse                                                                                                                                                                                                                                             |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Charge limit    | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"id": 126,<br>&nbsp;&nbsp;"version": "1.0",<br>&nbsp;&nbsp;"moduleType": 2,<br>&nbsp;&nbsp;"operateType": "upsConfig",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"maxChgSoc": 88<br>&nbsp;&nbsp;}<br>}</code> | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"quotas": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"bms_emsStatus.maxChargeSoc"<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;}<br>}</code> | <code>{<br>&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;"message": "Success",<br>&nbsp;&nbsp;"data": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"bms_emsStatus.maxChargeSoc": 88<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"eagleEyeTraceId": "",<br>&nbsp;&nbsp;"tid": ""<br>}</code> |
| Discharge limit | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"id": 126,<br>&nbsp;&nbsp;"version": "1.0",<br>&nbsp;&nbsp;"moduleType": 2,<br>&nbsp;&nbsp;"operateType": "dsgCfg",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"minDsgSoc": 28<br>&nbsp;&nbsp;}<br>}</code>    | <code>{<br>&nbsp;&nbsp;"sn": "R621ZEB1XE8S0029",<br>&nbsp;&nbsp;"params": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"quotas": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"bms_emsStatus.minDsgSoc"<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;}<br>}</code>    | <code>{<br>&nbsp;&nbsp;"code": "0",<br>&nbsp;&nbsp;"message": "Success",<br>&nbsp;&nbsp;"data": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"bms_emsStatus.minDsgSoc": 28<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"eagleEyeTraceId": "",<br>&nbsp;&nbsp;"tid": ""<br>}</code>    |



### GetAllQuotaResponse

How to transfer request parameters by this HTTP API.

GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse

| Field                         | Type  | Description                   |
|-------------------------------|-------|-------------------------------|
| `pd.wattsOutSum`              | `int` | Total output real-time power  |
| `pd.carWatts`                 | `int` | DC output real-time power     |
| `pd.usb1Watts`                | `int` | USB-A output real-time power  |
| `pd.typecChaWatts`            | `int` | USB-C input real-time power   |
| `pd.typec1Watts`              | `int` | USB-C output real-time power  |
| `pd.soc`                      | `int` | Battery level                 |
| `pd.carState`                 | `int` | 12V DC output on/off          |
| `pd.watchIsConfig`            | `int` | Energy management on/off      |
| `pd.bpPowerSoc`               | `int` | Backup reserve                |
| `bms_bmsStatus.remainTime`    | `int` | Remaining charge time         |
| `bms_emsStatus.dsgRemainTime` | `int` | Battery time remaining        |
| `bms_emsStatus.maxChargeSoc`  | `int` | Charge limit                  |
| `bms_emsStatus.minDsgSoc`     | `int` | Discharge limit               |
| `mppt.cfgAcEnabled`           | `int` | AC output on/off, 1 on, 0 off |
| `mppt.cfgAcXboost`            | `int` | X-Boost on/off, 1 on, 0 off   |
| `mppt.cfgAcOutVol`            | `int` | AC output voltage             |
| `mppt.cfgAcOutFreq`           | `int` | AC output frequency           |
| `mppt.inWatts`                | `int` | DC input real-time power      |
| `inv.inputWatts`              | `int` | AC input real-time power      |
| `inv.outputWatts`             | `int` | AC output real-time power     |


Example

    {
        "code": "0",
        "message": "Success",
        "data": {
            "pd.usb1Watts": 0,
            "bms_emsStatus.maxChargeSoc": 88,
            "mppt.cfgAcXboost": 1,
            "mppt.cfgAcEnabled": 1,
            "pd.bpPowerSoc": 10,
            "inv.inputWatts": 0,
            "mppt.cfgAcOutVol": 230,
            "inv.outputWatts": 0,
            "pd.carWatts": 0,
            "pd.watchIsConfig": 0,
            "bms_emsStatus.minDsgSoc": 28,
            "pd.typecChaWatts": 0,
            "pd.typec1Watts": 0,
            "bms_bmsStatus.remainTime": 0,
            "pd.soc": 29,
            "mppt.inWatts": 0,
            "pd.carState": 0,
            "pd.wattsOutSum": 0,
            "mppt.cfgAcOutFreq": 50,
            "bms_emsStatus.dsgRemainTime": 5999
        },
        "eagleEyeTraceId": "",
        "tid": ""
    }

## MQTT communication mode

### Set & Set Reply

| Usage of Topic          | Topic                                         | From   | To     |
|:------------------------|:----------------------------------------------|:-------|:-------|
| Set device function     | `/open/${certificateAccount}/${sn}/set`       | app    | device |
| Reply to the set result | `/open/${certificateAccount}/${sn}/set_reply` | device | app    |

#### Full Format Example

| Set Data Format                                                                                           | Set Reply Data Format                                                                                                         |
|:----------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------|
| `{"id": 123, "version": "1.0", "moduleType": 2, "operateType": "upsConfig", "params": {"maxChgSoc": 20}}` | `{"code": "0", "moduleType": 2, "data": {"ack": 0}, "operateType": "upsConfig", "version": "1.0", "id": 123, "time": 917260}` |

ParamInfo Message Format

### MPPT

| Set Command                                                                                                                        | SetTopic's ParamInfo                                                                                                                                  | SetReplyTopic's ParamInfo                                                                                                         | Observation Indicator |
|:-----------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------|:----------------------|
| 12V DC output on/off (1 on, 0 off)                                                                                                 | `{"id": 123456789, "version": "1.0", "moduleType": 5, "operateType": "mpptCar", "params": {"enabled": 1}}`                                            | `{"code": "0", "moduleType": 5, "data": {"ack": 0}, "operateType": "mpptCar", "version": "1.0", "id": 123456789, "time": 592150}` | `mpptCar`             |
| AC output on/off (enabled)<br>X-Boost on/off<br>AC output voltage (read, unit V)<br>AC output frequency (out_freq, 1-50Hz, 2-60Hz) | `{"id": 126, "version": "1.0", "moduleType": 5, "operateType": "acOutCfg", "params": {"enabled": 1, "xboost": 1, "out_voltage": 150, "out_freq": 1}}` | `{"code": "0", "moduleType": 5, "data": {"ack": 0}, "operateType": "acOutCfg", "version": "1.0", "id": 126, "time": 765630}`      | `Enabled`, `xboost`   |

### PD

| Set Command                                                                                                                                                    | SetTopic's ParamInfo                                                                                                                                          | SetReplyTopic's ParamInfo                                                                                                       | Observation Indicator    |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|:-------------------------|
| Energy management on/off (isConfig: 0 off 1 on; bpPowerSoc: Backup reserve; minDsgSoc: Discharge limit (Not used yet); minChgSoc: Charge limit (Not used yet)) | `{"id": 126, "version": "1.0", "moduleType": 1, "operateType": "watthConfig", "params": {"isConfig": 1, "bpPowerSoc": 50, "minDsgSoc": 30, "minChgSoc": 88}}` | `{"code": "0", "moduleType": 1, "data": {"ack": 0}, "operateType": "watthConfig", "version": "1.0", "id": 126, "time": 859360}` | `isConfig`, `bpPowerSoc` |

### BMS

| Set Command     | SetTopic's ParamInfo                                                                                      | SetReplyTopic's ParamInfo                                                                                                     | Observation Indicator |
|:----------------|:----------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------|:----------------------|
| Charge limit    | `{"id": 126, "version": "1.0", "moduleType": 2, "operateType": "upsConfig", "params": {"maxChgSoc": 90}}` | `{"code": "0", "moduleType": 2, "data": {"ack": 0}, "operateType": "upsConfig", "version": "1.0", "id": 126, "time": 917260}` | `maxChgSoc`           |
| Discharge limit | `{"id": 126, "version": "1.0", "moduleType": 2, "operateType": "dsgCfg", "params": {"minDsgSoc": 30}}`    | `{"code": "0", "moduleType": 2, "data": {"ack": 0}, "operateType": "dsgCfg", "version": "1.0", "id": 126, "time": 900670}`    | `minDsgSoc`           |

### Report Device Quota

| Usage of Topic      | Topic                                     | From   | To  |
|:--------------------|:------------------------------------------|:-------|:----|
| Report device quota | `/open/${certificateAccount}/${sn}/quota` | device | app |

Please see HTTP GetAllQuotaResponse and Set & Set Reply for the fields' definition.

Example

#### PD

    {
        "moduleType": 1,
        "needAck": 0,
        "id": 2935860,
        "time": 2935860,
        "params": {
            "wattsOutSum": 0,
            "carWatts": 0,
            "usb1Watts": 0,
            "typecChaWatts": 0,
            "typec1Watts": 0,
            "soc": 28,
            "carState": 0,
            "watchIsConfig": 1,
            "bpPowerSoc": 50
        },
        "version": "1.0",
        "typeCode": "pdStatus"
    }

#### BMS-bmsStatus

    {
        "moduleType": 2,
        "needAck": 1,
        "id": 571200,
        "time": 571200,
        "params": {
            "remainTime": 0
        },
        "version": "1.0",
        "typeCode": "bmsStatus"
    }

#### BMS-emsStatus

    {
    "moduleType": 2,
    "needAck": 1,
    "id": 646260,
    "time": 646260,
    "params": {
        "maxChargeSoc": 90,
        "dsgRemainTime": 5999,
        "minDsgSoc": 30
    },
    "version": "1.0",
    "typeCode": "emsStatus"
    }

#### MPPT

    {
        "moduleType": 5,
        "needAck": 0,
        "id": 3430090,
        "time": 3430090,
        "params": {
            "cfgAcEnabled": 0,
            "cfgAcXboost": 0,
            "cfgAcOutVol": 230,
            "cfgAcOutFreq": 50,
            "inWatts": 0
        },
        "version": "1.0",
        "typeCode": "mpptStatus"
    }

#### INV

    {
        "moduleType": 3,
        "needAck": 0,
        "id": 24620,
        "time": 24620,
        "params": {
            "outputWatts": 0,
            "inputWatts": 0
        },
        "version": "1.0",
        "typeCode": "invStatus"
    }


### Report Device status

| Usage of Topic       | Topic                                    | From   | To  |
|----------------------|------------------------------------------|--------|-----|
| Report Device status | /open/${certificateAccount}/${sn}/status | device | app |

Message Format

    {
        "id": "268020839",
        "params": {
            "status": 0
        },
        "timestamp": 1755833679618,
        "version": "1.0"
    }

Field

| Field  | Field Type | Description                           |
|--------|------------|---------------------------------------|
| status | int        | Device online or not<br>0: No, 1: Yes |

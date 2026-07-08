# HTTP communication mode

## Obtain the main device serial number of the STREAM system

GET: /iot-open/sign/device/system/main/sn?sn=BK51ZE1B2H4H0029

In BKW systems with multiple devices, the parameters for the AC1 switch and AC2 switch are the serial number of the corresponding devices. For all other commands, you will first need to use this API to obtain the main device serial number.

## Request Parameters

| Field | 	Field's Type	 | Description                     |
|-------|----------------|---------------------------------|
| sn    | 	string        | Any device SN of the BKW system |

### Response Example

    {
        "code": "0",
        "message": "Success",
        "data": {
            "sn": "BK31ZEBB2H390033"
        },
        "eagleEyeTraceId": "",
        "tid": ""
    }

## Set & Get Quota

How to transfer request parameters by these two HTTP API.

PUT: /iot-open/sign/device/quota: SetCmdRequest

POST: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse

### Setting

| Set Command                                                                                                                                                                                                                                                                                           | setCmdRequest                                                                                                                                                                             | GetCmdRequest                                                                                                    | GetCmdResponse                                                                                                                                |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| AC1 switch<br>Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US)<br>Unsupported devices: STREAM Max, STREAM AC<br>Values: On = `true`, Off = `false`                                                                                                       | `{"sn":"BK11ZEBB2H350011","cmdId":17,"cmdFunc":254,"dirDest":1,"dirSrc":1,"dest":2,"needAck":true,"params":{"cfgRelay2Onoff":true}}`                                                      | `{"sn":"BK11ZEBB2H350011","params":{"quotas":["relay2Onoff"]}}`                                                  | `{"code":"0","message":"Success","data":{"relay2Onoff":false},"eagleEyeTraceId":"","tid":""}`                                                 |
| AC2 switch<br>Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US)<br>Unsupported devices: STREAM Max, STREAM AC<br>Values: On = `true`, Off = `false`                                                                                                       | `{"sn":"BK11ZEBB2H350011","cmdId":17,"cmdFunc":254,"dirDest":1,"dirSrc":1,"dest":2,"needAck":true,"params":{"cfgRelay3Onoff":true}}`                                                      | `{"sn":"BK11ZEBB2H350011","params":{"quotas":["relay3Onoff"]}}`                                                  | `{"code":"0","message":"Success","data":{"relay3Onoff":false},"eagleEyeTraceId":"","tid":""}`                                                 |
| AC switch<br>Supported devices: STREAM Max<br>Unsupported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM AC, STREAM Ultra X, STREAM Ultra (US)<br>Values: On = `true`, Off = `false`                                                                                                        | `{"sn":"BK41ZEBB2H350011","cmdId":17,"cmdFunc":254,"dirDest":1,"dirSrc":1,"dest":2,"needAck":true,"params":{"cfgRelay2Onoff":true}}`                                                      | `{"sn":"BK41ZEBB2H350011","params":{"quotas":["relay2Onoff"]}}`                                                  | `{"code":"0","message":"Success","data":{"relay2Onoff":false},"eagleEyeTraceId":"","tid":""}`                                                 |
| Backup reserve level<br>Recommended level: 3–95%<br>Must be greater than discharging level and less than charging level<br>Should be 3% higher than discharging level (device restriction)<br>Recommended maximum charging level: 95%<br>If multiple devices exist, use the main device serial number | `{"sn":"BK11ZEBB2H350011","cmdId":17,"cmdFunc":254,"dirDest":1,"dirSrc":1,"dest":2,"needAck":true,"params":{"cfgBackupReverseSoc":10}}`                                                   | `{"sn":"BK11ZEBB2H350011","params":{"quotas":["backupReverseSoc"]}}`                                             | `{"code":"0","message":"Success","data":{"backupReverseSoc":10},"eagleEyeTraceId":"","tid":""}`                                               |
| Operating mode — Self-powered<br>If multiple devices exist, use the main device serial number                                                                                                                                                                                                         | `{"sn":"BK11ZEBB2H350011","cmdId":17,"cmdFunc":254,"dirDest":1,"dirSrc":1,"dest":2,"needAck":true,"params":{"cfgEnergyStrategyOperateMode":{"operateSelfPoweredOpen":true}}}`             | `{"sn":"BK11ZEBB2H350011","params":{"quotas":["energyStrategyOperateMode.operateSelfPoweredOpen"]}}`             | `{"code":"0","message":"Success","data":{"energyStrategyOperateMode.operateSelfPoweredOpen":true},"eagleEyeTraceId":"","tid":""}`             |
| Operating mode — AI Mode<br>If multiple devices exist, use the main device serial number                                                                                                                                                                                                              | `{"sn":"BK11ZEBB2H350011","cmdId":17,"cmdFunc":254,"dirDest":1,"dirSrc":1,"dest":2,"needAck":true,"params":{"cfgEnergyStrategyOperateMode":{"operateIntelligentScheduleModeOpen":true}}}` | `{"sn":"BK11ZEBB2H350011","params":{"quotas":["energyStrategyOperateMode.operateIntelligentScheduleModeOpen"]}}` | `{"code":"0","message":"Success","data":{"energyStrategyOperateMode.operateIntelligentScheduleModeOpen":true},"eagleEyeTraceId":"","tid":""}` |
| Feed-in control<br>Values: `1` = off, `2` = on<br>If multiple devices exist, use the main device serial number                                                                                                                                                                                        | `{"sn":"BK11ZEBB2H350011","cmdId":17,"cmdFunc":254,"dirDest":1,"dirSrc":1,"dest":2,"needAck":true,"params":{"cfgFeedGridMode":1}}`                                                        | `{"sn":"BK11ZEBB2H350011","params":{"quotas":["feedGridMode"]}}`                                                 | `{"code":"0","message":"Success","data":{"feedGridMode":1},"eagleEyeTraceId":"","tid":""}`                                                    |


## Historical data

Obtaining historical data: POST: /iot-open/sign/device/quota/data

### Request Parameters

| Request Params Field	 | Field's Type | 	Description                                                                                                                     |
|-----------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------|
| beginTime             | 	dateTime    | 	Query start time, formatted as 'yyyy-MM-dd HH:mm:ss', in UTC timezone. The effective range refers to the query latitude column. |
| endTime               | 	dateTime    | 	Query end time, formatted as 'yyyy-MM-dd HH:mm:ss', in UTC timezone. The effective range refers to the query latitude column.   |
| code                  | 	string      | 	The metric code to be queried                                                                                                   |

### Example

| Set Command                                                                                                                                                       | GetCmdRequest                                                                                                                                                                                                    | GetCmdRequest                                                                                                                                                                                                                                                                                                                    | Minimum lookup period                                                                                                           |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| Energy independence<br>If there are multiple devices, use the API to obtain the serial number of the main device                                                  | `{"sn": "BK11ZEBB2H350011", "params": {"beginTime": "2025-09-18 00:00:00", "endTime": "2025-09-18 23:59:59", "code": "BK621-App-HOME-INDEPENDENCE-PERCENT-FLOW-indep-progress_bar-NOTDISTINGUISH-MASTER_DATA"}}` | `{"code": "0", "message": "Success", "data": {"code": "0", "message": "Success", "data": [{"indexName": "master_data", "indexValue": 19.5, "unit": "%"}], "eagleEyeTraceId": "", "tid": ""}, "eagleEyeTraceId": "", "tid": ""}`                                                                                                  | Year<br>For example, "beginTime": "2025-09-18 12:00:00" will return data for the year 2025;                                     |
| Environmental impact<br>If there are multiple devices, use the API to obtain the serial number of the main device                                                 | `{"sn": "BK11ZEBB2H350011", "params": {"beginTime": "2025-09-18 00:00:00", "endTime": "2025-09-18 23:59:59", "code": "BK621-App-HOME-CO2-WEIGHT-FLOW-impact-progress_arc-NOTDISTINGUISH-MASTER_DATA"}}`          | `{"code": "0", "message": "Success", "data": {"code": "0", "message": "Success", "data": [{"indexName": "master_data", "indexValue": 3970, "unit": "g"}], "eagleEyeTraceId": "", "tid": ""}, "eagleEyeTraceId": "", "tid": ""}`                                                                                                  | Day <br>For example, "beginTime": "2025-09-18 12:00:00" will return data for the day 2025-09-18                                 |
| Total solar energy savings<br>If there are multiple devices, use the API to obtain the serial number of the main device;                                          |                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                 |
| The lookup period is in days;                                                                                                                                     | `{"sn": "BK11ZEBB2H350011", "params": {"beginTime": "2025-09-18 00:00:00", "endTime": "2025-09-18 23:59:59", "code": "BK621-App-HOME-SAVING-CURRENCY-FLOW-earnings-progress_arc-NOTDISTINGUISH-MASTER_DATA"}}`   | `{"code": "0", "message": "Success", "data": {"code": "0", "message": "Success", "data": [{"indexName": "master_data", "indexValue": 0, "unit": "€"}], "eagleEyeTraceId": "", "tid": ""}, "eagleEyeTraceId": "", "tid": ""}`                                                                                                     | Day <br>For example, "beginTime": "2025-09-18 12:00:00" will return data for the day 2025-09-18                                 |
| Solar-generated power  <br>If there are multiple devices, use the API to obtain the serial number of the main device;                                             |                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                 |
| The lookup period is in days;                                                                                                                                     | `{"sn": "BK11ZEBB2H350011", "params": {"beginTime": "2025-09-18 00:00:00", "endTime": "2025-09-18 23:59:59", "code": "BK621-App-HOME-SOLAR-ENERGY-FLOW-solor-line-NOTDISTINGUISH-MASTER_DATA"}}`                 | `{"code": "0", "message": "Success", "data": {"code": "0", "message": "Success", "data": [{"unit": "wh", "indexName": "master_data", "indexValue": "9945"}], "eagleEyeTraceId": "", "tid": ""}, "eagleEyeTraceId": "", "tid": ""}`                                                                                               | Day   <br>For example, "beginTime": "2025-09-18 12:00:00" will return data for the day 2025-09-18                               |
| Electricity consumption <br>If there are multiple devices, use the API to obtain the serial number of the main device;                                            |                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                 |
| The lookup period is in days;                                                                                                                                     | `{"sn": "BK11ZEBB2H350011", "params": {"beginTime": "2025-09-18 00:00:00", "endTime": "2025-09-18 23:59:59", "code": "BK621-App-HOME-LOAD-ENERGY-FLOW-consumption-prop_arc-NOTDISTINGUISH-MASTER_DATA"}}`        | `{"code": "0", "message": "Success", "data": {"code": "0", "message": "Success", "data": [{"unit": "wh", "indexName": "master_data", "indexValue": "12094"}], "eagleEyeTraceId": "", "tid": ""}, "eagleEyeTraceId": "", "tid": ""}`                                                                                              | Hour <br>For example, "beginTime": "2025-09-18 12:00:00" will return data for the hour starting 12:00:00 on the day 2025-09-18; |
| Grid   <br>If there are multiple devices, use the API to obtain the serial number of the main device;                                                             |                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                 |
| The lookup period is in days;                                                                                                                                     | `{"sn": "BK11ZEBB2H350011", "params": {"beginTime": "2025-09-18 00:00:00", "endTime": "2025-09-18 23:59:59", "code": "BK621-App-HOME-GRID-ENERGY-FLOW-grid_prop_bar-NOTDISTINGUISH-MASTER_DATA"}}`               | `{"code": "0", "message": "Success", "data": {"code": "0", "message": "Success", "data": [{"unit": "wh", "indexName": "master_data", "extra": "1", "indexValue": "2886"}, {"unit": "wh", "indexName": "master_data", "extra": "2", "indexValue": "0"}], "eagleEyeTraceId": "", "tid": ""}, "eagleEyeTraceId": "", "tid": ""}`    | Hour <br>For example, "beginTime": "2025-09-18 12:00:00" will return data for the hour starting 12:00:00 on the day 2025-09-18; |
| Battery charging/discharging power  <br>If there are multiple devices, use the API to obtain the serial number of the main device;  The lookup period is in days; | `{"sn": "BK11ZEBB2H350011", "params": {"beginTime": "2025-09-18 00:00:00", "endTime": "2025-09-18 23:59:59", "code": "BK621-App-HOME-SOC-ENERGY-FLOW-battery-prop_bar-NOTDISTINGUISH-MASTER_DATA"}}`             | `{"code": "0", "message": "Success", "data": {"code": "0", "message": "Success", "data": [{"unit": "wh", "indexName": "master_data", "extra": "2", "indexValue": "2425"}, {"unit": "wh", "indexName": "master_data", "extra": "1", "indexValue": "1967"}], "eagleEyeTraceId": "", "tid": ""}, "eagleEyeTraceId": "", "tid": ""}` | Hour <br>For example, "beginTime": "2025-09-18 12:00:00" will return data for the hour starting 12:00:00 on the day 2025-09-18; |


## GetAllQuotaResponse

How to transfer request parameters by this HTTP API.

GET: /iot-open/sign/device/quota/all?sn=BK51ZE1B2H4H0029

### Get Parameters

| Field	 | Field's Type	 | Description                          |
|--------|---------------|--------------------------------------|
| sn	    | string	       | the serial number of the main device |

### Response Parameters

| Field                                                        | Field's Type | Description                                                                                                                                                            |
|--------------------------------------------------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| relay2Onoff（AC1）                                             | bool         | AC1 switch, 0-off, 1-on; Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US); Unsupported devices: STREAM Max, STREAM AC     |
| relay3Onoff（AC2）                                             | bool         | AC2 switch, 0-off, 1-on; Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US); Unsupported devices: STREAM Max, STREAM AC     |
| relay2Onoff（AC）                                              | bool         | AC switch, 0-off, 1-on; Supported devices: STREAM Max; Unsupported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM AC, STREAM Ultra X, STREAM Ultra (US);     |
| powGetPvSum                                                  | float        | System real-time PV power, unit: W                                                                                                                                     |
| feedGridMode                                                 | int          | System feed-in control switch (1-off, 2-on)                                                                                                                            |
| gridConnectionPower                                          | float        | Grid port active power (input power is positive, feed-in power is negative), unit: W                                                                                   |
| energyStrategyOperateMode.operateIntelligentScheduleModeOpen | bool         | System operating mode — AI Mode, false-off, true-on For self-powered mode and AI mode, one of them must be "true" and the other must be "false".                       |
| energyStrategyOperateMode.operateSelfPoweredOpen             | bool         | System operating mode — Self-powered, false-off, true-on For self-powered mode and AI mode, one of them must be "true" and the other must be "false".                  |
| powGetSysGrid                                                | float        | System real-time load power, unit: W                                                                                                                                   |
| powGetSysLoad                                                | float        | System real-time load power, unit: W                                                                                                                                   |
| cmsBattSoc                                                   | float        | System real-time load power, unit: W                                                                                                                                   |
| powGetBpCms                                                  | float        | Real-time aggregated battery power of the system. Positive values refer to the battery's charging power, while negative values refer to the discharging power. Unit: W |
| backupReverseSoc                                             | int          | System backup reserve level. Recommended level: 3–95%                                                                                                                  |
| cmsMaxChgSoc                                                 | int          | Charge limit                                                                                                                                                           |
| cmsMinDsgSoc                                                 | int          | Discharge limit                                                                                                                                                        |
| quota_cloud_ts                                               | dateTime     | Heartbeat report time                                                                                                                                                  |
### Response Example

    {
        "code": "0",
        "message": "Success",
        "data": {
            "feedGridMode": 1,
            "gridConnectionPower": -1064.9087,
            "relay3Onoff": false,
            "powGetPvSum": 0.0,
            "energyStrategyOperateMode.operateIntelligentScheduleModeOpen": false,
            "powGetSysGrid": 1664.9087,
            "powGetSysLoad": 600.0,
            "energyStrategyOperateMode.operateSelfPoweredOpen": true,
            "backupReverseSoc": 64,
            "cmsBattSoc": 33.0,
            "quota_cloud_ts": "2025-09-25 20:13:46",
            "powGetBpCms": 1064.9087,
            "relay2Onoff": true,
            "cmsMaxChgSoc": 95,
            "cmsMinDsgSoc": 0
        },
        "eagleEyeTraceId": "",
        "tid": ""
    }

# MQTT communication mode

## Set & Set Reply

| Usage of Topic          | Topic                                        | From   | To     |
|-------------------------|----------------------------------------------|--------|--------|
| Set device function     | `/open/${certificateAccount}/{sn}/set`       | app    | device |
| Reply to the set result | `/open/${certificateAccount}/{sn}/set_reply` | device | app    |

Full Format Example

| Setting / Command                 | Description / Details                                                                                                                                                                                                                                                                                                                                                                      | setCmdRequest (JSON)                                                                                                                                                                                                                                                                                                                                                      | GetCmdRequest (JSON)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|:----------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Backup reserve level**          | Recommended level: 3–95%<br>The backup reserve level should be greater than the discharging level and less than the charging level;<br>Due to device restrictions, the backup reserve level should be 3% higher than the discharging level;<br>The recommended maximum charging level is 95%;<br>If there are multiple devices, use the API to obtain the serial number of the main device | `{<br>    "id": 123,<br>    "version": "1.0",<br>    "sn": "BK11ZEBB2H350011",<br>    "cmdId": 17,<br>    "cmdFunc": 254,<br>    "dirDest": 1,<br>    "dirSrc": 1,<br>    "dest": 2,<br>    "needAck": true,<br>    "params": {<br>        "cfgBackupReverseSoc": 10<br>    }<br>}`                                                                                       | `{<br>    "data": {<br>        "cfgBackupReverseSoc": 10<br>        "configOk": true,<br>        "actionId": 381<br>    },<br>    "id": 123<br>}`                                                                                                                                                                                                                                                                                                                                                                                       |
| **Operating mode — Self-powered** | If there are multiple devices, use the API to obtain the serial number of the main device;                                                                                                                                                                                                                                                                                                 | `{<br>    "id": 1234566789,<br>    "version": "1.0",<br>    "sn": "BK11ZEBB2H350011",<br>    "cmdId": 17,<br>    "cmdFunc": 254,<br>    "dirDest": 1,<br>    "dirSrc": 1,<br>    "dest": 2,<br>    "needAck": true,<br>    "params": {<br>        "cfgEnergyStrategyOperateMode": {<br>            "operateSelfPoweredOpen": true<br>        }<br>    }<br>}`             | `{<br>    "data": {<br>        "cfgEnergyStrategyOperateMode": {<br>            "operateTouModeOpen": false,<br>            "operateScheduledOpen": false,<br>            "operateSelfPoweredOpen": true,<br>            "operateIntelligentScheduleModeOpen": false<br>        },<br>        "cfgCfgIntelligentScheduleMode": {<br>            "intelligentScheduleMode": 0,<br>            "joinIntelligentSchedule": 0<br>        },<br>        "configOk": true,<br>        "actionId": 106<br>    },<br>    "id": 1234566789<br>}` |
| **Operating mode — AI Mode**      | If there are multiple devices, use the API to obtain the serial number of the main device;                                                                                                                                                                                                                                                                                                 | `{<br>    "id": 1234566789,<br>    "version": "1.0",<br>    "sn": "BK11ZEBB2H350011",<br>    "cmdId": 17,<br>    "cmdFunc": 254,<br>    "dirDest": 1,<br>    "dirSrc": 1,<br>    "dest": 2,<br>    "needAck": true,<br>    "params": {<br>        "cfgEnergyStrategyOperateMode": {<br>            "operateIntelligentScheduleModeOpen": true<br>        }<br>    }<br>}` | `{<br>    "data": {<br>        "cfgEnergyStrategyOperateMode": {<br>            "operateTouModeOpen": false,<br>            "operateScheduledOpen": false,<br>            "operateSelfPoweredOpen": false,<br>            "operateIntelligentScheduleModeOpen": true<br>        },<br>        "cfgCfgIntelligentScheduleMode": {<br>            "intelligentScheduleMode": 0,<br>            "joinIntelligentSchedule": 0<br>        },<br>        "configOk": true,<br>        "actionId": 106<br>    },<br>    "id": 1234566789<br>}` |
| **Feed-in control**               | (1-off, 2-on)<br>If there are multiple devices, use the API to obtain the serial number of the main device                                                                                                                                                                                                                                                                                 | `{<br>    "id": 123,<br>    "version": "1.0",<br>    "sn": "BK11ZEBB2H350011",<br>    "cmdId": 17,<br>    "cmdFunc": 254,<br>    "dirDest": 1,<br>    "dirSrc": 1,<br>    "dest": 2,<br>    "needAck": true,<br>    "params": {<br>        "cfgFeedGridMode": 1<br>    }<br>}`                                                                                            | `{<br>    "data": {<br>        "cfgFeedGridMode": 1,<br>        "configOk": true,<br>        "actionId": 381<br>    },<br>    "id": 123<br>}`                                                                                                                                                                                                                                                                                                                                                                                           |
| **AC1 switch**                    | Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US);<br>Unsupported devices: STREAM Max, STREAM AC<br>(On: true<br>Off: false)                                                                                                                                                                                                                   | `{<br>    "id": 123,<br>    "version": "1.0",<br>    "sn": "BK11ZEBB2H350011",<br>    "cmdId": 17,<br>    "cmdFunc": 254,<br>    "dirDest": 1,<br>    "dirSrc": 1,<br>    "dest": 2,<br>    "needAck": true,<br>    "params": {<br>        "cfgRelay2Onoff": true<br>    }<br>}`                                                                                          | `{<br>    "data": {<br>        "cfgRelay2Onoff": true,<br>        "configOk": true,<br>        "actionId": 381<br>    },<br>    "id": 123<br>}`                                                                                                                                                                                                                                                                                                                                                                                         |
| **AC2 switch**                    | Supported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM Ultra X, STREAM Ultra (US);<br>Unsupported devices: STREAM Max, STREAM AC<br>(On: true<br>Off: false)                                                                                                                                                                                                                   | `{<br>    "id": 123,<br>    "version": "1.0",<br>    "sn": "BK11ZEBB2H350011",<br>    "cmdId": 17,<br>    "cmdFunc": 254,<br>    "dirDest": 1,<br>    "dirSrc": 1,<br>    "dest": 2,<br>    "needAck": true,<br>    "params": {<br>        "cfgRelay3Onoff": true<br>    }<br>}`                                                                                          | `{<br>    "data": {<br>        "cfgRelay3Onoff": true,<br>        "configOk": true,<br>        "actionId": 381<br>    },<br>    "id": 123<br>}`                                                                                                                                                                                                                                                                                                                                                                                         |
| **AC switch**                     | Supported devices: STREAM Max;<br>Unsupported devices: STREAM Ultra, STREAM Pro, STREAM AC Pro, STREAM AC, STREAM Ultra X, STREAM Ultra (US);<br>(On: true<br>Off: false)                                                                                                                                                                                                                  | `{<br>    "id": 123,<br>    "version": "1.0",<br>    "sn": "BK41ZEBB2H350011",<br>    "cmdId": 17,<br>    "cmdFunc": 254,<br>    "dirDest": 1,<br>    "dirSrc": 1,<br>    "dest": 2,<br>    "needAck": true,<br>    "params": {<br>        "cfgRelay2Onoff": true<br>    }<br>}`                                                                                          | `{<br>    "data": {<br>        "cfgRelay2Onoff": true,<br>        "configOk": true,<br>        "actionId": 381<br>    },<br>    "id": 123<br>}`                                                                                                                                                                                                                                                                                                                                                                                         |


## Report Device Quota

| Usage of Topic      | Topic                                     | From   | To  |
|:--------------------|:------------------------------------------|:-------|:----|
| Report device quota | `/open/${certificateAccount}/${sn}/quota` | device | app |


Please see HTTP GetAllQuotaResponse and Set & Set Reply for the fields definition.

### Response Example

    {
        "feedGridMode": 2,
        "gridConnectionPower": 0.0,
        "relay3Onoff": true,
        "powGetPvSum": 498.0,
        "energyStrategyOperateMode.operateIntelligentScheduleModeOpen": true,
        "powGetSysLoadFromGrid": 600.0,
        "powGetSysLoad": 600.0,
        "energyStrategyOperateMode.operateSelfPoweredOpen": false,
        "backupReverseSoc": 10,
        "cmsBattSoc": 12.0,
        "powGetBpCms": 498.0,
        "relay2Onoff": true，
        "cmsMaxChgSoc": 95,
        "cmsMinDsgSoc": 0
    }

## Report Device status

| Usage of Topic       | Topic                                      | From   | To  |
|:---------------------|:-------------------------------------------|:-------|:----|
| Report Device status | `/open/${certificateAccount}/${sn}/status` | device | app |

Message Format

    {
        "id": "123456789",
        "version": "1.0",
        "timestamp": 1634841971000,
        "params": {
            "status": 1
        }
    }

Field

| Field   | 	Field Type | 	Description                       |
|---------|-------------|------------------------------------|
| status	 | int	        | Device online or not 0: No, 1: Yes |

/**
 * @file This example demonstrates how to turn on a smart plug.
 */
import { SmartPlugSn } from "@ecoflow-api/schemas";
import { RestClient } from "@ecoflow-api/rest-client";

async function main() {
  const sn = process.env.DEVICE_SN_SMARTPLUG as SmartPlugSn;
  const client = new RestClient({
    accessKey: process.env.ECOFLOW_ACCESS_KEY!,
    secretKey: process.env.ECOFLOW_SECRET_KEY!,
    host: process.env.ECOFLOW_HOST!,
  });

  // For the payload visit device documentation at
  // https://developer-eu.ecoflow.com/us/document/smartPlug
  // For a more type-safe approach, you can use the schemas-package or use the getDevice method - see switchOn-2.ts
  const result = await client.setCommandPlain({
    sn,
    cmdCode: "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE",
    params: {
      plugSwitch: 1,
    },
  });

  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => console.error(err));

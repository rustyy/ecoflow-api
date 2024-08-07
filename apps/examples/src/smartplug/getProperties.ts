import { SmartPlugSn } from "@ecoflow-api/schemas";
import { RestClient } from "@ecoflow-api/rest-client";

async function main() {
  const sn = process.env.DEVICE_SN_SMARTPLUG as SmartPlugSn;
  const client = new RestClient({
    accessKey: process.env.ECOFLOW_ACCESS_KEY!,
    secretKey: process.env.ECOFLOW_SECRET_KEY!,
    host: process.env.ECOFLOW_HOST!,
  });

  const device = client.getDevice(sn);
  const result = await device.getProperties();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => console.error(err));

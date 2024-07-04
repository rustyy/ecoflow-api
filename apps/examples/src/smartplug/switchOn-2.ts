import { SmartPlugSn } from "@ecoflow-api/schemas";
import { RestClient } from "@ecoflow-api/rest-client";

async function main() {
  const sn = process.env.DEVICE_SN_SMARTPLUG as SmartPlugSn;
  const client = new RestClient({
    accessKey: process.env.ECOFLOW_ACCESS_KEY!,
    secretKey: process.env.ECOFLOW_SECRET_KEY!,
    host: process.env.ECOFLOW_HOST!,
  });

  // Request a smart plug device instance providing device specific methods
  const smartPlug = client.getDevice(sn);
  // Turn the smart plug on
  const result = await smartPlug.switchOn();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => console.error(err));

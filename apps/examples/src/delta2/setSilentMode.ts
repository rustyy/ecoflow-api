import { Delta2SerialNumber } from "@ecoflow-api/schemas";
import { RestClient } from "@ecoflow-api/rest-client";

async function main() {
  const sn = process.env.DEVICE_SN_DELTA2 as Delta2SerialNumber;

  const client = new RestClient({
    accessKey: process.env.ECOFLOW_ACCESS_KEY!,
    secretKey: process.env.ECOFLOW_SECRET_KEY!,
    host: process.env.ECOFLOW_HOST!,
  });

  const device = client.getDevice(sn);
  const result = await device.setSilentMode(1);

  console.log(result);
}

main().catch((err) => console.error(JSON.stringify(err, null, 2)));

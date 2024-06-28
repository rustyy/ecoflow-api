import { RestClient } from "@ecoflow-api/rest-client";

async function main() {
  const client = new RestClient({
    accessKey: process.env.ECOFLOW_ACCESS_KEY!,
    secretKey: process.env.ECOFLOW_SECRET_KEY!,
    host: process.env.ECOFLOW_HOST!,
  });
  const result = await client.getMqttCredentials();
  console.log(result);
}

main().catch((err) => console.error(err));

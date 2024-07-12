import { RestClient } from "../RestClient";
import { AnySchema } from "@ecoflow-api/schemas";

/**
 * Device abstract class.
 */
export abstract class Device<SerialNumber extends string, ParsedProperties> {
  readonly sn: SerialNumber;

  constructor(
    protected restClient: RestClient,
    serialNumber: SerialNumber,
  ) {
    this.sn = serialNumber;
  }

  /**
   * Parses the properties of the device.
   */
  protected abstract parseProperties(data: any): ParsedProperties;

  /**
   * Sends a command with the given payload.
   */
  protected async sendCommand(payload: any, schema: AnySchema) {
    return this.restClient.setCommandPlain(schema.parse(payload));
  }

  /**
   * Retrieves the properties of the device asynchronously.
   */
  async getProperties(): Promise<ParsedProperties> {
    const response = await this.restClient.getDevicePropertiesPlain(this.sn);
    return this.parseProperties(response.data);
  }
}

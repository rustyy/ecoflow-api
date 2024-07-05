import { RestClient } from "../RestClient";

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
  protected async sendCommand(payload: any) {
    return this.restClient.setCommandPlain(payload);
  }

  /**
   * Retrieves the properties of the device asynchronously.
   */
  async getProperties(): Promise<ParsedProperties> {
    const response = await this.restClient.getDevicePropertiesPlain(this.sn);
    return this.parseProperties(response.data);
  }
}
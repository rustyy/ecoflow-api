import { Device } from "./Device";

/**
 * Represents an unknown device.
 */
export class UnknownDevice extends Device<string, Record<string, any>> {
  /**
   * Simply return the data as is as we don't know the device hence the properties as well.
   */
  protected parseProperties(data: any): any {
    return data;
  }
}

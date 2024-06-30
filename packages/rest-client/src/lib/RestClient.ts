import { SignatureBuilder } from "./signatureBuilder/SignatureBuilder";
import {
  AnySchema,
  certificationResponseSchema,
  DeviceListResponse,
  deviceListResponseSchema,
  errorResponseSchema,
  inferSchema,
  isPowerStreamSerialNumber,
  isSmartPlugSn,
  PowerStreamQuotaAll,
  powerStreamQuotaAllSchema,
  PowerStreamSerialNumber,
  PowerStreamSetCommand,
  QuotaAllResponse,
  quotaAllResponseSchema,
  SetCommandResponse,
  setCommandResponseSchema,
  SmartPlugQuotaAll,
  smartPlugQuotaAllSchema,
  SmartPlugSetCommand,
  SmartPlugSn,
} from "@ecoflow-api/schemas";
import { RequestHandler } from "./RequestHandler";

export type RequestHeaders = [
  ["accessKey", string],
  ["timestamp", string],
  ["nonce", string],
  ["sign", string],
  ["Content-Type", "application/json;charset=UTF-8"],
];

/**
 * Represents the options for the RestClient class.
 *
 * accessKey - the access key created via the developer portal
 *
 * secretKey - the secret key
 *
 * host - the api to use.
 *        Use https://api-e.ecoflow.com for european accounts,
 *        use https://api-a.ecoflow.com in the US.
 */
export type RestClientOptions = {
  accessKey: string;
  secretKey: string;
  host: "https://api-e.ecoflow.com" | "https://api-a.ecoflow.com" | `${string}`;
};

/**
 * URL paths config
 */
const endpoints = {
  deviceList: "/iot-open/sign/device/list",
  deviceQuota: "/iot-open/sign/device/quota/all",
  setCmd: "/iot-open/sign/device/quota",
  certification: "/iot-open/sign/certification",
};

/**
 * Represents a RestClient object.
 * @class
 * @param {RestClientOptions} opts - The options for the RestClient.
 */
export class RestClient {
  /**
   * Represents a utility class that is used to handle requests.
   */
  requestHandler: RequestHandler;

  /**
   * Represents the host URL of the REST API.
   * Use https://api-e.ecoflow.com for european accounts or https://api-a.ecoflow.com in the US.
   *
   * @type {string}
   */
  restApiHost: string;

  /**
   * The URL for fetching the list of devices.
   *
   * @type {String}
   */
  readonly deviceListUrl: string;

  /**
   * The URL for querying device quota information.
   *
   * @type {string}
   */
  readonly deviceQuotaUrl: string;

  /**
   * Sets the command URL for the REST API host and device quota.
   *
   * @param {string} restApiHost - The base URL of the REST API host.
   * @returns {void}
   */
  readonly setCmdUrl: string;

  /**
   * The URL for the certification endpoint.
   * It is used for signing and acquiring certification for IoT devices.
   * The URL is constructed by appending the '/iot-open/sign/certification' path to the restApiHost.
   *
   * @type {string}
   * @readonly
   */
  readonly certificationUrl: string;

  /**
   * @classdesc Represents a RestClient object.
   *
   * @class
   * @param {RestClientOptions} opts - The options for the RestClient.
   * @constructor
   */
  constructor(opts: RestClientOptions) {
    const generateUrl = (path: string) => `${opts.host}${path}`;

    this.requestHandler = new RequestHandler(
      new SignatureBuilder(opts.accessKey, opts.secretKey),
    );
    this.restApiHost = opts.host;
    this.deviceListUrl = generateUrl(endpoints.deviceList);
    this.deviceQuotaUrl = generateUrl(endpoints.deviceQuota);
    this.setCmdUrl = generateUrl(endpoints.setCmd);
    this.certificationUrl = generateUrl(endpoints.certification);
  }

  /**
   * Parses the given response data using the provided schema.
   *
   * @param {unknown} data - The response data to be parsed.
   * @param {T} schema - The schema to be used for parsing.
   * @returns {inferSchema<T>} - The parsed response data.
   * @throws {Error} - If an error is detected in the response data.
   */
  parseResponse<T extends AnySchema>(data: unknown, schema: T): inferSchema<T> {
    const parsedError = errorResponseSchema.safeParse(data);

    if (parsedError.success) {
      throw new Error(
        `code: ${parsedError.data.code} | message: ${parsedError.data.message}`,
      );
    }

    return schema.parse(data) as inferSchema<T>;
  }

  /**
   * Requests credentials required to establish an MQTT connection.
   *
   * @returns {Promise<Object>} An object containing the MQTT credentials.
   *                           - certificateAccount: The certificate account.
   *                           - certificatePassword: The certificate password.
   *                           - url: The MQTT broker URL.
   *                           - protocol: The MQTT protocol (e.g., MQTT or MQTT over WebSocket).
   *                           - port: The MQTT broker port.
   * @throws {Error} If there is an error retrieving the credentials or if the response
   *                 contains an error message.
   */
  async getMqttCredentials() {
    const parsedResult = this.parseResponse(
      await this.requestHandler.get(this.certificationUrl),
      certificationResponseSchema,
    );

    const { port } = parsedResult.data;
    return {
      ...parsedResult.data,
      port: parseInt(port),
    };
  }

  /**
   * Receive list of all devices connected to the account.
   *
   * @returns {Promise<DeviceListResponse>} A promise that resolves to the device list response.
   */
  async getDevices(): Promise<DeviceListResponse> {
    return this.parseResponse(
      await this.requestHandler.get(this.deviceListUrl),
      deviceListResponseSchema,
    );
  }

  /**
   * Returns an array of all serial numbers bound to the connected account.
   *
   * @returns {Promise<string[]>} An array of serial numbers.
   */
  async getSerialNumbers(): Promise<string[]> {
    const devices = await this.getDevices();
    return devices.data.map(({ sn }) => sn);
  }

  /**
   * Update device settings. Depending on the device type different settings can be updated.
   * Note: Use at your own risk.
   * Note: that not all properties/settings can be updated.
   * At the moment command types for the following devices are provided:
   * - SmartPlug
   * - PowerStream
   * More devices to come, for all unsupported devices a payload object can be passed.
   *
   * @param payload
   */
  async setCommand(
    payload: SmartPlugSetCommand | PowerStreamSetCommand | Record<string, any>,
  ): Promise<SetCommandResponse> {
    return this.parseResponse(
      await this.requestHandler.put(this.setCmdUrl, payload),
      setCommandResponseSchema,
    );
  }

  /**
   * Requests all device properties.
   *
   * @param {string} sn - Device serial number
   * @return {Promise<any>} - Promise that resolves to the device properties response
   */
  async getDeviceProperties<
    T extends string,
    R = T extends SmartPlugSn
      ? SmartPlugQuotaAll
      : T extends PowerStreamSerialNumber
        ? PowerStreamQuotaAll
        : QuotaAllResponse["data"] | undefined,
  >(sn: T): Promise<R> {
    const { data } = quotaAllResponseSchema.parse(
      await this.requestHandler.get(`${this.deviceQuotaUrl}?sn=${sn}`),
    );

    if (isSmartPlugSn(sn)) {
      return smartPlugQuotaAllSchema.parse(data) as R;
    }

    if (isPowerStreamSerialNumber(sn)) {
      return powerStreamQuotaAllSchema.parse(data) as R;
    }

    return data as R;
  }
}

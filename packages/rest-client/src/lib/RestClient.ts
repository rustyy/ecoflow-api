import { SignatureBuilder } from "./signatureBuilder/SignatureBuilder";
import {
  certificationErrorResponseSchema,
  certificationResponseSchema,
  DeviceListResponse,
  deviceListResponseSchema,
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

export type RequestHeaders = [
  ["accessKey", string],
  ["timestamp", string],
  ["nonce", string],
  ["sign", string],
  ["Content-Type", "application/json;charset=UTF-8"],
];

export class RestClient {
  #signatureBuilder: SignatureBuilder;

  readonly restApiHost = "https://api-e.ecoflow.com";
  // Endpoint Urls.
  readonly deviceListUrl = `${this.restApiHost}/iot-open/sign/device/list`;
  readonly deviceQuotaUrl = `${this.restApiHost}/iot-open/sign/device/quota/all`;
  readonly setCmdUrl = `${this.restApiHost}/iot-open/sign/device/quota`;
  readonly certificationUrl = `${this.restApiHost}/iot-open/sign/certification`;

  constructor(accessKey: string, secretKey: string) {
    this.#signatureBuilder = new SignatureBuilder(accessKey, secretKey);
  }

  /**
   * Create all request headers required for API calls.
   *
   * @param params
   * @private
   */
  #createRequestHeaders(params: {
    accessKey: string;
    timestamp: string;
    nonce: string;
    signature: string;
  }): RequestHeaders {
    return [
      ["accessKey", params.accessKey],
      ["timestamp", params.timestamp],
      ["nonce", params.nonce],
      ["sign", params.signature],
      ["Content-Type", "application/json;charset=UTF-8"],
    ];
  }

  /**
   * Execute request with signature and required headers attached.
   *
   * @param url
   * @param method
   * @param payload
   * @private
   */
  async #makeRequest(
    url: string,
    method: "GET" | "PUT" | "POST",
    payload?: Record<string, any>,
  ): Promise<unknown> {
    const response = await fetch(url, {
      method,
      headers: this.#createRequestHeaders(
        this.#signatureBuilder.createSignature(payload),
      ),
      ...(method !== "GET" && { body: JSON.stringify(payload) }),
    });

    return response.json();
  }

  /**
   * Request credentials required to establish a mqtt-connection.
   */
  async getMqttCredentials() {
    const response = await this.#makeRequest(this.certificationUrl, "GET");
    const parsedError = certificationErrorResponseSchema.safeParse(response);
    const parsedResult = certificationResponseSchema.safeParse(response);

    if (parsedError.success) {
      throw new Error(
        `code: ${parsedError.data.code} | message: ${parsedError.data.message}`,
      );
    }

    if (parsedResult.success) {
      const { certificateAccount, certificatePassword, url, protocol, port } =
        parsedResult.data.data;
      return {
        certificateAccount,
        certificatePassword,
        url,
        protocol,
        port: parseInt(port),
      };
    }

    throw new Error("Unknown error");
  }

  /**
   * Receive list of all devices connected to the account.
   */
  async getDevices(): Promise<DeviceListResponse> {
    const response = await this.#makeRequest(this.deviceListUrl, "GET");
    return deviceListResponseSchema.parse(response);
  }

  /**
   * Request all serial numbers bound to the connected account.
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
    const response = await this.#makeRequest(this.setCmdUrl, "PUT", payload);
    return setCommandResponseSchema.parse(response);
  }

  /**
   * Requests all device properties.
   *
   * @param sn Device serial number
   */
  async getDeviceProperties<
    T extends string,
    R = T extends SmartPlugSn
      ? SmartPlugQuotaAll
      : T extends PowerStreamSerialNumber
        ? PowerStreamQuotaAll
        : QuotaAllResponse["data"] | undefined,
  >(sn: T): Promise<R> {
    const response = await this.#makeRequest(this.deviceQuotaUrl, "GET");
    const { data } = quotaAllResponseSchema.parse(response);

    if (isSmartPlugSn(sn)) {
      return smartPlugQuotaAllSchema.parse(data) as R;
    }

    if (isPowerStreamSerialNumber(sn)) {
      return powerStreamQuotaAllSchema.parse(data) as R;
    }

    return data as R;
  }
}

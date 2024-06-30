import { SignatureBuilder } from "./signatureBuilder/SignatureBuilder";

export type RequestHeaders = [
  ["accessKey", string],
  ["timestamp", string],
  ["nonce", string],
  ["sign", string],
  ["Content-Type", "application/json;charset=UTF-8"],
];

export class RequestHandler {
  #signatureBuilder: SignatureBuilder;

  constructor(signatureBuilder: SignatureBuilder) {
    this.#signatureBuilder = signatureBuilder;
  }

  async get(url: string) {
    return this.#makeRequest(url, "GET");
  }

  async post(url: string, payload: Record<string, unknown>) {
    return this.#makeRequest(url, "POST", payload);
  }

  async put(url: string, payload: Record<string, unknown>) {
    return this.#makeRequest(url, "PUT", payload);
  }

  async #makeRequest(
    url: string,
    method: "GET" | "PUT" | "POST",
    payload?: Record<string, any>,
  ) {
    const response = await fetch(url, this.#prepareOptions(method, payload));
    const json = await response.json();

    if (response.status !== 200) {
      throw new Error(
        `Request failed with status ${response.status}, ${JSON.stringify(json, null, 2)}`,
      );
    }

    return json;
  }

  #prepareOptions(
    method: "GET" | "PUT" | "POST",
    payload?: Record<string, any>,
  ): RequestInit {
    const signature = this.#signatureBuilder.createSignature(payload);
    const options: RequestInit = {
      method,
      headers: this.#createRequestHeaders(signature),
    };

    if (typeof payload !== "undefined") {
      options.body = JSON.stringify(payload);
    }

    return options;
  }

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
}

import { describe, expect, it } from "@jest/globals";
import { RestClient } from "./RestClient";

describe("RestClient", () => {
  const createClient = (host: string) =>
    new RestClient({
      accessKey: "test-access-key",
      secretKey: "test-secret-key",
      host,
    });

  it("should construct successfully with a valid https host", () => {
    expect(() => createClient("https://api-e.ecoflow.com")).not.toThrow();
  });

  it("should construct successfully with a valid http host", () => {
    expect(() => createClient("http://localhost:3000")).not.toThrow();
  });

  it("should throw an error with an invalid host URL", () => {
    expect(() => createClient("invalid-url")).toThrow("Invalid host URL");
  });

  it("should throw an error with an invalid protocol", () => {
    expect(() => createClient("sftp://api.ecoflow.com")).toThrow(
      "Invalid host protocol: http or https expected",
    );
  });

  it("should throw an error with an empty host", () => {
    expect(() => createClient("")).toThrow("Invalid host URL");
  });
});

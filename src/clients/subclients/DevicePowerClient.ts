import { DeviceShutdownException } from "../../model/exception/DeviceShutdownException";
import { IShutdownWiimResponse } from "../../model/wiim/response/devicePower/Shutdown";
import { WiimHttpClient } from "../WiimHttpClient";
import { SubClient } from "./SubClient";

export class DevicePowerClient extends SubClient {
  constructor(httpClient: WiimHttpClient) {
    super(httpClient);
  }

  /**
   * Reboot the device
   */
  async reboot(): Promise<void> {
    await this.httpClient.doHttpAction("reboot");
  }

  /**
   * Shutdown the device immediately
   */
  async shutdown(): Promise<void> {
    const response = await this.httpClient.doHttpAction<IShutdownWiimResponse>(
      "shutdown:0"
    );
    if (response.status === "Failed") {
      throw new DeviceShutdownException();
    }
  }

  /**
   * Shutdown the device after a delay in seconds
   */
  async shutdownAfterDelay(delaySeconds: number): Promise<void> {
    const response = await this.httpClient.doHttpAction<IShutdownWiimResponse>(
      `shutdown:${delaySeconds.toString()}`
    );
    if (response.status === "Failed") {
      throw new DeviceShutdownException();
    }
  }

  /**
   * Cancel the scheduled shutdown
   */
  async cancelShutdown(): Promise<void> {
    const response = await this.httpClient.doHttpAction<IShutdownWiimResponse>(
      "shutdown:-1"
    );
    if (response.status === "Failed") {
      throw new DeviceShutdownException();
    }
  }

  /**
   * Get the scheduled shutdown timer in seconds
   */
  async getShutdownTimer(): Promise<number> {
    const response = await this.httpClient.doHttpAction<number>("getShutdown");
    return response;
  }
}

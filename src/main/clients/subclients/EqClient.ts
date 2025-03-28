import { EqControlException } from "../../model/exception/EqControlException";
import {
  EEqPreset,
  TGetEqPresetsResponse,
} from "../../model/response/eq/GetEqPresets";
import { IIsEqEnabledWiimResponse } from "../../model/wiim/response/eq/IsEqEnabled";
import { IGenericStatusWiimResponse } from "../../model/wiim/response/Status";
import { WiimHttpClient } from "../WiimHttpClient";
import { SubClient } from "./SubClient";

export class EqClient extends SubClient {
  constructor(httpClient: WiimHttpClient) {
    super(httpClient);
  }

  /**
   * Enable EQ
   */
  async enableEq(): Promise<void> {
    const response =
      await this.httpClient.doHttpAction<IGenericStatusWiimResponse>("EQOn");
    if (response.status !== "OK") {
      throw new EqControlException("Failed to enable EQ");
    }
  }

  /**
   * Disable EQ
   */
  async disableEq(): Promise<void> {
    const response =
      await this.httpClient.doHttpAction<IGenericStatusWiimResponse>("EQOff");
    if (response.status !== "OK") {
      throw new EqControlException("Failed to disable EQ");
    }
  }

  /**
   * Check if the EQ is enabled or not
   */
  async isEqEnabled(): Promise<boolean> {
    const response =
      await this.httpClient.doHttpAction<IIsEqEnabledWiimResponse>("EQGetStat");
    return response.EQStat === "On";
  }

  /**
   * Get the available EQ presets (should be a static list)
   */
  async getEqPresets(): Promise<TGetEqPresetsResponse> {
    const response = (await this.httpClient.doHttpAction<string[]>(
      "EQGetList"
    )) as TGetEqPresetsResponse;
    return response;
  }

  /**
   * Set the EQ present using the defined presets
   */
  async setEqPreset(preset: EEqPreset): Promise<void> {
    const response =
      await this.httpClient.doHttpAction<IGenericStatusWiimResponse>(
        `EQLoad:${preset}`
      );
    if (response.status !== "OK") {
      throw new EqControlException("Failed to set EQ preset");
    }
  }
}

import { EqControlException } from "../../model/exception/EqControlException";
import {
  EEqPreset,
  TGetEqPresetsResponse,
} from "../../model/response/eq/GetEqPresets";
import { IDisableEqWiimResponse } from "../../model/wiim/response/eq/DisableEq";
import { IEnableEqWiimResponse } from "../../model/wiim/response/eq/EnableEq";
import { IIsEqEnabledWiimResponse } from "../../model/wiim/response/eq/IsEqEnabled";
import { ISetEqPresetWiimResponse } from "../../model/wiim/response/eq/SetEqPreset";
import { WiimHttpClient } from "../WiimHttpClient";
import { SubClient } from "./SubClient";

export class EQClient extends SubClient {
  constructor(httpClient: WiimHttpClient) {
    super(httpClient);
  }

  /**
   * Enable EQ
   */
  async enableEq(): Promise<void> {
    const response = await this.httpClient.doHttpAction<IEnableEqWiimResponse>(
      "EQOn"
    );
    if (response.status !== "OK") {
      throw new EqControlException("Failed to enable EQ");
    }
  }

  /**
   * Disable EQ
   */
  async disableEq(): Promise<void> {
    const response = await this.httpClient.doHttpAction<IDisableEqWiimResponse>(
      "EQOff"
    );
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
      await this.httpClient.doHttpAction<ISetEqPresetWiimResponse>(
        `EQLoad:${preset}`
      );
    if (response.status !== "OK") {
      throw new EqControlException("Failed to set EQ preset");
    }
  }
}

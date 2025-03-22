import { GetPlayerStatusMapper } from "../../mapper/GetPlayerStatus";
import { IGetPlaybackStatusResponse } from "../../model/response/playback/GetPlaybackStatus";
import { IGetPlayerStatusWiimResponse } from "../../model/wiim/response/playback/GetPlaybackStatus";
import { WiimHttpClient } from "../WiimHttpClient";
import { SubClient } from "./SubClient";

export class PlaybackClient extends SubClient {
  constructor(httpClient: WiimHttpClient) {
    super(httpClient);
  }

  async getPlaybackStatus(): Promise<IGetPlaybackStatusResponse> {
    const response =
      await this.httpClient.doHttpAction<IGetPlayerStatusWiimResponse>(
        "getPlayerStatus"
      );
    const mapper = new GetPlayerStatusMapper();
    const mappedResponse = mapper.mapWiimToCustom(response);
    return mappedResponse;
  }
}

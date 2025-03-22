import { GetPlayerStatusMapper } from "../../mapper/GetPlayerStatus";
import { IPlayAudioPlaylistRequest } from "../../model/request/playback/PlayAudioPlaylist";
import { IGetPlaybackStatusResponse } from "../../model/response/playback/GetPlaybackStatus";
import { IGetPlayerStatusWiimResponse } from "../../model/wiim/response/playback/GetPlaybackStatus";
import { WiimHttpClient } from "../WiimHttpClient";
import { SubClient } from "./SubClient";

export class PlaybackClient extends SubClient {
  constructor(httpClient: WiimHttpClient) {
    super(httpClient);
  }

  /**
   * Get playback status metadata
   */
  async getPlaybackStatus(): Promise<IGetPlaybackStatusResponse> {
    const response =
      await this.httpClient.doHttpAction<IGetPlayerStatusWiimResponse>(
        "getPlayerStatus"
      );
    const mapper = new GetPlayerStatusMapper();
    const mappedResponse = mapper.mapWiimToCustom(response);
    return mappedResponse;
  }

  /**
   * Play a network audio stream
   */
  async playAudioUrl(url: string): Promise<void> {
    await this.httpClient.doHttpAction(`setPlayerCmd:play:${url}`);
  }

  /**
   * Play a network audio playlist, starting at a specific index
   */
  async playAudioPlaylist(request: IPlayAudioPlaylistRequest): Promise<void> {
    const { url, startIndex } = request;
    await this.httpClient.doHttpAction(
      `setPlayerCmd:playlist:${url}:${startIndex.toString()}`
    );
  }
}

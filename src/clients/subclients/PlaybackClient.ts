import { GetCurrentTrackMapper } from "../../mapper/GetCurrentTrack";
import { GetPlayerStatusMapper } from "../../mapper/GetPlayerStatus";
import { IPlayAudioPlaylistRequest } from "../../model/request/playback/PlayAudioPlaylist";
import { ELoopMode } from "../../model/request/playback/SetLoopMode";
import { IGetCurrentTrackResponse } from "../../model/response/playback/GetCurrentTrack";
import { IGetPlayerStatusResponse } from "../../model/response/playback/GetPlaybackStatus";
import { IGetCurrentTrackWiimResponse } from "../../model/wiim/response/playback/GetCurrentTrack";
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
  async getPlayerStatus(): Promise<IGetPlayerStatusResponse> {
    const response =
      await this.httpClient.doHttpAction<IGetPlayerStatusWiimResponse>(
        "getPlayerStatus"
      );
    const mapper = new GetPlayerStatusMapper();
    const mappedResponse = mapper.mapWiimToCustom(response);
    return mappedResponse;
  }

  /**
   * Get current track metadata
   */
  async getCurrentTrack(): Promise<IGetCurrentTrackResponse> {
    const response =
      await this.httpClient.doHttpAction<IGetCurrentTrackWiimResponse>(
        "getMetaInfo"
      );
    const mapper = new GetCurrentTrackMapper();
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

  /**
   * Pause playback
   */
  async pause(): Promise<void> {
    await this.httpClient.doHttpAction("setPlayerCmd:pause");
  }

  /**
   * Resumes playback
   */
  async resume(): Promise<void> {
    await this.httpClient.doHttpAction("setPlayerCmd:resume");
  }

  /**
   * Toggles playback between play/pause states
   */
  async togglePlayback(): Promise<void> {
    await this.httpClient.doHttpAction("setPlayerCmd:onepause");
  }

  /**
   * Advance to next track
   */
  async next(): Promise<void> {
    await this.httpClient.doHttpAction("setPlayerCmd:next");
  }

  /**
   * Go back to previous track
   */
  async previous(): Promise<void> {
    await this.httpClient.doHttpAction("setPlayerCmd:prev");
  }

  /**
   * Seek to a specific time in the track
   */
  async seek(time: number): Promise<void> {
    await this.httpClient.doHttpAction(`setPlayerCmd:seek:${time.toString()}`);
  }

  /**
   * Stop playback
   */
  async stop(): Promise<void> {
    await this.httpClient.doHttpAction("setPlayerCmd:stop");
  }

  /**
   * Set volume level
   */
  async setVolume(volume: number): Promise<void> {
    await this.httpClient.doHttpAction(`setPlayerCmd:vol:${volume.toString()}`);
  }

  /**
   * Mute volume
   */
  async mute(): Promise<void> {
    await this.httpClient.doHttpAction("setPlayerCmd:mute:1");
  }

  /**
   * Unmute volume
   */
  async unmute(): Promise<void> {
    await this.httpClient.doHttpAction("setPlayerCmd:mute:0");
  }

  /**
   * Set loop mode
   */
  async setLoopMode(loopMode: ELoopMode): Promise<void> {
    await this.httpClient.doHttpAction(
      `setPlayerCmd:loopmode:${loopMode.toString()}`
    );
  }
}

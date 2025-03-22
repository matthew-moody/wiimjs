import { PlaybackClient } from "./subclients/PlaybackClient";
import { WiimHttpClient } from "./WiimHttpClient";

export class WiimClient {
  httpClient: WiimHttpClient;
  playbackClient: PlaybackClient;
  constructor(playerIpAddress: string) {
    this.httpClient = new WiimHttpClient(playerIpAddress);
    this.playbackClient = new PlaybackClient(this.httpClient);
  }
}

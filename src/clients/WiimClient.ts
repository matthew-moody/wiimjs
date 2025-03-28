import { DevicePowerClient } from "./subclients/DevicePowerClient";
import { EqClient } from "./subclients/EQClient";
import { PlaybackClient } from "./subclients/PlaybackClient";
import { WiimHttpClient } from "./WiimHttpClient";

export class WiimClient {
  httpClient: WiimHttpClient;
  playbackClient: PlaybackClient;
  devicePowerClient: DevicePowerClient;
  eqClient: EqClient;
  constructor(playerIpAddress: string) {
    this.httpClient = new WiimHttpClient(playerIpAddress);
    this.playbackClient = new PlaybackClient(this.httpClient);
    this.devicePowerClient = new DevicePowerClient(this.httpClient);
    this.eqClient = new EqClient(this.httpClient);
  }
}

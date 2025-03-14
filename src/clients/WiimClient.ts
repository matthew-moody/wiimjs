import { WiimHttpClient } from "./WiimHttpClient";

export class WiimClient {
  httpClient: WiimHttpClient;
  constructor(playerIpAddress: string) {
    this.httpClient = new WiimHttpClient(playerIpAddress);
  }
}

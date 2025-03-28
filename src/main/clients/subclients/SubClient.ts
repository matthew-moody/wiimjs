import { WiimHttpClient } from "../WiimHttpClient";

export class SubClient {
  httpClient: WiimHttpClient;

  constructor(httpClient: WiimHttpClient) {
    this.httpClient = httpClient;
  }
}

import { WiimClient } from "./clients/WiimClient";

const client = new WiimClient("192.168.0.61");
client.playbackClient.resume();

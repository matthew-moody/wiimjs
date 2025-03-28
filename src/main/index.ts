export { WiimClient } from "./clients/WiimClient";
import { WiimClient } from "./clients/WiimClient";

const client = new WiimClient("192.168.0.61");

client.playbackClient.getCurrentTrack().then((status) => {
  console.log("Playback Status:", status);
});

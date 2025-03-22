import { WiimClient } from "./clients/WiimClient";

const client = new WiimClient("192.168.0.61");
client.playbackClient.getPlaybackStatus().then((response) => {
  console.log(response);
});

/**
   * Pause playback
   */
  async pause() {
    await this.httpClient.doHttpAction("setPlayerCmd:pause");
  }

  /**
   * Resumes playback
   */
  async resume() {
    await this.httpClient.doHttpAction("setPlayerCmd:resume");
  }

  /**
   * Toggles playback between play/pause states
   */
  async togglePlayback() {
    await this.httpClient.doHttpAction("setPlayerCmd:onepause");
  }
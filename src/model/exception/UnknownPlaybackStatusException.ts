export class UnknownPlaybackStatusException extends Error {
  constructor() {
    super(`Unknown playback status`);
  }
}

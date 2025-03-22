export class UnknownPlaybackChannelException extends Error {
  constructor() {
    super(`Unknown playback channel`);
  }
}

export class UnknownPlaybackSourceException extends Error {
  constructor() {
    super(`Unknown playback source`);
  }
}

export enum EPlaybackChannel {
  STEREO = "STEREO",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum EPlaybackSource {
  NONE = "NONE",
  AIRPLAY = "AIRPLAY",
  DNLA = "DNLA",
  WIMMU_DEFAULT = "WIMMU_DEFAULT",
  USB = "USB",
  SD_CARD = "SD_CARD",
  SPOTIFY = "SPOTIFY",
  TIDAL = "TIDAL",
  AUX = "AUX",
  BLUETOOTH = "BLUETOOTH",
  EXTERNAL_STORAGE = "EXTERNAL_STORAGE",
  OPTICAL = "OPTICAL",
  MIRROR = "MIRROR",
  VOICE_MAIL = "VOICE_MAIL",
  SLAVE = "SLAVE",
}

export enum EPlaybackLoopMode {
  ALL = "ALL",
  SINGLE = "SINGLE",
  SHUFFLE_LOOP = "SHUFFLE_LOOP",
  SHUFFLE_NO_LOOP = "SHUFFLE_NO_LOOP",
  NO_SHUFFLE_NO_LOOP = "NO_SHUFFLE_NO_LOOP",
}

export enum EPlaybackStatus {
  STOP = "STOP",
  PAUSE = "PAUSE",
  PLAY = "PLAY",
  LOADING = "LOADING",
}

export interface IGetPlaybackStatusResponse {
  isSlaveDevice: boolean;
  channel: EPlaybackChannel;
  source: EPlaybackSource;
  loopMode: EPlaybackLoopMode;
  eqPreset: number;
  status: EPlaybackStatus;
  trackCursorPosition: number;
  trackLength: number;
  playlistTotalTracks: number;
  playlistCurrentTrackNumber: number;
  volume: number;
  isMuted: boolean;
}

import { UnknownPlaybackChannelException } from "../model/exception/UnknownPlaybackChannelException";
import { UnknownPlaybackLoopModeException } from "../model/exception/UnknownPlaybackLoopModeException";
import { UnknownPlaybackSourceException } from "../model/exception/UnknownPlaybackSourceException";
import { UnknownPlaybackStatusException } from "../model/exception/UnknownPlaybackStatusException";
import {
  EPlaybackChannel,
  EPlaybackLoopMode,
  EPlaybackSource,
  EPlaybackStatus,
  IGetPlayerStatusResponse,
} from "../model/response/playback/GetPlaybackStatus";
import { IGetPlayerStatusWiimResponse } from "../model/wiim/response/playback/GetPlaybackStatus";
import { BaseMapper } from "./BaseMapper";

export class GetPlayerStatusMapper extends BaseMapper {
  mapChannel(ch: string): EPlaybackChannel {
    switch (ch) {
      case "0":
        return EPlaybackChannel.STEREO;
      case "1":
        return EPlaybackChannel.LEFT;
      case "2":
        return EPlaybackChannel.RIGHT;
      default:
        throw new UnknownPlaybackChannelException();
    }
  }

  mapSource(mode: string): EPlaybackSource {
    switch (mode) {
      case "0":
        return EPlaybackSource.NONE;
      case "1":
        return EPlaybackSource.AIRPLAY;
      case "2":
        return EPlaybackSource.DNLA;
      case "10":
        return EPlaybackSource.WIMMU_DEFAULT;
      case "11":
        return EPlaybackSource.USB;
      case "12":
        return EPlaybackSource.SD_CARD;
      case "31":
        return EPlaybackSource.SPOTIFY;
      case "32":
        return EPlaybackSource.TIDAL;
      case "40":
        return EPlaybackSource.AUX;
      case "41":
        return EPlaybackSource.BLUETOOTH;
      case "42":
        return EPlaybackSource.EXTERNAL_STORAGE;
      case "43":
        return EPlaybackSource.OPTICAL;
      case "50":
        return EPlaybackSource.MIRROR;
      case "60":
        return EPlaybackSource.VOICE_MAIL;
      case "99":
        return EPlaybackSource.SLAVE;
      default:
        throw new UnknownPlaybackSourceException();
    }
  }

  mapLoopMode(loop: string): EPlaybackLoopMode {
    switch (loop) {
      case "0":
        return EPlaybackLoopMode.ALL;
      case "1":
        return EPlaybackLoopMode.SINGLE;
      case "2":
        return EPlaybackLoopMode.SHUFFLE_LOOP;
      case "3":
        return EPlaybackLoopMode.SHUFFLE_NO_LOOP;
      case "4":
        return EPlaybackLoopMode.NO_SHUFFLE_NO_LOOP;
      default:
        throw new UnknownPlaybackLoopModeException();
    }
  }

  mapStatus(status: string): EPlaybackStatus {
    switch (status) {
      case "stop":
        return EPlaybackStatus.STOP;
      case "pause":
        return EPlaybackStatus.PAUSE;
      case "play":
        return EPlaybackStatus.PLAY;
      case "loading":
        return EPlaybackStatus.LOADING;
      default:
        throw new UnknownPlaybackStatusException();
    }
  }

  mapWiimToCustom(
    wiimResponse: IGetPlayerStatusWiimResponse
  ): IGetPlayerStatusResponse {
    return {
      isSlaveDevice: this.mapIntToBoolean(Number(wiimResponse.type)),
      channel: this.mapChannel(wiimResponse.ch),
      source: this.mapSource(wiimResponse.mode),
      loopMode: this.mapLoopMode(wiimResponse.loop),
      eqPreset: Number(wiimResponse.eq),
      status: this.mapStatus(wiimResponse.status),
      trackCursorPosition: Number(wiimResponse.curpos),
      trackLength: Number(wiimResponse.totlen),
      playlistTotalTracks: Number(wiimResponse.plicount),
      playlistCurrentTrackNumber: Number(wiimResponse.plicurr),
      volume: Number(wiimResponse.vol),
      isMuted: this.mapIntToBoolean(Number(wiimResponse.mute)),
    };
  }
}

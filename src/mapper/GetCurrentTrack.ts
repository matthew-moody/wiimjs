import { IGetCurrentTrackResponse } from "../model/response/playback/GetCurrentTrack";
import { IGetCurrentTrackWiimResponse } from "../model/wiim/response/playback/GetCurrentTrack";
import { BaseMapper } from "./BaseMapper";

export class GetCurrentTrackMapper extends BaseMapper {
  mapWiimToCustom(
    wiimResponse: IGetCurrentTrackWiimResponse
  ): IGetCurrentTrackResponse {
    return {
      album: wiimResponse.metadata.album,
      title: wiimResponse.metadata.title,
      artist: wiimResponse.metadata.artist,
      albumArtUrl: wiimResponse.metadata.albumArtURl,
      sampleRate: parseInt(wiimResponse.metadata.sampleRate),
      bitDepth: parseInt(wiimResponse.metadata.bitDepth),
    };
  }
}

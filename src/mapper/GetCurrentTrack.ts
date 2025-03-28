import { IGetCurrentTrackResponse } from "../model/response/playback/GetCurrentTrack";
import { IGetCurrentTrackWiimResponse } from "../model/wiim/response/playback/GetCurrentTrack";
import { BaseMapper } from "./BaseMapper";

export class GetCurrentTrackMapper extends BaseMapper {
  mapWiimToCustom(
    wiimResponse: IGetCurrentTrackWiimResponse
  ): IGetCurrentTrackResponse {
    return {
      album: wiimResponse.metaData.album,
      title: wiimResponse.metaData.title,
      artist: wiimResponse.metaData.artist,
      albumArtUrl: wiimResponse.metaData.albumArtURI,
      sampleRate: parseInt(wiimResponse.metaData.sampleRate),
      bitDepth: parseInt(wiimResponse.metaData.bitDepth),
    };
  }
}

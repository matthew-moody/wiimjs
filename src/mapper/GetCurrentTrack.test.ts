import { IGetCurrentTrackResponse } from "../model/response/playback/GetCurrentTrack";
import { IGetCurrentTrackWiimResponse } from "../model/wiim/response/playback/GetCurrentTrack";
import { GetCurrentTrackMapper } from "./GetCurrentTrack";

describe("GetCurrentTrackMapper", () => {
  const mapper = new GetCurrentTrackMapper();

  describe("mapWiimToCustom", () => {
    it("should map the response correctly", () => {
      const wiimResponse: IGetCurrentTrackWiimResponse = {
        metaData: {
          album: "album",
          title: "title",
          artist: "artist",
          albumArtURI: "albumArtUrl",
          sampleRate: "44100",
          bitDepth: "16",
        },
      };

      const expected: IGetCurrentTrackResponse = {
        album: "album",
        title: "title",
        artist: "artist",
        albumArtUrl: "albumArtUrl",
        sampleRate: 44100,
        bitDepth: 16,
      };

      const actual = mapper.mapWiimToCustom(wiimResponse);

      expect(actual).toEqual(expected);
    });
  });
});

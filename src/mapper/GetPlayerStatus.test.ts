import { UnknownPlaybackChannelException } from "../model/exception/UnknownPlaybackChannelException";
import { UnknownPlaybackLoopModeException } from "../model/exception/UnknownPlaybackLoopModeException";
import { UnknownPlaybackSourceException } from "../model/exception/UnknownPlaybackSourceException";
import { UnknownPlaybackStatusException } from "../model/exception/UnknownPlaybackStatusException";
import {
  EPlaybackChannel,
  EPlaybackLoopMode,
  EPlaybackSource,
  EPlaybackStatus,
} from "../model/response/playback/GetPlaybackStatus";
import { GetPlayerStatusMapper } from "./GetPlayerStatus";

describe("GetPlayerStatusMapper", () => {
  const mapper = new GetPlayerStatusMapper();

  describe("mapChannel", () => {
    const testCases = [
      { input: "0", expected: EPlaybackChannel.STEREO },
      { input: "1", expected: EPlaybackChannel.LEFT },
      { input: "2", expected: EPlaybackChannel.RIGHT },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should map the input ${input} to ${expected}`, () => {
        expect(mapper.mapChannel(input)).toBe(expected);
      });
    });

    it("should throw an exception when the channel is unknown", () => {
      expect(() => mapper.mapChannel("3")).toThrow(
        UnknownPlaybackChannelException
      );
    });
  });

  describe("mapSource", () => {
    const testCases = [
      { input: "0", expected: EPlaybackSource.NONE },
      { input: "1", expected: EPlaybackSource.AIRPLAY },
      { input: "2", expected: EPlaybackSource.DNLA },
      { input: "10", expected: EPlaybackSource.WIMMU_DEFAULT },
      { input: "11", expected: EPlaybackSource.USB },
      { input: "12", expected: EPlaybackSource.SD_CARD },
      { input: "31", expected: EPlaybackSource.SPOTIFY },
      { input: "32", expected: EPlaybackSource.TIDAL },
      { input: "40", expected: EPlaybackSource.AUX },
      { input: "41", expected: EPlaybackSource.BLUETOOTH },
      { input: "42", expected: EPlaybackSource.EXTERNAL_STORAGE },
      { input: "43", expected: EPlaybackSource.OPTICAL },
      { input: "50", expected: EPlaybackSource.MIRROR },
      { input: "60", expected: EPlaybackSource.VOICE_MAIL },
      { input: "99", expected: EPlaybackSource.SLAVE },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should map the input ${input} to ${expected}`, () => {
        expect(mapper.mapSource(input)).toBe(expected);
      });
    });

    it("should throw an exception when the source is unknown", () => {
      expect(() => mapper.mapSource("100")).toThrow(
        UnknownPlaybackSourceException
      );
    });
  });

  describe("mapLoopMode", () => {
    const testCases = [
      { input: "0", expected: EPlaybackLoopMode.ALL },
      { input: "1", expected: EPlaybackLoopMode.SINGLE },
      { input: "2", expected: EPlaybackLoopMode.SHUFFLE_LOOP },
      { input: "3", expected: EPlaybackLoopMode.SHUFFLE_NO_LOOP },
      { input: "4", expected: EPlaybackLoopMode.NO_SHUFFLE_NO_LOOP },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should map the input ${input} to ${expected}`, () => {
        expect(mapper.mapLoopMode(input)).toBe(expected);
      });
    });

    it("should throw an exception when the loop mode is unknown", () => {
      expect(() => mapper.mapLoopMode("20")).toThrow(
        UnknownPlaybackLoopModeException
      );
    });
  });

  describe("mapStatus", () => {
    const testCases = [
      { input: "stop", expected: EPlaybackStatus.STOP },
      { input: "pause", expected: EPlaybackStatus.PAUSE },
      { input: "play", expected: EPlaybackStatus.PLAY },
      { input: "loading", expected: EPlaybackStatus.LOADING },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should map the input ${input} to ${expected}`, () => {
        expect(mapper.mapStatus(input)).toBe(expected);
      });
    });

    it("should throw an exception when the status is unknown", () => {
      expect(() => mapper.mapStatus("UNKNOWN")).toThrow(
        UnknownPlaybackStatusException
      );
    });
  });
});

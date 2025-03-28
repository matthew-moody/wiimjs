import { BaseMapper } from "./BaseMapper";

describe("BaseMapper", () => {
  const mapper = new BaseMapper();

  describe("mapIntToBoolean", () => {
    it("should return true when value is 1", () => {
      expect(mapper.mapIntToBoolean(1)).toBe(true);
    });

    it("should return false when value is 0", () => {
      expect(mapper.mapIntToBoolean(0)).toBe(false);
    });
  });
});

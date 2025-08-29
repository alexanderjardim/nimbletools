import { describe, it, expect } from "vitest";
import { Stat } from "./stat.model";

describe("Stat", () => {
  it("should create a Stat with a valid value", () => {
    const stat = new Stat(3);
    expect(stat.value).toBe(3);
  });

  it("should accept boundary values -1 and 5", () => {
    const stat1 = new Stat(-1);
    expect(stat1.value).toBe(-1);

    const stat2 = new Stat(5);
    expect(stat2.value).toBe(5);
  });

  it("should throw an error if the value is less than -1", () => {
    expect(() => new Stat(-2)).toThrow("Stat value must be between -1 and 5.");
  });

  it("should throw an error if the value is greater than 5", () => {
    expect(() => new Stat(6)).toThrow("Stat value must be between -1 and 5.");
  });
});

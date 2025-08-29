import { describe, it, expect } from "vitest";
import { Character } from "./character.model";
import { CharacterClass } from "./character-class.model";
import { HitDice } from "./hit-dice.model";
import { Ancestry } from "./ancestry.model";
import { Background } from "./background.model";

describe("Character", () => {
  // --- Test Setup ---
  // This mock data is now scoped to only the Character tests.
  const mockHitDice = new HitDice("d6" as any, 1);
  const mockCharacterClass = new CharacterClass(
    "wizard",
    "Wizard",
    "wizard.png",
    [],
    8,
    mockHitDice,
    new Map([
      ["strength", "Disadvantaged"],
      ["dexterity", "Normal"],
      ["intelligence", "Advantaged"],
      ["will", "Advantaged"],
    ]),
  );
  const mockAncestry = new Ancestry(
    "elf",
    "Elf",
    "elf.png",
    ["Graceful", "Long-lived"],
    "A pointy-eared forest dweller.",
    "Medium" as any,
  );
  const mockBackground = new Background(
    "sage",
    "Sage",
    "A life of study.",
    ["Scholarly"],
    "sage.png",
  );

  it("should construct a character with correct base properties", () => {
    const stats = new Map<string, number>();
    const skillPoints = new Map<string, number>();
    const character = new Character(
      "Elara",
      1,
      mockCharacterClass,
      mockAncestry,
      mockBackground,
      stats,
      skillPoints,
    );

    expect(character.name).toBe("Elara");
    expect(character.level).toBe(1);
    expect(character.characterClass.name).toBe("Wizard");
  });

  it("should correctly initialize stats from the stats map", () => {
    const stats = new Map([
      ["strength", 0],
      ["dexterity", 2],
      ["intelligence", 4],
      ["will", 1],
    ]);
    const skillPoints = new Map<string, number>();
    const character = new Character(
      "Elara",
      1,
      mockCharacterClass,
      mockAncestry,
      mockBackground,
      stats,
      skillPoints,
    );

    expect(character.stats.strength.value).toBe(0);
    expect(character.stats.dexterity.value).toBe(2);
  });

  it("should default a stat to 0 if not provided in the map", () => {
    const stats = new Map([
      ["strength", 0],
      ["intelligence", 4],
    ]);
    const skillPoints = new Map<string, number>();
    const character = new Character(
      "Elara",
      1,
      mockCharacterClass,
      mockAncestry,
      mockBackground,
      stats,
      skillPoints,
    );

    expect(character.stats.dexterity.value).toBe(0);
    expect(character.stats.will.value).toBe(0);
  });

  it("should correctly initialize saves based on the character class", () => {
    const stats = new Map<string, number>();
    const skillPoints = new Map<string, number>();
    const character = new Character(
      "Elara",
      1,
      mockCharacterClass,
      mockAncestry,
      mockBackground,
      stats,
      skillPoints,
    );

    expect(character.saves.strength.type).toBe("Disadvantaged");
    expect(character.saves.intelligence.type).toBe("Advantaged");
  });

  it("should correctly calculate skill totals (stat + points)", () => {
    const stats = new Map([
      ["strength", 1],
      ["dexterity", 3],
      ["intelligence", 5],
      ["will", 2],
    ]);
    const skillPoints = new Map([
      ["arcana", 2],
      ["might", 3],
      ["stealth", 1],
    ]);
    const character = new Character(
      "Elara",
      1,
      mockCharacterClass,
      mockAncestry,
      mockBackground,
      stats,
      skillPoints,
    );

    expect(character.skills.arcana).toBe(7);
    expect(character.skills.might).toBe(4);
    expect(character.skills.finesse).toBe(3); // 3 (dex) + 0 (points) = 3
  });

  it("should throw an error if a calculated skill total exceeds 12", () => {
    const stats = new Map([["intelligence", 5]]);
    const skillPoints = new Map([["arcana", 8]]);
    const createCharacter = () =>
      new Character(
        "Elara",
        1,
        mockCharacterClass,
        mockAncestry,
        mockBackground,
        stats,
        skillPoints,
      );

    expect(createCharacter).toThrow(
      "Skill arcana total (stat + points) cannot exceed 12.",
    );
  });
});

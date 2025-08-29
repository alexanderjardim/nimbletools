import { SaveType } from "../../../shared/constants/character.constants";
import { HitDice } from "./hit-dice.model"; // <-- Import the corrected HitDice class

export class CharacterClass {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly teasers: string[];
  readonly hitPoints: number;
  readonly hitDice: HitDice; // <-- Uses the imported class
  readonly saves: {
    strength: SaveType;
    dexterity: SaveType;
    intelligence: SaveType;
    will: SaveType;
  };

  // Test comment for pre-commit hook

  constructor(
    id: string,
    name: string,
    image: string,
    teasers: string[],
    hitPoints: number,
    hitDice: HitDice, // <-- Expects a proper HitDice object
    saves: Map<string, string>,
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.teasers = teasers;
    this.hitPoints = hitPoints;
    this.hitDice = hitDice;
    this.saves = {
      strength: saves.get("strength") as SaveType,
      dexterity: saves.get("dexterity") as SaveType,
      intelligence: saves.get("intelligence") as SaveType,
      will: saves.get("will") as SaveType,
    };
  }
}

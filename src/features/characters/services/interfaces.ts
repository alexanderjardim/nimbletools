import {
  HitDiceType,
  SaveType,
} from "../../../shared/constants/character.constants";

// It's helpful to have an interface for the raw JSON data
export interface ICharacterClassData {
  id: string;
  name: string;
  image: string;
  teasers: string[];
  hitPoints: number;
  hitDice: { dice: HitDiceType; quantity: number };
  saves: {
    strength: SaveType;
    dexterity: SaveType;
    intelligence: SaveType;
    will: SaveType;
  };
}

export interface IAncestryData {
  id: string;
  name: string;
  image: string;
  teasers: string[];
  description: string;
  size: string;
}

export interface IBackgroundData {
  id: string;
  name: string;
  description: string;
  teasers: string[];
  image: string;
}

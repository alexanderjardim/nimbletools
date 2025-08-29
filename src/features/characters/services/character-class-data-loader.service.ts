import { CharacterClass } from "../models/character-class.model";
import { HitDice } from "../models/hit-dice.model";
import { ICharacterClassData } from "./interfaces";

export class CharacterClassDataLoader {
  private static instance: CharacterClassDataLoader | null = null;
  private readonly _characterClasses: Map<string, CharacterClass> = new Map();
  public readonly characterClasses: ReadonlyMap<string, CharacterClass> =
    this._characterClasses;

  private constructor() {}

  public static getInstance(): CharacterClassDataLoader {
    if (!CharacterClassDataLoader.instance) {
      CharacterClassDataLoader.instance = new CharacterClassDataLoader();
    }
    return CharacterClassDataLoader.instance;
  }

  /**
   * A static factory method that creates a singleton instance by processing an array of data.
   * @param characterClassesData The array of character class data (e.g., an imported const).
   */
  public static create(
    characterClassesData: ICharacterClassData[],
  ): CharacterClassDataLoader {
    const loader =
      CharacterClassDataLoader.instance || new CharacterClassDataLoader();
    loader.processCharacterClasses(characterClassesData);

    if (!CharacterClassDataLoader.instance) {
      CharacterClassDataLoader.instance = loader;
    }

    return loader;
  }

  /**
   * Processes an array of raw data. Throws an error if any object is malformed.
   */
  private processCharacterClasses(data: ICharacterClassData[]) {
    for (const rawData of data) {
      // Removed the try...catch block. Any error here will now halt the process.
      const id = rawData.id || "unknown";
      if (!id || !rawData.saves || !rawData.hitDice || !rawData.name) {
        console.log("is malformed");
        throw new Error(`Object is missing required properties for id "${id}"`);
      }

      const savesMap = new Map(Object.entries(rawData.saves));
      const hitDice = new HitDice(
        rawData.hitDice.dice,
        rawData.hitDice.quantity,
      );

      const characterClass = new CharacterClass(
        rawData.id,
        rawData.name,
        rawData.image,
        rawData.teasers,
        rawData.hitPoints,
        hitDice,
        savesMap,
      );

      this._characterClasses.set(characterClass.id, characterClass);
    }
  }
}

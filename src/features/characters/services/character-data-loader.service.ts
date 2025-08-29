import { Ancestry } from '../models/ancestry.model';
import { Background } from '../models/background.model';
import { CharacterClass } from '../models/character-class.model';
import { HitDice } from '../models/hit-dice.model';

import { ancestryData } from '../data/ancestries.data';
import { backgroundsData } from '../data/backgrounds.data';
import { characterClassesData } from '../data/character-classes.data';

export class CharacterDataLoaderService {
  private static instance: CharacterDataLoaderService;

  private ancestries: Map<string, Ancestry> = new Map();
  private backgrounds: Map<string, Background> = new Map();
  private characterClasses: Map<string, CharacterClass> = new Map();

  private constructor() {
    this.loadAncestries();
    this.loadBackgrounds();
    this.loadCharacterClasses();
  }

  public static getInstance(): CharacterDataLoaderService {
    if (!CharacterDataLoaderService.instance) {
      CharacterDataLoaderService.instance = new CharacterDataLoaderService();
    }
    return CharacterDataLoaderService.instance;
  }

  private loadAncestries(): void {
    ancestryData.forEach((ancestryData: any) => {
      const ancestry = new Ancestry(
        ancestryData.id,
        ancestryData.name,
        ancestryData.image,
        ancestryData.teasers,
        ancestryData.description,
        ancestryData.size as any
      );
      this.ancestries.set(ancestry.name.toLowerCase(), ancestry);
    });
  }

  private loadBackgrounds(): void {
    backgroundsData.forEach((backgroundData: any) => {
      const background = new Background(
        backgroundData.id,
        backgroundData.name,
        backgroundData.description,
        backgroundData.teasers,
        backgroundData.image
      );
      this.backgrounds.set(background.name.toLowerCase(), background);
    });
  }

  private loadCharacterClasses(): void {
    characterClassesData.forEach((classData: any) => {
      const hitDice = new HitDice(classData.hitDice.dice, classData.hitDice.quantity);
      const savesMap = new Map(Object.entries(classData.saves)) as Map<string, string>;
      const characterClass = new CharacterClass(
        classData.id,
        classData.name,
        classData.image,
        classData.teasers,
        classData.hitPoints,
        hitDice,
        savesMap
      );
      this.characterClasses.set(characterClass.name.toLowerCase(), characterClass);
    });
  }

  public getAncestry(name: string): Ancestry {
    const ancestry = this.ancestries.get(name.toLowerCase());
    if (!ancestry) {
      throw new Error(`Ancestry not found: ${name}`);
    }
    return ancestry;
  }

  public getBackground(name: string): Background {
    const background = this.backgrounds.get(name.toLowerCase());
    if (!background) {
      throw new Error(`Background not found: ${name}`);
    }
    return background;
  }

  public getCharacterClass(name: string): CharacterClass {
    const characterClass = this.characterClasses.get(name.toLowerCase());
    if (!characterClass) {
      throw new Error(`Character class not found: ${name}`);
    }
    return characterClass;
  }

  public getAllAncestries(): Ancestry[] {
    return Array.from(this.ancestries.values());
  }

  public getAllBackgrounds(): Background[] {
    return Array.from(this.backgrounds.values());
  }

  public getAllCharacterClasses(): CharacterClass[] {
    return Array.from(this.characterClasses.values());
  }
}
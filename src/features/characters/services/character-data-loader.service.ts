import { Ancestry } from '../models/ancestry.model';
import { Background } from '../models/background.model';
import { CharacterClass } from '../models/character-class.model';

import ancestriesData from '../data/ancestries.data';
import backgroundsData from '../data/backgrounds.data';
import characterClassesData from '../data/character-classes.data';

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
    ancestriesData.forEach(ancestryData => {
      const ancestry = new Ancestry(
        ancestryData.name,
        ancestryData.size,
        ancestryData.traits,
        ancestryData.languages,
        ancestryData.speed
      );
      this.ancestries.set(ancestry.name.toLowerCase(), ancestry);
    });
  }

  private loadBackgrounds(): void {
    backgroundsData.forEach(backgroundData => {
      const background = new Background(
        backgroundData.name,
        backgroundData.description,
        backgroundData.skills,
        backgroundData.equipment
      );
      this.backgrounds.set(background.name.toLowerCase(), background);
    });
  }

  private loadCharacterClasses(): void {
    characterClassesData.forEach(classData => {
      const characterClass = new CharacterClass(
        classData.name,
        classData.hitDice,
        classData.hitPoints,
        classData.primaryAbilities,
        classData.saves,
        classData.proficiencies,
        classData.equipment
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
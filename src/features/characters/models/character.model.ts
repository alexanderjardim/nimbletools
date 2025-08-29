import {
  Size,
  SKILL_STATS,
  SkillName,
  StatName,
} from "../../../shared/constants/character.constants";
import { Ancestry } from "./ancestry.model";
import { Background } from "./background.model";
import { CharacterClass } from "./character-class.model";
import { HitDice } from "./hit-dice.model";
import { Save } from "./save.model";
import { Stat } from "./stat.model";

export class Character {
  readonly name: string;
  readonly level: number;
  readonly characterClass: CharacterClass;
  readonly ancestry: Ancestry;
  readonly background: Background;
  readonly size: Size;
  readonly speed: number;
  readonly height: number;
  readonly weight: number;
  readonly hitDice: HitDice;
  readonly hitPoints: number;
  readonly temporaryHitPoints: number;
  readonly stats: { [key in StatName]: Stat };
  readonly saves: { [key in StatName]: Save };
  readonly skills: { [key in SkillName]: number };

  constructor(
    name: string,
    level: number,
    characterClass: CharacterClass,
    ancestry: Ancestry,
    background: Background,
    stats: Map<string, number>,
    skillPoints: Map<string, number>,
    height: number = 0,
    weight: number = 0,
  ) {
    this.name = name;
    this.level = level;
    this.characterClass = characterClass;
    this.ancestry = ancestry;
    this.background = background;
    this.hitDice = characterClass.hitDice;
    this.hitPoints = characterClass.hitPoints;
    this.temporaryHitPoints = 0;
    this.size = ancestry.size;
    this.speed = 6;
    this.height = height;
    this.weight = weight;

    this.stats = {
      strength: new Stat(stats.get("strength") ?? 0),
      dexterity: new Stat(stats.get("dexterity") ?? 0),
      intelligence: new Stat(stats.get("intelligence") ?? 0),
      will: new Stat(stats.get("will") ?? 0),
    };

    this.saves = {
      strength: new Save(characterClass.saves.strength, "strength"),
      dexterity: new Save(characterClass.saves.dexterity, "dexterity"),
      intelligence: new Save(characterClass.saves.intelligence, "intelligence"),
      will: new Save(characterClass.saves.will, "will"),
    };

    this.skills = this.calculateSkills(skillPoints);
  }

  private calculateSkills(skillPoints: Map<string, number>): {
    [key in SkillName]: number;
  } {
    const calculatedSkills = {} as { [key in SkillName]: number };

    for (const skillName of Object.keys(SKILL_STATS) as SkillName[]) {
      const associatedStatName = SKILL_STATS[skillName];
      const statValue = this.stats[associatedStatName].value;
      const points = skillPoints.get(skillName) ?? 0;
      const total = statValue + points;

      if (total > 12) {
        throw new Error(
          `Skill ${skillName} total (stat + points) cannot exceed 12.`,
        );
      }
      calculatedSkills[skillName] = total;
    }
    return calculatedSkills;
  }
}

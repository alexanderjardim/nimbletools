import { SkillName, StatName } from '../../../shared/constants/character.constants';

export class Skill {
    readonly points: number;

    constructor(
        public readonly name: SkillName,
        public readonly stat: StatName,
        points: number
    ) {
        if (points < 0) throw new Error("Skill points cannot be negative.");
        this.points = points;
    }
}
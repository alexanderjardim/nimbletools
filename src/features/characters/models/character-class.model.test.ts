import { describe, it, expect } from 'vitest';
import { CharacterClass } from './character-class.model';
import { HitDice } from './hit-dice.model';

describe('CharacterClass', () => {
    it('should construct a CharacterClass and correctly map saves', () => {
        const savesMap = new Map<string, string>([
            ['strength', 'Advantaged'],
            ['dexterity', 'Normal'],
            ['intelligence', 'Disadvantaged'],
            ['will', 'Normal'],
        ]);

        const hitDice = new HitDice("d8", 1);

        const charClass = new CharacterClass(
            'fighter',
            'Fighter',
            'fighter.png',
            ['A master of combat'],
            10,
            hitDice,
            savesMap
        );

        expect(charClass.id).toBe('fighter');
        expect(charClass.name).toBe('Fighter');
        expect(charClass.hitPoints).toBe(10);
        expect(charClass.hitDice.dice).toBe('d8');
        expect(charClass.saves.strength).toBe('Advantaged');
        expect(charClass.saves.dexterity).toBe('Normal');
    });
});

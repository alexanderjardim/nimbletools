import { describe, it, expect, beforeEach } from 'vitest';
import { CharacterClassDataLoader } from '../services/character-class-data-loader.service';
import { ICharacterClassData } from '../services/interfaces';
import { HitDiceType, SaveType } from '../../../shared/constants/character.constants';

describe('CharacterClassDataLoader', () => {
    const mockCharacterClassData: ICharacterClassData[] = [
        {
            id: 'fighter',
            name: 'Fighter',
            image: 'fighter.png',
            teasers: ['Strong', 'Martial'],
            hitPoints: 10,
            hitDice: { dice: 'd10' as HitDiceType, quantity: 1 },
            saves: {
                strength: 'good' as SaveType,
                dexterity: 'poor' as SaveType,
                intelligence: 'poor' as SaveType,
                will: 'poor' as SaveType
            }
        },
        {
            id: 'mage',
            name: 'Mage',
            image: 'mage.png',
            teasers: ['Magical', 'Intelligent'],
            hitPoints: 6,
            hitDice: { dice: 'd6' as HitDiceType, quantity: 1 },
            saves: {
                strength: 'poor' as SaveType,
                dexterity: 'poor' as SaveType,
                intelligence: 'good' as SaveType,
                will: 'good' as SaveType
            }
        }
    ];

    let loader: CharacterClassDataLoader;

    beforeEach(() => {
        // Reset the singleton instance before each test
        (CharacterClassDataLoader as any).instance = null;
        loader = CharacterClassDataLoader.create(mockCharacterClassData);
    });

    it('should create a singleton instance', () => {
        const secondLoader = CharacterClassDataLoader.getInstance();
        expect(secondLoader).toBe(loader);
    });

    it('should load character classes correctly', () => {
        expect(loader.characterClasses.size).toBe(2);

        const fighter = loader.characterClasses.get('fighter');
        expect(fighter).toBeDefined();
        expect(fighter?.name).toBe('Fighter');
        expect(fighter?.id).toBe('fighter');
        expect(fighter?.hitPoints).toBe(10);
    });

    it('should create a map of saves for each character class', () => {
        const fighter = loader.characterClasses.get('fighter');
        expect(fighter?.saves.strength).toBe('good');
        expect(fighter?.saves.dexterity).toBe('poor');
    });

    it('should throw an error for malformed character class data', () => {
        const malformedData: ICharacterClassData[] = [
            {
                id: '',  // Missing id
                name: '',
                image: '',
                teasers: [],
                hitPoints: 0,
                hitDice: { dice: 'd7' as HitDiceType, quantity: 0 },
                saves: {
                    strength: 'poor' as SaveType,
                    dexterity: 'poor' as SaveType,
                    intelligence: 'poor' as SaveType,
                    will: 'poor' as SaveType
                }
            }
        ];
        expect(() => CharacterClassDataLoader.create(malformedData)).toThrow('Object is missing required properties for id "unknown"');
    });

    it('should use id as the key for character classes', () => {
        const fighter = loader.characterClasses.get('fighter');
        expect(fighter).toBeDefined();
        expect(loader.characterClasses.get('Fighter')).toBeUndefined();
    });
});
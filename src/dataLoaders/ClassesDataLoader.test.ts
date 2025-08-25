import { vi } from 'vitest';
import { classesDataLoader } from './ClassesDataLoader';
import { CharacterClass } from '../types/CharacterClass';

// Mock import.meta.glob to simulate loading from the test data folder
vi.mock('../../data/classes/*.json', () => ({
  default: {
    fighter: {
      id: 'fighter',
      name: 'Fighter',
      image: '/assets/class_images/fighter.png',
      teasers: ['Master of weapons and armor'],
    },
    mage: {
      id: 'mage',
      name: 'Mage',
      image: '/assets/class_images/mage.png',
      teasers: ['Wielder of arcane spells'],
    },
    rogue: {
      id: 'rogue',
      name: 'Rogue',
      image: '/assets/class_images/rogue.png',
      teasers: ['Stealthy and cunning'],
    },
  },
}));

describe('ClassesDataLoader', () => {
  test('should load classes into the map', async () => {
    // Ensure the async loadClasses has completed
    await vi.waitFor(() => classesDataLoader.getClasses().size > 0);

    const classesMap = await classesDataLoader.getClasses();
    expect(classesMap.size).toBe(3);
    expect(classesMap.get('fighter')).toEqual({
      id: 'fighter',
      name: 'Fighter',
      image: '/assets/class_images/fighter.png',
      teasers: ['Master of weapons and armor'],
    });
    expect(classesMap.get('Mage')).toEqual({
      id: 'mage',
      name: 'Mage',
      image: '/assets/class_images/mage.png',
      teasers: ['Wielder of arcane spells'],
    });
    expect(classesMap.get('Rogue')).toEqual({
      id: 'rogue',
      name: 'Rogue',
      image: '/assets/class_images/rogue.png',
      teasers: ['Stealthy and cunning'],
    });
  });

  test('should return a specific class by name', async () => {
    // Ensure the async loadClasses has completed
    await vi.waitFor(() => classesDataLoader.getClasses().size > 0);

    const fighterClass = await classesDataLoader.getClass('Fighter');
    expect(fighterClass).toEqual({
      id: 'fighter',
      name: 'Fighter',
      image: '/assets/class_images/fighter.png',
      teasers: ['Master of weapons and armor'],
    });

    const nonExistentClass = await classesDataLoader.getClass('Warrior');
    expect(nonExistentClass).toBeUndefined();
  });
});
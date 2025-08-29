import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CharacterStorageService } from './character-storage.service';

describe('CharacterStorageService', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clear local storage after each test
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should save a character to local storage', () => {
    const characterData1 = { name: 'Character 1' };
    CharacterStorageService.saveCharacter(characterData1);

    const savedCharacters = CharacterStorageService.getAllCharacters();
    const savedCharacterKeys = Object.keys(savedCharacters);

    expect(savedCharacterKeys.length).toBe(1);
    expect(savedCharacters[savedCharacterKeys[0]].name).toBe('Character 1');
    expect(savedCharacters[savedCharacterKeys[0]].createdAt).toBeDefined();
  });

  it('should retrieve all saved characters', () => {
    const characterData1 = { name: 'Character 1' };
    const characterData2 = { name: 'Character 2' };

    // Ensure unique timestamps to simulate separate saves
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 0, 1));
    CharacterStorageService.saveCharacter(characterData1);
    
    vi.setSystemTime(new Date(2023, 0, 2));
    CharacterStorageService.saveCharacter(characterData2);

    const savedCharacters = CharacterStorageService.getAllCharacters();
    const savedCharacterKeys = Object.keys(savedCharacters);

    expect(savedCharacterKeys.length).toBe(2);
    expect(savedCharacters[savedCharacterKeys[0]].name).toBe('Character 1');
    expect(savedCharacters[savedCharacterKeys[1]].name).toBe('Character 2');
    vi.useRealTimers();
  });

  it('should delete a specific character', () => {
    const characterData1 = { name: 'Character 1' };
    const characterData2 = { name: 'Character 2' };

    // Ensure unique timestamps to simulate separate saves
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 0, 1));
    CharacterStorageService.saveCharacter(characterData1);
    
    vi.setSystemTime(new Date(2023, 0, 2));
    CharacterStorageService.saveCharacter(characterData2);

    const savedCharactersBeforeDeletion = CharacterStorageService.getAllCharacters();
    const savedCharacterKeys = Object.keys(savedCharactersBeforeDeletion);

    expect(savedCharacterKeys.length).toBe(2);

    // Delete the first character
    const characterIdToDelete = savedCharacterKeys[0];
    CharacterStorageService.deleteCharacter(characterIdToDelete);

    const savedCharactersAfterDeletion = CharacterStorageService.getAllCharacters();
    const remainingCharacterKeys = Object.keys(savedCharactersAfterDeletion);

    expect(remainingCharacterKeys.length).toBe(1);
    expect(savedCharactersAfterDeletion[remainingCharacterKeys[0]].name).toBe('Character 2');
    vi.useRealTimers();
  });

  it('should handle errors when saving characters', () => {
    // Simulate localStorage being unavailable
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    expect(() => {
      CharacterStorageService.saveCharacter({ name: 'Test Character' });
    }).toThrow('Could not save character to local storage');

    expect(mockSetItem).toHaveBeenCalled();
  });

  it('should handle errors when deleting characters', () => {
    // First save a character to ensure we have something to delete
    CharacterStorageService.saveCharacter({ name: 'Test Character' });

    // Simulate localStorage being unavailable
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    const characterId = Object.keys(CharacterStorageService.getAllCharacters())[0];

    expect(() => {
      CharacterStorageService.deleteCharacter(characterId);
    }).toThrow('Could not delete character from local storage');

    expect(mockSetItem).toHaveBeenCalled();
  });
});
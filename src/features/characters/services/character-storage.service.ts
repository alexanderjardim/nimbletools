export class CharacterStorageService {
    private static STORAGE_KEY = 'nimble-characters';

    /**
     * Save a character to local storage
     * @param characterData Complete character data object
     */
    public static saveCharacter(characterData: Record<string, any>): void {
        try {
            // Generate a unique ID for the character
            const characterId = `character-${Date.now()}`;
            
            // Retrieve existing characters
            const existingCharacters = this.getAllCharacters();
            
            // Add new character
            existingCharacters[characterId] = {
                ...characterData,
                createdAt: new Date().toISOString(),
            };

            // Save back to local storage
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingCharacters));
        } catch (error) {
            console.error('Failed to save character:', error);
            throw new Error('Could not save character to local storage');
        }
    }

    /**
     * Retrieve all saved characters
     * @returns Object of characters, keyed by their unique ID
     */
    public static getAllCharacters(): Record<string, any> {
        try {
            const storedCharacters = localStorage.getItem(this.STORAGE_KEY);
            return storedCharacters ? JSON.parse(storedCharacters) : {};
        } catch (error) {
            console.error('Failed to retrieve characters:', error);
            return {};
        }
    }

    /**
     * Delete a specific character by ID
     * @param characterId Unique identifier of the character to delete
     */
    public static deleteCharacter(characterId: string): void {
        try {
            const existingCharacters = this.getAllCharacters();
            delete existingCharacters[characterId];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingCharacters));
        } catch (error) {
            console.error('Failed to delete character:', error);
            throw new Error('Could not delete character from local storage');
        }
    }
}
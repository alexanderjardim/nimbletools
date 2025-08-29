export class CharacterStorageService {
  private static STORAGE_KEY = "nimble-characters";
  private static IN_PROGRESS_KEY = "nimble-character-in-progress";

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
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(existingCharacters),
      );
    } catch (error) {
      console.error("Failed to save character:", error);
      throw new Error("Could not save character to local storage");
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
      console.error("Failed to retrieve characters:", error);
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
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(existingCharacters),
      );
    } catch (error) {
      console.error("Failed to delete character:", error);
      throw new Error("Could not delete character from local storage");
    }
  }

  /**
   * Save in-progress character creation data
   * @param characterData Partial character data and current step
   */
  public static saveInProgressCharacter(
    characterData: Record<string, any>,
    currentStep: number,
  ): void {
    try {
      console.log("CharacterStorageService saveInProgressCharacter called:", {
        characterData,
        currentStep,
      });
      // Don't save if the data is essentially empty
      const hasProgress =
        characterData.class ||
        characterData.ancestry ||
        characterData.background ||
        Object.keys(characterData.stats || {}).length > 0 ||
        Object.keys(characterData.skills || {}).length > 0 ||
        characterData.name ||
        currentStep > 1;

      console.log("CharacterStorageService hasProgress check:", hasProgress);

      if (!hasProgress) {
        console.log(
          "CharacterStorageService clearing in-progress data (no progress)",
        );
        this.clearInProgressCharacter();
        return;
      }

      const inProgressData = {
        ...characterData,
        currentStep,
        lastSaved: new Date().toISOString(),
      };
      console.log("CharacterStorageService saving data:", inProgressData);
      localStorage.setItem(
        this.IN_PROGRESS_KEY,
        JSON.stringify(inProgressData),
      );
      console.log("CharacterStorageService saveInProgressCharacter completed");
    } catch (error) {
      console.error("Failed to save in-progress character:", error);
      throw new Error("Could not save in-progress character data");
    }
  }

  /**
   * Get in-progress character creation data
   * @returns Object containing character data and current step, or null if none exists
   */
  public static getInProgressCharacter(): {
    characterData: Record<string, any>;
    currentStep: number;
  } | null {
    try {
      const storedData = localStorage.getItem(this.IN_PROGRESS_KEY);
      if (!storedData) return null;

      const parsedData = JSON.parse(storedData);
      const { currentStep, lastSaved, ...characterData } = parsedData;

      return {
        characterData,
        currentStep: currentStep || 1,
      };
    } catch (error) {
      console.error("Failed to retrieve in-progress character:", error);
      return null;
    }
  }

  /**
   * Clear in-progress character creation data
   */
  public static clearInProgressCharacter(): void {
    try {
      localStorage.removeItem(this.IN_PROGRESS_KEY);
    } catch (error) {
      console.error("Failed to clear in-progress character:", error);
    }
  }

  /**
   * Check if there's an in-progress character creation
   * @returns true if there's in-progress data, false otherwise
   */
  public static hasInProgressCharacter(): boolean {
    return this.getInProgressCharacter() !== null;
  }
}

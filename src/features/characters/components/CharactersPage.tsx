import React, { useState, useEffect } from "react";
import { CharacterStorageService } from "../services/character-storage.service";

interface Character {
  id: string;
  name: string;
  class: string;
  ancestry: string;
  background: string;
  stats: {
    strength: number;
    dexterity: number;
    intelligence: number;
    will: number;
  };
  skills: Record<string, number>;
  height: string;
  weight: string;
  age: string;
  createdAt: string;
}

// Define the type for the props our component will receive.
interface CharactersPageProps {
  onBackClick: () => void;
  onCreateNewCharacter: () => void;
  onResumeCharacter?: () => void;
}

// Reusable button styles for consistency
const primaryButtonStyles =
  "w-full max-w-xs bg-gradient-to-r from-bronze to-bronze-dark border-2 border-saddle-brown rounded-lg text-white p-4 text-2xl font-fell cursor-pointer shadow-md text-shadow transition-all duration-300 hover:from-bronze-light hover:to-bronze hover:shadow-glow-red hover:-translate-y-0.5 active:from-bronze-dark active:to-bronze-dark active:translate-y-0";
const secondaryButtonStyles =
  "w-full max-w-xs bg-gradient-to-r from-bronze-dark to-saddle-brown border-2 border-bronze-dark rounded-lg text-white p-3 text-xl font-fell cursor-pointer shadow-md text-shadow transition-all duration-300 hover:from-bronze hover:to-bronze-dark hover:-translate-y-0.5 active:from-saddle-brown active:to-saddle-brown active:translate-y-0";

const CharactersPage: React.FC<CharactersPageProps> = ({
  onBackClick,
  onCreateNewCharacter,
  onResumeCharacter,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInProgressCharacter, setHasInProgressCharacter] = useState(false);

  useEffect(() => {
    loadCharacters();
    checkInProgressCharacter();
  }, []);

  // Refresh data when component becomes visible or focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("CharactersPage: Page became visible, refreshing data");
        checkInProgressCharacter();
        loadCharacters();
      }
    };

    const handleFocus = () => {
      console.log("CharactersPage: Window focused, refreshing data");
      checkInProgressCharacter();
      loadCharacters();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // Also refresh immediately when component mounts
    checkInProgressCharacter();
    loadCharacters();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Check for in-progress character and reload characters when component becomes visible or focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkInProgressCharacter();
        loadCharacters();
      }
    };

    const handleFocus = () => {
      checkInProgressCharacter();
      loadCharacters();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const loadCharacters = () => {
    setIsLoading(true);
    try {
      const savedCharacters = CharacterStorageService.getAllCharacters();
      const characterList: Character[] = Object.entries(savedCharacters).map(
        ([id, data]) => ({
          id,
          ...(data as Omit<Character, "id">),
        }),
      );
      setCharacters(characterList);
    } catch (error) {
      console.error("Failed to load characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkInProgressCharacter = () => {
    setHasInProgressCharacter(CharacterStorageService.hasInProgressCharacter());
  };

  const handleCreateNewCharacter = () => {
    console.log("CharactersPage handleCreateNewCharacter called");
    // Clear any in-progress character data
    CharacterStorageService.clearInProgressCharacter();
    setHasInProgressCharacter(false);
    console.log("CharactersPage calling onCreateNewCharacter");
    onCreateNewCharacter();
  };

  const handleResumeCharacter = () => {
    console.log("CharactersPage handleResumeCharacter called");
    if (onResumeCharacter) {
      console.log("CharactersPage calling onResumeCharacter");
      onResumeCharacter();
    } else {
      console.log("CharactersPage onResumeCharacter is not defined");
    }
  };

  const handleDeleteCharacter = (characterId: string) => {
    const character = characters.find((c) => c.id === characterId);
    const isEmptyName = !character?.name || character.name.trim() === "";

    // Skip confirmation for characters with empty names
    if (
      isEmptyName ||
      window.confirm("Are you sure you want to delete this character?")
    ) {
      try {
        CharacterStorageService.deleteCharacter(characterId);
        loadCharacters(); // Reload the list
      } catch (error) {
        console.error("Failed to delete character:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="w-screen flex-shrink-0 p-6 box-border overflow-y-auto flex flex-col items-center justify-between bg-parchment font-fell">
      <div className="w-full flex-grow flex flex-col items-center">
        <h2 className="text-4xl text-saddle-brown mb-4 text-shadow-md">
          Characters
        </h2>

        {isLoading ? (
          <p className="text-brown-dark text-center mt-8">
            Loading characters...
          </p>
        ) : characters.length === 0 ? (
          <div className="text-center text-brown-dark py-8 flex flex-col items-center gap-4">
            <p className="text-xl mb-4">No characters created yet</p>
            {hasInProgressCharacter && (
              <button
                className={primaryButtonStyles}
                onClick={handleResumeCharacter}
              >
                Resume Character Creation
              </button>
            )}
            <button
              className={primaryButtonStyles}
              onClick={handleCreateNewCharacter}
            >
              Create New Character
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-full max-w-6xl">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-parchment-light rounded-lg p-6 border-2 border-saddle-brown shadow-lg transition-all duration-300 hover:border-bronze hover:shadow-glow-red flex flex-col"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-brown-dark mb-2">
                    {character.name}
                  </h3>
                  <div className="text-brown-dark text-sm">
                    <p className="capitalize">
                      Level 1 {character.ancestry} {character.class}
                    </p>
                    <p className="capitalize text-saddle-brown">
                      {character.background}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-saddle-brown font-bold mb-2">Stats</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-brown-dark">
                      STR:{" "}
                      <span className="font-bold">
                        {character.stats.strength}
                      </span>
                    </div>
                    <div className="text-brown-dark">
                      DEX:{" "}
                      <span className="font-bold">
                        {character.stats.dexterity}
                      </span>
                    </div>
                    <div className="text-brown-dark">
                      INT:{" "}
                      <span className="font-bold">
                        {character.stats.intelligence}
                      </span>
                    </div>
                    <div className="text-brown-dark">
                      WILL:{" "}
                      <span className="font-bold">{character.stats.will}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-saddle-brown grid grid-cols-3 gap-2">
                    <div>Height: {character.height}</div>
                    <div>Weight: {character.weight}</div>
                    <div>Age: {character.age}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-saddle-brown">
                  <span className="text-xs text-saddle-brown">
                    Created: {formatDate(character.createdAt)}
                  </span>
                  <button
                    onClick={() => handleDeleteCharacter(character.id)}
                    className="text-red-700 hover:text-white text-sm px-3 py-1 rounded border border-red-700 hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 w-full justify-center max-w-lg">
        <button className={secondaryButtonStyles} onClick={onBackClick}>
          Back to Menu
        </button>
        {characters.length > 0 && !isLoading && (
          <>
            {hasInProgressCharacter && (
              <button
                className={primaryButtonStyles}
                onClick={handleResumeCharacter}
              >
                Resume Character
              </button>
            )}
            <button
              className={primaryButtonStyles}
              onClick={handleCreateNewCharacter}
            >
              Create New Character
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CharactersPage;

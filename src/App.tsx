import React, { useState, useEffect } from "react";
import CharactersPage from "./features/characters/components/CharactersPage";
import CharacterCreationPage from "./features/characters/components/CharacterCreationPage";
import { CharacterStorageService } from "./features/characters/services/character-storage.service";

const primaryButtonStyles =
  "w-full bg-gradient-to-r from-bronze to-bronze-dark border-2 border-saddle-brown rounded-lg text-white p-4 text-2xl font-fell cursor-pointer shadow-md text-shadow transition-all duration-300 hover:from-bronze-light hover:to-bronze hover:shadow-glow-red hover:-translate-y-0.5 active:from-bronze-dark active:to-bronze-dark active:translate-y-0";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "main" | "Characters" | "CharacterCreation"
  >("main");
  const [resumeData, setResumeData] = useState<
    { characterData: Record<string, any>; currentStep: number } | undefined
  >(undefined);
  const [characterCreationKey, setCharacterCreationKey] = useState(0);
  const [charactersPageKey, setCharactersPageKey] = useState(0);

  useEffect(() => {
    // Auto-click the Characters button if there's only one button on the main page
    if (currentPage === "main") {
      const timer = setTimeout(() => {
        handleMenuClick("Characters");
      }, 100); // Small delay to ensure component is fully rendered
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleMenuClick = (page: "Characters") => {
    setCurrentPage(page);
  };
  const handleBackClick = () => {
    if (currentPage === "CharacterCreation") {
      setCurrentPage("Characters");
    } else {
      setCurrentPage("main");
    }
  };

  const handleCreateCharacterClick = () => {
    console.log("handleCreateCharacterClick: Setting resumeData to undefined");
    console.log("handleCreateCharacterClick: Current resumeData:", resumeData);
    setResumeData(undefined);
    setCharacterCreationKey((prev) => prev + 1); // Force component remount
    console.log("handleCreateCharacterClick: Navigating to CharacterCreation");
    setCurrentPage("CharacterCreation");
  };

  const handleResumeCharacterClick = () => {
    const inProgressData = CharacterStorageService.getInProgressCharacter();
    if (inProgressData) {
      console.log(
        "handleResumeCharacterClick: Setting resumeData to inProgressData",
      );
      setResumeData(inProgressData);
      console.log(
        "handleResumeCharacterClick: Navigating to CharacterCreation",
      );
      setCurrentPage("CharacterCreation");
    }
  };

  const handleCharacterSaved = () => {
    console.log(
      "handleCharacterSaved: Character saved, going back to Characters page",
    );
    // Go back to Characters page so user can see their saved character
    setCharactersPageKey((prev) => prev + 1); // Force CharactersPage to refresh
    setCurrentPage("Characters");
  };

  const getTransformValue = () => {
    switch (currentPage) {
      case "main":
        return "translateX(0)";
      case "Characters":
        return "translateX(-100vw)";
      case "CharacterCreation":
        return "translateX(-200vw)";
      default:
        return "translateX(0)";
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <header className="bg-gradient-to-r from-bronze to-bronze-dark text-white p-4 text-center shadow-lg text-shadow">
        <h1 className="text-4xl font-fell">Nimble Tools</h1>
      </header>

      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: getTransformValue(), width: "300vw" }}
      >
        {/* The Main Menu Page */}
        <div className="w-screen flex-shrink-0 p-6 box-border overflow-y-auto flex flex-col items-center justify-center bg-parchment">
          <main className="flex flex-col gap-6 w-full max-w-md items-center">
            <button
              className={primaryButtonStyles}
              onClick={() => handleMenuClick("Characters")}
            >
              Characters
            </button>
          </main>
        </div>

        {/* The refactored CharactersPage component */}
        <CharactersPage
          key={charactersPageKey}
          onBackClick={handleBackClick}
          onCreateNewCharacter={handleCreateCharacterClick}
          onResumeCharacter={handleResumeCharacterClick}
        />

        {/* This component would be the next to refactor */}
        <CharacterCreationPage
          key={characterCreationKey}
          onBackClick={handleBackClick}
          onCharacterSaved={handleCharacterSaved}
          resumeData={resumeData}
        />
      </div>
    </div>
  );
};

export default App;

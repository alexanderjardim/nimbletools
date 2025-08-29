# Troubleshoot page rendering issue

## Problem

The elements in the characters page don't render when the character-classes.data.ts is big enough

The file /src/features/characters/components/CharactersPAge.tsx is where the rendering issue is happening.
The file /src/features/characters/components/ChooseClasse.tsx is where the character class data is loaded. 

## Code

### App.css
```css
/* Add a Google Font for a high-contrast, readable style */
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&display=swap');

body {
  /* Parchment background color as a fallback */
  background-color: #f5deb3;
  /* Add a parchment texture image here */
  /* background-image: url('path/to/your/parchment-texture.jpg'); */
  font-family: 'IM Fell English SC', serif;
  color: #3a2d1d;
  /* Dark brown color for high contrast */
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  /* This is crucial to prevent horizontal scrolling */
}

/* Header styling */
.app-header {
  background: linear-gradient(145deg, #cd7f32, #a0522d);
  color: #fff;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-shadow: 1px 1px 2px black;
}

/* Page container for the sliding effect */
.page-container {
  display: flex;
  width: 400vw;
  /* 100vw for each of the 4 pages (1 menu + 3 sections) */
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

/* Page styling (for each individual page within the container) */
.page {
  width: 100vw;
  flex-shrink: 0;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  /* Enable vertical scrolling for long content */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Main menu page-specific styles */
.main-menu-page {
  background-color: #f5deb3;
  justify-content: center;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  align-items: center;
}

/* Menu button styling */
.menu-button {
  width: 100%;
  background: linear-gradient(145deg, #cd7f32, #a0522d);
  border: 2px solid #8b4513;
  border-radius: 10px;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-family: 'IM Fell English SC', serif;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px black;
}

.menu-button:hover {
  background: linear-gradient(145deg, #e08f43, #b36b3f);
  box-shadow: 0 0 20px 5px #ff0000, 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.menu-button:active {
  background: linear-gradient(145deg, #b36b3f, #a0522d);
  transform: translateY(0);
}

/* Section page-specific styles */
.section-page {
  background-color: #f5deb3;
  justify-content: space-between;
}

.section-content {
  text-align: center;
}

.section-title {
  font-size: 2rem;
  color: #8b4513;
  margin-bottom: 1rem;
}

/* Back button styling */
.back-button {
  background: linear-gradient(145deg, #a0522d, #8b4513);
  border: 2px solid #5d2a13;
  border-radius: 10px;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  font-family: 'IM Fell English SC', serif;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px black;
  margin-top: 1rem;
}

.back-button:hover {
  background: linear-gradient(145deg, #b36b3f, #a0522d);
  transform: translateY(-2px);
}

.back-button:active {
  background: linear-gradient(145deg, #5d2a13, #a0522d);
  transform: translateY(0);
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.choose-class-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.class-card {
  background-color: #f0e6d6; /* Lighter parchment for cards */
  border: 2px solid #8b4513;
  border-radius: 10px;
  padding: 15px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.class-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.class-card.selected {
  border-color: #ff0000; /* Highlight color for selected card */
  box-shadow: 0 0 15px 5px #ff0000; /* Glow effect */
}

.class-image {
  width: 100%;
  height: 120px; /* Fixed height for images */
  object-fit: cover; /* Cover the area without distortion */
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #a0522d;
}

.class-name {
  font-size: 1.5rem;
  color: #8b4513;
  margin-bottom: 10px;
}

.class-teasers {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  color: #3a2d1d;
}

.class-teasers li {
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.attributes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.attribute-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  width: 100%;
  max-width: 600px;
}

.attribute-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0e6d6;
  border: 2px solid #8b4513;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.attribute-item label {
  font-size: 1.1rem;
  color: #8b4513;
  margin-bottom: 5px;
}

.attribute-item input[type="number"] {
  width: 80px;
  padding: 8px;
  border: 1px solid #a0522d;
  border-radius: 5px;
  text-align: center;
  font-size: 1rem;
  background-color: #fffaf0;
  color: #3a2d1d;
}

.attribute-item input[type="number"]:focus {
  outline: none;
  border-color: #cd7f32;
  box-shadow: 0 0 5px rgba(205, 127, 50, 0.5);
}

/* Media query for smaller screens to optimize layout */
@media (max-width: 600px) {
  .menu-buttons {
    padding: 0 1rem;
  }

  .menu-button {
    font-size: 1.2rem;
    padding: 0.75rem;
  }
}
```

### ./App.tsx
```tsx
import React, { useState } from 'react';
import './App.css';
import CharactersPage from './features/characters/components/CharactersPage';
import CharacterCreationPage from './features/characters/components/CharacterCreationPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'main' | 'Characters' | 'CharacterCreation'>('main');

  const handleMenuClick = (page: 'Characters') => {
    setCurrentPage(page);
  };
  1
  const handleBackClick = () => {
    if (currentPage === 'CharacterCreation') {
      setCurrentPage('Characters');
    } else {
      setCurrentPage('main');
    }
  };

  const handleCreateCharacterClick = () => {
    setCurrentPage('CharacterCreation');
  };

  const getTransformValue = () => {
    switch (currentPage) {
      case 'main':
        return 'translateX(0)';
      case 'Characters':
        return 'translateX(-100vw)';
      case 'CharacterCreation':
        return 'translateX(-200vw)';
      default:
        return 'translateX(0)';
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Nimble Tools</h1>
      </header>

      <div className="page-container" style={{ transform: getTransformValue(), width: '300vw' }}>

        {/* The Main Menu Page */}
        <div className="page main-menu-page">
          <main className="menu-buttons">
            <button className="menu-button" onClick={() => handleMenuClick('Characters')}>Characters</button>
          </main>
        </div>

        <CharactersPage onBackClick={handleBackClick} onCreateNewCharacter={handleCreateCharacterClick} />

        <CharacterCreationPage onBackClick={handleBackClick} />

      </div>
    </div>
  );
}

export default App;
```

### ./src/features/characters/data/character-classes.data.ts
```typescript
import { ICharacterClassData } from '../services/interfaces';

export const characterClassesData: ICharacterClassData[] = [
    {
        id: "berserker",
        name: "The Berserker",
        image: "/assets/class_images/fighter.png",
        teasers: [
            "Become a raging, damage-dealing machine.",
            "Increase your damage to unbelievable levels.",
            "Use your Savage Arsenal"
        ],
        hitPoints: 20,
        hitDice: {
            dice: "d12",
            quantity: 1
        },
        saves: {
            strength: "Advantaged",
            dexterity: "Normal",
            intelligence: "Disadvantaged",
            will: "Normal"
        }
    },
    {
        id: "cheat",
        name: "The Cheat",
        image: "/assets/class_images/fighter.png",
        teasers: [
            "Break the rules!",
            "Sneak in and backsta.",
            "Fight dirty."
        ],
        hitPoints: 10,
        hitDice: {
            dice: "d6",
            quantity: 1
        },
        saves: {
            strength: "Normal",
            dexterity: "Advantaged",
            intelligence: "Normal",
            will: "Disadvantaged"
        }
    },
    {
        id: "commander",
        name: "The Commander",
        image: "/assets/class_images/fighter.png",
        teasers: [
            "Tactical Commands.",
            "Weapon mastery.",
            "Strategic leadership."
        ],
        hitPoints: 17,
        hitDice: {
            dice: "d10",
            quantity: 1
        },
        saves: {
            strength: "Advantaged",
            dexterity: "Disadvantaged",
            intelligence: "Normal",
            will: "Normal"
        }
    },
    {
        id: "hunter",
        name: "The Hunter",
        image: "/assets/class_images/fighter.png",
        teasers: [
            "Relentless trackers.",
            "Masters of the wild.",
            "Deadly from afar or up close."
        ],
        hitPoints: 13,
        hitDice: {
            dice: "d8",
            quantity: 1
        },
        saves: {
            strength: "Normal",
            dexterity: "Advantaged",
            intelligence: "Disadvantaged",
            will: "Normal"
        }

    }
]
```

### ./src/features/characters/components/CharactersPAge.tsx 
```tsx
import React from 'react';

// Define the type for the props our component will receive.
interface CharactersPageProps {
    onBackClick: () => void;
    onCreateNewCharacter: () => void;
}

const CharactersPage: React.FC<CharactersPageProps> = ({ onBackClick, onCreateNewCharacter }) => {
    return (
        <div className="page section-page">
            <div className="section-content">
                <h2 className="section-title">Characters</h2>
                <p>Content for the Characters section goes here...</p>
                {/* Here you can add more character-specific content and components */}
            </div>
            {/* A container for the buttons at the bottom of the page */}
            <div className="button-group">
                {/* The "Back to Menu" button's onClick now calls the function passed down through props */}
                <button className="back-button" onClick={onBackClick}>Back to Menu</button>
                
                {/* A new button for creating a character */}
                <button 
                    className="menu-button" 
                    onClick={onCreateNewCharacter}
                >
                    Create New Character
                </button>
            </div>
        </div>
    );
};

export default CharactersPage;
```

### ./src/features/characters/components/ChooseClass.tsx
```tsx
import { useEffect, useState } from "react";
import { CharacterClass } from "../../models/character-class.model";
import { DataLoader } from "../../services/data-loader.service";
import { characterClassesData } from "../../data/character-classes.data";


const ChooseClass: React.FC = () => {
    const [classes, setClasses] = useState<CharacterClass[]>([]);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    // useEffect now uses the DataLoader service to get class data.
    // The service is initialized here, but because it's a singleton,
    // it will only be created once.
    useEffect(() => {
        try {
            // 1. Create (or get) the singleton instance of the data loader
            const loader = DataLoader.create(characterClassesData);

            // 2. Get the classes from the service and convert the Map to an Array
            const loadedClasses = Array.from(loader.characterClasses.values());

            // 3. Set the state
            setClasses(loadedClasses);
        } catch (error) {
            console.error("Failed to load character classes:", error);
            // Optionally, set an error state to display a message to the user
        }
    }, []); // Empty dependency array ensures this runs only once on mount.

    const handleClassClick = (classId: string) => {
        setSelectedClass(classId);
        // In a real application, you would save this selection to a global state or context
        console.log('Selected class:', classId);
    };

    if (classes.length === 0) {
        return <div className="text-white text-center p-10">Loading classes...</div>;
    }

    return (
        <div className="p-8 font-sans bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Choose Your Class</h1>
            <p className="text-center text-gray-400 mb-10">Select a class to begin your adventure.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {classes.map(cls => (
                    <div
                        key={cls.id}
                        className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50 cursor-pointer ${selectedClass === cls.id ? 'ring-4 ring-cyan-400 scale-105' : 'ring-2 ring-transparent'}`}
                        onClick={() => handleClassClick(cls.id)}
                        data-testid={`class-card-${cls.id}`}
                    >
                        <img
                            src={cls.image}
                            alt={cls.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x200/ff0000/ffffff?text=Error'; }}
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-3">{cls.name}</h3>
                            <ul className="text-gray-400 space-y-2 list-disc list-inside">
                                {cls.teasers.map((teaser, index) => (
                                    <li key={index}>{teaser}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function App() {
    return <ChooseClass />;
}
```

### ./src/features/characters/components/CharacterCreationPage.tsx
```tsx
import { useEffect, useState } from "react";
import { CharacterClass } from "../../models/character-class.model";
import { DataLoader } from "../../services/data-loader.service";
import { characterClassesData } from "../../data/character-classes.data";


const ChooseClass: React.FC = () => {
    const [classes, setClasses] = useState<CharacterClass[]>([]);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    // useEffect now uses the DataLoader service to get class data.
    // The service is initialized here, but because it's a singleton,
    // it will only be created once.
    useEffect(() => {
        try {
            // 1. Create (or get) the singleton instance of the data loader
            const loader = DataLoader.create(characterClassesData);

            // 2. Get the classes from the service and convert the Map to an Array
            const loadedClasses = Array.from(loader.characterClasses.values());

            // 3. Set the state
            setClasses(loadedClasses);
        } catch (error) {
            console.error("Failed to load character classes:", error);
            // Optionally, set an error state to display a message to the user
        }
    }, []); // Empty dependency array ensures this runs only once on mount.

    const handleClassClick = (classId: string) => {
        setSelectedClass(classId);
        // In a real application, you would save this selection to a global state or context
        console.log('Selected class:', classId);
    };

    if (classes.length === 0) {
        return <div className="text-white text-center p-10">Loading classes...</div>;
    }

    return (
        <div className="p-8 font-sans bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Choose Your Class</h1>
            <p className="text-center text-gray-400 mb-10">Select a class to begin your adventure.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {classes.map(cls => (
                    <div
                        key={cls.id}
                        className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50 cursor-pointer ${selectedClass === cls.id ? 'ring-4 ring-cyan-400 scale-105' : 'ring-2 ring-transparent'}`}
                        onClick={() => handleClassClick(cls.id)}
                        data-testid={`class-card-${cls.id}`}
                    >
                        <img
                            src={cls.image}
                            alt={cls.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x200/ff0000/ffffff?text=Error'; }}
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-3">{cls.name}</h3>
                            <ul className="text-gray-400 space-y-2 list-disc list-inside">
                                {cls.teasers.map((teaser, index) => (
                                    <li key={index}>{teaser}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function App() {
    return <ChooseClass />;
}
```
import React, { useEffect } from 'react';
import { CharacterStorageService } from '../../services/character-storage.service';
import { CharacterClassDataLoader } from '../../services/character-class-data-loader.service';
import { AncestryDataLoader } from '../../services/ancestry-data-loader.service';
import { BackgroundDataLoader } from '../../services/background-data-loader.service';
import { characterClassesData } from '../../data/character-classes.data';
import { ancestryData } from '../../data/ancestries.data';
import { backgroundsData } from '../../data/backgrounds.data';

interface CharacterReviewProps {
    characterData: Record<string, any>;
    onComplete: () => void;
    onBack?: () => void;
    onNavigateToStep?: (step: number) => void;
}

const CharacterReview: React.FC<CharacterReviewProps> = ({
    characterData,
    onComplete,
    onBack,
    onNavigateToStep
}) => {
    // Initialize data loaders synchronously
    const initializeLoaders = () => {
        // Always initialize the loaders to ensure data is loaded
        CharacterClassDataLoader.create(characterClassesData);
        AncestryDataLoader.create(ancestryData);
        BackgroundDataLoader.create(backgroundsData);
    };

    // Initialize loaders immediately
    initializeLoaders();

    // Get the data loaders
    const classLoader = CharacterClassDataLoader.getInstance();
    const ancestryLoader = AncestryDataLoader.getInstance();
    const backgroundLoader = BackgroundDataLoader.getInstance();

    // Get the selected data
    const selectedClass = characterData.class ? classLoader.characterClasses.get(characterData.class) : null;
    const selectedAncestry = characterData.ancestry ? ancestryLoader.ancestries.get(characterData.ancestry) : null;
    const selectedBackground = characterData.background ? backgroundLoader.backgrounds.get(characterData.background) : null;

    // Debug logging
    console.log('CharacterReview Debug:', {
        characterData,
        classLoaderSize: classLoader.characterClasses.size,
        ancestryLoaderSize: ancestryLoader.ancestries.size,
        backgroundLoaderSize: backgroundLoader.backgrounds.size,
        selectedClass,
        selectedAncestry,
        selectedBackground,
        backgroundId: characterData.background,
        backgroundExists: backgroundLoader.backgrounds.has(characterData.background || ''),
        allBackgroundIds: Array.from(backgroundLoader.backgrounds.keys()),
        allBackgroundNames: Array.from(backgroundLoader.backgrounds.values()).map(bg => bg.name)
    });


    const handleEditStep = (step: number) => {
        if (onNavigateToStep) {
            onNavigateToStep(step);
        }
    };

    return (
        <div className="p-8 font-sans bg-parchment min-h-full">
            <h1 className="text-4xl font-bold text-center text-ink mb-2">Review Character</h1>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-bronze mb-2">{characterData.name || 'Unnamed Character'}</h2>
                <h3 className="text-xl text-ink mb-2">
                    Level 1 • {selectedClass?.name || 'No Class'} • {selectedAncestry?.name || 'No Ancestry'} • {selectedBackground?.name || 'No Background'}
                </h3>
                <div className="w-24 h-1 bg-bronze mx-auto rounded-full"></div>
            </div>
            <p className="text-center text-chestnut mb-8">
                Review your character details before creating. Click on any section to make changes.
            </p>

            {/* Next Step Button - Moved to top */}
            <div className="flex justify-center mb-10">
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg border-2 border-green-800 hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Create Character
                </button>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Character Identity */}
                <div className="bg-parchment-light p-6 rounded-lg border-2 border-saddle-brown">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-ink">Character Identity</h2>
                        <button
                            className="bg-gradient-to-r from-bronze to-bronze-dark text-white px-4 py-2 rounded-lg border border-saddle-brown hover:from-bronze-light hover:to-bronze text-sm"
                            onClick={() => handleEditStep(6)}
                        >
                            Edit Details
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-chestnut text-sm mb-1">Name</label>
                            <p className="text-ink text-lg">{characterData.name || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-chestnut text-sm mb-1">Level</label>
                            <p className="text-ink text-lg">1</p>
                        </div>
                        <div>
                            <label className="block text-chestnut text-sm mb-1">Height</label>
                            <p className="text-ink">{characterData.height || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-chestnut text-sm mb-1">Weight</label>
                            <p className="text-ink">{characterData.weight || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-chestnut text-sm mb-1">Age</label>
                            <p className="text-ink">{characterData.age || 'Not set'}</p>
                        </div>
                    </div>
                </div>

                {/* Class Information */}
                <div className="bg-gradient-to-br from-parchment-light to-parchment p-6 rounded-lg border-2 border-bronze shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-bronze">Class</h2>
                        <button
                            className="bg-gradient-to-r from-bronze to-bronze-dark text-white px-4 py-2 rounded-lg border border-saddle-brown hover:from-bronze-light hover:to-bronze text-sm shadow-md"
                            onClick={() => handleEditStep(1)}
                        >
                            Change Class
                        </button>
                    </div>
                    {selectedClass ? (
                        <div>
                            <h3 className="text-xl text-bronze mb-2">{selectedClass.name}</h3>
                            <h3 className="text-lg text-ink mb-4">Level 1</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-chestnut text-sm mb-1">Hit Points</label>
                                    <p className="text-ink">{selectedClass.hitPoints}</p>
                                </div>
                                <div>
                                    <label className="block text-chestnut text-sm mb-1">Hit Dice</label>
                                    <p className="text-ink">{selectedClass.hitDice.quantity}d{selectedClass.hitDice.dice}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-chestnut text-sm mb-2">Class Features</label>
                                <ul className="text-ink space-y-1">
                                    {selectedClass.teasers.map((teaser: string, index: number) => (
                                        <li key={index} className="text-sm">• {teaser}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="text-chestnut">No class selected</p>
                    )}
                </div>

                {/* Ancestry Information */}
                <div className="bg-gradient-to-br from-parchment-light to-parchment p-6 rounded-lg border-2 border-bronze shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-bronze">Ancestry</h2>
                        <button
                            className="bg-gradient-to-r from-bronze to-bronze-dark text-white px-4 py-2 rounded-lg border border-saddle-brown hover:from-bronze-light hover:to-bronze text-sm shadow-md"
                            onClick={() => handleEditStep(2)}
                        >
                            Change Ancestry
                        </button>
                    </div>
                    {selectedAncestry ? (
                        <div>
                            <h3 className="text-xl text-bronze mb-2">{selectedAncestry.name}</h3>
                            <h3 className="text-lg text-ink mb-4">Level 1</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-chestnut text-sm mb-1">Size</label>
                                    <p className="text-ink">{selectedAncestry.size}</p>
                                </div>
                                <div>
                                    <label className="block text-chestnut text-sm mb-1">Speed</label>
                                    <p className="text-ink">6</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-chestnut">No ancestry selected</p>
                    )}
                </div>

                {/* Background Information */}
                <div className="bg-gradient-to-br from-parchment-light to-parchment p-6 rounded-lg border-2 border-bronze shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-bronze">Background</h2>
                        <button
                            className="bg-gradient-to-r from-bronze to-bronze-dark text-white px-4 py-2 rounded-lg border border-saddle-brown hover:from-bronze-light hover:to-bronze text-sm shadow-md"
                            onClick={() => handleEditStep(3)}
                        >
                            Change Background
                        </button>
                    </div>
                    {selectedBackground ? (
                        <div>
                            <h3 className="text-xl text-bronze mb-2">{selectedBackground.name}</h3>
                            <h3 className="text-lg text-ink mb-4">Level 1</h3>
                            <p className="text-chestnut">{selectedBackground.description}</p>
                        </div>
                    ) : (
                        <p className="text-chestnut">No background selected</p>
                    )}
                </div>

                {/* Stats */}
                <div className="bg-parchment-light p-6 rounded-lg border-2 border-saddle-brown">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-ink">Stats</h2>
                        <button
                            className="bg-gradient-to-r from-bronze to-bronze-dark text-white px-4 py-2 rounded-lg border border-saddle-brown hover:from-bronze-light hover:to-bronze text-sm"
                            onClick={() => handleEditStep(4)}
                        >
                            Edit Stats
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {characterData.stats && Object.entries(characterData.stats).map(([stat, value]: [string, any]) => (
                            <div key={stat} className="text-center">
                                <div className="text-2xl font-bold text-bronze">{value}</div>
                                <div className="text-chestnut text-sm uppercase">{stat}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-parchment-light p-6 rounded-lg border-2 border-saddle-brown">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-ink">Skills</h2>
                        <button
                            className="bg-gradient-to-r from-bronze to-bronze-dark text-white px-4 py-2 rounded-lg border border-saddle-brown hover:from-bronze-light hover:to-bronze text-sm"
                            onClick={() => handleEditStep(5)}
                        >
                            Edit Skills
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {characterData.skills && Object.entries(characterData.skills).map(([skill, value]: [string, any]) => (
                            <div key={skill} className="flex justify-between">
                                <span className="text-chestnut capitalize">{skill}</span>
                                <span className="text-bronze font-bold">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Saves */}
                {selectedClass && (
                    <div className="bg-parchment-light p-6 rounded-lg border-2 border-saddle-brown">
                        <h2 className="text-2xl font-bold text-ink mb-4">Saving Throws</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(selectedClass.saves).map(([stat, saveType]: [string, any]) => (
                                <div key={stat} className="text-center">
                                    <div className="text-chestnut capitalize">{stat}</div>
                                    <div className={`text-sm ${saveType === 'Advantaged' ? 'text-green-600' : saveType === 'Disadvantaged' ? 'text-red-600' : 'text-bronze'}`}>
                                        {saveType}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default CharacterReview;
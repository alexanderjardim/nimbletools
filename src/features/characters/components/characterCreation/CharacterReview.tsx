import React from 'react';
import { CharacterStorageService } from '../../services/character-storage.service';
import { CharacterClassDataLoader } from '../../services/character-class-data-loader.service';
import { AncestryDataLoader } from '../../services/ancestry-data-loader.service';
import { BackgroundDataLoader } from '../../services/background-data-loader.service';

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
    // Get the data loaders
    const classLoader = CharacterClassDataLoader.getInstance();
    const ancestryLoader = AncestryDataLoader.getInstance();
    const backgroundLoader = BackgroundDataLoader.getInstance();

    // Get the selected data
    const selectedClass = characterData.class ? classLoader.characterClasses.get(characterData.class) : null;
    const selectedAncestry = characterData.ancestry ? ancestryLoader.ancestries.get(characterData.ancestry) : null;
    const selectedBackground = characterData.background ? backgroundLoader.backgrounds.get(characterData.background) : null;

    const handleCreateCharacter = () => {
        try {
            // Add creation timestamp
            const completeCharacterData = {
                ...characterData,
                id: `character_${Date.now()}`,
                createdAt: new Date().toISOString(),
                level: 1,
            };

            CharacterStorageService.saveCharacter(completeCharacterData);
            onComplete();
        } catch (error) {
            console.error('Failed to save character:', error);
            // Optionally show an error message to the user
        }
    };

    const handleEditStep = (step: number) => {
        if (onNavigateToStep) {
            onNavigateToStep(step);
        }
    };

    return (
        <div className="p-8 font-sans bg-gray-900 min-h-full">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Review Character</h1>
            <p className="text-center text-gray-400 mb-10">
                Review your character details before creating. Click on any section to make changes.
            </p>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Character Identity */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Character Identity</h2>
                        <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
                            onClick={() => handleEditStep(6)}
                        >
                            Edit Details
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Name</label>
                            <p className="text-white text-lg">{characterData.name || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Level</label>
                            <p className="text-white text-lg">1</p>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Height</label>
                            <p className="text-white">{characterData.height || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Weight</label>
                            <p className="text-white">{characterData.weight || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Age</label>
                            <p className="text-white">{characterData.age || 'Not set'}</p>
                        </div>
                    </div>
                </div>

                {/* Class Information */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Class</h2>
                        <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
                            onClick={() => handleEditStep(1)}
                        >
                            Change Class
                        </button>
                    </div>
                    {selectedClass ? (
                        <div>
                            <h3 className="text-xl text-cyan-400 mb-2">{selectedClass.name}</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Hit Points</label>
                                    <p className="text-white">{selectedClass.hitPoints}</p>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Hit Dice</label>
                                    <p className="text-white">{selectedClass.hitDice.toString()}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2">Class Features</label>
                                <ul className="text-white space-y-1">
                                    {selectedClass.teasers.map((teaser: string, index: number) => (
                                        <li key={index} className="text-sm">• {teaser}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">No class selected</p>
                    )}
                </div>

                {/* Ancestry Information */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Ancestry</h2>
                        <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
                            onClick={() => handleEditStep(2)}
                        >
                            Change Ancestry
                        </button>
                    </div>
                    {selectedAncestry ? (
                        <div>
                            <h3 className="text-xl text-green-400 mb-2">{selectedAncestry.name}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Size</label>
                                    <p className="text-white">{selectedAncestry.size}</p>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Speed</label>
                                    <p className="text-white">6</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">No ancestry selected</p>
                    )}
                </div>

                {/* Background Information */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Background</h2>
                        <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
                            onClick={() => handleEditStep(3)}
                        >
                            Change Background
                        </button>
                    </div>
                    {selectedBackground ? (
                        <div>
                            <h3 className="text-xl text-yellow-400 mb-2">{selectedBackground.name}</h3>
                            <p className="text-gray-300">{selectedBackground.description}</p>
                        </div>
                    ) : (
                        <p className="text-gray-400">No background selected</p>
                    )}
                </div>

                {/* Stats */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Ability Scores</h2>
                        <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
                            onClick={() => handleEditStep(4)}
                        >
                            Edit Stats
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {characterData.stats && Object.entries(characterData.stats).map(([stat, value]: [string, any]) => (
                            <div key={stat} className="text-center">
                                <div className="text-2xl font-bold text-cyan-400">{value}</div>
                                <div className="text-gray-400 text-sm uppercase">{stat}</div>
                                <div className="text-gray-500 text-xs">
                                    Modifier: {Math.floor((value - 10) / 2) >= 0 ? '+' : ''}{Math.floor((value - 10) / 2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Skills</h2>
                        <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm"
                            onClick={() => handleEditStep(5)}
                        >
                            Edit Skills
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {characterData.skills && Object.entries(characterData.skills).map(([skill, value]: [string, any]) => (
                            <div key={skill} className="flex justify-between">
                                <span className="text-gray-300 capitalize">{skill}</span>
                                <span className="text-cyan-400 font-bold">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Saves */}
                {selectedClass && (
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold text-white mb-4">Saving Throws</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(selectedClass.saves).map(([stat, saveType]: [string, any]) => (
                                <div key={stat} className="text-center">
                                    <div className="text-gray-300 capitalize">{stat}</div>
                                    <div className={`text-sm ${saveType === 'Advantaged' ? 'text-green-400' : saveType === 'Disadvantaged' ? 'text-red-400' : 'text-yellow-400'}`}>
                                        {saveType}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
                {onBack && (
                    <button
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                        onClick={onBack}
                    >
                        Back
                    </button>
                )}
                <button
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-bold text-lg"
                    onClick={handleCreateCharacter}
                >
                    Create Character
                </button>
            </div>
        </div>
    );
};

export default CharacterReview;
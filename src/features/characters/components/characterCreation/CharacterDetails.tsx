import React, { useState } from 'react';
import { CharacterStorageService } from '../../services/character-storage.service';

interface CharacterDetailsProps {
    characterData: Record<string, any>;
    onComplete: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ characterData, onComplete }) => {
    const [details, setDetails] = useState({
        name: '',
        height: '',
        weight: '',
        age: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateCharacter = () => {
        const completeCharacterData = {
            ...characterData,
            ...details,
        };

        try {
            CharacterStorageService.saveCharacter(completeCharacterData);
            onComplete();
        } catch (error) {
            console.error('Failed to save character:', error);
            // Optionally show an error message to the user
        }
    };

    const isFormValid = () => {
        return details.name.trim() !== '' &&
            details.height.trim() !== '' &&
            details.weight.trim() !== '' &&
            details.age.trim() !== '';
    };

    return (
        <div className="p-8 font-sans bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Character Details</h1>
            <p className="text-center text-gray-400 mb-10">Fill in the final details of your character.</p>

            <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={details.name}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 text-white rounded px-3 py-2"
                            placeholder="Enter character name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="height" className="block text-white mb-2">Height</label>
                        <input
                            type="text"
                            id="height"
                            name="height"
                            value={details.height}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 text-white rounded px-3 py-2"
                            placeholder="Enter height"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="weight" className="block text-white mb-2">Weight</label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            value={details.weight}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 text-white rounded px-3 py-2"
                            placeholder="Enter weight"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-white mb-2">Age</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            value={details.age}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900 text-white rounded px-3 py-2"
                            placeholder="Enter age"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
                    onClick={handleCreateCharacter}
                    disabled={!isFormValid()}
                >
                    Create Character
                </button>
            </div>
        </div>
    );
};

export default CharacterDetails;
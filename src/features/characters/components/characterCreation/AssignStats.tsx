import React, { useState } from 'react';
import { characterStats } from '../../../shared/constants/character.constants';

interface DetermineAttributesProps {
    onNext: (data: { stats: Record<string, number> }) => void;
}

const DetermineAttributes: React.FC<DetermineAttributesProps> = ({ onNext }) => {
    const statArrays = {
        standard: [2, 2, 0, -1],
        balanced: [2, 1, 1, 0],
        'min-max': [3, 1, -1, -1],
    };

    const [selectedArray, setSelectedArray] = useState<keyof typeof statArrays>('standard');
    const [attributes, setAttributes] = useState<Record<string, number>>(
        Object.fromEntries(characterStats.map(stat => [stat, 10]))
    );

    const handleArrayChange = (array: keyof typeof statArrays) => {
        setSelectedArray(array);
    };

    const handleAttributeChange = (stat: string, value: number) => {
        setAttributes(prev => ({
            ...prev,
            [stat]: value,
        }));
    };

    const handleNextStep = () => {
        onNext({ stats: attributes });
    };

    return (
        <div className="p-8 font-sans bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Determine Your Attributes</h1>
            <p className="text-center text-gray-400 mb-10">Choose a stat array and distribute points.</p>

            <div className="mb-6 flex justify-center space-x-4">
                {Object.keys(statArrays).map(array => (
                    <button
                        key={array}
                        className={`px-4 py-2 rounded-lg ${selectedArray === array ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                        onClick={() => handleArrayChange(array as keyof typeof statArrays)}
                    >
                        {array.charAt(0).toUpperCase() + array.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Stat Distribution</h3>
                    <div className="space-y-4">
                        {characterStats.map(stat => (
                            <div key={stat} className="flex items-center justify-between">
                                <label className="text-white capitalize">{stat}</label>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleAttributeChange(stat, Math.max(1, attributes[stat] - 1))}
                                        className="bg-gray-700 text-white px-2 py-1 rounded"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={attributes[stat]}
                                        readOnly
                                        className="w-16 text-center bg-gray-900 text-white rounded"
                                    />
                                    <button
                                        onClick={() => handleAttributeChange(stat, Math.min(20, attributes[stat] + 1))}
                                        className="bg-gray-700 text-white px-2 py-1 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Selected Array: {selectedArray}</h3>
                    <p className="text-gray-400 mb-4">Distribute these values: {statArrays[selectedArray].join(', ')}</p>
                    <div className="text-white">
                        <p>Total Points: {statArrays[selectedArray].reduce((a, b) => a + b, 0)}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
                    onClick={handleNextStep}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DetermineAttributes;
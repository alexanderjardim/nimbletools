import React, { useState, useEffect } from 'react';
import { CharacterStorageService } from '../../services/character-storage.service';

interface CharacterDetailsProps {
    characterData: Record<string, any>;
    onComplete: () => void;
    onUpdate?: (data: Record<string, any>) => void;
    onBack?: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ characterData, onComplete, onUpdate, onBack }) => {
    const [details, setDetails] = useState({
        name: characterData.name || '',
        height: characterData.height || '',
        weight: characterData.weight || '',
        age: characterData.age || '',
    });

    // Unit states
    const [heightUnit, setHeightUnit] = useState<'ft' | 'cm'>('ft');
    const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');

    // Raw numeric values for conversion
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [heightCm, setHeightCm] = useState('');
    const [weightLbs, setWeightLbs] = useState('');
    const [weightKg, setWeightKg] = useState('');

    // Conversion functions
    const cmToFeetInches = (cm: number) => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return { feet, inches };
    };

    const feetInchesToCm = (feet: number, inches: number) => {
        return Math.round((feet * 12 + inches) * 2.54);
    };

    const kgToLbs = (kg: number) => {
        return Math.round(kg * 2.20462);
    };

    const lbsToKg = (lbs: number) => {
        return Math.round(lbs / 2.20462 * 10) / 10; // Round to 1 decimal
    };

    // Initialize values from existing data
    useEffect(() => {
        if (characterData.height) {
            // Try to parse existing height data
            const heightStr = characterData.height.toString();
            if (heightStr.includes('cm') || heightStr.includes('CM')) {
                const cmValue = parseFloat(heightStr.replace(/[^\d.]/g, ''));
                if (!isNaN(cmValue)) {
                    setHeightCm(cmValue.toString());
                    setHeightUnit('cm');
                    const { feet, inches } = cmToFeetInches(cmValue);
                    setHeightFeet(feet.toString());
                    setHeightInches(inches.toString());
                }
            } else if (heightStr.includes("'") || heightStr.includes('ft')) {
                // Parse feet and inches
                const feetMatch = heightStr.match(/(\d+)\s*(?:'|ft)/);
                const inchesMatch = heightStr.match(/(\d+)\s*(?:"|in)/);
                if (feetMatch) {
                    setHeightFeet(feetMatch[1]);
                    setHeightUnit('ft');
                }
                if (inchesMatch) {
                    setHeightInches(inchesMatch[1]);
                }
                if (feetMatch && inchesMatch) {
                    const cm = feetInchesToCm(parseInt(feetMatch[1]), parseInt(inchesMatch[1]));
                    setHeightCm(cm.toString());
                }
            }
        }

        if (characterData.weight) {
            const weightStr = characterData.weight.toString();
            if (weightStr.includes('kg') || weightStr.includes('KG')) {
                const kgValue = parseFloat(weightStr.replace(/[^\d.]/g, ''));
                if (!isNaN(kgValue)) {
                    setWeightKg(kgValue.toString());
                    setWeightUnit('kg');
                    setWeightLbs(kgToLbs(kgValue).toString());
                }
            } else if (weightStr.includes('lbs') || weightStr.includes('lb') || !weightStr.includes('kg')) {
                const lbsValue = parseFloat(weightStr.replace(/[^\d.]/g, ''));
                if (!isNaN(lbsValue)) {
                    setWeightLbs(lbsValue.toString());
                    setWeightUnit('lbs');
                    setWeightKg(lbsToKg(lbsValue).toString());
                }
            }
        }
    }, [characterData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleHeightUnitChange = (unit: 'ft' | 'cm') => {
        setHeightUnit(unit);
    };

    const handleWeightUnitChange = (unit: 'lbs' | 'kg') => {
        setWeightUnit(unit);
    };

    const handleHeightFeetChange = (value: string) => {
        setHeightFeet(value);
        const feet = parseInt(value) || 0;
        const inches = parseInt(heightInches) || 0;
        const cm = feetInchesToCm(feet, inches);
        setHeightCm(cm.toString());
        setDetails(prev => ({
            ...prev,
            height: `${feet}'${inches}"`
        }));
    };

    const handleHeightInchesChange = (value: string) => {
        setHeightInches(value);
        const feet = parseInt(heightFeet) || 0;
        const inches = parseInt(value) || 0;
        const cm = feetInchesToCm(feet, inches);
        setHeightCm(cm.toString());
        setDetails(prev => ({
            ...prev,
            height: `${feet}'${inches}"`
        }));
    };

    const handleHeightCmChange = (value: string) => {
        setHeightCm(value);
        const cm = parseFloat(value) || 0;
        const { feet, inches } = cmToFeetInches(cm);
        setHeightFeet(feet.toString());
        setHeightInches(inches.toString());
        setDetails(prev => ({
            ...prev,
            height: `${cm}cm`
        }));
    };

    const handleWeightLbsChange = (value: string) => {
        setWeightLbs(value);
        const lbs = parseFloat(value) || 0;
        const kg = lbsToKg(lbs);
        setWeightKg(kg.toString());
        setDetails(prev => ({
            ...prev,
            weight: `${lbs}lbs`
        }));
    };

    const handleWeightKgChange = (value: string) => {
        setWeightKg(value);
        const kg = parseFloat(value) || 0;
        const lbs = kgToLbs(kg);
        setWeightLbs(lbs.toString());
        setDetails(prev => ({
            ...prev,
            weight: `${kg}kg`
        }));
    };

    const handleNextStep = () => {
        if (!canProceed()) {
            return; // Don't proceed if name is empty
        }

        // Update parent component's state with the entered details
        if (onUpdate) {
            onUpdate(details);
        }

        onComplete();
    };

    const isFormValid = () => {
        return details.name.trim() !== '' &&
            details.height.trim() !== '' &&
            details.weight.trim() !== '' &&
            details.age.trim() !== '';
    };

    const canProceed = () => {
        return details.name.trim() !== '';
    };

    const generateRandomName = () => {
        const firstNames = ['Aldric', 'Bryn', 'Caspian', 'Dara', 'Elian', 'Fiora', 'Galen', 'Halia', 'Ivor', 'Jara', 'Kael', 'Liora', 'Marek', 'Nara', 'Orin', 'Pria', 'Quinn', 'Riven', 'Sable', 'Torin', 'Uma', 'Vesper', 'Wren', 'Xander', 'Yara', 'Zane'];
        const lastNames = ['Blackwood', 'Brightblade', 'Crowley', 'Darkmoon', 'Emberheart', 'Frostwind', 'Goldleaf', 'Hammerfell', 'Ironfist', 'Jadebrook', 'Kingsley', 'Lightfoot', 'Moonshadow', 'Nightshade', 'Oakheart', 'Proudmoor', 'Quickblade', 'Ravenclaw', 'Silverleaf', 'Thunderheart', 'Underhill', 'Valewalker', 'Wolfbane', 'Youngblood'];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${firstName} ${lastName}`;
    };

    const generateRandomHeight = () => {
        if (heightUnit === 'ft') {
            const feet = Math.floor(Math.random() * 3) + 4; // 4-6 feet
            const inches = Math.floor(Math.random() * 12); // 0-11 inches
            return { feet, inches, cm: Math.round((feet * 12 + inches) * 2.54) };
        } else {
            const cm = Math.floor(Math.random() * 61) + 140; // 140-200 cm
            const totalInches = cm / 2.54;
            const feet = Math.floor(totalInches / 12);
            const inches = Math.round(totalInches % 12);
            return { feet, inches, cm };
        }
    };

    const generateRandomWeight = () => {
        if (weightUnit === 'lbs') {
            return Math.floor(Math.random() * 101) + 100; // 100-200 lbs
        } else {
            return Math.floor(Math.random() * 46) + 45; // 45-90 kg
        }
    };

    const generateRandomAge = () => {
        return Math.floor(Math.random() * 61) + 18; // 18-78 years
    };

    const handleFillRandomFields = () => {
        const randomName = generateRandomName();
        const randomAge = generateRandomAge().toString();

        // Generate height
        const randomHeight = generateRandomHeight();
        let heightValue = '';
        if (heightUnit === 'ft') {
            heightValue = `${randomHeight.feet}'${randomHeight.inches}"`;
            setHeightFeet(randomHeight.feet.toString());
            setHeightInches(randomHeight.inches.toString());
            setHeightCm(Math.round((randomHeight.feet * 12 + randomHeight.inches) * 2.54).toString());
        } else {
            heightValue = `${randomHeight.cm}cm`;
            setHeightCm(randomHeight.cm.toString());
            const { feet, inches } = cmToFeetInches(randomHeight.cm);
            setHeightFeet(feet.toString());
            setHeightInches(inches.toString());
        }

        // Generate weight
        const randomWeight = generateRandomWeight();
        let weightValue = '';
        if (weightUnit === 'lbs') {
            weightValue = `${randomWeight}lbs`;
            setWeightLbs(randomWeight.toString());
            setWeightKg(lbsToKg(randomWeight).toString());
        } else {
            weightValue = `${randomWeight}kg`;
            setWeightKg(randomWeight.toString());
            setWeightLbs(kgToLbs(randomWeight).toString());
        }

        setDetails({
            name: randomName,
            height: heightValue,
            weight: weightValue,
            age: randomAge,
        });
    };

    return (
        <div className="p-8 font-sans bg-parchment min-h-full">
            <h1 className="text-4xl font-bold text-center text-ink mb-2">Character Details</h1>
            <p className="text-center text-chestnut mb-6">Fill in the final details of your character.</p>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-4 mb-8">
                <button
                    onClick={handleFillRandomFields}
                    className="px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg border-2 border-purple-800 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg text-xl"
                    title="Fill Random All Fields"
                >
                    🎲
                </button>

                {/* Next Step Button */}
                <button
                    onClick={handleNextStep}
                    disabled={!canProceed()}
                    className={`px-8 py-3 rounded-lg border-2 font-bold text-xl transition-all duration-300 ${canProceed()
                        ? 'bg-gradient-to-r from-bronze to-bronze-dark text-white border-saddle-brown hover:from-bronze-light hover:to-bronze hover:shadow-glow-red hover:-translate-y-0.5 active:from-bronze-dark active:to-bronze-dark'
                        : 'bg-gray-400 text-gray-600 border-gray-500 cursor-not-allowed'
                        }`}
                >
                    Next Step
                </button>
            </div>

            <div className="max-w-md mx-auto bg-parchment-light p-6 rounded-lg border-2 border-saddle-brown">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-ink mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={details.name}
                            onChange={handleInputChange}
                            className="w-full bg-parchment text-ink rounded px-3 py-2 border border-saddle-brown"
                            placeholder="Enter character name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-ink mb-2">Height</label>
                        <div className="flex gap-2 mb-2">
                            <button
                                type="button"
                                onClick={() => handleHeightUnitChange('ft')}
                                className={`px-3 py-1 rounded text-sm ${heightUnit === 'ft' ? 'bg-bronze text-white' : 'bg-parchment-light text-ink border border-saddle-brown'}`}
                            >
                                Feet & Inches
                            </button>
                            <button
                                type="button"
                                onClick={() => handleHeightUnitChange('cm')}
                                className={`px-3 py-1 rounded text-sm ${heightUnit === 'cm' ? 'bg-bronze text-white' : 'bg-parchment-light text-ink border border-saddle-brown'}`}
                            >
                                Centimeters
                            </button>
                        </div>
                        {heightUnit === 'ft' ? (
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={heightFeet}
                                        onChange={(e) => handleHeightFeetChange(e.target.value)}
                                        className="w-full bg-parchment text-ink rounded px-3 py-2 border border-saddle-brown"
                                        placeholder="Feet"
                                        min="0"
                                        max="10"
                                    />
                                    <span className="text-xs text-chestnut ml-1">ft</span>
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={heightInches}
                                        onChange={(e) => handleHeightInchesChange(e.target.value)}
                                        className="w-full bg-parchment text-ink rounded px-3 py-2 border border-saddle-brown"
                                        placeholder="Inches"
                                        min="0"
                                        max="11"
                                    />
                                    <span className="text-xs text-chestnut ml-1">in</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="number"
                                    value={heightCm}
                                    onChange={(e) => handleHeightCmChange(e.target.value)}
                                    className="w-full bg-parchment text-ink rounded px-3 py-2 border border-saddle-brown"
                                    placeholder="Height in centimeters"
                                    min="0"
                                    max="300"
                                />
                                <span className="text-xs text-chestnut ml-1">cm</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-ink mb-2">Weight</label>
                        <div className="flex gap-2 mb-2">
                            <button
                                type="button"
                                onClick={() => handleWeightUnitChange('lbs')}
                                className={`px-3 py-1 rounded text-sm ${weightUnit === 'lbs' ? 'bg-bronze text-white' : 'bg-parchment-light text-ink border border-saddle-brown'}`}
                            >
                                Pounds
                            </button>
                            <button
                                type="button"
                                onClick={() => handleWeightUnitChange('kg')}
                                className={`px-3 py-1 rounded text-sm ${weightUnit === 'kg' ? 'bg-bronze text-white' : 'bg-parchment-light text-ink border border-saddle-brown'}`}
                            >
                                Kilograms
                            </button>
                        </div>
                        {weightUnit === 'lbs' ? (
                            <div>
                                <input
                                    type="number"
                                    value={weightLbs}
                                    onChange={(e) => handleWeightLbsChange(e.target.value)}
                                    className="w-full bg-parchment text-ink rounded px-3 py-2 border border-saddle-brown"
                                    placeholder="Weight in pounds"
                                    min="0"
                                    max="1000"
                                />
                                <span className="text-xs text-chestnut ml-1">lbs</span>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="number"
                                    value={weightKg}
                                    onChange={(e) => handleWeightKgChange(e.target.value)}
                                    className="w-full bg-parchment text-ink rounded px-3 py-2 border border-saddle-brown"
                                    placeholder="Weight in kilograms"
                                    min="0"
                                    max="500"
                                />
                                <span className="text-xs text-chestnut ml-1">kg</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-ink mb-2">Age</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            value={details.age}
                            onChange={handleInputChange}
                            className="w-full bg-parchment text-ink rounded px-3 py-2 border border-saddle-brown"
                            placeholder="Enter age"
                            required
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default CharacterDetails;
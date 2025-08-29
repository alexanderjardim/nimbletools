import React, { useEffect, useState } from "react";
import { CharacterClass } from "../../models/character-class.model";
import { CharacterClassDataLoader } from "../../services/character-class-data-loader.service";
import { characterClassesData } from "../../data/character-classes.data";

interface ChooseClassProps {
    onNext: (data: { classId: string }) => void;
}

const ChooseClass: React.FC<ChooseClassProps> = ({ onNext }) => {
    const [classes, setClasses] = useState<CharacterClass[]>([]);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const loader = CharacterClassDataLoader.create(characterClassesData);
            const loadedClasses = Array.from(loader.characterClasses.values());
            console.log('ChooseClass Debug:', {
                loaderSize: loader.characterClasses.size,
                loadedClasses: loadedClasses.map(c => ({ id: c.id, name: c.name }))
            });
            setClasses(loadedClasses);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to load character classes:", error);
            setIsLoading(false);
        }
    }, []);

    const handleClassClick = (classId: string) => {
        console.log('ChooseClass handleClassClick called:', classId);
        setSelectedClass(classId);
    };

    const handleNextStep = () => {
        console.log('ChooseClass handleNextStep called:', { selectedClass });
        if (selectedClass) {
            console.log('ChooseClass calling onNext with:', { classId: selectedClass });
            onNext({ classId: selectedClass });
        } else {
            console.log('ChooseClass handleNextStep - no class selected!');
        }
    };

    const handleRandomSelection = () => {
        if (classes.length > 0) {
            const randomIndex = Math.floor(Math.random() * classes.length);
            const randomClass = classes[randomIndex];
            console.log('ChooseClass random selection:', randomClass.id);
            setSelectedClass(randomClass.id);
        }
    };

    if (isLoading) {
        return <div className="text-ink text-center p-10">Loading classes...</div>;
    }

    return (
        <div className="p-8 font-sans bg-parchment min-h-full">
            <h1 className="text-4xl font-bold text-center text-ink mb-2">Choose Your Class</h1>
            <p className="text-center text-chestnut mb-6">Select a class to begin your adventure.</p>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-4 mb-8">
                <button
                    onClick={handleRandomSelection}
                    className="px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg border-2 border-purple-800 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg text-xl"
                    title="Select Random Class"
                >
                    🎲
                </button>

                {/* Next Step Button */}
                {selectedClass && (
                    <button
                        className="px-8 py-3 bg-gradient-to-r from-bronze to-bronze-dark text-white rounded-lg border-2 border-saddle-brown hover:from-bronze-light hover:to-bronze transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={handleNextStep}
                    >
                        Next Step
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {classes.map(cls => (
                    <div
                        key={cls.id}
                        className={`bg-parchment-light rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-bronze cursor-pointer border-2 ${selectedClass === cls.id ? 'ring-4 ring-bronze scale-105 border-bronze' : 'ring-2 ring-transparent border-saddle-brown'}`}
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
                            <h3 className="text-2xl font-bold text-ink mb-3">{cls.name}</h3>
                            <ul className="text-chestnut space-y-2 list-disc list-inside">
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

export default ChooseClass;

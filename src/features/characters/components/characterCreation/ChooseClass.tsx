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
            setClasses(loadedClasses);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to load character classes:", error);
            setIsLoading(false);
        }
    }, []);

    const handleClassClick = (classId: string) => {
        setSelectedClass(classId);
    };

    const handleNextStep = () => {
        if (selectedClass) {
            onNext({ classId: selectedClass });
        }
    };

    if (isLoading) {
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
            <div className="flex justify-center mt-8">
                <button 
                    className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
                    onClick={handleNextStep}
                    disabled={!selectedClass}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ChooseClass;

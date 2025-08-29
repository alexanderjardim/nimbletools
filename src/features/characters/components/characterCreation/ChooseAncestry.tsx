import React, { useEffect, useState } from "react";
import { Ancestry } from "../../models/ancestry.model";
import { AncestryDataLoader } from "../../services/ancestry-data-loader.service";
import { ancestriesData } from "../../data/ancestries.data";

interface ChooseAncestryProps {
    onNext: (data: { ancestryId: string }) => void;
}

const ChooseAncestry: React.FC<ChooseAncestryProps> = ({ onNext }) => {
    const [ancestries, setAncestries] = useState<Ancestry[]>([]);
    const [selectedAncestry, setSelectedAncestry] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const loader = AncestryDataLoader.create(ancestriesData);
            const loadedAncestries = Array.from(loader.ancestries.values());
            setAncestries(loadedAncestries);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to load ancestries:", error);
            setIsLoading(false);
        }
    }, []);

    const handleAncestryClick = (ancestryId: string) => {
        setSelectedAncestry(ancestryId);
    };

    const handleNextStep = () => {
        if (selectedAncestry) {
            onNext({ ancestryId: selectedAncestry });
        }
    };

    if (isLoading) {
        return <div className="text-white text-center p-10">Loading ancestries...</div>;
    }

    return (
        <div className="p-8 font-sans bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Choose Your Ancestry</h1>
            <p className="text-center text-gray-400 mb-10">Select an ancestry that defines your character's heritage.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ancestries.map(ancestry => (
                    <div
                        key={ancestry.id}
                        className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50 cursor-pointer ${selectedAncestry === ancestry.id ? 'ring-4 ring-cyan-400 scale-105' : 'ring-2 ring-transparent'}`}
                        onClick={() => handleAncestryClick(ancestry.id)}
                        data-testid={`ancestry-card-${ancestry.id}`}
                    >
                        <img
                            src={ancestry.image}
                            alt={ancestry.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x200/ff0000/ffffff?text=Error'; }}
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-3">{ancestry.name}</h3>
                            <ul className="text-gray-400 space-y-2 list-disc list-inside">
                                {ancestry.teasers.map((teaser, index) => (
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
                    disabled={!selectedAncestry}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ChooseAncestry;
import React, { useEffect, useState } from "react";
import { Background } from "../../models/background.model";
import { BackgroundDataLoader } from "../../services/background-data-loader.service";
import { backgroundsData } from "../../data/backgrounds.data";

interface ChooseBackgroundProps {
    onNext: (data: { backgroundId: string }) => void;
}

const ChooseBackground: React.FC<ChooseBackgroundProps> = ({ onNext }) => {
    const [backgrounds, setBackgrounds] = useState<Background[]>([]);
    const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const loader = BackgroundDataLoader.create(backgroundsData);
            const loadedBackgrounds = Array.from(loader.backgrounds.values());
            setBackgrounds(loadedBackgrounds);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to load backgrounds:", error);
            setIsLoading(false);
        }
    }, []);

    const handleBackgroundClick = (backgroundId: string) => {
        setSelectedBackground(backgroundId);
    };

    const handleNextStep = () => {
        if (selectedBackground) {
            onNext({ backgroundId: selectedBackground });
        }
    };

    if (isLoading) {
        return <div className="text-white text-center p-10">Loading backgrounds...</div>;
    }

    return (
        <div className="p-8 font-sans bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Choose Your Background</h1>
            <p className="text-center text-gray-400 mb-10">Select a background that defines your character's past.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {backgrounds.map(background => (
                    <div
                        key={background.id}
                        className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50 cursor-pointer ${selectedBackground === background.id ? 'ring-4 ring-cyan-400 scale-105' : 'ring-2 ring-transparent'}`}
                        onClick={() => handleBackgroundClick(background.id)}
                        data-testid={`background-card-${background.id}`}
                    >
                        <img
                            src={background.image}
                            alt={background.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x200/ff0000/ffffff?text=Error'; }}
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-3">{background.name}</h3>
                            <ul className="text-gray-400 space-y-2 list-disc list-inside">
                                {background.teasers.map((teaser, index) => (
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
                    disabled={!selectedBackground}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ChooseBackground;
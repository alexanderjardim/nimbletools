import React, { useEffect, useState } from "react";
import { Background } from "../../models/background.model";
import { BackgroundDataLoader } from "../../services/background-data-loader.service";
import { backgroundsData } from "../../data/backgrounds.data";

interface ChooseBackgroundProps {
  onNext: (data: { backgroundId: string }) => void;
  onBack?: () => void;
}

const ChooseBackground: React.FC<ChooseBackgroundProps> = ({
  onNext,
  onBack,
}) => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null,
  );
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
    console.log("ChooseBackground handleBackgroundClick called:", backgroundId);
    setSelectedBackground(backgroundId);
  };

  const handleNextStep = () => {
    console.log("ChooseBackground handleNextStep called:", {
      selectedBackground,
    });
    if (selectedBackground) {
      console.log("ChooseBackground calling onNext with:", {
        backgroundId: selectedBackground,
      });
      onNext({ backgroundId: selectedBackground });
    } else {
      console.log("ChooseBackground handleNextStep - no background selected!");
    }
  };

  const handleRandomSelection = () => {
    if (backgrounds.length > 0) {
      const randomIndex = Math.floor(Math.random() * backgrounds.length);
      const randomBackground = backgrounds[randomIndex];
      console.log("ChooseBackground random selection:", randomBackground.id);
      setSelectedBackground(randomBackground.id);
    }
  };

  if (isLoading) {
    return (
      <div className="text-ink text-center p-10">Loading backgrounds...</div>
    );
  }

  return (
    <div className="p-8 font-sans bg-parchment min-h-full">
      <h1 className="text-4xl font-bold text-center text-ink mb-2">
        Choose Your Background
      </h1>
      <p className="text-center text-chestnut mb-6">
        Select a background that defines your character's past.
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={handleRandomSelection}
          className="px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg border-2 border-purple-800 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg text-xl"
          title="Select Random Background"
        >
          🎲
        </button>

        {/* Next Step Button */}
        {selectedBackground && (
          <button
            className="px-8 py-3 bg-gradient-to-r from-bronze to-bronze-dark text-white rounded-lg border-2 border-saddle-brown hover:from-bronze-light hover:to-bronze transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={handleNextStep}
          >
            Next Step
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {backgrounds.map((background) => (
          <div
            key={background.id}
            className={`bg-parchment-light rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-bronze cursor-pointer border-2 ${selectedBackground === background.id ? "ring-4 ring-bronze scale-105 border-bronze" : "ring-2 ring-transparent border-saddle-brown"}`}
            onClick={() => handleBackgroundClick(background.id)}
            data-testid={`background-card-${background.id}`}
          >
            <img
              src={background.image}
              alt={background.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/300x200/ff0000/ffffff?text=Error";
              }}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-ink mb-3">
                {background.name}
              </h3>
              <ul className="text-chestnut space-y-2 list-disc list-inside">
                {background.teasers.map((teaser, index) => (
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

export default ChooseBackground;

import React, { useEffect, useState } from "react";
import { Ancestry } from "../../models/ancestry.model";
import { AncestryDataLoader } from "../../services/ancestry-data-loader.service";
import { ancestryData } from "../../data/ancestries.data";

interface ChooseAncestryProps {
  onNext: (data: { ancestryId: string }) => void;
  onBack?: () => void;
}

const ChooseAncestry: React.FC<ChooseAncestryProps> = ({ onNext, onBack }) => {
  const [ancestries, setAncestries] = useState<Ancestry[]>([]);
  const [selectedAncestry, setSelectedAncestry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const loader = AncestryDataLoader.create(ancestryData);
      const loadedAncestries = Array.from(loader.ancestries.values());
      setAncestries(loadedAncestries);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load ancestries:", error);
      setIsLoading(false);
    }
  }, []);

  const handleAncestryClick = (ancestryId: string) => {
    console.log("ChooseAncestry handleAncestryClick called:", ancestryId);
    setSelectedAncestry(ancestryId);
  };

  const handleNextStep = () => {
    console.log("ChooseAncestry handleNextStep called:", { selectedAncestry });
    if (selectedAncestry) {
      console.log("ChooseAncestry calling onNext with:", {
        ancestryId: selectedAncestry,
      });
      onNext({ ancestryId: selectedAncestry });
    } else {
      console.log("ChooseAncestry handleNextStep - no ancestry selected!");
    }
  };

  const handleRandomSelection = () => {
    if (ancestries.length > 0) {
      const randomIndex = Math.floor(Math.random() * ancestries.length);
      const randomAncestry = ancestries[randomIndex];
      console.log("ChooseAncestry random selection:", randomAncestry.id);
      setSelectedAncestry(randomAncestry.id);
    }
  };

  if (isLoading) {
    return (
      <div className="text-ink text-center p-10">Loading ancestries...</div>
    );
  }

  return (
    <div className="p-8 font-sans bg-parchment min-h-full">
      <h1 className="text-4xl font-bold text-center text-ink mb-2">
        Choose Your Ancestry
      </h1>
      <p className="text-center text-chestnut mb-6">
        Select an ancestry that defines your character's heritage.
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={handleRandomSelection}
          className="px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg border-2 border-purple-800 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg text-xl"
          title="Select Random Ancestry"
        >
          🎲
        </button>

        {/* Next Step Button */}
        {selectedAncestry && (
          <button
            className="px-8 py-3 bg-gradient-to-r from-bronze to-bronze-dark text-white rounded-lg border-2 border-saddle-brown hover:from-bronze-light hover:to-bronze transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={handleNextStep}
          >
            Next Step
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ancestries.map((ancestry) => (
          <div
            key={ancestry.id}
            className={`bg-parchment-light rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-bronze cursor-pointer border-2 ${selectedAncestry === ancestry.id ? "ring-4 ring-bronze scale-105 border-bronze" : "ring-2 ring-transparent border-saddle-brown"}`}
            onClick={() => handleAncestryClick(ancestry.id)}
            data-testid={`ancestry-card-${ancestry.id}`}
          >
            <img
              src={ancestry.image}
              alt={ancestry.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/300x200/ff0000/ffffff?text=Error";
              }}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-ink mb-3">
                {ancestry.name}
              </h3>
              <ul className="text-chestnut space-y-2 list-disc list-inside">
                {ancestry.teasers.map((teaser, index) => (
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

export default ChooseAncestry;

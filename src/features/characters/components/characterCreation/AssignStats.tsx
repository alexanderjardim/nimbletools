import React, { useState, useEffect } from "react";
import { STAT_NAMES } from "../../../../shared/constants/character.constants";

interface AssignStatsProps {
  onNext: (data: { stats: Record<string, number> }) => void;
  onBack?: () => void;
}

const AssignStats: React.FC<AssignStatsProps> = ({ onNext, onBack }) => {
  const statArrays = {
    standard: [2, 2, 0, -1],
    balanced: [2, 1, 1, 0],
    "min-max": [3, 1, -1, -1],
  };

  const [selectedArray, setSelectedArray] =
    useState<keyof typeof statArrays>("standard");
  const [stats, setStats] = useState<Record<string, number>>({});

  // Initialize stats on component mount
  useEffect(() => {
    const initialStats: Record<string, number> = {};
    STAT_NAMES.forEach((stat, index) => {
      const modifier = statArrays[selectedArray][index] || 0;
      initialStats[stat] = modifier;
    });
    setStats(initialStats);
  }, []);

  const handleArrayChange = (array: keyof typeof statArrays) => {
    setSelectedArray(array);
    // Auto-assign array elements to stats in order
    const newStats: Record<string, number> = {};
    STAT_NAMES.forEach((stat, index) => {
      const modifier = statArrays[array][index] || 0;
      newStats[stat] = modifier;
    });
    setStats(newStats);
  };

  const handleStatChange = (stat: string, value: number) => {
    const currentValue = stats[stat];

    // Find which stat currently has the selected value
    const statWithValue = Object.entries(stats).find(
      ([_, statValue]) => statValue === value,
    );

    if (statWithValue) {
      // Swap values between the two stats
      const [otherStat] = statWithValue;
      setStats((prev) => ({
        ...prev,
        [stat]: value,
        [otherStat]: currentValue,
      }));
    } else {
      // Just update the current stat
      setStats((prev) => ({
        ...prev,
        [stat]: value,
      }));
    }
  };

  // Get all possible values for the selected array
  const getAllPossibleValues = () => {
    return statArrays[selectedArray];
  };

  const handleNextStep = () => {
    onNext({ stats });
  };

  return (
    <div className="p-8 font-sans bg-parchment min-h-full">
      <h1 className="text-4xl font-bold text-center text-ink mb-2">
        Assign Your Stats
      </h1>
      <p className="text-center text-chestnut mb-10">
        Choose a stat array and assign modifiers to each stat.
      </p>

      <div className="mb-6 flex justify-center items-center space-x-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="statArray" className="text-ink font-medium">
            Stat Array:
          </label>
          <select
            id="statArray"
            value={selectedArray}
            onChange={(e) =>
              handleArrayChange(e.target.value as keyof typeof statArrays)
            }
            className="px-4 py-2 rounded-lg border-2 border-saddle-brown bg-parchment-light text-chestnut hover:bg-parchment"
          >
            {Object.keys(statArrays).map((array) => (
              <option key={array} value={array}>
                {array.charAt(0).toUpperCase() + array.slice(1)}
              </option>
            ))}
          </select>
          <button
            className="px-8 py-3 bg-gradient-to-r from-bronze to-bronze-dark text-white rounded-lg border-2 border-saddle-brown hover:from-bronze-light hover:to-bronze transition-all duration-300"
            onClick={handleNextStep}
          >
            Next Step
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-parchment-light p-6 rounded-lg border-2 border-saddle-brown">
          <h3 className="text-2xl font-bold text-ink mb-6">
            Stat Distribution
          </h3>
          <div className="space-y-6">
            {STAT_NAMES.map((stat) => {
              const allPossibleValues = getAllPossibleValues();
              const currentValue = stats[stat] || 0;

              return (
                <div key={stat} className="flex items-center space-x-4">
                  <label className="text-ink capitalize font-medium min-w-0 w-32">
                    {stat}
                  </label>
                  <select
                    value={currentValue}
                    onChange={(e) =>
                      handleStatChange(stat, parseInt(e.target.value))
                    }
                    className="px-3 py-2 rounded border border-saddle-brown bg-parchment text-ink flex-1"
                  >
                    {/* Show all possible values from the array */}
                    {allPossibleValues.map((value, index) => (
                      <option key={`${value}-${index}`} value={value}>
                        {value >= 0 ? "+" : ""}
                        {value}
                      </option>
                    ))}
                  </select>
                  <span className="text-chestnut text-sm min-w-0 w-16 text-right">
                    {currentValue >= 0 ? "+" : ""}
                    {currentValue}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignStats;

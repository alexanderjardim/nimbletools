import React, { useState } from "react";
import {
  SkillName,
  SKILL_STATS,
  SKILL_NAMES,
} from "../../../../shared/constants/character.constants";

interface AssignSkillsProps {
  onNext: (data: { skills: Record<string, number> }) => void;
  onBack?: () => void;
}

const AssignSkills: React.FC<AssignSkillsProps> = ({ onNext, onBack }) => {
  const [skillPoints, setSkillPoints] = useState<Record<string, number>>(
    Object.fromEntries(SKILL_NAMES.map((skill) => [skill, 0])),
  );
  const totalPointsAvailable = 4;

  const calculateTotalPoints = () => {
    return Object.values(skillPoints).reduce((a, b) => a + b, 0);
  };

  const handleSkillChange = (skill: string, change: number) => {
    setSkillPoints((prev) => {
      const currentPoints = prev[skill] || 0;
      const newPoints = currentPoints + change;

      // Prevent negative points and exceeding total available points
      if (
        newPoints >= 0 &&
        calculateTotalPoints() + change <= totalPointsAvailable
      ) {
        return {
          ...prev,
          [skill]: newPoints,
        };
      }
      return prev;
    });
  };

  const handleNextStep = () => {
    if (calculateTotalPoints() === totalPointsAvailable) {
      onNext({ skills: skillPoints });
    }
  };

  const canProceed = () => {
    return calculateTotalPoints() === totalPointsAvailable;
  };

  return (
    <div className="p-8 font-sans bg-parchment min-h-full">
      <h1 className="text-4xl font-bold text-center text-ink mb-2">
        Assign Skill Points
      </h1>
      <p className="text-center text-chestnut mb-10">
        Distribute 4 skill points across your skills.
      </p>

      <div className="bg-parchment-light p-6 rounded-lg max-w-md mx-auto border-2 border-saddle-brown">
        {/* Next Step Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleNextStep}
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-lg border-2 font-bold text-xl transition-all duration-300 ${
              canProceed()
                ? "bg-gradient-to-r from-bronze to-bronze-dark text-white border-saddle-brown hover:from-bronze-light hover:to-bronze hover:shadow-glow-red hover:-translate-y-0.5 active:from-bronze-dark active:to-bronze-dark"
                : "bg-gray-400 text-gray-600 border-gray-500 cursor-not-allowed"
            }`}
          >
            Next Step
          </button>
        </div>
        <div className="space-y-4">
          {SKILL_NAMES.map((skill) => (
            <div key={skill} className="flex items-center justify-between">
              <label className="text-ink capitalize">{skill}</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSkillChange(skill, -1)}
                  className="bg-bronze text-white px-2 py-1 rounded hover:bg-bronze-dark"
                  disabled={skillPoints[skill] === 0}
                >
                  -
                </button>
                <input
                  type="number"
                  value={skillPoints[skill]}
                  readOnly
                  className="w-16 text-center bg-parchment text-ink rounded border border-saddle-brown"
                />
                <button
                  onClick={() => handleSkillChange(skill, 1)}
                  className="bg-bronze text-white px-2 py-1 rounded hover:bg-bronze-dark"
                  disabled={calculateTotalPoints() >= totalPointsAvailable}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p
            className={`text-sm ${canProceed() ? "text-green-600" : "text-red-600"}`}
          >
            Points Used: {calculateTotalPoints()} / {totalPointsAvailable}
          </p>
          {!canProceed() && (
            <p className="text-xs text-red-500 mt-1">
              You must assign all {totalPointsAvailable} skill points before
              continuing
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignSkills;

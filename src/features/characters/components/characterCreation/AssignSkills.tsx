import React, { useState } from 'react';
import { SkillName, SKILL_STATS } from '../../../../shared/constants/character.constants';

interface AssignSkillsProps {
    onNext: (data: { skills: Record<string, number> }) => void;
}

const AssignSkills: React.FC<AssignSkillsProps> = ({ onNext }) => {
    const [skillPoints, setSkillPoints] = useState<Record<string, number>>(
        Object.fromEntries(SKILL_STATS.map(skill => [skill, 0]))
    );
    const totalPointsAvailable = 4;

    const calculateTotalPoints = () => {
        return Object.values(skillPoints).reduce((a, b) => a + b, 0);
    };

    const handleSkillChange = (skill: string, change: number) => {
        setSkillPoints(prev => {
            const currentPoints = prev[skill] || 0;
            const newPoints = currentPoints + change;

            // Prevent negative points and exceeding total available points
            if (newPoints >= 0 && calculateTotalPoints() + change <= totalPointsAvailable) {
                return {
                    ...prev,
                    [skill]: newPoints
                };
            }
            return prev;
        });
    };

    const handleNextStep = () => {
        onNext({ skills: skillPoints });
    };

    return (
        <div className="p-8 font-sans bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Assign Skill Points</h1>
            <p className="text-center text-gray-400 mb-10">Distribute 4 skill points across your skills.</p>

            <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
                <div className="space-y-4">
                    {skills.map(skill => (
                        <div key={skill} className="flex items-center justify-between">
                            <label className="text-white capitalize">{skill}</label>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleSkillChange(skill, -1)}
                                    className="bg-gray-700 text-white px-2 py-1 rounded"
                                    disabled={skillPoints[skill] === 0}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={skillPoints[skill]}
                                    readOnly
                                    className="w-16 text-center bg-gray-900 text-white rounded"
                                />
                                <button
                                    onClick={() => handleSkillChange(skill, 1)}
                                    className="bg-gray-700 text-white px-2 py-1 rounded"
                                    disabled={calculateTotalPoints() >= totalPointsAvailable}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-center text-white">
                    <p>Points Used: {calculateTotalPoints()} / {totalPointsAvailable}</p>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
                    onClick={handleNextStep}
                    disabled={calculateTotalPoints() !== totalPointsAvailable}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AssignSkills;
import React, { useState } from 'react';
import ChooseClass from './characterCreation/ChooseClass';
import ChooseAncestry from './characterCreation/ChooseAncestry';
import ChooseBackground from './characterCreation/ChooseBackground';
import AssignStats from './characterCreation/AssignStats';
import AssignSkills from './characterCreation/AssignSkills';
import CharacterDetails from './characterCreation/CharacterDetails';
import CharacterReview from './characterCreation/CharacterReview';
import StepGuide from './characterCreation/StepGuide';

interface CharacterCreationPageProps {
    onBackClick: () => void;
}

const CharacterCreationPage: React.FC<CharacterCreationPageProps> = ({ onBackClick }) => {
    const [step, setStep] = useState(1);
    const [characterData, setCharacterData] = useState<Record<string, any>>({
        class: '',
        ancestry: '',
        background: '',
        stats: {},
        skills: {},
        name: '',
        height: '',
        weight: '',
        age: '',
    });

    const stepLabels = [
        'Choose Class',
        'Choose Ancestry',
        'Choose Background',
        'Assign Stats',
        'Assign Skills',
        'Character Details',
        'Review Character'
    ];

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    const goToStep = (stepNumber: number) => setStep(stepNumber);

    const updateCharacterData = (newData: Record<string, any>) => {
        setCharacterData(prev => ({
            ...prev,
            ...newData,
        }));
        nextStep();
    };

    const handleCharacterCreationComplete = () => {
        // Reset to initial state or navigate away
        onBackClick();
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <ChooseClass
                        onNext={(data) => updateCharacterData({ class: data.classId })}
                    />
                );
            case 2:
                return (
                    <ChooseAncestry
                        onNext={(data) => updateCharacterData({ ancestry: data.ancestryId })}
                        onBack={prevStep}
                    />
                );
            case 3:
                return (
                    <ChooseBackground
                        onNext={(data) => updateCharacterData({ background: data.backgroundId })}
                        onBack={prevStep}
                    />
                );
            case 4:
                return (
                    <AssignStats
                        onNext={(data) => updateCharacterData({ stats: data.stats })}
                        onBack={prevStep}
                    />
                );
            case 5:
                return (
                    <AssignSkills
                        onNext={(data) => updateCharacterData({ skills: data.skills })}
                        onBack={prevStep}
                    />
                );
            case 6:
                return (
                    <CharacterDetails
                        characterData={characterData}
                        onComplete={nextStep}
                        onBack={prevStep}
                    />
                );
            case 7:
                return (
                    <CharacterReview
                        characterData={characterData}
                        onComplete={handleCharacterCreationComplete}
                        onBack={prevStep}
                        onNavigateToStep={goToStep}
                    />
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-6">
            {/* - flex-grow allows this container to take up all available space, pushing the button down.
            - overflow-y-auto makes this specific container scroll if its content is too tall.
        */}
            <div className="w-full max-w-4xl flex-grow overflow-y-auto">
                <div className="pt-8">
                    <StepGuide
                        currentStep={step}
                        totalSteps={stepLabels.length}
                        stepLabels={stepLabels}
                    />
                </div>

                {renderStep()}
            </div>

            {/* Example of a refactored button */}
            <button
                className="mt-4 px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:bg-cyan-700 disabled:opacity-50"
                onClick={onBackClick}
            >
                Back to Characters
            </button>
        </div>
    );
};

export default CharacterCreationPage;
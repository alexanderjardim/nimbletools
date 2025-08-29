import React, { useState } from 'react';
import ChooseClass from './characterCreation/ChooseClass';
import ChooseAncestry from './characterCreation/ChooseAncestry';
import ChooseBackground from './characterCreation/ChooseBackground';
import AssignStats from './characterCreation/AssignStats';
import AssignSkills from './characterCreation/AssignSkills';
import CharacterDetails from './characterCreation/CharacterDetails';

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

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

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
                    />
                );
            case 3:
                return (
                    <ChooseBackground 
                        onNext={(data) => updateCharacterData({ background: data.backgroundId })} 
                    />
                );
            case 4:
                return (
                    <AssignStats 
                        onNext={(data) => updateCharacterData({ stats: data.stats })} 
                    />
                );
            case 5:
                return (
                    <AssignSkills 
                        onNext={(data) => updateCharacterData({ skills: data.skills })} 
                    />
                );
            case 6:
                return (
                    <CharacterDetails 
                        characterData={characterData}
                        onComplete={handleCharacterCreationComplete} 
                    />
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return <div className="page section-page">{renderStep()}</div>;
};

export default CharacterCreationPage;
import React, { useState } from 'react';

// Import step components
import ChooseClass from './characterCreation/ChooseClass';
import DetermineAttributes from './characterCreation/DetermineAttributes';
import ChooseAncestry from './characterCreation/ChooseAncestry';
import ChooseBackground from './characterCreation/ChooseBackground';

interface CharacterCreationPageProps {
    onBackClick: () => void;
}

const CharacterCreationPage: React.FC<CharacterCreationPagePageProps> = ({ onBackClick }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { title: 'Choose Your Class', component: ChooseClass },
        { title: 'Determine Your Attributes', component: DetermineAttributes },
        { title: 'Choose Your Ancestry', component: ChooseAncestry },
        { title: 'Choose Your Background', component: ChooseBackground },
    ];

    const CurrentStepComponent = steps[currentStep].component;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="page section-page">
            <div className="section-content">
                <h2 className="section-title">{steps[currentStep].title}</h2>
                <CurrentStepComponent />
            </div>
            <div className="button-group">
                {currentStep > 0 && (
                    <button className="back-button" onClick={handlePrevious}>Previous</button>
                )}
                {currentStep < steps.length - 1 ? (
                    <button className="menu-button" onClick={handleNext}>Next</button>
                ) : (
                    <button className="menu-button" onClick={() => console.log('Finish Character Creation')}>Finish</button>
                )}
                <button className="back-button" onClick={onBackClick}>Back to Characters</button>
            </div>
        </div>
    );
};

export default CharacterCreationPage;
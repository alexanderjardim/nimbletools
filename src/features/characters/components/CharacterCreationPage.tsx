import React, { useState, useEffect } from 'react';
import ChooseClass from './characterCreation/ChooseClass';
import ChooseAncestry from './characterCreation/ChooseAncestry';
import ChooseBackground from './characterCreation/ChooseBackground';
import AssignStats from './characterCreation/AssignStats';
import AssignSkills from './characterCreation/AssignSkills';
import CharacterDetails from './characterCreation/CharacterDetails';
import CharacterReview from './characterCreation/CharacterReview';
import StepGuide from './characterCreation/StepGuide';
import { CharacterStorageService } from '../services/character-storage.service';

interface CharacterCreationPageProps {
    onBackClick: () => void;
    onCharacterSaved?: () => void;
    resumeData?: { characterData: Record<string, any>, currentStep: number };
}

const CharacterCreationPage: React.FC<CharacterCreationPageProps> = ({ onBackClick, onCharacterSaved, resumeData }) => {
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

    // Reset state when resumeData changes
    useEffect(() => {
        console.log('CharacterCreationPage useEffect - resumeData changed:', resumeData);
        if (resumeData) {
            // Resume from saved data
            const newStep = resumeData.currentStep || 1;
            console.log('CharacterCreationPage - Resuming from step:', newStep);
            setStep(newStep);
            setCharacterData({
                class: '',
                ancestry: '',
                background: '',
                stats: {},
                skills: {},
                name: '',
                height: '',
                weight: '',
                age: '',
                ...resumeData.characterData,
            });
        } else {
            // Start fresh
            console.log('CharacterCreationPage - Starting fresh from step 1');
            setStep(1);
            setCharacterData({
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
        }
    }, [resumeData]);

    const stepLabels = [
        'Choose Class',
        'Choose Ancestry',
        'Choose Background',
        'Assign Attributes',
        'Assign Skills',
        'Character Details',
        'Review Character'
    ];

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    const goToStep = (stepNumber: number) => setStep(stepNumber);

    const updateCharacterData = (newData: Record<string, any>) => {
        console.log('CharacterCreationPage updateCharacterData called:', newData);
        console.log('CharacterCreationPage updateCharacterData - previous characterData:', characterData);
        setCharacterData(prev => {
            const updated = {
                ...prev,
                ...newData,
            };
            console.log('CharacterCreationPage updateCharacterData - new characterData:', updated);
            return updated;
        });
        nextStep();
    };

    const updateCharacterDataOnly = (newData: Record<string, any>) => {
        console.log('CharacterCreationPage updateCharacterDataOnly called:', newData);
        console.log('CharacterCreationPage updateCharacterDataOnly - previous characterData:', characterData);
        setCharacterData(prev => {
            const updated = {
                ...prev,
                ...newData,
            };
            console.log('CharacterCreationPage updateCharacterDataOnly - new characterData:', updated);
            return updated;
        });
    };

    // Auto-save in-progress character data
    useEffect(() => {
        if (step < 7) { // Don't save on the review step
            CharacterStorageService.saveInProgressCharacter(characterData, step);
        }
    }, [characterData, step]);

    const handleCharacterCreationComplete = () => {
        try {
            // Save the character
            const completeCharacterData = {
                ...characterData,
                level: 1,
            };

            CharacterStorageService.saveCharacter(completeCharacterData);

            // Clear in-progress data when character is successfully created
            CharacterStorageService.clearInProgressCharacter();

            // Use onCharacterSaved if provided, otherwise fall back to onBackClick
            if (onCharacterSaved) {
                onCharacterSaved();
            } else {
                onBackClick();
            }
        } catch (error) {
            console.error('Failed to save character:', error);
            // Optionally show an error message to the user
        }
    };

    const renderStep = () => {
        console.log('CharacterCreationPage renderStep - Current step:', step, 'characterData:', characterData);
        switch (step) {
            case 1:
                console.log('CharacterCreationPage - Rendering ChooseClass');
                return (
                    <ChooseClass
                        onNext={(data) => {
                            console.log('CharacterCreationPage - ChooseClass onNext called:', data);
                            updateCharacterData({ class: data.classId });
                        }}
                    />
                );
            case 2:
                console.log('CharacterCreationPage - Rendering ChooseAncestry');
                return (
                    <ChooseAncestry
                        onNext={(data) => {
                            console.log('CharacterCreationPage - ChooseAncestry onNext called:', data);
                            updateCharacterData({ ancestry: data.ancestryId });
                        }}
                        onBack={() => {
                            console.log('CharacterCreationPage - ChooseAncestry onBack called');
                            prevStep();
                        }}
                    />
                );
            case 3:
                console.log('CharacterCreationPage - Rendering ChooseBackground');
                return (
                    <ChooseBackground
                        onNext={(data) => {
                            console.log('CharacterCreationPage - ChooseBackground onNext called:', data);
                            updateCharacterData({ background: data.backgroundId });
                        }}
                        onBack={() => {
                            console.log('CharacterCreationPage - ChooseBackground onBack called');
                            prevStep();
                        }}
                    />
                );
            case 4:
                console.log('CharacterCreationPage - Rendering AssignStats');
                return (
                    <AssignStats
                        onNext={(data) => {
                            console.log('CharacterCreationPage - AssignStats onNext called:', data);
                            updateCharacterData({ stats: data.stats });
                        }}
                        onBack={() => {
                            console.log('CharacterCreationPage - AssignStats onBack called');
                            prevStep();
                        }}
                    />
                );
            case 5:
                console.log('CharacterCreationPage - Rendering AssignSkills');
                return (
                    <AssignSkills
                        onNext={(data) => {
                            console.log('CharacterCreationPage - AssignSkills onNext called:', data);
                            updateCharacterData({ skills: data.skills });
                        }}
                        onBack={() => {
                            console.log('CharacterCreationPage - AssignSkills onBack called');
                            prevStep();
                        }}
                    />
                );
            case 6:
                console.log('CharacterCreationPage - Rendering CharacterDetails');
                return (
                    <CharacterDetails
                        characterData={characterData}
                        onComplete={() => {
                            console.log('CharacterCreationPage - CharacterDetails onComplete called');
                            nextStep();
                        }}
                        onUpdate={(data) => {
                            console.log('CharacterCreationPage - CharacterDetails onUpdate called:', data);
                            updateCharacterDataOnly(data);
                        }}
                        onBack={() => {
                            console.log('CharacterCreationPage - CharacterDetails onBack called');
                            prevStep();
                        }}
                    />
                );
            case 7:
                console.log('CharacterCreationPage Debug - Step 7:', { characterData, step });
                return (
                    <CharacterReview
                        characterData={characterData}
                        onComplete={() => {
                            console.log('CharacterCreationPage - CharacterReview onComplete called');
                            handleCharacterCreationComplete();
                        }}
                        onBack={() => {
                            console.log('CharacterCreationPage - CharacterReview onBack called');
                            prevStep();
                        }}
                        onNavigateToStep={(stepNum) => {
                            console.log('CharacterCreationPage - CharacterReview onNavigateToStep called:', stepNum);
                            goToStep(stepNum);
                        }}
                    />
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* Fixed header with step guide and navigation */}
            <div className="sticky top-0 z-50 bg-parchment border-b-2 border-saddle-brown shadow-lg">
                <div className="p-6">
                    <StepGuide
                        currentStep={step}
                        totalSteps={stepLabels.length}
                        stepLabels={stepLabels}
                    />

                    {/* Global Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="px-6 py-2 bg-gradient-to-r from-bronze to-bronze-dark text-white rounded-lg border-2 border-saddle-brown hover:from-bronze-light hover:to-bronze disabled:opacity-50 transition-all duration-300"
                            onClick={onBackClick}
                        >
                            Back to Characters
                        </button>
                        {step > 1 && (
                            <button
                                className="px-6 py-2 bg-gradient-to-r from-bronze to-bronze-dark text-white rounded-lg border-2 border-saddle-brown hover:from-bronze-light hover:to-bronze transition-all duration-300"
                                onClick={prevStep}
                            >
                                Previous Step
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="w-full max-w-4xl mx-auto">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default CharacterCreationPage;
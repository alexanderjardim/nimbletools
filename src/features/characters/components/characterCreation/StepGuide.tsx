import React from 'react';

interface StepGuideProps {
    currentStep: number;
    totalSteps: number;
    stepLabels: string[];
}

const StepGuide: React.FC<StepGuideProps> = ({ currentStep, totalSteps, stepLabels }) => {
    return (
        <div className="step-guide w-full max-w-4xl mx-auto mb-8 px-4">
            <div className="flex items-start justify-between mb-4">
                {Array.from({ length: totalSteps }, (_, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                        <div key={stepNumber} className="flex flex-col items-center flex-1">
                            {/* Step Circle */}
                            <div className="relative mb-3">
                                <div
                                    className={`
                                        flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-sm font-bold transition-colors relative z-10
                                        ${isCompleted
                                            ? 'bg-gray-400 text-gray-800'
                                            : isCurrent
                                                ? 'bg-red-700 text-white'
                                                : 'bg-bronze-light text-bronze-dark'
                                        }
                                    `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                            </div>

                            {/* Step Label */}
                            <p className={`text-xs sm:text-sm font-medium text-center leading-tight px-1 ${isCurrent ? 'text-red-600' : isCompleted ? 'text-gray-500' : 'text-bronze'
                                }`}>
                                {stepLabels[index]}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepGuide;
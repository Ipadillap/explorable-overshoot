// src/chapters/1_Introduction/1_IntroductionView.tsx

import { useState } from 'react';
import { INTRODUCTION_NARRATIVE } from './1_IntroductionScript.ts';
import { SubChapter1_1 } from './subchapters/SubChapter1_1';
import { SubChapter1_2 } from './subchapters/SubChapter1_2';
import { SubChapter1_3 } from './subchapters/SubChapter1_3';
import { SubChapter1_4 } from './subchapters/SubChapter1_4';
import { SubChapter1_5 } from './subchapters/SubChapter1_5';

interface Chapter1ViewProps {
    onNext?: () => void;
}

const SUBCHAPTER_VIEWS = [
    SubChapter1_1,
    SubChapter1_2,
    SubChapter1_3,
    SubChapter1_4,
    SubChapter1_5,
];

export function Chapter1View({ onNext }: Chapter1ViewProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const totalSteps = INTRODUCTION_NARRATIVE.length;

    const handleNextStep = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            onNext?.();
        }
    };

    const ActiveSubChapter = SUBCHAPTER_VIEWS[currentStepIndex];
    const currentStep = INTRODUCTION_NARRATIVE[currentStepIndex];

    return (
        <div className="w-full h-full relative overflow-hidden select-none bg-[#FFFFFF]">
            {ActiveSubChapter && currentStep && (
                <ActiveSubChapter
                    step={currentStep}
                    stepNumber={currentStepIndex + 1}
                    totalSteps={totalSteps}
                    onNext={handleNextStep}
                />
            )}
        </div>
    );
}

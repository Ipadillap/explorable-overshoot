// src/phases/Phase1/Phase1View.tsx

import { useState } from 'react';
import { PHASE1_NARRATIVE } from './narrative/Phase1Script';
import { NarrativeCard } from './components/NarrativeCard';

interface Phase1ViewProps {
    onNext?: () => void;
}

export function Phase1View({ onNext }: Phase1ViewProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const currentStepData = PHASE1_NARRATIVE[currentStepIndex];

    const handleAdvance = () => {
        if (currentStepIndex < PHASE1_NARRATIVE.length - 1) {
            // Avanzar al siguiente diálogo dentro de la Fase 1
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            // Se completó la narrativa de la Fase 1 -> Pasar a la Fase 2
            onNext?.();
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <NarrativeCard
                title={currentStepData.title}
                text={currentStepData.text}
                stepNumber={currentStepIndex + 1}
                totalSteps={PHASE1_NARRATIVE.length}
                buttonLabel={currentStepData.buttonLabel}
                onNextStep={handleAdvance}
            />
        </div>
    );
}

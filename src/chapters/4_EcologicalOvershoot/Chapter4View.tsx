import { useState } from 'react';
import { ECOLOGICAL_OVERSHOOT_NARRATIVE } from './narrative/4_EcologicalOvershootScript';
import { NarrativeCard } from './components/NarrativeCard';

interface Chapter4ViewProps {
    onNext?: () => void;
    onPrev?: () => void;
}

export function Chapter4View({ onNext }: Chapter4ViewProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const totalSteps = ECOLOGICAL_OVERSHOOT_NARRATIVE.length;

    const handleNextStep = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            onNext?.();
        }
    };

    return (
        <div className="w-full h-full grid grid-cols-2 gap-8 items-center p-8 select-none bg-[#F4F7F6]">
            {/* LADO IZQUIERDO: Zona visual / Canvas de simulación independiente de índices */}
            <section className="w-full h-[620px] bg-white border-2 border-dashed border-[#DFE8E2] rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                [Zona de Simulación / Canvas PixiJS - Capítulo 4]
            </section>

            {/* LADO DERECHO: Diálogos condicionados estrictamente por el contador interno */}
            <section className="w-full flex items-center justify-center">
                {currentStepIndex === 0 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[0].text}
                        stepNumber={1}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[0].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 1 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[1].text}
                        stepNumber={2}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[1].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 2 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[2].text}
                        stepNumber={3}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[2].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 3 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[3].text}
                        stepNumber={4}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[3].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 4 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[4].text}
                        stepNumber={5}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[4].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 5 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[5].text}
                        stepNumber={6}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[5].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 6 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[6].text}
                        stepNumber={7}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[6].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 7 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[7].text}
                        stepNumber={8}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[7].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 8 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[8].text}
                        stepNumber={9}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[8].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 9 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[9].text}
                        stepNumber={10}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[9].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 10 && (
                    <NarrativeCard
                        text={ECOLOGICAL_OVERSHOOT_NARRATIVE[10].text}
                        stepNumber={11}
                        totalSteps={totalSteps}
                        buttonLabel={ECOLOGICAL_OVERSHOOT_NARRATIVE[10].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}
            </section>
        </div>
    );
}

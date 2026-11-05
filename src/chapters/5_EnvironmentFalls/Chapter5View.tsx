import { useState } from 'react';
import { ENVIRONMENT_FALLS_NARRATIVE } from './narrative/5_EnvironmentFallsScript';
import { NarrativeCard } from './components/NarrativeCard';

interface Chapter5ViewProps {
    onNext?: () => void;
    onPrev?: () => void;
}

export function Chapter5View({ onNext }: Chapter5ViewProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const totalSteps = ENVIRONMENT_FALLS_NARRATIVE.length;

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
                [Zona de Simulación / Canvas PixiJS - Capítulo 5]
            </section>

            {/* LADO DERECHO: Diálogos condicionados estrictamente por el contador interno */}
            <section className="w-full flex items-center justify-center">
                {currentStepIndex === 0 && (
                    <NarrativeCard
                        text={ENVIRONMENT_FALLS_NARRATIVE[0].text}
                        stepNumber={1}
                        totalSteps={totalSteps}
                        buttonLabel={ENVIRONMENT_FALLS_NARRATIVE[0].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 1 && (
                    <NarrativeCard
                        text={ENVIRONMENT_FALLS_NARRATIVE[1].text}
                        stepNumber={2}
                        totalSteps={totalSteps}
                        buttonLabel={ENVIRONMENT_FALLS_NARRATIVE[1].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 2 && (
                    <NarrativeCard
                        text={ENVIRONMENT_FALLS_NARRATIVE[2].text}
                        stepNumber={3}
                        totalSteps={totalSteps}
                        buttonLabel={ENVIRONMENT_FALLS_NARRATIVE[2].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}
            </section>
        </div>
    );
}

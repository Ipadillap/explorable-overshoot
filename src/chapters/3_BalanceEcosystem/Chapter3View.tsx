import { useState } from 'react';
import { BALANCE_ECOSYSTEM_NARRATIVE } from './narrative/3_BalanceEcosystemScript';
import { NarrativeCard } from './components/NarrativeCard';

interface Chapter3ViewProps {
    onNext?: () => void;
    onPrev?: () => void;
}

export function Chapter3View({ onNext }: Chapter3ViewProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const totalSteps = BALANCE_ECOSYSTEM_NARRATIVE.length;

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
                [Zona de Simulación / Canvas PixiJS - Capítulo 3]
            </section>

            {/* LADO DERECHO: Diálogos condicionados estrictamente por el contador interno */}
            <section className="w-full flex items-center justify-center">
                {currentStepIndex === 0 && (
                    <NarrativeCard
                        text={BALANCE_ECOSYSTEM_NARRATIVE[0].text}
                        stepNumber={1}
                        totalSteps={totalSteps}
                        buttonLabel={BALANCE_ECOSYSTEM_NARRATIVE[0].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 1 && (
                    <NarrativeCard
                        text={BALANCE_ECOSYSTEM_NARRATIVE[1].text}
                        stepNumber={2}
                        totalSteps={totalSteps}
                        buttonLabel={BALANCE_ECOSYSTEM_NARRATIVE[1].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 2 && (
                    <NarrativeCard
                        text={BALANCE_ECOSYSTEM_NARRATIVE[2].text}
                        stepNumber={3}
                        totalSteps={totalSteps}
                        buttonLabel={BALANCE_ECOSYSTEM_NARRATIVE[2].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 3 && (
                    <NarrativeCard
                        text={BALANCE_ECOSYSTEM_NARRATIVE[3].text}
                        stepNumber={4}
                        totalSteps={totalSteps}
                        buttonLabel={BALANCE_ECOSYSTEM_NARRATIVE[3].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}
            </section>
        </div>
    );
}

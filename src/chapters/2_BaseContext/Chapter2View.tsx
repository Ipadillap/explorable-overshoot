import { useEffect, useState } from 'react';
import { BASE_CONTEXT_NARRATIVE } from './narrative/2_BaseContextScript';
import { NarrativeCard } from './components/NarrativeCard';
import { useSimulation } from '../../simulation/react/useSimulation';
import {SimulationStage} from "../../shared/components/SimulationStage.tsx";

interface Chapter2ViewProps {
    onNext?: () => void;
    onPrev?: () => void;
}

export function Chapter2View({ onNext }: Chapter2ViewProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const {
        canvasRef,
        createIsland,
        resetSimulation,
        ecosystemMetrics,
    } = useSimulation();

    useEffect(() => {
        resetSimulation();
        return () => {
            resetSimulation();
        };
    }, []);

    const totalSteps = BASE_CONTEXT_NARRATIVE.length;

    const handleNextStep = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            onNext?.();
        }
    };

    return (
        <div className="w-full h-full grid grid-cols-2 gap-8 items-center p-8 select-none bg-[#F4F7F6]">
            {/* LADO IZQUIERDO: Escala el canvas proporcionalmente al 100% de la columna */}
            <section className="w-full h-full bg-white border border-[#DFE8E2] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-sm p-4">
                {currentStepIndex >= 2 ? (
                    <div className="w-full h-full flex items-center justify-center scale-90">
                        <SimulationStage
                            canvasRef={canvasRef}
                            createIsland={createIsland}
                            cycle={ecosystemMetrics.cycle}
                            showCycleIndicator={false}
                        />
                    </div>
                ) : (
                    <div className="text-slate-400 font-medium text-sm text-center px-6">
                        [La Isla de San Ignacio se revelará a continuación]
                    </div>
                )}
            </section>

            {/* LADO DERECHO: Diálogos de la narrativa */}
            <section className="w-full flex items-center justify-center">
                {currentStepIndex === 0 && (
                    <NarrativeCard
                        text={BASE_CONTEXT_NARRATIVE[0].text}
                        stepNumber={1}
                        totalSteps={totalSteps}
                        buttonLabel={BASE_CONTEXT_NARRATIVE[0].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 1 && (
                    <NarrativeCard
                        text={BASE_CONTEXT_NARRATIVE[1].text}
                        stepNumber={2}
                        totalSteps={totalSteps}
                        buttonLabel={BASE_CONTEXT_NARRATIVE[1].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 2 && (
                    <NarrativeCard
                        text={BASE_CONTEXT_NARRATIVE[2].text}
                        stepNumber={3}
                        totalSteps={totalSteps}
                        buttonLabel={BASE_CONTEXT_NARRATIVE[2].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 3 && (
                    <NarrativeCard
                        text={BASE_CONTEXT_NARRATIVE[3].text}
                        stepNumber={4}
                        totalSteps={totalSteps}
                        buttonLabel={BASE_CONTEXT_NARRATIVE[3].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 4 && (
                    <NarrativeCard
                        text={BASE_CONTEXT_NARRATIVE[4].text}
                        stepNumber={5}
                        totalSteps={totalSteps}
                        buttonLabel={BASE_CONTEXT_NARRATIVE[4].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 5 && (
                    <NarrativeCard
                        text={BASE_CONTEXT_NARRATIVE[5].text}
                        stepNumber={6}
                        totalSteps={totalSteps}
                        buttonLabel={BASE_CONTEXT_NARRATIVE[5].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}

                {currentStepIndex === 6 && (
                    <NarrativeCard
                        text={BASE_CONTEXT_NARRATIVE[6].text}
                        stepNumber={7}
                        totalSteps={totalSteps}
                        buttonLabel={BASE_CONTEXT_NARRATIVE[6].buttonLabel}
                        onNextStep={handleNextStep}
                    />
                )}
            </section>
        </div>
    );
}

import { useRef, useEffect } from "react";
import { BASE_CONTEXT_NARRATIVE } from "./2_BaseContextScript.ts";
import { NarrativeCard } from "../../narrative/NarrativeCard.tsx";
import { useStepper } from "../../narrative/useStepper.ts";
import { FullSimulationSandbox, type FullSimulationSandboxRef } from "../../simulation";
import type { ChapterViewProps } from "../../narrative/types.ts";



export function Chapter2View({ onNext }: ChapterViewProps) {
    const sandboxRef = useRef<FullSimulationSandboxRef>(null);
    const totalSteps = BASE_CONTEXT_NARRATIVE.length;
    const { index: currentStepIndex, next: handleNextStep } = useStepper(totalSteps, onNext);
    const currentNarrative = BASE_CONTEXT_NARRATIVE[currentStepIndex];


    // Reacción imperativa (Step 0 = ID 1, Step 1 = ID 2, etc.)
    useEffect(() => {
        if (!sandboxRef.current) return;

        // ID 2, ID 3 y ID 4 (Steps 1, 2 y 3): Isla visible, conejos iniciales en 0
        if (currentStepIndex >= 1 && currentStepIndex <= 3) {
            sandboxRef.current.setInitialRabbits(0);
            sandboxRef.current.setCenterPanelVisibility({
                showCanvas: true,
                showTotalRabbits: false,
                showTotalGrass: false,
                showGrassToBeRenewed: false,
                showGrassToNotBeRenewed: false,
            });
        }

        // ID 5 y ID 6 (Steps 4 y 5): Aparece la barra inferior de información
        if (currentStepIndex === 4 || currentStepIndex === 5) {
            sandboxRef.current.setInitialRabbits(0);
            sandboxRef.current.setCenterPanelVisibility({
                showCanvas: true,
                showTotalGrass: true,
                showGrassToBeRenewed: true,
                showGrassToNotBeRenewed: true,
                showTotalRabbits: false,
            });
        }

        // ID 7 (Step 6): Se fija conejos iniciales en 5 y aparece el contador de conejos
        if (currentStepIndex === 6) {
            sandboxRef.current.setInitialRabbits(5);
            sandboxRef.current.setCenterPanelVisibility({
                showCanvas: true,
                showTotalRabbits: true,
                showTotalGrass: true,
                showGrassToBeRenewed: true,
                showGrassToNotBeRenewed: true,
            });
        }
    }, [currentStepIndex]);

    return (
        <div className="w-full h-full grid grid-cols-2 gap-8 items-center p-8 select-none bg-[#F4F7F6]">
            {/* LADO IZQUIERDO: Simulación progresiva */}
            <section className="w-full h-full bg-white border border-[#DFE8E2] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-sm p-4">
                {/* Mantiene el Sandbox siempre montado para no perder la referencia */}
                <div className={`w-full h-full ${currentStepIndex >= 2 ? "block" : "hidden"}`}>
                    <FullSimulationSandbox
                        ref={sandboxRef}
                        initialVisibility={{
                            leftPanel: {
                                showBiocapacity: false,
                                showFootprint: false,
                                showConsumed: false,
                                showOvershoot: false,
                            },
                            centerPanel: {
                                showCanvas: true,
                                showCycleIndicator: false,
                                showTotalRabbits: false,
                                showTotalGrass: false,
                                showGrassToBeRenewed: false,
                                showGrassToNotBeRenewed: false,
                            },
                            rightPanel: {
                                showInitialRabbitsSlider: false,
                                showConsumptionRateSlider: false,
                                showDeathRateSlider: false,
                                showRegenerationRateSlider: false,
                                showPlayButton: false,
                                showStopButton: false,
                                showNextButton: false,
                                showRebootButton: false,
                            },
                        }}
                    />
                </div>

                {/* Vista previa /Placeholder para los pasos 0 y 1 */}
                {currentStepIndex < 2 && (
                    <div className="text-slate-400 font-medium text-sm text-center px-6">
                        [Próximamente imágenes explicativas]
                    </div>
                )}
            </section>

            {/* LADO DERECHO: Narrativa */}
            <section className="w-full flex items-center justify-center">
                {currentNarrative && (
                    <NarrativeCard
                        chapterLabel="Capítulo 2 — Conociendo a los Protagonistas"
                        step={currentNarrative}
                        stepNumber={currentStepIndex + 1}
                        totalSteps={totalSteps}
                        onNext={handleNextStep}
                    />
                )}
            </section>
        </div>
    );
}

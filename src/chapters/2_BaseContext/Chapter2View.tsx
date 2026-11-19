import { useEffect } from "react";
import { BASE_CONTEXT_NARRATIVE } from "./2_BaseContextScript.ts";
import { useStepper } from "../../narrative/useStepper.ts";
import type { ChapterViewProps } from "../../narrative/types.ts";

import { SubChapter2_1 } from "./subchapters/SubChapter2_1.tsx";
import { SubChapter2_2 } from "./subchapters/SubChapter2_2.tsx";
import { SubChapter2_3 } from "./subchapters/SubChapter2_3.tsx";
import { SubChapter2_4 } from "./subchapters/SubChapter2_4.tsx";
import { SubChapter2_5 } from "./subchapters/SubChapter2_5.tsx";
import { SubChapter2_6 } from "./subchapters/SubChapter2_6.tsx";
import { SubChapter2_7 } from "./subchapters/SubChapter2_7.tsx";

const SUBCHAPTER_VIEWS = [
    SubChapter2_1,
    SubChapter2_2,
    SubChapter2_3,
    SubChapter2_4,
    SubChapter2_5,
    SubChapter2_6,
    SubChapter2_7,
];

export function Chapter2View({ onNext, sandboxRef }: ChapterViewProps) {
    const totalSteps = BASE_CONTEXT_NARRATIVE.length;
    const { index: currentStepIndex, next: handleNextStep } = useStepper(totalSteps, onNext);

    useEffect(() => {
        if (!sandboxRef?.current) return;

        // Mantener paneles laterales ocultos durante todo el Capítulo 2
        sandboxRef.current.setLeftPanelVisibility({
            showBiocapacity: false,
            showFootprint: false,
            showConsumed: false,
            showOvershoot: false,
        });

        sandboxRef.current.setRightPanelVisibility({
            showConversionRate: false,
            showInitialRabbitsSlider: false,
            showConsumptionRateSlider: false,
            showDeathRateSlider: false,
            showRegenerationRateSlider: false,
            showPlayButton: false,
            showStopButton: false,
            showNextButton: false,
            showRebootButton: false,
        });

        // Steps 0 a 3 (IDs 2.1 a 2.4): Isla visible, conejos iniciales en 0
        if (currentStepIndex <= 3) {
            sandboxRef.current.setInitialRabbits(0);
            sandboxRef.current.setCenterPanelVisibility({
                showCanvas: true,
                showCycleIndicator: false,
                showTotalRabbits: false,
                showTotalGrass: false,
                showGrassToBeRenewed: false,
                showGrassToNotBeRenewed: false,
            });
        }

        // Steps 4 y 5 (IDs 2.5 y 2.6): Aparece la barra inferior de hierba y el contador de ciclos
        if (currentStepIndex === 4 || currentStepIndex === 5) {
            sandboxRef.current.setInitialRabbits(0);
            sandboxRef.current.setCenterPanelVisibility({
                showCanvas: true,
                showCycleIndicator: true,
                showTotalGrass: true,
                showGrassToBeRenewed: true,
                showGrassToNotBeRenewed: true,
                showTotalRabbits: false,
            });
        }

        // Step 6 (ID 2.7): Se fija conejos iniciales en 5 y aparece el contador de conejos
        if (currentStepIndex === 6) {
            sandboxRef.current.setInitialRabbits(5);
            sandboxRef.current.setCenterPanelVisibility({
                showCanvas: true,
                showCycleIndicator: true,
                showTotalRabbits: true,
                showTotalGrass: true,
                showGrassToBeRenewed: true,
                showGrassToNotBeRenewed: true,
            });
        }
    }, [currentStepIndex, sandboxRef]);

    const ActiveSubChapter = SUBCHAPTER_VIEWS[currentStepIndex];
    const currentStep = BASE_CONTEXT_NARRATIVE[currentStepIndex];

    return (
        <section className="w-[1440px] h-[704px] relative overflow-hidden select-none pointer-events-none">
            {ActiveSubChapter && currentStep && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <ActiveSubChapter
                        step={currentStep}
                        stepNumber={currentStepIndex + 1}
                        totalSteps={totalSteps}
                        onNext={handleNextStep}
                    />
                </div>
            )}
        </section>
    );
}

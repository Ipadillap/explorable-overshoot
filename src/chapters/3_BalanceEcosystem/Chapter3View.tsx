import { useRef, useEffect } from "react";
import { BALANCE_ECOSYSTEM_NARRATIVE } from "./3_BalanceEcosystemScript.ts";
import { useStepper } from "../../narrative/useStepper.ts";
import { FullSimulationSandbox, type FullSimulationSandboxRef } from "../../simulation";
import type { ChapterViewProps } from "../../narrative/types.ts";

import { SubChapter3_1 } from "./subchapters/SubChapter3_1.tsx";
import { SubChapter3_2 } from "./subchapters/SubChapter3_2.tsx";
import { SubChapter3_3 } from "./subchapters/SubChapter3_3.tsx";
import { SubChapter3_4 } from "./subchapters/SubChapter3_4.tsx";

const SUBCHAPTER_VIEWS = [
    SubChapter3_1,
    SubChapter3_2,
    SubChapter3_3,
    SubChapter3_4,
];

export function Chapter3View({ onNext }: ChapterViewProps) {
    const sandboxRef = useRef<FullSimulationSandboxRef>(null);
    const totalSteps = BALANCE_ECOSYSTEM_NARRATIVE.length;
    const { index: currentStepIndex, next } = useStepper(totalSteps, onNext);

    useEffect(() => {
        if (!sandboxRef.current) return;

        sandboxRef.current.reset();
        sandboxRef.current.setInitialRabbits(5);
        sandboxRef.current.setConsumptionRate(5);
        sandboxRef.current.setDeathRate(5);
        sandboxRef.current.setRegenerationRate(1);
    }, []);

    useEffect(() => {
        if (!sandboxRef.current) return;

        sandboxRef.current.setCenterPanelVisibility({
            showCanvas: true,
            showCycleIndicator: currentStepIndex >= 1,
            showTotalRabbits: true,
            showTotalGrass: true,
            showGrassToBeRenewed: true,
            showGrassToNotBeRenewed: true,
        });
    }, [currentStepIndex]);

    const handleNextStep = () => {
        if (currentStepIndex === 1) {
            sandboxRef.current?.play();
        }

        if (currentStepIndex === 2) {
            sandboxRef.current?.stop();
        }

        next();
    };

    const ActiveSubChapter = SUBCHAPTER_VIEWS[currentStepIndex];
    const currentStep = BALANCE_ECOSYSTEM_NARRATIVE[currentStepIndex];

    return (
        <section className="w-[1440px] h-[704px] relative overflow-hidden select-none bg-[#FFFFFF]">
            {/* CAPA BASE: Simulación propia del Capítulo 3 */}
            <div className="w-[1440px] h-[704px] grid grid-cols-[1fr_500px] gap-[32px] items-center p-[48px]">
                <div className="w-full h-full bg-[#F4F7F6]/60 border border-[#DFE8E2] rounded-[16px] flex items-center justify-center relative overflow-hidden p-[16px]">
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
                                showTotalRabbits: true,
                                showTotalGrass: true,
                                showGrassToBeRenewed: true,
                                showGrassToNotBeRenewed: true,
                            },
                            rightPanel: {
                                showConversionRate: true,
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
                <div />
            </div>

            {/* CAPA SUPERIOR: Subcapítulo activo */}
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

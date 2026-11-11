// src/chapters/Chapter7/Chapter7View.tsx

import { useRef, useState } from "react";
import {
    FullSimulationSandbox,
    type FullSimulationSandboxRef,
} from "../../shared/components/simulation/FullSimulationSandbox";
import { SimulationButton } from "../../shared/components/SimulationButton";
import { YOUR_TURN_NARRATIVE } from "./narrative/7_YourTurnScript";

export function Chapter7View() {
    const sandboxRef = useRef<FullSimulationSandboxRef>(null);

    // Estado del Tutorial Narrativo
    const [tutorialStepIndex, setTutorialStepIndex] = useState<number | null>(0);
    const isTutorialActive = tutorialStepIndex !== null;

    const handleAdvanceTutorial = () => {
        if (tutorialStepIndex === null) return;

        if (tutorialStepIndex < YOUR_TURN_NARRATIVE.length - 1) {
            setTutorialStepIndex((prev) => (prev !== null ? prev + 1 : null));
        } else {
            setTutorialStepIndex(null);
        }
    };

    // Posicionamiento dinámico de la tarjeta del tutorial
    const getTutorialCardPositionClass = () => {
        switch (tutorialStepIndex) {
            case 0:
            case 1:
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
            case 2:
                return "top-1/3 right-[28px] -translate-y-1/2";
            case 3:
                return "bottom-[40px] right-[28px]";
            case 4:
                return "top-1/2 left-[28px] -translate-y-1/2";
            default:
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
        }
    };

    return (
        <div className="relative w-full h-full select-none overflow-hidden bg-[#F4F7F6] flex items-center justify-center">
            {/* Overlay Tutorial Narrativo */}
            {isTutorialActive && tutorialStepIndex !== null && (
                <div className="absolute inset-0 z-50 pointer-events-auto">
                    <div
                        className={`absolute w-[270px] h-[270px] bg-black/30 border border-white/40 rounded-full p-6 shadow-xl flex flex-col items-center justify-between gap-2 text-center transition-all duration-500 animate-fadeIn ${getTutorialCardPositionClass()}`}
                    >
                        <div className="flex flex-col items-center gap-0.5 pt-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#60CBBF]">
                                Capítulo 7 — {tutorialStepIndex + 1} / {YOUR_TURN_NARRATIVE.length}
                            </span>
                        </div>

                        <p className="text-xs leading-relaxed text-white font-medium px-2 flex items-center justify-center">
                            {YOUR_TURN_NARRATIVE[tutorialStepIndex].text}
                        </p>

                        <div className="w-28 pb-2">
                            <SimulationButton
                                icon={3}
                                label={YOUR_TURN_NARRATIVE[tutorialStepIndex].buttonLabel || "Siguiente"}
                                onClick={handleAdvanceTutorial}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Simulación Completa Encapsulada */}
            <FullSimulationSandbox ref={sandboxRef} />
        </div>
    );
}

import { useEffect } from "react";
import { BALANCE_ECOSYSTEM_NARRATIVE } from "./3_BalanceEcosystemScript.ts";
import { useStepper } from "../../narrative/useStepper.ts";
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

export function Chapter3View({ onNext, sandboxRef }: ChapterViewProps) {
    const totalSteps = BALANCE_ECOSYSTEM_NARRATIVE.length;
    const { index: currentStepIndex, next } = useStepper(totalSteps, onNext);

    useEffect(() => {
        if (!sandboxRef?.current) return;

        // Asegurar parámetros base de equilibrio (5 conejos, 5 consumo, 5 muerte, 1 regeneración)
        sandboxRef.current.setConsumptionRate(5);
        sandboxRef.current.setDeathRate(5);
        sandboxRef.current.setRegenerationRate(1);

        // Panel izquierdo (métricas de sobregiro) aún oculto hasta el Cap 4
        sandboxRef.current.setLeftPanelVisibility({
            showBiocapacity: false,
            showFootprint: false,
            showConsumed: false,
            showOvershoot: false,
        });

        // Panel central completo (isla, ciclo, conejos e indicadores de hierba)
        sandboxRef.current.setCenterPanelVisibility({
            showCanvas: true,
            showCycleIndicator: true,
            showTotalRabbits: true,
            showTotalGrass: true,
            showGrassToBeRenewed: true,
            showGrassToNotBeRenewed: true,
        });

        // Panel derecho: mostrar conversión (5 hierba -> 1 conejo) y tasa de muerte natural
        sandboxRef.current.setRightPanelVisibility({
            showConversionRate: true,
            showInitialRabbitsSlider: false,
            showConsumptionRateSlider: false,
            showDeathRateSlider: false,
            showRegenerationRateSlider: false,
            showPlayButton: false,
            showStopButton: false,
            showNextButton: false,
            showRebootButton: false,
        });
    }, [sandboxRef]);

    const handleNextStep = () => {
        // Al pulsar "Iniciar Simulación" en el paso 3.2 (index 1), arranca el loop de ciclos
        if (currentStepIndex === 1) {
            sandboxRef?.current?.play();
        }

        // Al pasar de 3.3 (index 2) a la conclusión 3.4 (index 3), detenemos la reproducción
        if (currentStepIndex === 2) {
            sandboxRef?.current?.stop();
        }

        next();
    };

    const ActiveSubChapter = SUBCHAPTER_VIEWS[currentStepIndex];
    const currentStep = BALANCE_ECOSYSTEM_NARRATIVE[currentStepIndex];

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

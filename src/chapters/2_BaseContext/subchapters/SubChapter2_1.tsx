import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";
import { SimulationButton } from "../../../shared/ui/SimulationButton.tsx";
import { THEME } from "../../../shared/theme.ts";
import type { NarrativeStep } from "../../../narrative/types.ts";

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter2_1({ step, onNext }: SubChapterProps) {
    const [visibleStage, setVisibleStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setVisibleStage(1), 200),
            setTimeout(() => setVisibleStage(2), 450),
            setTimeout(() => setVisibleStage(3), 700),
            setTimeout(() => setVisibleStage(4), 950),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="w-[1440px] h-[704px] grid grid-cols-[1fr_500px] gap-[32px] items-center p-[48px] bg-[#FFFFFF] pointer-events-auto">
            {/* Izquierda: Diagrama 2x2 del papel */}
            <div className="w-full h-full bg-[#F4F7F6]/60 border border-[#DFE8E2] rounded-[16px] flex items-center justify-center p-[16px]">
                <div className="h-[450px] aspect-square grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr] gap-[16px] items-center justify-items-center">
                    <div className={`w-full aspect-square bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 1 ? "opacity-100" : "opacity-0"}`}>
                        <img src="/assets/Narrative/PaperLifeCycle/1_tala.jpeg" alt="Tala" className="w-full h-full object-contain" />
                    </div>

                    <ArrowRight className={`w-[24px] h-[24px] text-slate-400 transition-opacity duration-300 ${visibleStage >= 2 ? "opacity-100" : "opacity-0"}`} />

                    <div className={`w-full aspect-square bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 2 ? "opacity-100" : "opacity-0"}`}>
                        <img src="/assets/Narrative/PaperLifeCycle/2_transporte.jpeg" alt="Transporte" className="w-full h-full object-contain" />
                    </div>

                    <div />
                    <div />
                    <ArrowDown className={`w-[24px] h-[24px] text-slate-400 transition-opacity duration-300 ${visibleStage >= 3 ? "opacity-100" : "opacity-0"}`} />

                    <div className={`w-full aspect-square bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 4 ? "opacity-100" : "opacity-0"}`}>
                        <img src="/assets/Narrative/PaperLifeCycle/4_distribucion.jpeg" alt="Distribución" className="w-full h-full object-contain" />
                    </div>

                    <ArrowLeft className={`w-[24px] h-[24px] text-slate-400 transition-opacity duration-300 ${visibleStage >= 4 ? "opacity-100" : "opacity-0"}`} />

                    <div className={`w-full aspect-square bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 3 ? "opacity-100" : "opacity-0"}`}>
                        <img src="/assets/Narrative/PaperLifeCycle/3_fabricacion.jpeg" alt="Fabricación" className="w-full h-full object-contain" />
                    </div>
                </div>
            </div>

            {/* Derecha: Texto + Botón */}
            <div className="flex flex-col gap-[24px]">
                <div className="w-[500px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize} whitespace-pre-line`}>
                        {step.text}
                    </p>
                </div>

                <div className="w-[192px] pt-[8px] self-end">
                    <SimulationButton icon="" label={step.buttonLabel || "Siguiente"} onClick={onNext} />
                </div>
            </div>
        </div>
    );
}

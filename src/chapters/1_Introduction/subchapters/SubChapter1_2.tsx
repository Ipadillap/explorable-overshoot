import { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';
import { SimulationButton } from '../../../shared/ui/SimulationButton.tsx';
import { THEME } from '../../../shared/theme';
import type {NarrativeStep} from "../../../narrative/types.ts";

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter1_2({ step, onNext }: SubChapterProps) {
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
        <section className="w-[1440px] h-[704px] grid grid-cols-[500px_auto] justify-center gap-[128px] items-center p-[48px]">
            <div className="flex flex-col gap-[24px]">
                <div className="w-[500px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize}`}>
                        {step.text}
                    </p>
                </div>

                <div className="w-[192px] pt-[8px] self-end">
                    <SimulationButton
                        icon=""
                        label={step.buttonLabel || "Siguiente"}
                        onClick={onNext}
                    />
                </div>
            </div>

            <div className="h-[450px] aspect-square grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr] gap-[16px] items-center justify-items-center">
                <div className={`w-full aspect-square bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden transition-opacity duration-300 ${visibleStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/assets/Narrative/PaperLifeCycle/1_tala.jpeg" alt="Tala" className="w-full h-full object-contain" />
                </div>

                <ArrowRight className={`w-[24px] h-[24px] text-slate-400 transition-opacity duration-300 ${visibleStage >= 2 ? 'opacity-100' : 'opacity-0'}`} />

                {/* Cuadro 2: Transporte */}
                <div className={`w-full aspect-square bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/assets/Narrative/PaperLifeCycle/2_transporte.jpeg" alt="Transporte" className="w-full h-full object-contain" />
                </div>

                <div />
                <div />
                <ArrowDown className={`w-[24px] h-[24px] text-slate-400 transition-opacity duration-300 ${visibleStage >= 3 ? 'opacity-100' : 'opacity-0'}`} />

                {/* Cuadro 4: Distribución */}
                <div className={`w-full aspect-square bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/assets/Narrative/PaperLifeCycle/4_distribucion.jpeg" alt="Distribución" className="w-full h-full object-contain" />
                </div>

                <ArrowLeft className={`w-[24px] h-[24px] text-slate-400 transition-opacity duration-300 ${visibleStage >= 4 ? 'opacity-100' : 'opacity-0'}`} />

                {/* Cuadro 3: Fabricación */}
                <div className={`w-full aspect-square bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/assets/Narrative/PaperLifeCycle/3_fabricacion.jpeg" alt="Fabricación" className="w-full h-full object-contain" />
                </div>
            </div>
        </section>
    );
}

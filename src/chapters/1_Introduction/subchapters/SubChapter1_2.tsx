import { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';
import { SimulationButton } from '../../../shared/components/SimulationButton';
import { THEME } from '../../../shared/theme';
import type { NarrativeStep } from '../narrative/1_IntroductionScript';

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
        <section className="w-[1440px] h-[704px] grid grid-cols-[500px_auto] justify-center gap-[100px] items-center p-[48px]">
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

            <div className="w-[450px] h-[450px] flex items-center justify-center">
                <div className="h-full aspect-square grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr] gap-4 items-center justify-items-center">
                    <div className={`w-full aspect-square bg-white border-2 border-dashed border-[#DFE8E2] rounded-2xl flex items-center justify-center text-sm text-slate-400 shadow-sm transition-opacity duration-300 ${visibleStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                        Imagen 1
                    </div>

                    <ArrowRight className={`w-6 h-6 text-slate-400 transition-opacity duration-300 ${visibleStage >= 2 ? 'opacity-100' : 'opacity-0'}`} />

                    <div className={`w-full aspect-square bg-white border-2 border-dashed border-[#DFE8E2] rounded-2xl flex items-center justify-center text-sm text-slate-400 shadow-sm transition-opacity duration-300 ${visibleStage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                        Imagen 2
                    </div>

                    <div />
                    <div />
                    <ArrowDown className={`w-6 h-6 text-slate-400 transition-opacity duration-300 ${visibleStage >= 3 ? 'opacity-100' : 'opacity-0'}`} />

                    <div className={`w-full aspect-square bg-white border-2 border-dashed border-[#DFE8E2] rounded-2xl flex items-center justify-center text-sm text-slate-400 shadow-sm transition-opacity duration-300 ${visibleStage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                        Imagen 4
                    </div>

                    <ArrowLeft className={`w-6 h-6 text-slate-400 transition-opacity duration-300 ${visibleStage >= 4 ? 'opacity-100' : 'opacity-0'}`} />

                    <div className={`w-full aspect-square bg-white border-2 border-dashed border-[#DFE8E2] rounded-2xl flex items-center justify-center text-sm text-slate-400 shadow-sm transition-opacity duration-300 ${visibleStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        Imagen 3
                    </div>
                </div>
            </div>
        </section>
    );
}
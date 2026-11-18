import { useState, useEffect } from 'react';
import { Utensils, Droplets, Zap, Mountain } from 'lucide-react';
import { SimulationButton } from '../../../shared/components/SimulationButton';
import type { NarrativeStep } from '../narrative/1_IntroductionScript';
import {THEME} from "../../../shared/theme.ts";

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter1_1({ step, onNext }: SubChapterProps) {
    const [visibleIcons, setVisibleIcons] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setVisibleIcons(1), 200),
            setTimeout(() => setVisibleIcons(2), 450),
            setTimeout(() => setVisibleIcons(3), 700),
            setTimeout(() => setVisibleIcons(4), 950),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section className="w-[1440px] h-[704px] flex flex-col items-center justify-center p-[32px]">
            <div className="w-[620px] p-[40px]  flex flex-col items-center text-center gap-[80px]">
                <div className="w-[620px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize}`}>
                        {step.text}
                    </p>
                </div>

                {/* Zona Superior: 4 iconos con relleno pastel */}
                <div className="flex items-center justify-center gap-[32px]">
                    <div className={`transition-opacity duration-300 ${visibleIcons >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                        <Utensils className="w-[44px] h-[44px] text-orange-400 fill-orange-100" />
                    </div>
                    <div className={`transition-opacity duration-300 ${visibleIcons >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                        <Droplets className="w-[44px] h-[44px] text-sky-400 fill-sky-100" />
                    </div>
                    <div className={`transition-opacity duration-300 ${visibleIcons >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <Zap className="w-[44px] h-[44px] text-amber-400 fill-amber-100" />
                    </div>
                    <div className={`transition-opacity duration-300 ${visibleIcons >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                        <Mountain className="w-[44px] h-[44px] text-rose-400 fill-rose-100" />
                    </div>
                </div>

                <div className="w-[192px] pt-[8px]">
                    <SimulationButton
                        icon=""
                        label={step.buttonLabel || "Siguiente"}
                        onClick={onNext}
                    />
                </div>

            </div>
        </section>
    );
}

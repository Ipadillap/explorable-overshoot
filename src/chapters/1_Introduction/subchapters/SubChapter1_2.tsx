import { useState, useEffect } from 'react';
import { SimulationButton } from '../../../shared/ui/SimulationButton.tsx';
import { THEME } from '../../../shared/theme.ts';
import type { NarrativeStep } from '../../../narrative/types.ts';

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
            {/* Izquierda: Texto con THEME y botón alineado a la derecha */}
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

            {/* Derecha: Cuadrícula 2x2 limpia de recursos */}
            <div className="h-[450px] aspect-square grid grid-cols-2 grid-rows-2 gap-[16px]">
                <div className={`w-full h-full bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/assets/Narrative/resources/carbon.jpeg" alt="Carbón" className="w-full h-full object-contain" />
                </div>

                <div className={`w-full h-full bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/assets/Narrative/resources/petroleo.jpeg" alt="Petróleo" className="w-full h-full object-contain" />
                </div>

                <div className={`w-full h-full bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/assets/Narrative/resources/rio.jpeg" alt="Río" className="w-full h-full object-contain" />
                </div>

                <div className={`w-full h-full bg-white border border-[#DFE8E2] rounded-[16px] p-[8px] flex items-center justify-center overflow-hidden shadow-sm transition-opacity duration-300 ${visibleStage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/assets/Narrative/resources/tractor.jpeg" alt="Tractor" className="w-full h-full object-contain" />
                </div>
            </div>
        </section>
    );
}

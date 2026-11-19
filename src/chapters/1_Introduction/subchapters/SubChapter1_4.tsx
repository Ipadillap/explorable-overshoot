import { SimulationButton } from '../../../shared/ui/SimulationButton.tsx';
import { THEME } from '../../../shared/theme.ts';
import type { NarrativeStep } from '../../../narrative/types.ts';

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter1_4({ step, onNext }: SubChapterProps) {
    return (
        <section className="w-[1440px] h-[704px] grid grid-cols-[450px_500px] justify-center gap-[32px] items-center p-[48px]">
            {/*/!* Izquierda: Placeholder cuadrado para imagen *!/*/}
            {/*<div className="w-[450px] h-[450px] bg-white border border-dashed border-[#DFE8E2] rounded-[16px] flex items-center justify-center text-[13px] text-slate-400">*/}
            {/*    [Imagen referencial: Variables de consumo]*/}
            {/*</div>*/}

            {/* Derecha: Tarjeta de texto con THEME y botón alineado a la izquierda */}
            <div className="flex flex-col gap-[24px]">
                <div className="w-[500px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize}`}>
                        {step.text}
                    </p>
                </div>

                <div className="w-[192px] pt-[8px] self-start">
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

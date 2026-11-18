import { SimulationButton } from '../../../shared/components/SimulationButton';
import type { NarrativeStep } from '../narrative/1_IntroductionScript';

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter1_4({ step, stepNumber, totalSteps, onNext }: SubChapterProps) {
    return (
        <section className="w-full h-full grid grid-cols-[1fr_500px] gap-8 items-center p-12 animate-fadeIn">
            <div className="w-full h-[450px] bg-emerald-900/5 border-2 border-dashed border-[#DFE8E2] rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                [Imagen referencial: Variables de consumo]
            </div>

            <div className="bg-white border border-[#DFE8E2] rounded-2xl p-8 shadow-sm flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4C9289]">
                        Capítulo 1 — Paso {stepNumber} / {totalSteps}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800">
                        No es tan simple
                    </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                    {step.text}
                </p>

                <div className="w-44 pt-2">
                    <SimulationButton
                        icon={3}
                        label={step.buttonLabel || "Siguiente"}
                        onClick={onNext}
                    />
                </div>
            </div>
        </section>
    );
}

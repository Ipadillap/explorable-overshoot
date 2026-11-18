import { SimulationButton } from '../../../shared/components/SimulationButton';
import type { NarrativeStep } from '../narrative/1_IntroductionScript';

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter1_5({ step, stepNumber, totalSteps, onNext }: SubChapterProps) {
    return (
        <section className="w-full h-full flex flex-col items-center justify-center p-8 animate-fadeIn">
            <div className="w-[620px] bg-white border-2 border-[#4C9289] rounded-2xl p-10 shadow-md flex flex-col items-center text-center gap-8">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4C9289]">
                        Capítulo 1 — Paso {stepNumber} / {totalSteps}
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-800">
                        Descúbrelo por ti mismo
                    </h2>
                </div>

                <p className="text-base text-slate-600 leading-relaxed font-medium">
                    {step.text}
                </p>

                <div className="w-56">
                    <SimulationButton
                        icon={1}
                        label={step.buttonLabel || "Manos a la obra."}
                        onClick={onNext}
                    />
                </div>
            </div>
        </section>
    );
}

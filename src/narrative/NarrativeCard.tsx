import { SimulationButton } from '../shared/ui/SimulationButton.tsx';
import type { NarrativeStep } from './types.ts';

interface NarrativeCardProps {
    chapterLabel: string;
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function NarrativeCard({ chapterLabel, step, stepNumber, totalSteps, onNext }: NarrativeCardProps) {
    return (
        <div className="w-full bg-white border border-[#DFE8E2] rounded-2xl p-8 shadow-sm flex flex-col justify-between gap-6 text-center select-none z-10">
            <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4C9289]">
                    {chapterLabel}
                </span>
                <span className="text-xs font-medium text-slate-400">
                    {stepNumber} / {totalSteps}
                </span>
            </div>

            <p className="text-base leading-relaxed text-slate-700 px-2 min-h-[96px] flex items-center justify-center whitespace-pre-line text-left">
                {step.text}
            </p>

            <div className="w-48 self-center pt-2">
                <SimulationButton icon="➔" label={step.buttonLabel ?? 'Siguiente'} onClick={onNext} />
            </div>
        </div>
    );
}

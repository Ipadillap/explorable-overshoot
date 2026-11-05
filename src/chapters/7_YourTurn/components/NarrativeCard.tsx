import React from 'react';
import { SimulationButton } from '../../../shared/components/SimulationButton';

interface NarrativeCardProps {
    text: string;
    stepNumber: number;
    totalSteps: number;
    buttonLabel?: string;
    onNextStep: () => void;
}

export const NarrativeCard: React.FC<NarrativeCardProps> = ({
    text,
    stepNumber,
    totalSteps,
    buttonLabel = "Siguiente",
    onNextStep,
}) => {
    return (
        <div className="w-[540px] bg-white border border-[#DFE8E2] rounded-xl shadow-sm p-8 flex flex-col justify-between gap-6 text-center select-none z-10">
            <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4C9289]">
                    Capítulo 7 — Tu Turno
                </span>
                <span className="text-xs font-medium text-slate-400">
                    {stepNumber} / {totalSteps}
                </span>
            </div>

            <p className="text-base leading-relaxed text-slate-700 px-4 min-h-[96px] flex items-center justify-center whitespace-pre-line text-left">
                {text}
            </p>

            <div className="w-48 self-center pt-2">
                <SimulationButton
                    icon="➔"
                    label={buttonLabel}
                    onClick={onNextStep}
                />
            </div>
        </div>
    );
};

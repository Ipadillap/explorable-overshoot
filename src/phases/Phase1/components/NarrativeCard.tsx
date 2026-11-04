import React from 'react';
import { SimulationButton } from '../../../shared/components/SimulationButton';

interface NarrativeCardProps {
    title: string;
    text: string;
    stepNumber: number;
    totalSteps: number;
    buttonLabel?: string;
    onNextStep: () => void;
}

export const NarrativeCard: React.FC<NarrativeCardProps> = (
    {
        title,
        text,
        buttonLabel = "Siguiente",
        onNextStep,
    }) => {
    return (
        <div className="w-[540px] bg-white border border-[#DFE8E2] rounded-xl shadow-sm p-8 flex flex-col justify-between gap-6 text-center select-none">
            {/* Encabezado y Progreso */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                </div>
                <h1 className="text-2xl font-bold text-slate-800">
                    {title}
                </h1>
            </div>

            {/* Cuerpo del Texto Narrativo */}
            <p className="text-base leading-relaxed text-slate-600 px-4 min-h-[72px] flex items-center justify-center">
                {text}
            </p>

            {/* Control de Avance */}
            <div className="w-44 self-center pt-2">
                <SimulationButton
                    icon="➔"
                    label={buttonLabel}
                    onClick={onNextStep}
                />
            </div>
        </div>
    );
};
import React from 'react';
import { Clock } from 'lucide-react';

interface CycleIndicatorProps {
    cycle: number;
}

export const CycleIndicator: React.FC<CycleIndicatorProps> = ({ cycle }) => {
    return (
        <div className="relative flex items-center justify-center h-[12vh] max-h-20 min-h-14 aspect-square rounded-full bg-[#E6F3F1] border-2 border-[#4C9289]/30 shadow-lg select-none overflow-hidden">
            {/* Capa de icono de reloj (marca de agua ampliada) */}
            <Clock className="absolute w-[85%] h-[85%] text-[#4C9289]/20 stroke-[1.4]" />

            {/* Capa del número del ciclo en grande y centrado */}
            <span className="relative z-10 font-['Inter'] font-black text-[2.2rem] leading-none text-[#2C625B]">
                {cycle}
            </span>
        </div>
    );
};
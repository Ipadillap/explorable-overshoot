import type {ReactNode} from "react";

interface SimulationButtonProps {
    icon: ReactNode;
    label: string;
}

export function SimulationButton({ icon, label }: SimulationButtonProps) {
    return (
        <button className="w-full bg-white border border-[#DFE8E2] hover:bg-slate-50 rounded-lg p-2 flex flex-row items-center justify-center gap-2 cursor-pointer transition-colors">
            <div className="text-slate-700 text-xl">
                {icon}
            </div>
            <span className="text-[10px] font-medium text-slate-600 text-center leading-tight">
                {label}
            </span>
        </button>
    );
}
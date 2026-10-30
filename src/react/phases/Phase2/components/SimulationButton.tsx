import type { ReactNode } from "react";

interface SimulationButtonProps {
    icon: ReactNode;
    label: string;
    disabled?: boolean;
    onClick?: () => void;
}

export function SimulationButton({
                                     icon,
                                     label,
                                     disabled = false,
                                     onClick
                                 }: SimulationButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`w-full bg-white border border-[#DFE8E2] rounded-lg p-2 flex flex-row items-center justify-center gap-2 transition-all ${
                disabled
                    ? "opacity-40 cursor-not-allowed select-none bg-slate-50"
                    : "hover:bg-slate-50 cursor-pointer active:scale-95"
            }`}
        >
            <div className={`text-xl ${disabled ? "text-slate-400" : "text-slate-700"}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-medium text-center leading-tight ${
                disabled ? "text-slate-400" : "text-slate-600"
            }`}>
                {label}
            </span>
        </button>
    );
}

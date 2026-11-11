import type { ReactNode } from "react";
import { Play, Square, SkipForward, RefreshCw } from "lucide-react";

export type SimulationButtonType = "play" | "stop" | "next" | "reboot";

interface SimulationButtonProps {
    type?: SimulationButtonType;
    icon?: ReactNode;
    label: string;
    disabled?: boolean;
    onClick?: () => void;
}

export function SimulationButton({
                                     type,
                                     icon,
                                     label,
                                     disabled = false,
                                     onClick,
                                 }: SimulationButtonProps) {
    const renderIcon = () => {
        if (icon) return icon;

        const iconClasses = "w-4 h-4 transition-transform group-hover:scale-110";

        switch (type) {
            case "play":
                return <Play className={`${iconClasses} fill-[#4C9289] text-[#4C9289]`} />;
            case "stop":
                return <Square className={`${iconClasses} fill-[#D98B48] text-[#D98B48]`} />;
            case "next":
                return <SkipForward className={`${iconClasses} text-[#4C9289]`} />;
            case "reboot":
                return <RefreshCw className={`${iconClasses} text-[#74867E]`} />;
            default:
                return null;
        }
    };

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`group w-full h-[38px] bg-white border border-[#DFE8E2] rounded-[8px] px-3 flex flex-row items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                disabled
                    ? "opacity-40 cursor-not-allowed select-none bg-[#FAFAFA] border-transparent"
                    : "hover:bg-[#E9F0E6]/50 hover:border-[#4C9289]/40 active:scale-[0.97] cursor-pointer"
            }`}
        >
            {renderIcon() && (
                <div className={`flex items-center justify-center shrink-0 ${disabled ? "text-[#74867E]" : ""}`}>
                    {renderIcon()}
                </div>
            )}
            <span
                className={`text-[12px] font-medium leading-none transition-colors ${
                    disabled ? "text-[#74867E]" : "text-[#233C35] group-hover:text-[#4C9289]"
                }`}
            >
                {label}
            </span>
        </button>
    );
}

interface ResourceSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    isBlocked?: boolean;
    onChange: (newValue: number) => void;
}

export function ResourceSlider({
                                   label,
                                   value,
                                   min,
                                   max,
                                   step = 1,
                                   isBlocked = false,
                                   onChange,
                               }: ResourceSliderProps) {
    return (
        <div
            className={`w-[260px] h-[86px] flex flex-col justify-between transition-opacity duration-200 ${
                isBlocked ? "opacity-50 pointer-events-none select-none" : ""
            }`}
        >
            {/* Encabezado: Etiqueta y valor */}
            <div className="w-full h-[28px] flex items-center justify-between">
                <span className="text-[12px] font-medium leading-[15px] text-[#233C35] truncate max-w-[197px]">
                    {label}
                </span>

                <div className="w-[43px] min-w-[43px] h-[28px] bg-[#E9F0E6] border border-[#DFE8E2] rounded-[6px] flex items-center justify-center px-2">
                    <span className="text-[13px] font-semibold leading-[16px] text-[#233C35]">
                        {value}
                    </span>
                </div>
            </div>

            {/* Slider con límites */}
            <div className="w-full flex flex-col gap-1">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    disabled={isBlocked}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={`w-full h-[5px] bg-[#DFE8E2] rounded-[3px] appearance-none accent-[#4C9289] ${
                        isBlocked ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                />

                {/* Límites Mínimo / Máximo */}
                <div className="w-full h-[12px] flex justify-between items-center text-[10px] leading-[12px] text-[#74867E]">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        </div>
    );
}

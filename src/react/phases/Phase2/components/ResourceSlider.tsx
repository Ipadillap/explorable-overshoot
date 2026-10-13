interface ResourceSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (newValue: number) => void;
}

export function ResourceSlider({label, value, min, max, step = 1, onChange}: ResourceSliderProps) {
    return (
        // <div className="h-full bg-white border border-[#DFE8E2] rounded-lg p-3 flex flex-col justify-between">
        <div className="h-full p-3 flex flex-col justify-between">
            {/* Encabezado: Nombre del parámetro y valor actual */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span>
                    {label}
                </span>

                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-900">
                    {value}
                </span>
            </div>

            {/* Control deslizante (HTML Input Range) */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
            />
        </div>
    );
}
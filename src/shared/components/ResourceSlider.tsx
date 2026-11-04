// src/components/ResourceSlider.tsx
interface ResourceSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    isBlocked?: boolean; // Estado para bloquear/deshabilitar el slider
    onChange: (newValue: number) => void;
}

export function ResourceSlider({
                                   label,
                                   value,
                                   min,
                                   max,
                                   step = 1,
                                   isBlocked = false,
                                   onChange
                               }: ResourceSliderProps) {
    return (
        <div
            className={`h-full p-3 flex flex-col justify-between transition-opacity duration-200 ${
                isBlocked ? 'opacity-50 pointer-events-none select-none' : ''
            }`}
        >
            {/* Encabezado: Nombre del parámetro y valor actual */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span className={isBlocked ? 'text-slate-400' : 'text-slate-700'}>
                    {label}
                </span>

                <span className={`font-mono px-2 py-0.5 rounded ${
                    isBlocked ? 'bg-slate-200 text-slate-500' : 'bg-slate-100 text-slate-900'
                }`}>
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
                disabled={isBlocked}
                onChange={(e) => onChange(Number(e.target.value))}
                className={`w-full accent-emerald-600 ${
                    isBlocked ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
            />
        </div>
    );
}

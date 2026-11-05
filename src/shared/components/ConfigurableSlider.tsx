import React from "react";
import {ResourceSlider} from "./ResourceSlider.tsx";

export type SliderRole = "initialRabbits" | "consumptionRate" | "deathRate" | "regenerationRate";

interface ConfigurableSliderProps {
    role: SliderRole;
    value: number;
    isBlocked?: boolean;
    onChange: (val: number) => void;
    customLabel?: string;
    min?: number;
    max?: number;
    step?: number;
}

export const ConfigurableSlider: React.FC<ConfigurableSliderProps> = ({
                                                                          role,
                                                                          value,
                                                                          isBlocked = false,
                                                                          onChange,
                                                                          customLabel,
                                                                          min,
                                                                          max,
                                                                          step,
                                                                      }) => {
    const configByRole = {
        initialRabbits: {
            label: customLabel || "Cantidad inicial de conejos",
            min: min ?? 1,
            max: max ?? 10,
            step: step ?? 1,
        },
        consumptionRate: {
            label: customLabel || "Consumo per cápita",
            min: min ?? 1,
            max: max ?? 10,
            step: step ?? 1,
        },
        deathRate: {
            label: customLabel || "Tasa de muerte natural",
            min: min ?? 1,
            max: max ?? 10,
            step: step ?? 1,
        },
        regenerationRate: {
            label: customLabel || "Regeneración de hierba",
            min: min ?? 0,
            max: max ?? 1,
            step: step ?? 0.1,
        },
    };

    const config = configByRole[role];

    return (
        <div className="w-[260px] h-[86px]">
            <ResourceSlider
                label={config.label}
                value={value}
                min={config.min}
                max={config.max}
                step={config.step}
                isBlocked={isBlocked}
                onChange={onChange}
            />
        </div>
    );
};

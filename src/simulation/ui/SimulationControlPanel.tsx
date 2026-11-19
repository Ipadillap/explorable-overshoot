// src/simulation/ui/SimulationControlPanel.tsx

import React from "react";
import { ResourceSlider } from "./ResourceSlider.tsx";
import { SimulationButton } from "../../shared/ui/SimulationButton.tsx";
import type { RabbitStats } from "../domain/models/RabbitStats.ts";
import type { GrassStats } from "../domain/models/GrassStats.ts";
import { Hexagon, ArrowRight, Rabbit } from "lucide-react";

export interface SimulationControlVisibility {
    showConversionRate?: boolean;
    showInitialRabbitsSlider?: boolean;
    showConsumptionRateSlider?: boolean;
    showDeathRateSlider?: boolean;
    showRegenerationRateSlider?: boolean;
    showPlayButton?: boolean;
    showStopButton?: boolean;
    showNextButton?: boolean;
    showRebootButton?: boolean;
}

interface SimulationControlPanelProps {
    rabbitStats: RabbitStats;
    grassStats: GrassStats;
    isInitialRabbitsBlocked: boolean;
    isAnySliderBlocked: boolean;
    isPlayDisabled: boolean;
    isStopDisabled: boolean;
    isNextDisabled: boolean;
    isRebootDisabled: boolean;
    updateInitialRabbits: (val: number) => void;
    updateConsumptionRate: (val: number) => void;
    updateDeathRate: (val: number) => void;
    updateRegenerationRate: (val: number) => void;
    handlePlay: () => void;
    handleStop: () => void;
    handleNextCycle: () => void;
    handleReset: () => void;
    visibility?: SimulationControlVisibility;
}

export const SimulationControlPanel: React.FC<SimulationControlPanelProps> = ({
                                                                                  rabbitStats,
                                                                                  grassStats,
                                                                                  isInitialRabbitsBlocked,
                                                                                  isAnySliderBlocked,
                                                                                  isPlayDisabled,
                                                                                  isStopDisabled,
                                                                                  isNextDisabled,
                                                                                  isRebootDisabled,
                                                                                  updateInitialRabbits,
                                                                                  updateConsumptionRate,
                                                                                  updateDeathRate,
                                                                                  updateRegenerationRate,
                                                                                  handlePlay,
                                                                                  handleStop,
                                                                                  handleNextCycle,
                                                                                  handleReset,
                                                                                  visibility = {},
                                                                              }) => {
    const {
        showConversionRate = true,
        showInitialRabbitsSlider = true,
        showConsumptionRateSlider = true,
        showDeathRateSlider = true,
        showRegenerationRateSlider = true,
        showPlayButton = true,
        showStopButton = true,
        showNextButton = true,
        showRebootButton = true,
    } = visibility;

    const hasSliders = showInitialRabbitsSlider || showConsumptionRateSlider || showDeathRateSlider || showRegenerationRateSlider;
    const hasButtons = showPlayButton || showStopButton || showNextButton || showRebootButton;

    return (
        <aside className="w-[300px] py-[25px] bg-white border border-[#DFE8E2] rounded-lg
        flex flex-col items-center justify-center gap-[18px]
        shadow-sm select-none">

            {/* Encabezado + Indicador visual de conversión (pasto -> conejo) */}
            <div className="w-[260px] h-[38px] flex flex-row justify-center items-center shrink-0">

                {showConversionRate && (
                    <div
                        title="Comida necesaria para que nazca un nuevo conejo"
                        className="h-[34px] px-[10px] bg-[#E9F0E6] border border-[#DFE8E2] rounded-[8px] flex items-center gap-[6px]"
                    >
                        {/* 5 + Pasto */}
                        <div className="flex items-center gap-[3px]">
                            <span className="text-[12px] font-bold text-[#233C35] leading-none">
                                {rabbitStats.conversionRate}
                            </span>
                            <Hexagon className="w-[15px] h-[15px] text-[#4C9289] fill-[#94B98A]/40 shrink-0" />
                        </div>

                        {/* Flecha */}
                        <ArrowRight className="w-[13px] h-[13px] text-[#74867E] shrink-0" />

                        {/* Conejo con "1" superpuesto en la esquina inferior izquierda */}
                        <div className="relative w-[22px] h-[22px] flex items-center justify-center shrink-0">
                            <Rabbit className="w-[17px] h-[17px] text-[#233C35]" />
                            <span className="absolute -bottom-[2px] -left-[3px] min-w-[12px] h-[12px] px-[2px] rounded-full bg-[#4C9289] text-white text-[9px] font-bold leading-none flex items-center justify-center shadow-xs">
                                +1
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {hasSliders && hasButtons && <div className="w-[260px] h-px bg-[#DFE8E2]" />}

            {/* Sliders */}
            {hasSliders && (
                <div className="w-[260px] py-[25px] flex flex-col gap-3 items-center justify-center">
                    {showInitialRabbitsSlider && (
                        <ResourceSlider
                            label="Cantidad inicial de conejos"
                            value={rabbitStats.initialCount}
                            min={0}
                            max={10}
                            isBlocked={isInitialRabbitsBlocked}
                            onChange={updateInitialRabbits}
                        />
                    )}

                    {showConsumptionRateSlider && (
                        <ResourceSlider
                            label="Consumo per cápita"
                            value={rabbitStats.consumptionRate}
                            min={1}
                            max={10}
                            isBlocked={isAnySliderBlocked}
                            onChange={updateConsumptionRate}
                        />
                    )}

                    {showDeathRateSlider && (
                        <ResourceSlider
                            label="Tasa de muerte natural"
                            value={rabbitStats.deathRate}
                            min={1}
                            max={10}
                            isBlocked={isAnySliderBlocked}
                            onChange={updateDeathRate}
                        />
                    )}

                    {showRegenerationRateSlider && (
                        <ResourceSlider
                            label="Regeneración por unidad de hierba"
                            value={grassStats.regenerationRate}
                            min={0}
                            max={1}
                            step={0.1}
                            isBlocked={isAnySliderBlocked}
                            onChange={updateRegenerationRate}
                        />
                    )}
                </div>
            )}

            {hasSliders && hasButtons && <div className="w-full h-px bg-[#DFE8E2]" />}

            {/* Botones */}
            {hasButtons && (
                <div className="w-[260px] h-[91px] grid grid-cols-2 gap-3 place-items-center">
                    {showPlayButton && (
                        <SimulationButton
                            type="play"
                            label="Play"
                            disabled={isPlayDisabled}
                            onClick={handlePlay}
                        />
                    )}
                    {showStopButton && (
                        <SimulationButton
                            type="stop"
                            label="Stop"
                            disabled={isStopDisabled}
                            onClick={handleStop}
                        />
                    )}
                    {showNextButton && (
                        <SimulationButton
                            type="next"
                            label="Next"
                            disabled={isNextDisabled}
                            onClick={handleNextCycle}
                        />
                    )}
                    {showRebootButton && (
                        <SimulationButton
                            type="reboot"
                            label="Reboot"
                            disabled={isRebootDisabled}
                            onClick={handleReset}
                        />
                    )}
                </div>
            )}
        </aside>
    );
};

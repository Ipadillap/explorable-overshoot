// src/shared/components/simulation/SimulationControlPanel.tsx

import React from "react";
import { ResourceSlider } from "../ResourceSlider";
import { SimulationButton } from "../SimulationButton";
import type { RabbitStats } from "../../../simulation/engine/models/RabbitStats";
import type { GrassStats } from "../../../simulation/engine/models/GrassStats";
import {SlidersHorizontal} from "lucide-react";

export interface SimulationControlVisibility {
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

            {/* texto */}
            <div className="w-[260px] h-[38px] flex flex-col items-start gap-[7px] shrink-0">
                {/* Título e Ícono */}
                <div className="w-full h-[18px] flex flex-row justify-between items-center">
                    <h3 className="text-[15px] font-semibold leading-[18px] text-[#233C35]">
                        Controles
                    </h3>
                    <SlidersHorizontal className="w-[18px] h-[18px] text-[#4C9289]" />
                </div>

                {/* Subtítulo / Instrucción */}
                <p className="text-[11px] font-normal leading-[13px] text-[#74867E]">
                    Ajusta los parámetros
                </p>
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

import React from "react";
import { ResourceSlider } from "../ResourceSlider";
import { SimulationButton } from "../SimulationButton";
import type { RabbitStats } from "../../../simulation/engine/models/RabbitStats";
import type { GrassStats } from "../../../simulation/engine/models/GrassStats";

export interface SimulationControlVisibility {
    // 4 Sliders
    showInitialRabbitsSlider?: boolean;
    showConsumptionRateSlider?: boolean;
    showDeathRateSlider?: boolean;
    showRegenerationRateSlider?: boolean;

    // 4 Botones
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
    // Banderas de visibilidad individuales (todas true por defecto)
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

    // -------------------------------------------------------------------------
    // DEFINICIÓN DINÁMICA DE SLIDERS VISIBLES (Tu maquetado exacto)
    // -------------------------------------------------------------------------
    const sliders = [
        showInitialRabbitsSlider && {
            key: "initialRabbits",
            component: (
                <ResourceSlider
                    label="Cantidad inicial de conejos"
                    value={rabbitStats.initialCount}
                    min={1}
                    max={10}
                    isBlocked={isInitialRabbitsBlocked}
                    onChange={updateInitialRabbits}
                />
            ),
        },
        showConsumptionRateSlider && {
            key: "consumptionRate",
            component: (
                <ResourceSlider
                    label="Consumo per cápita"
                    value={rabbitStats.consumptionRate}
                    min={1}
                    max={10}
                    isBlocked={isAnySliderBlocked}
                    onChange={updateConsumptionRate}
                />
            ),
        },
        showDeathRateSlider && {
            key: "deathRate",
            component: (
                <ResourceSlider
                    label="Tasa de muerte natural"
                    value={rabbitStats.deathRate}
                    min={1}
                    max={10}
                    isBlocked={isAnySliderBlocked}
                    onChange={updateDeathRate}
                />
            ),
        },
        showRegenerationRateSlider && {
            key: "regenerationRate",
            component: (
                <ResourceSlider
                    label="Regeneración por unidad de hierba"
                    value={grassStats.regenerationRate}
                    min={0}
                    max={1}
                    step={0.1}
                    isBlocked={isAnySliderBlocked}
                    onChange={updateRegenerationRate}
                />
            ),
        },
    ].filter(Boolean) as { key: string; component: React.ReactNode }[];

    // -------------------------------------------------------------------------
    // DEFINICIÓN DINÁMICA DE BOTONES VISIBLES
    // -------------------------------------------------------------------------
    const buttons = [
        showPlayButton && {
            key: "play",
            component: (
                <SimulationButton
                    icon={1}
                    label="Play"
                    disabled={isPlayDisabled}
                    onClick={handlePlay}
                />
            ),
        },
        showStopButton && {
            key: "stop",
            component: (
                <SimulationButton
                    icon={2}
                    label="Stop"
                    disabled={isStopDisabled}
                    onClick={handleStop}
                />
            ),
        },
        showNextButton && {
            key: "next",
            component: (
                <SimulationButton
                    icon={3}
                    label="Next"
                    disabled={isNextDisabled}
                    onClick={handleNextCycle}
                />
            ),
        },
        showRebootButton && {
            key: "reboot",
            component: (
                <SimulationButton
                    icon={4}
                    label="Reboot"
                    disabled={isRebootDisabled}
                    onClick={handleReset}
                />
            ),
        },
    ].filter(Boolean) as { key: string; component: React.ReactNode }[];

    const hasSliders = sliders.length > 0;
    const hasButtons = buttons.length > 0;

    // -------------------------------------------------------------------------
    // CÁLCULO DE ALTURA TOTAL DEL PADRE (Sin tocar la maquetación interna)
    // -------------------------------------------------------------------------
    // Se calcula proporcionalmente según la cantidad de sliders presentes (máx 480px con los 4)
    const slidersHeight = hasSliders ? (sliders.length / 4) * 480 : 0;
    const buttonsHeight = hasButtons ? 140 : 0;
    const paddingAndGaps = (hasSliders && hasButtons ? 16 : 0) + 32;

    const totalHeight = slidersHeight + buttonsHeight + paddingAndGaps;

    return (
        <div className="h-full grid content-center items-center justify-center">
            <aside
                className={`gap-3 bg-white border border-[#DFE8E2] rounded-lg flex flex-col items-center justify-center transition-all duration-300 shadow-sm ${
                    hasSliders && hasButtons
                        ? "justify-between"
                        : hasSliders
                            ? "justify-start"
                            : "justify-end"
                }`}
                style={{
                    height: `${totalHeight}px`,
                }}
            >
                {/* Sección de Sliders - Tu estructura original sin cambios */}
                {hasSliders && (
                    <div
                        className="w-[280px] flex flex-col justify-between items-center transition-all duration-300"
                        style={{ height: `${slidersHeight}px` }}
                    >
                        {sliders.map((item, index) => (
                            <React.Fragment key={item.key}>
                                <div className="w-[260px] h-[100px]">
                                    {item.component}
                                </div>
                                {index < sliders.length - 1 && (
                                    <div className="w-full h-px bg-[#DFE8E2] my-1" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {/* Separador entre bloques si existen ambos */}
                {hasSliders && hasButtons && (
                    <div className="w-full h-px bg-[#DFE8E2] my-2" />
                )}

                {/* Sección de Botones de Control */}
                {hasButtons && (
                    <div
                        className={`w-[260px] grid gap-4 place-items-center ${
                            buttons.length === 1
                                ? "grid-cols-1"
                                : "grid-cols-2"
                        }`}
                    >
                        {buttons.map((btn) => (
                            <div key={btn.key} className="w-24">
                                {btn.component}
                            </div>
                        ))}
                    </div>
                )}
            </aside>
        </div>
    );
};

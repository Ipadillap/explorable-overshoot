// src/shared/components/simulation/SimulationCenterPanel.tsx

import React from "react";
import { SimulationCanvas, type SimulationCanvasRef } from "../../../simulation/react/SimulationCanvas";
import { CycleIndicator } from "../CycleIndicatorProps";
import { RabbitBlock } from "../RabbitBlock";
import { HexagonBlock } from "../HexagonBlock";
import type { EcosystemMetrics } from "../../../simulation/engine/models/EcosystemMetrics";

export interface SimulationCenterVisibility {
    showCanvas?: boolean;
    showCycleIndicator?: boolean;
    showTotalRabbits?: boolean;
    showTotalGrass?: boolean;
    showGrassToBeRenewed?: boolean;
    showGrassToNotBeRenewed?: boolean;
}

interface SimulationCenterPanelProps {
    canvasRef: React.RefObject<SimulationCanvasRef | null>;
    createIsland: () => void;
    ecosystemMetrics: EcosystemMetrics;
    totalGrassToBeRenewed: number;
    totalGrassToNotBeRenewed: number;
    visibility?: SimulationCenterVisibility;
}

export const SimulationCenterPanel: React.FC<SimulationCenterPanelProps> = ({
                                                                                canvasRef,
                                                                                createIsland,
                                                                                ecosystemMetrics,
                                                                                totalGrassToBeRenewed,
                                                                                totalGrassToNotBeRenewed,
                                                                                visibility = {},
                                                                            }) => {
    const {
        showCanvas = true,
        showCycleIndicator = true,
        showTotalRabbits = true,
        showTotalGrass = true,
        showGrassToBeRenewed = true,
        showGrassToNotBeRenewed = true,
    } = visibility;

    const hasAnySummary = showTotalRabbits || showTotalGrass || showGrassToBeRenewed || showGrassToNotBeRenewed;

    return (
        <section className="w-[804px] h-[704px] flex flex-col gap-4 select-none">
            {/*
              Contenedor del Lienzo: En lugar de renderizado condicional ({showCanvas && ...}),
              usamos la clase `hidden` cuando showCanvas es false.
              Esto evita que el contexto de PixiJS se destruya y conserve el estado gráfico del pasto.
            */}
            <div
                className={`relative flex-1 bg-white border border-[#DFE8E2] rounded-lg overflow-hidden shadow-sm flex items-center justify-center ${
                    showCanvas ? "" : "hidden"
                }`}
            >
                <SimulationCanvas ref={canvasRef} onReady={createIsland} />

                {showCycleIndicator && (
                    <div className="absolute bottom-4 right-4 z-10">
                        <CycleIndicator cycle={ecosystemMetrics.cycle} />
                    </div>
                )}
            </div>

            {/* Resumen Inferior */}
            {hasAnySummary && (
                <div className="w-[804px] h-[102px] bg-[#fafafa] border border-[#DFE8E2] rounded-lg flex items-center justify-between px-6 gap-5 shadow-sm shrink-0">
                    {/* Conejos totales */}
                    {showTotalRabbits && (
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[34px] h-[34px] bg-[#E6F3F1] rounded-[9px] flex items-center justify-center">
                                <RabbitBlock color="#E6F3F1" />
                            </div>
                            <div className="flex flex-col gap-[3px]">
                    <span className="text-[22px] font-semibold leading-[27px] text-[#233C35]">
                        {ecosystemMetrics.totalRabbits}
                    </span>
                                <span className="text-[10px] text-[#74867E] leading-[12px]">
                        Conejos
                    </span>
                            </div>
                        </div>
                    )}

                    {/* Hierba total */}
                    {showTotalGrass && (
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[34px] h-[34px] bg-[#E9F0E6] rounded-[9px] flex items-center justify-center">
                                <HexagonBlock color="#E9F0E6" />
                            </div>
                            <div className="flex flex-col gap-[3px]">
                                <span className="text-[22px] font-semibold leading-[27px] text-[#233C35]">
                                    {ecosystemMetrics.totalGrass}
                                </span>
                                <span className="text-[10px] text-[#74867E] leading-[12px]">
                                    Hierba viva
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Hierba a renovar */}
                    {showGrassToBeRenewed && (
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[34px] h-[34px] bg-[#F8EDC9] rounded-[9px] flex items-center justify-center">
                                <HexagonBlock color="#F8EDC9" />
                            </div>
                            <div className="flex flex-col gap-[3px]">
                                <span className="text-[22px] font-semibold leading-[27px] text-[#233C35]">
                                    {totalGrassToBeRenewed}
                                </span>
                                <span className="text-[10px] text-[#74867E] leading-[12px]">
                                    Por regenerar
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Hierba que no se renovará */}
                    {showGrassToNotBeRenewed && (
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[34px] h-[34px] bg-[#F5E3DE] rounded-[9px] flex items-center justify-center">
                                <HexagonBlock color="#F5E3DE" />
                            </div>
                            <div className="flex flex-col gap-[3px]">
                                <span className="text-[22px] font-semibold leading-[27px] text-[#233C35]">
                                    {totalGrassToNotBeRenewed}
                                </span>
                                <span className="text-[10px] text-[#74867E] leading-[12px]">
                                    Sin regenerar
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

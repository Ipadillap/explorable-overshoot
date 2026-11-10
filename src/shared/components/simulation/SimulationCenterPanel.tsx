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
    // Por defecto, todos los elementos se muestran
    const {
        showCanvas = true,
        showCycleIndicator = true,
        showTotalRabbits = true,
        showTotalGrass = true,
        showGrassToBeRenewed = true,
        showGrassToNotBeRenewed = true,
    } = visibility;

    const hasAnySummaryBlockVisible =
        showTotalRabbits || showTotalGrass || showGrassToBeRenewed || showGrassToNotBeRenewed;

    return (
        <section className="w-[804px] h-[704px] rounded-lg flex flex-col justify-between gap-4 transition-all duration-300">
            {/* 1. Lienzo Visual de Simulación y 2. Indicador de Ciclo */}
            {showCanvas && (
                <div className="relative w-full flex-1 bg-white border border-[#DFE8E2] rounded-lg overflow-hidden shadow-sm flex items-center justify-center">
                    <SimulationCanvas
                        ref={canvasRef}
                        onReady={createIsland}
                    />

                    {showCycleIndicator && (
                        <div className="absolute bottom-4 right-4 z-10">
                            <CycleIndicator cycle={ecosystemMetrics.cycle} />
                        </div>
                    )}
                </div>
            )}

            {/* 3. Barra Inferior de Resumen de Simulación (Ajuste Dinámico de Ancho y Centrado) */}
            {hasAnySummaryBlockVisible && (
                <div className="w-full flex justify-center shrink-0">
                    <div className="h-[102px] w-fit max-w-full flex flex-row items-center justify-center border border-[#DFE8E2] rounded-lg bg-[#fafafa] gap-4 px-6 shadow-sm transition-all duration-300">
                        {/* Cantidad de Conejos */}
                        {showTotalRabbits && (
                            <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                                <RabbitBlock color="#e6f3f1" />
                                <p className="font-bold">{ecosystemMetrics.totalRabbits}</p>
                            </div>
                        )}

                        {/* Cantidad de Pasto Libre (Verde) */}
                        {showTotalGrass && (
                            <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                                <HexagonBlock color="#e9f0e6" />
                                <p className="font-bold">{ecosystemMetrics.totalGrass}</p>
                            </div>
                        )}

                        {/* Cantidad de Pasto en Regeneración (Amarillo) */}
                        {showGrassToBeRenewed && (
                            <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                                <HexagonBlock color="#f8edc9" />
                                <p className="font-bold">{totalGrassToBeRenewed}</p>
                            </div>
                        )}

                        {/* Cantidad de Bloques Sin Pasto ni Regeneración (Rojo) */}
                        {showGrassToNotBeRenewed && (
                            <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                                <HexagonBlock color="#f5e3de" />
                                <p className="font-bold">{totalGrassToNotBeRenewed}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

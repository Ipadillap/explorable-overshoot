import React from "react";
import type { EcosystemMetrics } from "../../../simulation/engine/models/EcosystemMetrics";

export interface EcosystemMetricsVisibility {
    showBiocapacity?: boolean;
    showFootprint?: boolean;
    showConsumed?: boolean;
    showOvershoot?: boolean;
}

interface EcosystemMetricsPanelProps {
    ecosystemMetrics: EcosystemMetrics;
    visibility?: EcosystemMetricsVisibility;
}

export const EcosystemMetricsPanel: React.FC<EcosystemMetricsPanelProps> = ({
                                                                                ecosystemMetrics,
                                                                                visibility = {},
                                                                            }) => {
    const {
        showBiocapacity = true,
        showFootprint = true,
        showConsumed = true,
        showOvershoot = true,
    } = visibility;

    const visibleMetricsCount = [showBiocapacity, showFootprint, showConsumed].filter(Boolean).length;
    const hasAnyMetricVisible = visibleMetricsCount > 0;

    const getGridRowsTemplate = () => {
        const rows: string[] = [];

        if (hasAnyMetricVisible) {
            rows.push(visibleMetricsCount === 3 ? "432px" : "auto");
        }

        if (showOvershoot) {
            rows.push("178px");
        }

        rows.push("34px");

        return rows.join(" ");
    };

    return (
        <aside
            className="h-full rounded-lg grid content-center gap-4 transition-all duration-300"
            style={{
                gridTemplateRows: getGridRowsTemplate(),
            }}
        >
            {hasAnyMetricVisible && (
                <div className="
                borderborder-[#DFE8E2]
                rounded-lg flex
                flex-col justify-center
                overflow-hidden
                shadow-sm
                gap-5
                bg-white">
                    {/* Zona 1: Biocapacidad */}
                    {showBiocapacity && (
                        <div className="p-5 flex flex-col justify-center min-h-[94px]">
                            <p className="text-sm text-gray-500">Biocapacidad</p>
                            <p className="text-xl font-semibold">{ecosystemMetrics.biocapacity}</p>
                        </div>
                    )}

                    {showBiocapacity && (showFootprint || showConsumed) && (
                        <div className="w-full h-px bg-[#DFE8E2]" />
                    )}

                    {/* Zona 2: Huella Ecológica */}
                    {showFootprint && (
                        <div className="p-5 flex flex-col justify-center min-h-[94px]">
                            <p className="text-sm text-gray-500">Huella ecológica</p>
                            <p className="text-xl font-semibold">{ecosystemMetrics.ecologicalFootprint}</p>
                        </div>
                    )}

                    {showFootprint && showConsumed && (
                        <div className="w-full h-px bg-[#DFE8E2]" />
                    )}

                    {/* Zona 3: Hierba Consumida */}
                    {showConsumed && (
                        <div className="p-5 flex flex-col justify-center min-h-[94px]">
                            <p className="text-sm text-gray-500">Hierba consumida</p>
                            <p className="text-xl font-semibold">{ecosystemMetrics.consumedGrass}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Bloque 2: Sobregiro Ecológico */}
            {showOvershoot && (
                <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg flex flex-col items-center justify-center p-4 shadow-sm">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-gray-600">¿Sobregiro ecológico?</p>
                        <p
                            className={`text-2xl font-bold ${
                                ecosystemMetrics.isOvershoot ? "text-red-500" : "text-green-600"
                            }`}
                        >
                            {ecosystemMetrics.isOvershoot ? "SÍ" : "NO"}
                        </p>
                    </div>
                </div>
            )}

            {/* Bloque 3: Zona Libre (Espacio reservado inferior) */}
            <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg" />
        </aside>
    );
};

import React from "react";
import type { EcosystemMetrics } from "../../../simulation/engine/models/EcosystemMetrics";
import { Footprints, Sprout, Wheat } from "lucide-react";

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

    const hasAnyMetric = showBiocapacity || showFootprint || showConsumed;

    // LÓGICA DE PORCENTAJE Y PALETA DINÁMICA
    const demandRatio = ecosystemMetrics.biocapacity > 0
        ? Math.round((ecosystemMetrics.ecologicalFootprint / ecosystemMetrics.biocapacity) * 100)
        : 0;

    const progressWidth = Math.min(100, demandRatio);

    const isOvershoot = ecosystemMetrics.isOvershoot;

    const theme = isOvershoot
        ? {
            cardBg: "bg-[#FCF0E3]",
            dotBg: "bg-[#D98B48]",
            textMain: "text-[#AA6B2F]",
            barTrackBg: "bg-[#EDDCC8]",
            barFillBg: "bg-[#D98B48]",
        }
        : {
            cardBg: "bg-[#EBF3F0]",
            dotBg: "bg-[#4C9289]",
            textMain: "text-[#233C35]",
            barTrackBg: "bg-[#D8E6E2]",
            barFillBg: "bg-[#4C9289]",
        };

    return (
        <aside className="w-[240px] h-[704px] flex flex-col justify-center gap-4 select-none">
            {/* Bloque de Métricas Superiores */}
            {hasAnyMetric && (
                <div className="py-[20px] bg-white border border-[#DFE8E2] rounded-lg flex flex-col justify-center items-center gap-[20px] shadow-sm shrink-0">
                    <p className="w-[200px] h-[18px] font-sans font-semibold text-[15px] leading-[18px] text-[#233C35] flex-none order-0 grow-0">
                        Estado del ecosistema
                    </p>

                    {/* Biocapacidad */}
                    {showBiocapacity && (
                        <div className="w-[200px] h-[94px] flex flex-col justify-between p-0">
                            <div className="flex items-center gap-2 text-[#74867E]">
                                <Sprout className="w-[18px] h-[18px] text-[#4C9289]" />
                                <span className="text-xs">Biocapacidad</span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-[32px] font-semibold leading-none text-[#233C35]">
                                    {ecosystemMetrics.biocapacity}
                                </span>
                                <span className="text-[11px] text-[#74867E]">u. / ciclo</span>
                            </div>

                            <p className="text-[11px] leading-tight text-[#74867E]">
                                Lo que la pradera puede regenerar.
                            </p>
                        </div>
                    )}

                    {showBiocapacity && (showFootprint || showConsumed) && <div className="w-[200px] h-px bg-[#DFE8E2]" />}

                    {/* Huella Ecológica */}
                    {showFootprint && (
                        <div className="w-[200px] h-[111px] flex flex-col justify-between p-0">
                            <div className="flex items-center gap-2 text-[#74867E]">
                                <Footprints className="w-[18px] h-[18px] text-[#4C9289]" />
                                <span className="text-xs">Huella ecológica</span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-[32px] font-semibold leading-none text-[#233C35]">
                                    {ecosystemMetrics.ecologicalFootprint}
                                </span>
                                <span className="text-[11px] text-[#74867E]">u. / ciclo</span>
                            </div>

                            <p className="text-[11px] leading-[150%] text-[#74867E]">
                                Lo que los conejos consumen por ciclo.
                            </p>
                        </div>
                    )}

                    {showFootprint && showConsumed && <div className="w-[200px] h-px bg-[#DFE8E2]" />}

                    {/* Hierba Consumida */}
                    {showConsumed && (
                        <div className="w-[200px] h-[67px] flex flex-col justify-between p-0">
                            <div className="flex items-center gap-2 text-[#74867E]">
                                <Wheat className="w-[18px] h-[18px] text-[#4C9289]" />
                                <span className="text-xs">Hierba consumida</span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-[32px] font-semibold leading-none text-[#233C35]">
                                    {ecosystemMetrics.consumedGrass}
                                </span>
                                <span className="text-[11px] text-[#74867E]">unidades</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Bloque de Sobregiro Ecológico */}
            {showOvershoot && (
                <div className={`w-[240px] h-[178px] ${theme.cardBg} rounded-[12px] p-5 flex flex-col items-start gap-[14px] transition-colors duration-300`}>
                    {/* Estado con punto indicador */}
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${theme.dotBg}`} />
                        <span className={`text-[14px] ${theme.textMain} font-medium`}>
                            {isOvershoot ? "Sobregiro activo" : "Sin sobregiro"}
                        </span>
                    </div>

                    {/* Porcentaje y Referencia */}
                    <div className="flex items-baseline gap-2">
                        <span className={`text-[30px] font-semibold leading-[36px] ${theme.textMain}`}>
                            {demandRatio}%
                        </span>
                        <span className={`text-[11px] ${theme.textMain}`}>
                            de la biocapacidad
                        </span>
                    </div>

                    {/* Barra de demanda */}
                    <div className={`w-full h-[7px] ${theme.barTrackBg} rounded-[4px] overflow-hidden`}>
                        <div
                            className={`h-full ${theme.barFillBg} rounded-[4px] transition-all duration-300`}
                            style={{ width: `${progressWidth}%` }}
                        />
                    </div>

                    {/* Explicación */}
                    <p className={`text-[12px] leading-[150%] ${theme.textMain}`}>
                        {isOvershoot
                            ? "La demanda excede la capacidad de regeneración."
                            : "La demanda se mantiene dentro del límite sostenible."}
                    </p>
                </div>
            )}
        </aside>
    );
};

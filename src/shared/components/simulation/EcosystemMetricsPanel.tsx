import React from "react";
import type { EcosystemMetrics } from "../../../simulation/engine/models/EcosystemMetrics";
import {Footprints, Sprout, Wheat} from "lucide-react";

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

    return (
        <aside className="w-[240px] h-[704px] flex flex-col justify-center gap-4 select-none">
            {/* Bloque de Métricas Superiores */}
            {hasAnyMetric && (
                <div className="w-[240px] h-[432px] bg-white border border-[#DFE8E2] rounded-lg
                flex flex-col justify-center items-center gap-[20px]
                shadow-sm shrink-0">

                    <p className="w-[200px] h-[18px] font-sans font-semibold text-[15px] leading-[18px] text-[#233C35] flex-none order-0 grow-0">
                        Estado del ecosistema
                    </p>

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

                    {showFootprint && (
                        <div className="w-[200px] h-[111px] flex flex-col justify-between p-0">
                            {/* Etiqueta con Icono */}
                            <div className="flex items-center gap-2 text-[#74867E]">
                                <Footprints className="w-[18px] h-[18px] text-[#4C9289]" />
                                <span className="text-xs">Huella ecológica</span>
                            </div>

                            {/* Valor y Unidad */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-[32px] font-semibold leading-none text-[#233C35]">
                                    {ecosystemMetrics.ecologicalFootprint}
                                </span>
                                <span className="text-[11px] text-[#74867E]">u. / ciclo</span>
                            </div>

                            {/* Descripción (34px / 2 líneas de texto) */}
                            <p className="text-[11px] leading-[150%] text-[#74867E]">
                                Lo que los conejos consumen por ciclo.
                            </p>
                        </div>
                    )}

                    {showFootprint && showConsumed && <div className="w-[200px] h-px bg-[#DFE8E2]" />}

                    {showConsumed && (
                        <div className="w-[200px] h-[67px] flex flex-col justify-between p-0">
                            {/* Etiqueta con Icono */}
                            <div className="flex items-center gap-2 text-[#74867E]">
                                <Wheat className="w-[18px] h-[18px] text-[#4C9289]" />
                                <span className="text-xs">Hierba consumida</span>
                            </div>

                            {/* Valor y Unidad */}
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
                <div className="w-[240px] h-[178px] bg-[#FCF0E3] rounded-[12px] p-5 flex flex-col items-start gap-[14px]">
                    {/* Estado con punto indicador */}
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D98B48]" />
                        <span className="text-[14px] text-[#AA6B2F]">
                            {ecosystemMetrics.isOvershoot ? "Sobregiro activo" : "Sin sobregiro"}
                        </span>
                    </div>

                    {/* Relación (Porcentaje y Referencia) */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-[30px] font-semibold leading-[36px] text-[#AA6B2F]">
                            {ecosystemMetrics.isOvershoot ? "132%" : "100%"}
                        </span>
                                    <span className="text-[11px] text-[#AA6B2F]">
                            de la biocapacidad
                        </span>
                    </div>

                    {/* Barra de demanda */}
                    <div className="w-full h-[7px] bg-[#EDDCC8] rounded-[4px] overflow-hidden">
                        <div
                            className="h-full bg-[#D98B48] rounded-[4px] transition-all duration-300"
                            style={{ width: ecosystemMetrics.isOvershoot ? "100%" : "66%" }}
                        />
                    </div>

                    {/* Explicación */}
                    <p className="text-[12px] leading-[150%] text-[#AA6B2F]">
                        {ecosystemMetrics.isOvershoot
                            ? "La demanda excede la capacidad de regeneración."
                            : "La demanda se mantiene dentro del límite sostenible."}
                    </p>
                </div>
            )}
        </aside>
    );
};

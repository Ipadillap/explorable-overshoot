import React from "react";

interface EcosystemMetricsWidgetProps {
    biocapacity?: number;
    ecologicalFootprint?: number;
    consumedGrass?: number;
    isOvershoot?: boolean;
    showBiocapacity?: boolean;
    showFootprint?: boolean;
    showConsumed?: boolean;
    showOvershootCard?: boolean;
}

export const EcosystemMetricsWidget: React.FC<EcosystemMetricsWidgetProps> = ({
    biocapacity = 0,
    ecologicalFootprint = 0,
    consumedGrass = 0,
    isOvershoot = false,
    showBiocapacity = true,
    showFootprint = true,
    showConsumed = true,
    showOvershootCard = true,
}) => {
    return (
        <div className="flex flex-col gap-4 w-[240px]">
            {/* Bloque de Métricas Principales */}
            {(showBiocapacity || showFootprint || showConsumed) && (
                <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg flex flex-col justify-around">
                    {showBiocapacity && (
                        <div className="h-[94px] p-5">
                            <p className="text-sm text-gray-500">Biocapacidad</p>
                            <p className="text-xl font-semibold">{biocapacity}</p>
                        </div>
                    )}

                    {showBiocapacity && showFootprint && <div className="w-full h-px bg-[#DFE8E2]" />}

                    {showFootprint && (
                        <div className="h-[94px] p-5">
                            <p className="text-sm text-gray-500">Huella ecológica</p>
                            <p className="text-xl font-semibold">{ecologicalFootprint}</p>
                        </div>
                    )}

                    {showFootprint && showConsumed && <div className="w-full h-px bg-[#DFE8E2]" />}

                    {showConsumed && (
                        <div className="h-[94px] p-5">
                            <p className="text-sm text-gray-500">Hierba consumida</p>
                            <p className="text-xl font-semibold">{consumedGrass}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Tarjeta de Estado de Sobregiro */}
            {showOvershootCard && (
                <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg h-[178px] flex flex-col items-center justify-center p-4">
                    <p className="text-sm text-gray-600">¿Sobregiro ecológico?</p>
                    <p className={`text-2xl font-bold ${isOvershoot ? "text-red-500" : "text-green-600"}`}>
                        {isOvershoot ? "SÍ" : "NO"}
                    </p>
                </div>
            )}
        </div>
    );
};

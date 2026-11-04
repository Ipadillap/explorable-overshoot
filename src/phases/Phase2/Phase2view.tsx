import { useEffect, useState, useRef } from "react";
import { ResourceSlider } from "../../shared/components/ResourceSlider.tsx";
import { SimulationButton } from "../../shared/components/SimulationButton.tsx";
import { HexagonBlock } from "../../shared/components/HexagonBlock.tsx";
import { RabbitBlock } from "../../shared/components/RabbitBlock.tsx";
import { useSimulation } from "../../simulation/react/useSimulation.ts";
import { SimulationCanvas } from "../../simulation/react/SimulationCanvas.tsx";
import { CycleIndicator } from "../../shared/components/CycleIndicatorProps.tsx";

export function Phase2view() {
    const {
        canvasRef,
        rabbitStats,
        grassStats,
        ecosystemMetrics,

        createIsland,
        resetSimulation,
        nextCicle,
        updateInitialRabbits,
        updateConsumptionRate,
        updateDeathRate,
        updateRegenerationRate,
    } = useSimulation();

    // Estado para saber si una animación está en ejecución
    const [isAnimating, setIsAnimating] = useState(false);

    // Estado para el modo de reproducción continua (Play)
    const [isPlaying, setIsPlaying] = useState(false);
    const isPlayingRef = useRef(false);

    // Estado para saber si la orden de detención (Stop) fue activada durante Play
    const [isStopPending, setIsStopPending] = useState(false);

    // Métricas calculadas para la barra inferior
    const [totalGrassToBeRenewed, setTotalGrassToBeRenewed] = useState(0);
    const [totalGrassToNotBeRenewed, setTotalGrassToNotBeRenewed] = useState(0);

    useEffect(() => {
        resetSimulation();
        return () => {
            resetSimulation();
        };
    }, []);

    const runSingleCycle = async () => {
        setIsAnimating(true);
        try {
            await nextCicle();
        } finally {
            setIsAnimating(false);
            setTotalGrassToBeRenewed(ecosystemMetrics.biocapacity);
            setTotalGrassToNotBeRenewed(
                Math.max(
                    0,
                    ecosystemMetrics.grassMaxLC - (ecosystemMetrics.totalGrass + ecosystemMetrics.biocapacity)
                )
            );
        }
    };

    const handleNextCycle = async () => {
        if (isAnimating || isPlaying) return;
        await runSingleCycle();
    };

    const handlePlay = async () => {
        if (isPlaying || isAnimating) return;

        setIsPlaying(true);
        isPlayingRef.current = true;
        setIsStopPending(false);

        while (isPlayingRef.current) {
            await runSingleCycle();
        }

        setIsPlaying(false);
        setIsStopPending(false);
    };

    const handleStop = () => {
        if (!isPlayingRef.current || isStopPending) return;

        isPlayingRef.current = false;
        setIsStopPending(true);
    };

    const handleReset = () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
        setIsAnimating(false);
        setIsStopPending(false);

        setTotalGrassToBeRenewed(0);
        setTotalGrassToNotBeRenewed(0);

        resetSimulation();
    };

    // Bloqueos de interfaz
    const isAnySliderBlocked = isAnimating || isPlaying;
    const isInitialRabbitsBlocked = isAnySliderBlocked || ecosystemMetrics.cycle > 1;

    const isPlayDisabled = isPlaying || isAnimating;
    const isStopDisabled = !isPlaying || isStopPending;
    const isNextDisabled = isPlaying || isAnimating;
    const isRebootDisabled = isPlaying || isAnimating;

    return (
        <div className="w-full h-full grid grid-cols-[240px_804px_300px] gap-[20px] items-stretch justify-center">
            {/* Información de ciclo */}
            <aside className="h-full rounded-lg grid grid-rows-[432px_178px_34px] gap-4">
                {/* Estado del ecosistema */}
                <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg flex flex-col justify-around">
                    <div className="h-[94px] p-5">
                        <p className="text-sm text-gray-500">Biocapacidad</p>
                        <p className="text-xl font-semibold">{ecosystemMetrics.biocapacity}</p>
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2]" />

                    <div className="h-[94px] p-5">
                        <p className="text-sm text-gray-500">Huella ecológica</p>
                        <p className="text-xl font-semibold">{ecosystemMetrics.ecologicalFootprint}</p>
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2]" />

                    <div className="h-[94px] p-5">
                        <p className="text-sm text-gray-500">Hierba consumida</p>
                        <p className="text-xl font-semibold">{ecosystemMetrics.consumedGrass}</p>
                    </div>
                </div>

                {/* Sobregiro ecológico */}
                <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-gray-600">¿Sobregiro ecológico?</p>
                        <p className={`text-2xl font-bold ${ecosystemMetrics.isOvershoot ? "text-red-500" : "text-green-600"}`}>
                            {ecosystemMetrics.isOvershoot ? "SÍ" : "NO"}
                        </p>
                    </div>
                </div>

                {/* Zona Libre */}
                <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg" />
            </aside>

            {/* Lienzo de simulación */}
            <section className="h-full rounded-lg flex flex-col justify-between">
                {/* Representación visual */}
                <div className="relative h-full w-full flex flex-col justify-center items-center">
                    <SimulationCanvas
                        ref={canvasRef}
                        onReady={createIsland}
                    />

                    <div className="absolute bottom-4 right-4 z-10">
                        <CycleIndicator cycle={ecosystemMetrics.cycle} />
                    </div>
                </div>

                {/* Resumen de simulación */}
                <div className="w-full h-[102px] flex flex-row justify-center items-center border border-[#DFE8E2] rounded-lg bg-[#fafafa]">
                    <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                        <RabbitBlock color="#e6f3f1" />
                        <p className="font-bold">{ecosystemMetrics.totalRabbits}</p>
                    </div>

                    <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                        <HexagonBlock color="#e9f0e6" />
                        <p className="font-bold">{ecosystemMetrics.totalGrass}</p>
                    </div>

                    <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                        <HexagonBlock color="#f8edc9" />
                        <p className="font-bold">{totalGrassToBeRenewed}</p>
                    </div>

                    <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                        <HexagonBlock color="#f5e3de" />
                        <p className="font-bold">{totalGrassToNotBeRenewed}</p>
                    </div>
                </div>
            </section>

            {/* Parámetros modificables */}
            <aside className="h-full bg-white border border-[#DFE8E2] rounded-lg flex flex-col items-center justify-between p-4">
                <div className="w-full flex flex-col items-center">
                    <div className="w-[260px] h-[86px]">
                        <ResourceSlider
                            label="Cantidad inicial de conejos"
                            value={rabbitStats.initialCount}
                            min={1}
                            max={10}
                            isBlocked={isInitialRabbitsBlocked}
                            onChange={updateInitialRabbits}
                        />
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2] my-1" />

                    <div className="w-[260px] h-[86px]">
                        <ResourceSlider
                            label="Consumo per cápita"
                            value={rabbitStats.consumptionRate}
                            min={1}
                            max={10}
                            isBlocked={isAnySliderBlocked}
                            onChange={updateConsumptionRate}
                        />
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2] my-1" />

                    <div className="w-[260px] h-[86px]">
                        <ResourceSlider
                            label="Tasa de muerte natural"
                            value={rabbitStats.deathRate}
                            min={1}
                            max={10}
                            isBlocked={isAnySliderBlocked}
                            onChange={updateDeathRate}
                        />
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2] my-1" />

                    <div className="w-[260px] h-[86px]">
                        <ResourceSlider
                            label="Regeneración por unidad de hierba"
                            value={grassStats.regenerationRate}
                            min={0}
                            max={1}
                            step={0.1}
                            isBlocked={isAnySliderBlocked}
                            onChange={updateRegenerationRate}
                        />
                    </div>
                </div>

                <div className="w-full h-px bg-[#DFE8E2] my-2" />

                <div className="w-[260px] grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
                    <div className="w-24">
                        <SimulationButton
                            icon={1}
                            label="Play"
                            disabled={isPlayDisabled}
                            onClick={handlePlay}
                        />
                    </div>
                    <div className="w-24">
                        <SimulationButton
                            icon={2}
                            label="Stop"
                            disabled={isStopDisabled}
                            onClick={handleStop}
                        />
                    </div>
                    <div className="w-24">
                        <SimulationButton
                            icon={3}
                            label="Next"
                            disabled={isNextDisabled}
                            onClick={handleNextCycle}
                        />
                    </div>
                    <div className="w-24">
                        <SimulationButton
                            icon={4}
                            label="Reboot"
                            disabled={isRebootDisabled}
                            onClick={handleReset}
                        />
                    </div>
                </div>
            </aside>
        </div>
    );
}
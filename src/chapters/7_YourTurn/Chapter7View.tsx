import { useEffect, useState, useRef } from "react";
import { ResourceSlider } from "../../shared/components/ResourceSlider";
import { SimulationButton } from "../../shared/components/SimulationButton";
import { HexagonBlock } from "../../shared/components/HexagonBlock";
import { RabbitBlock } from "../../shared/components/RabbitBlock";
import { useSimulation } from "../../simulation/react/useSimulation";
import { SimulationCanvas } from "../../simulation/react/SimulationCanvas";
import { CycleIndicator } from "../../shared/components/CycleIndicatorProps";
import { YOUR_TURN_NARRATIVE } from "./narrative/7_YourTurnScript";

export function Chapter7View() {
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

    const [tutorialStepIndex, setTutorialStepIndex] = useState<number | null>(0);
    const isTutorialActive = tutorialStepIndex !== null;

    const [isAnimating, setIsAnimating] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const isPlayingRef = useRef(false);

    const [isStopPending, setIsStopPending] = useState(false);

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
        if (isAnimating || isPlaying || isTutorialActive) return;
        await runSingleCycle();
    };

    const handlePlay = async () => {
        if (isPlaying || isAnimating || isTutorialActive) return;

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
        if (isTutorialActive) return;

        isPlayingRef.current = false;
        setIsPlaying(false);
        setIsAnimating(false);
        setIsStopPending(false);

        setTotalGrassToBeRenewed(0);
        setTotalGrassToNotBeRenewed(0);

        resetSimulation();
    };

    const handleAdvanceTutorial = () => {
        if (tutorialStepIndex === null) return;

        if (tutorialStepIndex < YOUR_TURN_NARRATIVE.length - 1) {
            setTutorialStepIndex((prev) => (prev !== null ? prev + 1 : null));
        } else {
            setTutorialStepIndex(null);
        }
    };

    const isAnySliderBlocked = isAnimating || isPlaying || isTutorialActive;
    const isInitialRabbitsBlocked = isAnySliderBlocked || ecosystemMetrics.cycle > 1;

    const isPlayDisabled = isPlaying || isAnimating || isTutorialActive;
    const isStopDisabled = !isPlaying || isStopPending || isTutorialActive;
    const isNextDisabled = isPlaying || isAnimating || isTutorialActive;
    const isRebootDisabled = isPlaying || isAnimating || isTutorialActive;

    const getTutorialCardPositionClass = () => {
        switch (tutorialStepIndex) {
            case 0:
            case 1:
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
            case 2:
                return "top-1/3 right-[28px] -translate-y-1/2";
            case 3:
                return "bottom-[40px] right-[28px]";
            case 4:
                return "top-1/2 left-[28px] -translate-y-1/2";
            default:
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
        }
    };

    return (
        <div className="relative w-full h-full select-none overflow-hidden bg-[#F4F7F6]">
            {/* ========================================================================= */}
            {/* BURBUJA CIRCULAR NEGRA AL 30% DE OPACIDAD SIN BLUR */}
            {/* ========================================================================= */}
            {isTutorialActive && tutorialStepIndex !== null && (
                <div className="absolute inset-0 z-50 pointer-events-auto">
                    {/* Círculo perfecto transparente para ver claramente el fondo */}
                    <div
                        className={`absolute w-[270px] h-[270px] bg-black/30 border border-white/40 rounded-full p-6 shadow-xl flex flex-col items-center justify-between gap-2 text-center transition-all duration-500 animate-fadeIn ${getTutorialCardPositionClass()}`}
                    >
                        <div className="flex flex-col items-center gap-0.5 pt-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#60CBBF]">
                                Capítulo 7 — {tutorialStepIndex + 1} / {YOUR_TURN_NARRATIVE.length}
                            </span>
                        </div>

                        <p className="text-xs leading-relaxed text-white font-medium px-2 flex items-center justify-center">
                            {YOUR_TURN_NARRATIVE[tutorialStepIndex].text}
                        </p>

                        <div className="w-28 pb-2">
                            <SimulationButton
                                icon="➔"
                                label={YOUR_TURN_NARRATIVE[tutorialStepIndex].buttonLabel || "Siguiente"}
                                onClick={handleAdvanceTutorial}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* ESTRUCTURA PRINCIPAL DEL SIMULADOR (SANDBOX) */}
            {/* ========================================================================= */}
            <div className="w-full h-full grid grid-cols-[240px_804px_300px] gap-[20px] items-stretch justify-center p-4">
                {/* Información de ciclo (Panel Izquierdo) */}
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

                {/* Lienzo de simulación (Panel Central) */}
                <section className="h-full rounded-lg flex flex-col justify-between">
                    {/* Representación visual */}
                    <div className="relative h-full w-full flex flex-col justify-center items-center bg-white border border-[#DFE8E2] rounded-lg">
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

                {/* Parámetros modificables (Panel Derecho) */}
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
                                icon="▶"
                                label="Play"
                                disabled={isPlayDisabled}
                                onClick={handlePlay}
                            />
                        </div>
                        <div className="w-24">
                            <SimulationButton
                                icon="⏹"
                                label="Stop"
                                disabled={isStopDisabled}
                                onClick={handleStop}
                            />
                        </div>
                        <div className="w-24">
                            <SimulationButton
                                icon="➔"
                                label="Next"
                                disabled={isNextDisabled}
                                onClick={handleNextCycle}
                            />
                        </div>
                        <div className="w-24">
                            <SimulationButton
                                icon="X"
                                label="Reboot"
                                disabled={isRebootDisabled}
                                onClick={handleReset}
                            />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

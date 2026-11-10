import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { useSimulation } from "../../../simulation/react/useSimulation.ts";
import { EcosystemMetricsPanel, type EcosystemMetricsVisibility } from "./EcosystemMetricsPanel";
import { SimulationCenterPanel, type SimulationCenterVisibility } from "./SimulationCenterPanel";
import { SimulationControlPanel, type SimulationControlVisibility } from "./SimulationControlPanel";
import { useScaleToFit } from "../../hooks/useScaleToFit"; // O ajusta la ruta a tu hook
import type { RabbitStats } from "../../../simulation/engine/models/RabbitStats";
import type { GrassStats } from "../../../simulation/engine/models/GrassStats";
import type { EcosystemMetrics } from "../../../simulation/engine/models/EcosystemMetrics";

export interface SimulationVisibilityConfig {
    leftPanel?: EcosystemMetricsVisibility;
    centerPanel?: SimulationCenterVisibility;
    rightPanel?: SimulationControlVisibility;
}

interface FullSimulationSandboxProps {
    initialVisibility?: SimulationVisibilityConfig;
}

export interface FullSimulationSandboxRef {
    leftPanel: {
        setFalse: () => void;
        setTrue: () => void;
        biocapacity: { setFalse: () => void; setTrue: () => void };
        footprint: { setFalse: () => void; setTrue: () => void };
        consumed: { setFalse: () => void; setTrue: () => void };
        overshoot: { setFalse: () => void; setTrue: () => void };
    };
    centerPanel: {
        setFalse: () => void;
        setTrue: () => void;
        canvas: { setFalse: () => void; setTrue: () => void };
        cycleIndicator: { setFalse: () => void; setTrue: () => void };
        totalRabbits: { setFalse: () => void; setTrue: () => void };
        totalGrass: { setFalse: () => void; setTrue: () => void };
        grassToBeRenewed: { setFalse: () => void; setTrue: () => void };
        grassToNotBeRenewed: { setFalse: () => void; setTrue: () => void };
    };
    rightPanel: {
        setFalse: () => void;
        setTrue: () => void;
        initialRabbitsSlider: { setFalse: () => void; setTrue: () => void };
        consumptionRateSlider: { setFalse: () => void; setTrue: () => void };
        deathRateSlider: { setFalse: () => void; setTrue: () => void };
        regenerationRateSlider: { setFalse: () => void; setTrue: () => void };
        playButton: { setFalse: () => void; setTrue: () => void };
        stopButton: { setFalse: () => void; setTrue: () => void };
        nextButton: { setFalse: () => void; setTrue: () => void };
        rebootButton: { setFalse: () => void; setTrue: () => void };
    };

    play: () => Promise<void>;
    stop: () => void;
    nextCycle: () => Promise<void>;
    reset: () => void;

    setInitialRabbits: (value: number) => boolean;
    setConsumptionRate: (value: number) => boolean;
    setDeathRate: (value: number) => boolean;
    setRegenerationRate: (value: number) => boolean;

    getRabbitStats: () => RabbitStats;
    getGrassStats: () => GrassStats;
    getEcosystemMetrics: () => EcosystemMetrics;
}

export const FullSimulationSandbox = forwardRef<FullSimulationSandboxRef, FullSimulationSandboxProps>(
    ({ initialVisibility }, ref) => {
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

        const [leftPanelVis, setLeftPanelVis] = useState<EcosystemMetricsVisibility>({
            showBiocapacity: true,
            showFootprint: true,
            showConsumed: true,
            showOvershoot: true,
            ...initialVisibility?.leftPanel,
        });

        const [centerPanelVis, setCenterPanelVis] = useState<SimulationCenterVisibility>({
            showCanvas: true,
            showCycleIndicator: true,
            showTotalRabbits: true,
            showTotalGrass: true,
            showGrassToBeRenewed: true,
            showGrassToNotBeRenewed: true,
            ...initialVisibility?.centerPanel,
        });

        const [rightPanelVis, setRightPanelVis] = useState<SimulationControlVisibility>({
            showInitialRabbitsSlider: true,
            showConsumptionRateSlider: true,
            showDeathRateSlider: true,
            showRegenerationRateSlider: true,
            showPlayButton: true,
            showStopButton: true,
            showNextButton: true,
            showRebootButton: true,
            ...initialVisibility?.rightPanel,
        });

        const isLeftPanelVisible = Object.values(leftPanelVis).some(Boolean);
        const isCenterPanelVisible = Object.values(centerPanelVis).some(Boolean);
        const isRightPanelVisible = Object.values(rightPanelVis).some(Boolean);

        // Cálculo dinámico del ancho intrínseco en base a los paneles activos
        const computeIntrinsicWidth = () => {
            let width = 0;
            let count = 0;
            if (isLeftPanelVisible) { width += 240; count++; }
            if (isCenterPanelVisible) { width += 804; count++; }
            if (isRightPanelVisible) { width += 300; count++; }
            if (count > 1) width += (count - 1) * 20;
            return width > 0 ? width : 804;
        };

        const intrinsicWidth = computeIntrinsicWidth();
        const intrinsicHeight = 704;

        // Hook de auto-escalado basado en el tamaño intrínseco actual
        const scale = useScaleToFit(); // O puedes pasarle intrinsicWidth/intrinsicHeight si tu hook lo soporta

        const getGridTemplateColumns = () => {
            const cols: string[] = [];
            if (isLeftPanelVisible) cols.push("240px");
            if (isCenterPanelVisible) cols.push("804px");
            if (isRightPanelVisible) cols.push("300px");
            return cols.length > 0 ? cols.join(" ") : "auto";
        };

        const [isAnimating, setIsAnimating] = useState(false);
        const [isPlaying, setIsPlaying] = useState(false);
        const isPlayingRef = useRef(false);
        const [isStopPending, setIsStopPending] = useState(false);
        const [totalGrassToBeRenewed, setTotalGrassToBeRenewed] = useState(0);
        const [totalGrassToNotBeRenewed, setTotalGrassToNotBeRenewed] = useState(0);

        useEffect(() => {
            resetSimulation();
            return () => resetSimulation();
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

        useImperativeHandle(ref, () => ({
            leftPanel: {
                setFalse: () => setLeftPanelVis({ showBiocapacity: false, showFootprint: false, showConsumed: false, showOvershoot: false }),
                setTrue: () => setLeftPanelVis({ showBiocapacity: true, showFootprint: true, showConsumed: true, showOvershoot: true }),
                biocapacity: {
                    setFalse: () => setLeftPanelVis((prev) => ({ ...prev, showBiocapacity: false })),
                    setTrue: () => setLeftPanelVis((prev) => ({ ...prev, showBiocapacity: true })),
                },
                footprint: {
                    setFalse: () => setLeftPanelVis((prev) => ({ ...prev, showFootprint: false })),
                    setTrue: () => setLeftPanelVis((prev) => ({ ...prev, showFootprint: true })),
                },
                consumed: {
                    setFalse: () => setLeftPanelVis((prev) => ({ ...prev, showConsumed: false })),
                    setTrue: () => setLeftPanelVis((prev) => ({ ...prev, showConsumed: true })),
                },
                overshoot: {
                    setFalse: () => setLeftPanelVis((prev) => ({ ...prev, showOvershoot: false })),
                    setTrue: () => setLeftPanelVis((prev) => ({ ...prev, showOvershoot: true })),
                },
            },
            centerPanel: {
                setFalse: () => setCenterPanelVis({ showCanvas: false, showCycleIndicator: false, showTotalRabbits: false, showTotalGrass: false, showGrassToBeRenewed: false, showGrassToNotBeRenewed: false }),
                setTrue: () => setCenterPanelVis({ showCanvas: true, showCycleIndicator: true, showTotalRabbits: true, showTotalGrass: true, showGrassToBeRenewed: true, showGrassToNotBeRenewed: true }),
                canvas: {
                    setFalse: () => setCenterPanelVis((prev) => ({ ...prev, showCanvas: false })),
                    setTrue: () => setCenterPanelVis((prev) => ({ ...prev, showCanvas: true })),
                },
                cycleIndicator: {
                    setFalse: () => setCenterPanelVis((prev) => ({ ...prev, showCycleIndicator: false })),
                    setTrue: () => setCenterPanelVis((prev) => ({ ...prev, showCycleIndicator: true })),
                },
                totalRabbits: {
                    setFalse: () => setCenterPanelVis((prev) => ({ ...prev, showTotalRabbits: false })),
                    setTrue: () => setCenterPanelVis((prev) => ({ ...prev, showTotalRabbits: true })),
                },
                totalGrass: {
                    setFalse: () => setCenterPanelVis((prev) => ({ ...prev, showTotalGrass: false })),
                    setTrue: () => setCenterPanelVis((prev) => ({ ...prev, showTotalGrass: true })),
                },
                grassToBeRenewed: {
                    setFalse: () => setCenterPanelVis((prev) => ({ ...prev, showGrassToBeRenewed: false })),
                    setTrue: () => setCenterPanelVis((prev) => ({ ...prev, showGrassToBeRenewed: true })),
                },
                grassToNotBeRenewed: {
                    setFalse: () => setCenterPanelVis((prev) => ({ ...prev, showGrassToNotBeRenewed: false })),
                    setTrue: () => setCenterPanelVis((prev) => ({ ...prev, showGrassToNotBeRenewed: true })),
                },
            },
            rightPanel: {
                setFalse: () => setRightPanelVis({ showInitialRabbitsSlider: false, showConsumptionRateSlider: false, showDeathRateSlider: false, showRegenerationRateSlider: false, showPlayButton: false, showStopButton: false, showNextButton: false, showRebootButton: false }),
                setTrue: () => setRightPanelVis({ showInitialRabbitsSlider: true, showConsumptionRateSlider: true, showDeathRateSlider: true, showRegenerationRateSlider: true, showPlayButton: true, showStopButton: true, showNextButton: true, showRebootButton: true }),
                initialRabbitsSlider: {
                    setFalse: () => setRightPanelVis((prev) => ({ ...prev, showInitialRabbitsSlider: false })),
                    setTrue: () => setRightPanelVis((prev) => ({ ...prev, showInitialRabbitsSlider: true })),
                },
                consumptionRateSlider: {
                    setFalse: () => setRightPanelVis((prev) => ({ ...prev, showConsumptionRateSlider: false })),
                    setTrue: () => setRightPanelVis((prev) => ({ ...prev, showConsumptionRateSlider: true })),
                },
                deathRateSlider: {
                    setFalse: () => setRightPanelVis((prev) => ({ ...prev, showDeathRateSlider: false })),
                    setTrue: () => setRightPanelVis((prev) => ({ ...prev, showDeathRateSlider: true })),
                },
                regenerationRateSlider: {
                    setFalse: () => setRightPanelVis((prev) => ({ ...prev, showRegenerationRateSlider: false })),
                    setTrue: () => setRightPanelVis((prev) => ({ ...prev, showRegenerationRateSlider: true })),
                },
                playButton: {
                    setFalse: () => setRightPanelVis((prev) => ({ ...prev, showPlayButton: false })),
                    setTrue: () => setRightPanelVis((prev) => ({ ...prev, showPlayButton: true })),
                },
                stopButton: {
                    setFalse: () => setRightPanelVis((prev) => ({ ...prev, showStopButton: false })),
                    setTrue: () => setRightPanelVis((prev) => ({ ...prev, showStopButton: true })),
                },
                nextButton: {
                    setFalse: () => setRightPanelVis((prev) => ({ ...prev, showNextButton: false })),
                    setTrue: () => setRightPanelVis((prev) => ({ ...prev, showNextButton: true })),
                },
                rebootButton: {
                    setFalse: () => setRightPanelVis((prev) => ({ ...prev, showRightPanelVis: false })),
                    setTrue: () => setRightPanelVis((prev) => ({ ...prev, showRebootButton: true })),
                },
            },

            play: handlePlay,
            stop: handleStop,
            nextCycle: handleNextCycle,
            reset: handleReset,

            setInitialRabbits: (val: number) => {
                if (typeof val !== "number" || isNaN(val) || val < 1 || val > 10) return false;
                updateInitialRabbits(val);
                return true;
            },
            setConsumptionRate: (val: number) => {
                if (typeof val !== "number" || isNaN(val) || val < 1 || val > 10) return false;
                updateConsumptionRate(val);
                return true;
            },
            setDeathRate: (val: number) => {
                if (typeof val !== "number" || isNaN(val) || val < 1 || val > 10) return false;
                updateDeathRate(val);
                return true;
            },
            setRegenerationRate: (val: number) => {
                if (typeof val !== "number" || isNaN(val) || val < 0 || val > 1) return false;
                updateRegenerationRate(val);
                return true;
            },

            getRabbitStats: () => rabbitStats,
            getGrassStats: () => grassStats,
            getEcosystemMetrics: () => ecosystemMetrics,
        }));

        const isAnySliderBlocked = isAnimating || isPlaying;
        const isInitialRabbitsBlocked = isAnySliderBlocked || ecosystemMetrics.cycle > 1;

        return (
            <div
                className="w-full h-full flex items-center justify-center overflow-hidden"
            >
                <div
                    style={{
                        width: intrinsicWidth,
                        height: intrinsicHeight,
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                        display: "grid",
                        gridTemplateColumns: getGridTemplateColumns(),
                    }}
                    className="shrink-0 gap-[20px] justify-center transition-all duration-300"
                >
                    {isLeftPanelVisible && (
                        <EcosystemMetricsPanel ecosystemMetrics={ecosystemMetrics} visibility={leftPanelVis} />
                    )}

                    {isCenterPanelVisible && (
                        <SimulationCenterPanel
                            canvasRef={canvasRef}
                            createIsland={createIsland}
                            ecosystemMetrics={ecosystemMetrics}
                            totalGrassToBeRenewed={totalGrassToBeRenewed}
                            totalGrassToNotBeRenewed={totalGrassToNotBeRenewed}
                            visibility={centerPanelVis}
                        />
                    )}

                    {isRightPanelVisible && (
                        <SimulationControlPanel
                            rabbitStats={rabbitStats}
                            grassStats={grassStats}
                            isInitialRabbitsBlocked={isInitialRabbitsBlocked}
                            isAnySliderBlocked={isAnySliderBlocked}
                            isPlayDisabled={isPlaying || isAnimating}
                            isStopDisabled={!isPlaying || isStopPending}
                            isNextDisabled={isPlaying || isAnimating}
                            isRebootDisabled={isPlaying || isAnimating}
                            updateInitialRabbits={updateInitialRabbits}
                            updateConsumptionRate={updateConsumptionRate}
                            updateDeathRate={updateDeathRate}
                            updateRegenerationRate={updateRegenerationRate}
                            handlePlay={handlePlay}
                            handleStop={handleStop}
                            handleNextCycle={handleNextCycle}
                            handleReset={handleReset}
                            visibility={rightPanelVis}
                        />
                    )}
                </div>
            </div>
        );
    }
);

FullSimulationSandbox.displayName = "FullSimulationSandbox";

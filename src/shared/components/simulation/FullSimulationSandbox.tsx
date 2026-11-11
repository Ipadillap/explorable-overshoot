// src/shared/components/simulation/FullSimulationSandbox.tsx

import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { useSimulation } from "../../../simulation/react/useSimulation.ts";
import { EcosystemMetricsPanel, type EcosystemMetricsVisibility } from "./EcosystemMetricsPanel";
import { SimulationCenterPanel, type SimulationCenterVisibility } from "./SimulationCenterPanel";
import { SimulationControlPanel, type SimulationControlVisibility } from "./SimulationControlPanel";

export interface SimulationVisibilityConfig {
    leftPanel?: EcosystemMetricsVisibility;
    centerPanel?: SimulationCenterVisibility;
    rightPanel?: SimulationControlVisibility;
}

export interface FullSimulationSandboxRef {
    setVisibility: (config: SimulationVisibilityConfig) => void;
    setLeftPanelVisibility: (vis: Partial<EcosystemMetricsVisibility>) => void;
    setCenterPanelVisibility: (vis: Partial<SimulationCenterVisibility>) => void;
    setRightPanelVisibility: (vis: Partial<SimulationControlVisibility>) => void;
    play: () => Promise<void>;
    stop: () => void;
    nextCycle: () => Promise<void>;
    reset: () => void;
    setInitialRabbits: (val: number) => void;
    setConsumptionRate: (val: number) => void;
    setDeathRate: (val: number) => void;
    setRegenerationRate: (val: number) => void;
}

export const FullSimulationSandbox = forwardRef<FullSimulationSandboxRef, { initialVisibility?: SimulationVisibilityConfig }>(
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

        // Contenedor padre para observar su tamaño real con ResizeObserver
        const containerRef = useRef<HTMLDivElement>(null);
        const [scale, setScale] = useState(1);

        // Estados de visibilidad
        const [leftVis, setLeftVis] = useState<EcosystemMetricsVisibility>({
            showBiocapacity: true,
            showFootprint: true,
            showConsumed: true,
            showOvershoot: true,
            ...initialVisibility?.leftPanel,
        });

        const [centerVis, setCenterVis] = useState<SimulationCenterVisibility>({
            showCanvas: true,
            showCycleIndicator: true,
            showTotalRabbits: true,
            showTotalGrass: true,
            showGrassToBeRenewed: true,
            showGrassToNotBeRenewed: true,
            ...initialVisibility?.centerPanel,
        });

        const [rightVis, setRightVis] = useState<SimulationControlVisibility>({
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

        const isLeftVisible = Object.values(leftVis).some(Boolean);
        const isCenterVisible = Object.values(centerVis).some(Boolean);
        const isRightVisible = Object.values(rightVis).some(Boolean);

        // -------------------------------------------------------------------------
        // CÁLCULO DE DIMENSIONES INTRÍNSECAS Y AUTO-ESCALADO
        // -------------------------------------------------------------------------
        const computeIntrinsicWidth = () => {
            let width = 0;
            let count = 0;
            if (isLeftVisible) { width += 240; count++; }
            if (isCenterVisible) { width += 804; count++; }
            if (isRightVisible) { width += 300; count++; }
            if (count > 1) width += (count - 1) * 20; // gap-5 (20px)
            return width > 0 ? width : 804;
        };

        const intrinsicWidth = computeIntrinsicWidth();
        const intrinsicHeight = 704;

        useEffect(() => {
            if (!containerRef.current) return;

            const updateScale = () => {
                if (!containerRef.current) return;
                const { clientWidth, clientHeight } = containerRef.current;

                if (clientWidth === 0 || clientHeight === 0) return;

                // Escala limitante por ancho o por alto manteniendo proporción
                const scaleX = clientWidth / intrinsicWidth;
                const scaleY = clientHeight / intrinsicHeight;
                const newScale = Math.min(scaleX, scaleY);

                setScale(newScale);
            };

            const observer = new ResizeObserver(updateScale);
            observer.observe(containerRef.current);
            updateScale();

            return () => observer.disconnect();
        }, [intrinsicWidth, isLeftVisible, isCenterVisible, isRightVisible]);

        // Control de ejecución
        const [isAnimating, setIsAnimating] = useState(false);
        const [isPlaying, setIsPlaying] = useState(false);
        const isPlayingRef = useRef(false);

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
            }
        };

        const handlePlay = async () => {
            if (isPlaying || isAnimating) return;
            setIsPlaying(true);
            isPlayingRef.current = true;
            while (isPlayingRef.current) {
                await runSingleCycle();
            }
            setIsPlaying(false);
        };

        const handleStop = () => {
            isPlayingRef.current = false;
            setIsPlaying(false);
        };

        const handleReset = () => {
            handleStop();
            setIsAnimating(false);
            resetSimulation();
        };

        useImperativeHandle(ref, () => ({
            setVisibility: (config) => {
                if (config.leftPanel) setLeftVis((p) => ({ ...p, ...config.leftPanel }));
                if (config.centerPanel) setCenterVis((p) => ({ ...p, ...config.centerPanel }));
                if (config.rightPanel) setRightVis((p) => ({ ...p, ...config.rightPanel }));
            },
            setLeftPanelVisibility: (vis) => setLeftVis((p) => ({ ...p, ...vis })),
            setCenterPanelVisibility: (vis) => setCenterVis((p) => ({ ...p, ...vis })),
            setRightPanelVisibility: (vis) => setRightVis((p) => ({ ...p, ...vis })),
            play: handlePlay,
            stop: handleStop,
            nextCycle: runSingleCycle,
            reset: handleReset,
            setInitialRabbits: updateInitialRabbits,
            setConsumptionRate: updateConsumptionRate,
            setDeathRate: updateDeathRate,
            setRegenerationRate: updateRegenerationRate,
        }));

        return (
            <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
                <div
                    style={{
                        width: intrinsicWidth,
                        height: intrinsicHeight,
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                    }}
                    className="flex gap-5 shrink-0 items-center justify-center transition-all duration-300"
                >
                    {isLeftVisible && <EcosystemMetricsPanel ecosystemMetrics={ecosystemMetrics} visibility={leftVis} />}
                    {isCenterVisible && (
                        <SimulationCenterPanel
                            canvasRef={canvasRef}
                            createIsland={createIsland}
                            ecosystemMetrics={ecosystemMetrics}
                            totalGrassToBeRenewed={ecosystemMetrics.biocapacity}
                            totalGrassToNotBeRenewed={Math.max(0, ecosystemMetrics.grassMaxLC - (ecosystemMetrics.totalGrass + ecosystemMetrics.biocapacity))}
                            visibility={centerVis}
                        />
                    )}
                    {isRightVisible && (
                        <SimulationControlPanel
                            rabbitStats={rabbitStats}
                            grassStats={grassStats}
                            isInitialRabbitsBlocked={isAnimating || isPlaying || ecosystemMetrics.cycle > 1}
                            isAnySliderBlocked={isAnimating || isPlaying}
                            isPlayDisabled={isPlaying || isAnimating}
                            isStopDisabled={!isPlaying}
                            isNextDisabled={isPlaying || isAnimating}
                            isRebootDisabled={isPlaying || isAnimating}
                            updateInitialRabbits={updateInitialRabbits}
                            updateConsumptionRate={updateConsumptionRate}
                            updateDeathRate={updateDeathRate}
                            updateRegenerationRate={updateRegenerationRate}
                            handlePlay={handlePlay}
                            handleStop={handleStop}
                            handleNextCycle={runSingleCycle}
                            handleReset={handleReset}
                            visibility={rightVis}
                        />
                    )}
                </div>
            </div>
        );
    }
);

FullSimulationSandbox.displayName = "FullSimulationSandbox";

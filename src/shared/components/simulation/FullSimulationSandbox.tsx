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

        // Estados de visibilidad limpios y unificados
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

        // API imperativa simple sin boilerplate redundante
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

        const isLeftVisible = Object.values(leftVis).some(Boolean);
        const isCenterVisible = Object.values(centerVis).some(Boolean);
        const isRightVisible = Object.values(rightVis).some(Boolean);

        return (
            <div className="flex gap-5 h-[704px] items-center justify-center">
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
        );
    }
);

FullSimulationSandbox.displayName = "FullSimulationSandbox";

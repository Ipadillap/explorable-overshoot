import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { useSimulation } from "./useSimulation.ts";
import { EcosystemMetricsPanel, type EcosystemMetricsVisibility } from "./EcosystemMetricsPanel.tsx";
import { SimulationCenterPanel, type SimulationCenterVisibility } from "./SimulationCenterPanel.tsx";
import { SimulationControlPanel, type SimulationControlVisibility } from "./SimulationControlPanel.tsx";
import { ScaledStage } from "../../shared/layout/ScaledStage.tsx";

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
            showConversionRate: true,
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
            <ScaledStage
                width={intrinsicWidth}
                height={intrinsicHeight}
                className="w-full h-full"
                innerClassName="flex gap-5 items-center justify-center transition-all duration-300"
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
            </ScaledStage>
        );
    }
);

FullSimulationSandbox.displayName = "FullSimulationSandbox";

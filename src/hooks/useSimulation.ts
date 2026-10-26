import { useState, useEffect, useRef } from 'react';
import { simulationEngine } from '../simulation/SimulationEngine';
import type { SimulationCanvasRef } from '../react/components/SimulationCanvas';

export function useSimulation() {
    const [, setTick] = useState(0);
    const canvasRef = useRef<SimulationCanvasRef | null>(null);

    useEffect(() => {
        const unsubscribe = simulationEngine.subscribe(() => {
            setTick((prev) => prev + 1);
        });

        return () => unsubscribe();
    }, []);

    const createIsland = () => {
        simulationEngine.initializeCicle();

        if (!canvasRef.current) return;

        canvasRef.current.createIsland(simulationEngine.ecosystemMetrics);

        canvasRef.current.setInitialGrass();

        canvasRef.current.spawnRabbits(simulationEngine.ecosystemMetrics.totalRabbits);

    };

    const updateInitialRabbits = (val: number) => {
        simulationEngine.rabbitStats.updateInitialCount(val);
        if (simulationEngine.ecosystemMetrics.cycle === 1) {
            simulationEngine.ecosystemMetrics.totalRabbits = val;
        }
        simulationEngine.initializeCicle();
        simulationEngine.notify();
    };

    const updateConsumptionRate = (val: number) => {
        simulationEngine.rabbitStats.updateConsumptionRate(val);
        simulationEngine.initializeCicle();
        simulationEngine.notify();
    };

    const updateDeathRate = (val: number) => {
        simulationEngine.rabbitStats.updateDeathRate(val);
        simulationEngine.initializeCicle();
        simulationEngine.notify();
    };

    const updateRegenerationRate = (val: number) => {
        simulationEngine.grassStats.updateRegenerationRate(val);
        simulationEngine.initializeCicle();
        simulationEngine.notify();
    };

    const nextCicle = async () => {
        // 1. Desarrollo del ciclo (Alimentación y movimiento)
        await canvasRef.current?.processCycleAnimations(simulationEngine.rabbitStats.consumptionRate);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // 2. Cálculo lógico del fin de ciclo
        simulationEngine.cicleEnd();

        // 3. Animaciones de cierre (Consumo, muertes, lápidas y nacimientos)
        await canvasRef.current?.finalizeCycleAnimations(
            simulationEngine.ecosystemMetrics.totalDeaths,
            simulationEngine.ecosystemMetrics.totalBorns
        );
        simulationEngine.notify();

        // 4. Inicialización lógica y visual del siguiente ciclo
        simulationEngine.initializeCicle();
        canvasRef.current?.initializeCycleAnimations(simulationEngine.ecosystemMetrics.biocapacity);
        simulationEngine.notify();
    };

    return {
        canvasRef,

        rabbitStats: simulationEngine.rabbitStats,
        grassStats: simulationEngine.grassStats,
        ecosystemMetrics: simulationEngine.ecosystemMetrics,

        createIsland,
        nextCicle,
        updateInitialRabbits,
        updateConsumptionRate,
        updateDeathRate,
        updateRegenerationRate,
    };
}
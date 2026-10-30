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
        canvasRef.current.initialSpawn(simulationEngine.ecosystemMetrics.totalRabbits);
    };

    const resetSimulation = () => {
        simulationEngine.reset();
        createIsland();
    };

    const updateInitialRabbits = (val: number) => {
        simulationEngine.rabbitStats.updateInitialCount(val);
        if (simulationEngine.ecosystemMetrics.cycle === 1) {
            simulationEngine.ecosystemMetrics.totalRabbits = val;
        }

        if (!canvasRef.current) return;
        canvasRef.current.initialSpawn(simulationEngine.ecosystemMetrics.totalRabbits);

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
        await canvasRef.current?.processCycleAnimations(simulationEngine.rabbitStats.consumptionRate);

        simulationEngine.cicleEnd();

        await canvasRef.current?.finalizeCycleAnimations(
            simulationEngine.ecosystemMetrics.totalDeaths,
            simulationEngine.ecosystemMetrics.totalBorn
        );
        simulationEngine.notify();

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
        resetSimulation,
        nextCicle,
        updateInitialRabbits,
        updateConsumptionRate,
        updateDeathRate,
        updateRegenerationRate,
    };
}
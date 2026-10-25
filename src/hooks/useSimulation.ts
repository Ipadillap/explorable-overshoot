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
        if (!canvasRef.current) return;

        canvasRef.current.createIsland(simulationEngine.ecosystemMetrics);

        canvasRef.current.setInitialGrass();
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
        simulationEngine.cicleEnd();

        canvasRef.current?.endCycle(simulationEngine.ecosystemMetrics.consumedGrass);

        simulationEngine.notify();

        console.log("Iniciando espera de 3 segundos para animaciones...");

        await new Promise((resolve) => setTimeout(resolve, 3000));

        simulationEngine.initializeCicle();

        canvasRef.current?.startCycle(simulationEngine.ecosystemMetrics.biocapacity);

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
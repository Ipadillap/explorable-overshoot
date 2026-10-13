import { useState, useEffect } from 'react';
import { simulationEngine } from '../simulation/SimulationEngine';

export function useSimulation() {
    const [, setTick] = useState(0);

    useEffect(() => {
        const unsubscribe = simulationEngine.subscribe(() => {
            setTick((prev) => prev + 1);
        });

        return () => unsubscribe();
    }, []);

    const updateInitialRabbits = (val: number) => {
        simulationEngine.rabbitStats.updateInitialCount(val);
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

    const nextCicle = () => {
        simulationEngine.cicleStart();
        simulationEngine.notify();
    };

    return {
        rabbitStats: simulationEngine.rabbitStats,
        grassStats: simulationEngine.grassStats,
        ecosystemMetrics: simulationEngine.ecosystemMetrics,

        nextCicle,
        updateInitialRabbits,
        updateConsumptionRate,
        updateDeathRate,
        updateRegenerationRate,
    };
}
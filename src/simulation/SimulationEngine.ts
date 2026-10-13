import { RabbitStats } from './models/RabbitStats';
import { GrassStats } from './models/GrassStats';
import { EcosystemMetrics } from './models/EcosystemMetrics';
import {
    calculateBiocapacity,
    calculateEcologicalFootprint,
    calculateExpectedBirths,
    calculateExpectedDeaths,
    calculateOvershootDegree,
    calculateRealConsumption,
    calculateSatisfactionLevel,
    calculateTotalDemand
} from "./logic/ecologicalModel.ts";

export class SimulationEngine {
    public rabbitStats: RabbitStats;
    public grassStats: GrassStats;
    public ecosystemMetrics: EcosystemMetrics;

    private listeners: Set<() => void> = new Set();

    constructor() {
        this.ecosystemMetrics = new EcosystemMetrics(
            1,
            5,
            268,
            1,
            1,
            1,
            268,
            1
        )
        this.rabbitStats = new RabbitStats(
            undefined,
            undefined,
            undefined,
            undefined,
            this.ecosystemMetrics
        );
        this.grassStats = new GrassStats();
    }

    public subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    public notify(): void {
        this.listeners.forEach((listener) => listener());
    }

    public initializeCicle(): void {
        const rabbits = this.rabbitStats.initialCount;
        const availableGrass = this.ecosystemMetrics.totalGrass;
        const maxCapacity = this.ecosystemMetrics.grassMaxLC;

        const totalDemand = calculateTotalDemand(rabbits, this.rabbitStats.consumptionRate);
        const realConsumption = calculateRealConsumption(totalDemand, availableGrass);

        const ecologicalFootprint = calculateEcologicalFootprint(totalDemand);
        const biocapacity = calculateBiocapacity(availableGrass, this.grassStats.regenerationRate, maxCapacity);

        const overshootDegree = calculateOvershootDegree();

        this.ecosystemMetrics.biocapacity = Math.round(biocapacity);
        this.ecosystemMetrics.ecologicalFootprint = Math.round(ecologicalFootprint);
        this.ecosystemMetrics.consumedGrass = Math.round(realConsumption);
        this.ecosystemMetrics.isOvershoot = ecologicalFootprint > biocapacity;
        this.ecosystemMetrics.overshootDegree = overshootDegree;

        this.notify();
    }

    public cicleStart(): void {
        this.initializeCicle();
        this.cicleEnd();
        this.initializeCicle();
    }

    public cicleEnd(): void {
        const rabbits = this.ecosystemMetrics.totalRabbits;
        const availableGrass = this.ecosystemMetrics.totalGrass;
        const maxCapacity = this.ecosystemMetrics.grassMaxLC;

        const totalDemand = calculateTotalDemand(rabbits, this.rabbitStats.consumptionRate);
        const realConsumption = calculateRealConsumption(totalDemand, availableGrass);

        const satisfaction = calculateSatisfactionLevel(realConsumption, totalDemand);
        const expectedDeaths = calculateExpectedDeaths(rabbits, this.rabbitStats.deathRate, satisfaction);
        const expectedBirths = calculateExpectedBirths(realConsumption, this.rabbitStats.conversionRate);

        const biocapacity = calculateBiocapacity(availableGrass, this.grassStats.regenerationRate, maxCapacity);

        const nextGrass = availableGrass - realConsumption + biocapacity;
        console.log(availableGrass);
        console.log(realConsumption);
        console.log(nextGrass);

        this.ecosystemMetrics.cycle = this.ecosystemMetrics.cycle + 1;
        this.ecosystemMetrics.totalGrass = Math.min(
            maxCapacity,
            Math.max(0, Math.round(nextGrass))
        );
        this.ecosystemMetrics.totalRabbits = rabbits - expectedDeaths + expectedBirths;
    }
}

export const simulationEngine = new SimulationEngine();
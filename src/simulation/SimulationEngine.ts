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
            600,
            1,
            1,
            1,
            600,
            300
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
        this.initializeCicle();
        return () => this.listeners.delete(listener);
    }

    public notify(): void {
        this.listeners.forEach((listener) => listener());
    }

    public nextCicle(): void {
        this.cicleEnd();
        this.initializeCicle();
        this.ecosystemMetrics.showActaulMetrics();
    }

    public initializeCicle(): void {
        const rabbits = this.ecosystemMetrics.totalRabbits;

        const availableGrass = this.ecosystemMetrics.totalGrass;
        const maxGrassCapacity = this.ecosystemMetrics.grassMaxLC;

        const totalDemand = calculateTotalDemand(rabbits, this.rabbitStats.consumptionRate);
        const realConsumption = calculateRealConsumption(totalDemand, availableGrass);

        const ecologicalFootprint = calculateEcologicalFootprint(totalDemand);
        const biocapacity = calculateBiocapacity(availableGrass, this.grassStats.regenerationRate, maxGrassCapacity);

        const overshootDegree = calculateOvershootDegree();

        this.ecosystemMetrics.biocapacity = Math.round(biocapacity);
        this.ecosystemMetrics.ecologicalFootprint = Math.round(ecologicalFootprint);
        this.ecosystemMetrics.consumedGrass = Math.round(realConsumption);
        this.ecosystemMetrics.isOvershoot = ecologicalFootprint > biocapacity;
        this.ecosystemMetrics.overshootDegree = overshootDegree;

        this.notify();
    }

    public cicleEnd(): void {
        const rabbits = this.ecosystemMetrics.totalRabbits;
        const maxRabbitsCapacity = this.ecosystemMetrics.rabbitsMaxLC;

        const availableGrass = this.ecosystemMetrics.totalGrass;
        const maxGrassCapacity = this.ecosystemMetrics.grassMaxLC;

        const totalDemand = calculateTotalDemand(rabbits, this.rabbitStats.consumptionRate);
        const realConsumption = calculateRealConsumption(totalDemand, availableGrass);

        const satisfaction = calculateSatisfactionLevel(realConsumption, totalDemand);
        console.log(satisfaction);
        const expectedDeaths = calculateExpectedDeaths(rabbits, this.rabbitStats.deathRate, satisfaction);
        const expectedBirths = calculateExpectedBirths(realConsumption, this.rabbitStats.conversionRate);

        const biocapacity = calculateBiocapacity(availableGrass, this.grassStats.regenerationRate, maxGrassCapacity);

        const nextGrass = availableGrass - realConsumption + biocapacity;

        this.ecosystemMetrics.cycle = this.ecosystemMetrics.cycle + 1;
        this.ecosystemMetrics.totalGrass = Math.min(
            maxGrassCapacity,
            Math.max(0, Math.round(nextGrass))
        );
        this.ecosystemMetrics.totalRabbits = Math.max(0, Math.min(maxRabbitsCapacity, rabbits - expectedDeaths + expectedBirths));
    }
}

export const  simulationEngine = new SimulationEngine();
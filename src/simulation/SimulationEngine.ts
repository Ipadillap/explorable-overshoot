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
            1,   // cycle
            5,   // totalRabbits
            600, // totalGrass
            1,   // totalDeaths
            1,   // totalBorn
            1,   // consumedGrass
            600, // grassMaxLC
            300, // rabbitsMaxLC
            5,   // initialRabbits
            0    // overshootDegree
        );
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

    public reset(): void {
        this.ecosystemMetrics.cycle = 1;
        this.ecosystemMetrics.totalRabbits = 5;
        this.ecosystemMetrics.totalGrass = 600;
        this.ecosystemMetrics.totalDeaths = 0;
        this.ecosystemMetrics.totalBorn = 0;
        this.ecosystemMetrics.consumedGrass = 0;
        this.ecosystemMetrics.isOvershoot = false;
        this.ecosystemMetrics.overshootDegree = 0;

        // Reset de parámetros de conejos
        this.rabbitStats.initialCount = 5;
        this.rabbitStats.consumptionRate = 5;
        this.rabbitStats.deathRate = 5;

        // Reset de parámetros de hierba
        this.grassStats.regenerationRate = 1;

        this.initializeCicle();
        this.notify();
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

        const expectedDeaths = calculateExpectedDeaths(rabbits, this.rabbitStats.deathRate, satisfaction);
        const expectedBirths = calculateExpectedBirths(realConsumption, this.rabbitStats.conversionRate);

        const biocapacity = calculateBiocapacity(availableGrass, this.grassStats.regenerationRate, maxGrassCapacity);
        const nextGrass = availableGrass - realConsumption + biocapacity;

        this.ecosystemMetrics.cycle = this.ecosystemMetrics.cycle + 1;
        this.ecosystemMetrics.totalDeaths = Math.min(expectedDeaths, this.ecosystemMetrics.totalRabbits);

        this.ecosystemMetrics.totalGrass = Math.min(
            maxGrassCapacity,
            Math.max(0, Math.round(nextGrass))
        );

        if (maxRabbitsCapacity !== rabbits) {
            this.ecosystemMetrics.totalBorn = Math.min(
                this.ecosystemMetrics.rabbitsMaxLC - (rabbits - expectedDeaths),
                expectedBirths
            );
        }

        this.ecosystemMetrics.totalRabbits = Math.max(
            0,
            Math.min(maxRabbitsCapacity, rabbits - expectedDeaths + expectedBirths)
        );
    }
}

export const simulationEngine = new SimulationEngine();
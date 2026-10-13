import type {EcosystemMetrics} from "./EcosystemMetrics.ts";

export class RabbitStats {
    public initialCount: number;
    public consumptionRate: number;
    public conversionRate: number;
    public deathRate: number;
    private ecosyystemMetrics: EcosystemMetrics;

    constructor(
        initialCount: number = 5,
        consumptionRate: number = 5,
        conversionRate: number = 5,
        deathRate: number = 5,
        ecosystemMetrics: EcosystemMetrics
    ) {
        this.initialCount = initialCount;
        this.consumptionRate = consumptionRate;
        this.conversionRate = conversionRate;
        this.deathRate = deathRate;
        this.ecosyystemMetrics = ecosystemMetrics;
    }

    public updateInitialCount(initialCount: number): void {
        this.initialCount = initialCount;
        this.ecosyystemMetrics.totalRabbits = initialCount;
    }

    public updateDeathRate(deathRate: number): void {
        this.deathRate = deathRate;
    }

    public updateConsumptionRate(consumptionRate: number): void {
        this.consumptionRate = consumptionRate;
    }
}

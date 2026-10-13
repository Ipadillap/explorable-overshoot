export function calculateTotalDemand(rabbits: number, consumptionRate: number): number {
    return consumptionRate * rabbits;
}

export function calculateRealConsumption(totalDemand: number, availableGrass: number): number {
    return Math.min(totalDemand, availableGrass);
}

export function calculateSatisfactionLevel(realConsumption: number, totalDemand: number): number {
    if (totalDemand === 0) return 1;
    return realConsumption / totalDemand;
}

export function calculateEcologicalFootprint(totalDemand: number): number {
    return totalDemand;
}

export function calculateBiocapacity(availableGrass: number, regenerationRate: number, maxCapacity: number): number {
    if (maxCapacity === 0) return 0;
    const logisticGrowth = regenerationRate * availableGrass * (1 - availableGrass / maxCapacity);
    return Math.max(0, logisticGrowth);
}

export function calculateExpectedDeaths(rabbits: number, deathRate: number, satisfactionLevel: number): number {
    const naturalDeaths = deathRate;

    const starvationDeaths = rabbits * (1 - satisfactionLevel);

    const totalDeaths = naturalDeaths + starvationDeaths;
    return Math.min(rabbits, Math.round(totalDeaths));
}

export function calculateExpectedBirths(realConsumption: number, conversionRate: number): number {
    if (conversionRate <= 0) return 0;
    const births = realConsumption / conversionRate;
    return Math.floor(births);
}

export function calculateOvershootDegree(): 0 | 1 | 2 | 3 {
    return 1;
}
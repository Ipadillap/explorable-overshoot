export function calculateTotalDemand(rabbits: number, consumptionRate: number): number {
    return consumptionRate * rabbits;
}

export function calculateRealConsumption(totalDemand: number, availableGrass: number): number {
    return Math.min(totalDemand, availableGrass);
}

export function calculateSatisfactionLevel(realConsumption: number, totalDemand: number): number {
    if (totalDemand === 0) return 1;
    return realConsumption/totalDemand;
}

export function calculateEcologicalFootprint(totalDemand: number): number {
    return totalDemand;
}

export function calculateBiocapacity(
    availableGrass: number,
    regenerationRate: number,
    maxCapacity: number
): number {
    if (maxCapacity === 0) return 0;

    const potentialRegeneration = regenerationRate * availableGrass;

    const availableSpace = Math.max(0, maxCapacity - availableGrass);

    return Math.max(0, Math.min(potentialRegeneration, availableSpace));
}

export function calculateExpectedDeaths(
    rabbits: number,
    deathRate: number,
    satisfactionLevel: number
): number {

    if (satisfactionLevel === 1) {
        return (deathRate);
    }

    const starvationDeaths = Math.floor(rabbits * (1 - satisfactionLevel));
    console.log("Muerte por hambre en ciclo anterior: " + starvationDeaths);

    const totalDeaths = deathRate + starvationDeaths;

    return Math.min(rabbits, totalDeaths);
}

export function calculateExpectedBirths(
    realConsumption: number,
    conversionRate: number
): number {
    if (realConsumption === 0) return 0;
    return Math.floor( realConsumption / conversionRate);
}

export function calculateOvershootDegree(): 0 | 1 | 2 | 3 {
    return 1;
}
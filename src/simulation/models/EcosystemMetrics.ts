export class EcosystemMetrics {
    public cycle: number;
    public totalRabbits: number;
    public totalGrass : number
    public biocapacity: number;
    public ecologicalFootprint: number;
    public consumedGrass: number;
    public isOvershoot: boolean;
    public overshootDegree : 0 | 1 | 2 | 3;
    public grassMaxLC: number;
    public rabbitsMaxLC: number;
    public totalDeaths: number;
    public totalBorn: number;
    

    constructor(
        cycle: number,
        totalRabbits: number,
        totalGrass : number,
        biocapacity: number,
        ecologicalFootprint: number,
        consumedGrass: number,
        grassMaxLoadCapacity: number,
        rabbitsMaxLoadCapacity: number,
        totalDeaths: number,
        totalBorns: number,
    ) {
        this.cycle = cycle;
        this.totalRabbits = totalRabbits;
        this.totalGrass = totalGrass;
        this.biocapacity = biocapacity;
        this.ecologicalFootprint = ecologicalFootprint;
        this.consumedGrass = consumedGrass;
        this.isOvershoot = ecologicalFootprint > biocapacity;
        this.grassMaxLC = grassMaxLoadCapacity;
        this.rabbitsMaxLC = rabbitsMaxLoadCapacity;
        this.overshootDegree = 0;
        this.totalDeaths = totalDeaths;
        this.totalBorn = totalBorns;
    }

    public showActaulMetrics(): void {
        console.log("-------------EcosystemMetrics-------------")
        console.log("Actual Cycle: " + this.cycle);
        console.log("Total Rabbits: " + this.totalRabbits);
        console.log("Total Grass: " + this.totalGrass);
        console.log("Biocapacity: " + this.biocapacity);
        console.log("ecologicalFootprint: " + this.ecologicalFootprint);
        console.log("consumedGrass: " + this.consumedGrass);
        console.log("isOvershoot: " + this.isOvershoot);
        console.log("overshootDegree: " + this.overshootDegree);
        console.log("grassMaxLC: " + this.grassMaxLC);
        console.log("rabbitsMaxLC: " + this.rabbitsMaxLC);
    }
}

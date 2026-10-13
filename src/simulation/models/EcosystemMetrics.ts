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

    constructor(
        cycle: number,
        totalRabbits: number,
        totalGrass : number,
        biocapacity: number,
        ecologicalFootprint: number,
        consumedGrass: number,
        grassMaxLoadCapacity: number,
        rabbitsMaxLoadCapacity: number
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
    }
}

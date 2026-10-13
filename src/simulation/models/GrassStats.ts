export class GrassStats {
    public regenerationRate: number;

    constructor(regenerationRate: number = 5,) {
        this.regenerationRate = regenerationRate;
    }

    public updateRegenerationRate(regenerationRate: number) {
        this.regenerationRate = regenerationRate;
    }

}

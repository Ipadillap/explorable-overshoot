import * as PIXI from 'pixi.js';
import { Polygon } from './Polygon';
import { IslandShapeBuilder } from './IslandShapeBuilder';
import { EcosystemMetrics } from '../models/EcosystemMetrics';
import { Rabbit } from './Rabbit';
import { Tombstone } from './Tombstone';

interface IslandOptions {
    cellGap?: number;
    metrics?: EcosystemMetrics;
    textures?: {
        rabbit: PIXI.Texture;
        tombstone: PIXI.Texture;
    };
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class Island extends PIXI.Container {
    private cellGap: number;
    private activePolygons: Polygon[] = [];
    private metrics?: EcosystemMetrics;

    private textures?: {
        rabbit: PIXI.Texture;
        tombstone: PIXI.Texture;
    };

    private rabbitsMap: Map<string, Rabbit> = new Map();
    private polygonToRabbitMap: Map<string, string> = new Map();
    private rabbitCounter: number = 0;

    private tombstonesMap: Map<string, Tombstone> = new Map();
    private tombstoneCounter: number = 0;

    constructor(options: IslandOptions = {}) {
        super();
        this.cellGap = options.cellGap ?? 0.5;
        this.metrics = options.metrics;
        this.textures = options.textures;

        this.buildIsland();
    }

    public buildIsland(): void {
        this.removeChildren();
        this.rabbitsMap.clear();
        this.polygonToRabbitMap.clear();
        this.tombstonesMap.clear();
        this.rabbitCounter = 0;
        this.tombstoneCounter = 0;

        const gridData = IslandShapeBuilder.buildGrid(this.cellGap);
        this.activePolygons = gridData.polygons;

        this.activePolygons.forEach((polygon) => this.addChild(polygon));

        this.pivot.set(gridData.totalWidth / 2, gridData.totalHeight / 2);
    }

    public getCapacity(): number {
        return this.activePolygons.length;
    }

    public setInitialGrass(): void {
        if (!this.metrics || this.metrics.cycle === 1) {
            const targetGrass = this.metrics ? this.metrics.grassMaxLC : this.activePolygons.length;
            IslandShapeBuilder.setInitialGrassCount(this.activePolygons, targetGrass);
        }
    }

    public spawnRabbits(count: number): Rabbit[] {
        const availablePolygons = this.activePolygons.filter(
            (polygon) => !this.polygonToRabbitMap.has(polygon.id)
        );

        const shuffledPolygons = [...availablePolygons].sort(() => 0.5 - Math.random());
        const spawnAmount = Math.min(count, shuffledPolygons.length);
        const createdRabbits: Rabbit[] = [];

        for (let i = 0; i < spawnAmount; i++) {
            this.rabbitCounter++;
            const rabbitId = `rabbit_${this.rabbitCounter}`;
            const targetPolygon = shuffledPolygons[i];

            // Pasamos la textura precargada si existe
            const rabbitOptions: any = {
                id: rabbitId,
                polygonSize: 15
            };
            if (this.textures?.rabbit) {
                rabbitOptions.texture = this.textures.rabbit;
            }

            const rabbit = new Rabbit(rabbitOptions);

            const center = targetPolygon.getCenter();
            rabbit.positionOnPolygon(center.x, center.y);

            this.rabbitsMap.set(rabbitId, rabbit);
            this.polygonToRabbitMap.set(targetPolygon.id, rabbitId);

            this.addChild(rabbit);
            createdRabbits.push(rabbit);
        }

        return createdRabbits;
    }

    public async feedRabbits(delayMs: number = 3000): Promise<void> {
        const rabbits = Array.from(this.rabbitsMap.values());
        if (rabbits.length === 0) return;

        const availableGrassPolygons = this.activePolygons.filter(
            (polygon) => polygon.getState() === 1 && !this.polygonToRabbitMap.has(polygon.id)
        );

        const shuffledGrassPolygons = [...availableGrassPolygons].sort(() => 0.5 - Math.random());
        const occupiedPolygons: Polygon[] = [];

        rabbits.forEach((rabbit, index) => {
            if (index < shuffledGrassPolygons.length) {
                const newPolygon = shuffledGrassPolygons[index];

                for (const [polyId, rId] of this.polygonToRabbitMap.entries()) {
                    if (rId === rabbit.id) {
                        this.polygonToRabbitMap.delete(polyId);
                        break;
                    }
                }

                const center = newPolygon.getCenter();
                rabbit.positionOnPolygon(center.x, center.y);
                this.polygonToRabbitMap.set(newPolygon.id, rabbit.id);

                occupiedPolygons.push(newPolygon);
            }
        });

        await new Promise((resolve) => setTimeout(resolve, delayMs));

        const occupiedIds = occupiedPolygons.map((polygon) => polygon.id);
        IslandShapeBuilder.setEmptyByIds(this.activePolygons, occupiedIds);
    }

    public killRabbits(count: number): void {
        const activeRabbits = Array.from(this.rabbitsMap.values());
        if (activeRabbits.length === 0 || count <= 0) return;

        const shuffledRabbits = [...activeRabbits].sort(() => 0.5 - Math.random());
        const rabbitsToKill = shuffledRabbits.slice(0, Math.min(count, activeRabbits.length));

        rabbitsToKill.forEach((rabbit) => {
            let polygonId: string | null = null;
            for (const [pId, rId] of this.polygonToRabbitMap.entries()) {
                if (rId === rabbit.id) {
                    polygonId = pId;
                    break;
                }
            }

            if (polygonId) {
                const polygon = this.activePolygons.find((p) => p.id === polygonId);
                if (polygon) {
                    this.tombstoneCounter++;
                    const tombstoneId = `tombstone_${this.tombstoneCounter}`;

                    const tombstoneOptions: any = {
                        id: tombstoneId,
                        polygonSize: 15
                    };
                    if (this.textures?.tombstone) {
                        tombstoneOptions.texture = this.textures.tombstone;
                    }

                    const tombstone = new Tombstone(tombstoneOptions);

                    const center = polygon.getCenter();
                    tombstone.positionOnPolygon(center.x, center.y);

                    this.tombstonesMap.set(tombstoneId, tombstone);
                    this.addChild(tombstone);
                }

                this.polygonToRabbitMap.delete(polygonId);
            }

            this.rabbitsMap.delete(rabbit.id);
            this.removeChild(rabbit);
            rabbit.destroy();
        });
    }

    public killTombstones(): void {
        this.tombstonesMap.forEach((tombstone) => {
            this.removeChild(tombstone);
            tombstone.destroy();
        });
        this.tombstonesMap.clear();
    }

    public restoreBiocapacity(): void {
        const biocapacityIds = IslandShapeBuilder.getBiocapacityIds(this.activePolygons);
        IslandShapeBuilder.setGrassByIds(this.activePolygons, biocapacityIds);
    }

    public async initializeCycleAnimations(regeneratingUnits: number): Promise<void> {
        const emptyIds = IslandShapeBuilder.getEmptyIds(this.activePolygons);
        const selectedForRegeneration = IslandShapeBuilder.getRandomSubarray(emptyIds, regeneratingUnits);
        IslandShapeBuilder.setBiocapacityByIds(this.activePolygons, selectedForRegeneration);
    }

    public async processCycleAnimations(consumptionRate: number): Promise<void> {
        for (let i = 0; i < consumptionRate; i++) {
            const hasGrassAvailable = this.activePolygons.some(
                (polygon) => polygon.getState() === 1
            );

            if (!hasGrassAvailable) {
                break;
            }

            await this.feedRabbits(1000);
        }
    }

    public async finalizeCycleAnimations(
        totalDeaths: number,
        totalBorn: number
    ): Promise<void> {
        console.log("Total de muertes: " + totalDeaths);
        console.log("Total de nacimientos: " + totalBorn);

        this.spawnRabbits(totalBorn);
        await delay(1000);
        this.killRabbits(totalDeaths);

        await delay(2000);

        this.killTombstones();
        this.restoreBiocapacity();
    }

    public getRabbitById(id: string): Rabbit | undefined {
        return this.rabbitsMap.get(id);
    }

    public getAllRabbits(): Rabbit[] {
        return Array.from(this.rabbitsMap.values());
    }
}
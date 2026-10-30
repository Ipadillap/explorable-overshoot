import * as PIXI from 'pixi.js';
import { Polygon } from './Polygon';
import { IslandShapeBuilder } from './IslandShapeBuilder';
import { EcosystemMetrics } from '../models/EcosystemMetrics';
import { Rabbit} from './Rabbit';
import { Tombstone} from './Tombstone';

interface IslandOptions {
    cellGap?: number;
    metrics?: EcosystemMetrics;
    textures?: {
        rabbit: PIXI.Texture;
        tombstone: PIXI.Texture;
    };
}

const PREDEFINED_POLYGON_INDICES = [112, 145, 178, 202, 234, 260, 295, 320, 355, 390];
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

    /**
     * Helper privado para instanciar y registrar un nuevo conejo.
     */
    private createRabbitOnPolygon(polygon: Polygon): Rabbit {
        this.rabbitCounter++;
        const rabbitId = `rabbit_${this.rabbitCounter}`;

        const rabbit = new Rabbit({
            id: rabbitId,
            polygonSize: 15,
            texture: this.textures?.rabbit
        });

        const center = polygon.getCenter();
        rabbit.positionOnPolygon(center.x, center.y);

        this.rabbitsMap.set(rabbitId, rabbit);
        this.polygonToRabbitMap.set(polygon.id, rabbitId);

        this.addChild(rabbit);
        return rabbit;
    }

    public initialSpawn(count: number): Rabbit[] {
        // Limpieza de población previa
        this.rabbitsMap.forEach((rabbit) => {
            this.removeChild(rabbit);
            rabbit.destroy();
        });
        this.rabbitsMap.clear();
        this.polygonToRabbitMap.clear();
        this.rabbitCounter = 0;

        const targetCount = Math.min(count, PREDEFINED_POLYGON_INDICES.length);
        const createdRabbits: Rabbit[] = [];

        for (let i = 0; i < targetCount; i++) {
            const polygonIndex = PREDEFINED_POLYGON_INDICES[i];
            if (polygonIndex >= this.activePolygons.length) continue;

            const rabbit = this.createRabbitOnPolygon(this.activePolygons[polygonIndex]);
            createdRabbits.push(rabbit);
        }

        return createdRabbits;
    }

    public spawnRabbits(count: number): Rabbit[] {
        const availablePolygons = this.activePolygons.filter(
            (polygon) => !this.polygonToRabbitMap.has(polygon.id)
        );

        const shuffledPolygons = [...availablePolygons].sort(() => 0.5 - Math.random());
        const spawnAmount = Math.min(count, shuffledPolygons.length);
        const createdRabbits: Rabbit[] = [];

        for (let i = 0; i < spawnAmount; i++) {
            const rabbit = this.createRabbitOnPolygon(shuffledPolygons[i]);
            createdRabbits.push(rabbit);
        }

        return createdRabbits;
    }

    public killRabbits(count: number, excludeBornCount: number = 0): void {
        const activeRabbits = Array.from(this.rabbitsMap.values());
        if (activeRabbits.length === 0 || count <= 0) return;

        const eligibleRabbits = excludeBornCount > 0
            ? activeRabbits.slice(0, Math.max(0, activeRabbits.length - excludeBornCount))
            : activeRabbits;

        if (eligibleRabbits.length === 0) return;

        const shuffledRabbits = [...eligibleRabbits].sort(() => 0.5 - Math.random());
        const rabbitsToKill = shuffledRabbits.slice(0, Math.min(count, eligibleRabbits.length));

        // Invertir mapa para búsqueda directa O(1) de polígono por conejo
        const rabbitToPolygonMap = new Map<string, string>();
        for (const [pId, rId] of this.polygonToRabbitMap.entries()) {
            rabbitToPolygonMap.set(rId, pId);
        }

        rabbitsToKill.forEach((rabbit) => {
            const polygonId = rabbitToPolygonMap.get(rabbit.id);

            if (polygonId) {
                const polygon = this.activePolygons.find((p) => p.id === polygonId);
                if (polygon) {
                    this.tombstoneCounter++;
                    const tombstoneId = `tombstone_${this.tombstoneCounter}`;

                    const tombstone = new Tombstone({
                        id: tombstoneId,
                        polygonSize: 15,
                        texture: this.textures?.tombstone
                    });

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

    public async feedRabbits(delayMs: number = 3000): Promise<void> {
        const rabbits = Array.from(this.rabbitsMap.values());
        if (rabbits.length === 0) return;

        const availableGrassPolygons = this.activePolygons.filter(
            (polygon) => polygon.getState() === 1 && !this.polygonToRabbitMap.has(polygon.id)
        );

        const shuffledGrassPolygons = [...availableGrassPolygons].sort(() => 0.5 - Math.random());
        const occupiedPolygons: Polygon[] = [];

        // Mapeo invertido para liberación rápida O(1)
        const rabbitToPolygonMap = new Map<string, string>();
        for (const [pId, rId] of this.polygonToRabbitMap.entries()) {
            rabbitToPolygonMap.set(rId, pId);
        }

        rabbits.forEach((rabbit, index) => {
            if (index < shuffledGrassPolygons.length) {
                const newPolygon = shuffledGrassPolygons[index];

                const oldPolyId = rabbitToPolygonMap.get(rabbit.id);
                if (oldPolyId) {
                    this.polygonToRabbitMap.delete(oldPolyId);
                }

                const center = newPolygon.getCenter();
                rabbit.positionOnPolygon(center.x, center.y);
                this.polygonToRabbitMap.set(newPolygon.id, rabbit.id);

                occupiedPolygons.push(newPolygon);
            }
        });

        await delay(delayMs);

        const occupiedIds = occupiedPolygons.map((polygon) => polygon.id);
        IslandShapeBuilder.setEmptyByIds(this.activePolygons, occupiedIds);
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
            const hasGrassAvailable = this.activePolygons.some((polygon) => polygon.getState() === 1);
            if (!hasGrassAvailable || i === consumptionRate-1) break;

            await this.feedRabbits(500);
        }
    }

    public async finalizeCycleAnimations(totalDeaths: number, totalBorn: number): Promise<void> {
        console.log("Total de muertes:", totalDeaths);
        console.log("Total de nacimientos:", totalBorn);

        this.spawnRabbits(totalBorn);
        await delay(500);

        this.killRabbits(totalDeaths, totalBorn);
        await delay(500);

        this.killTombstones();
        this.restoreBiocapacity();
    }
}

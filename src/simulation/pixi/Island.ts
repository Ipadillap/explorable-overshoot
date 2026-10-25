// src/simulation/pixi/Island.ts
import * as PIXI from 'pixi.js';
import { Polygon } from './Polygon';
import { IslandShapeBuilder } from './IslandShapeBuilder';
import { EcosystemMetrics } from '../models/EcosystemMetrics';

interface IslandOptions {
    cellGap?: number;
    metrics?: EcosystemMetrics;
}

export class Island extends PIXI.Container {
    private cellGap: number;
    private activePolygons: Polygon[] = [];
    private metrics?: EcosystemMetrics;

    constructor(options: IslandOptions = {}) {
        super();
        this.cellGap = options.cellGap ?? 0.5;
        this.metrics = options.metrics;

        this.buildIsland();
    }

    public buildIsland(): void {
        this.removeChildren();

        const gridData = IslandShapeBuilder.buildGrid(this.cellGap);
        this.activePolygons = gridData.polygons;

        this.activePolygons.forEach((polygon) => this.addChild(polygon));

        // Ajusta el pivote al centro exacto del envolvente
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


    public endCycle(consumedGrassUnits: number): void {
        // Step 1: Solicitar IDs en estado 1 y estado 2 al ShapeBuilder
        const grassIds = IslandShapeBuilder.getGrassIds(this.activePolygons);
        const biocapacityIds = IslandShapeBuilder.getBiocapacityIds(this.activePolygons);

        // Step 2: Seleccionar aleatoriamente N elementos sin repetición de la lista de estado 1
        const consumedIds = IslandShapeBuilder.getRandomSubarray(grassIds, consumedGrassUnits);

        // Step 3: Enviar la lista de consumidos al ShapeBuilder para pasarlos a Estado 3
        IslandShapeBuilder.setEmptyByIds(this.activePolygons, consumedIds);

        // Step 4: Enviar los polígonos que estaban en Estado 2 al ShapeBuilder para pasarlos a Estado 1
        IslandShapeBuilder.setGrassByIds(this.activePolygons, biocapacityIds);
    }


    public startCycle(regeneratingUnits: number): void {
        // Step 1: Obtener todos los IDs en Estado 3
        const emptyIds = IslandShapeBuilder.getEmptyIds(this.activePolygons);

        // Step 2: Seleccionar aleatoriamente N elementos sin repetición
        const selectedForRegeneration = IslandShapeBuilder.getRandomSubarray(emptyIds, regeneratingUnits);

        // Step 3: Pasar las celdas seleccionadas a Estado 2
        IslandShapeBuilder.setBiocapacityByIds(this.activePolygons, selectedForRegeneration);
    }
}

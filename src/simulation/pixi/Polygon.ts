import * as PIXI from 'pixi.js';

export type PolygonState = 1 | 2 | 3;

export interface PolygonOptions {
    row: number; // Fila del polígono en la grilla
    col: number; // Columna del polígono en la grilla
    size?: number;
    gap?: number;
    initialState?: PolygonState;
    cornerRadius?: number;
}

const COLOR_MAP: Record<PolygonState, { fill: number; stroke: number }> = {
    1: { fill: 0x94B98A, stroke: 0x759971 },
    2: { fill: 0xEAC976, stroke: 0xC8A856 },
    3: { fill: 0xE2D1C3, stroke: 0xC8B6A6 },
};

export class Polygon extends PIXI.Container {
    private row: number;
    private col: number;
    private size: number;
    private gap: number;
    private state: PolygonState;
    private graphics: PIXI.Graphics;

    constructor(options: PolygonOptions) {
        super();
        this.row = options.row;
        this.col = options.col;
        this.size = options.size ?? 16;
        this.gap = options.gap ?? 2;
        this.state = options.initialState ?? 1;

        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);

        this.draw();
    }

    private draw(): void {
        this.graphics.clear();

        const colors = COLOR_MAP[this.state];
        const radius = this.size / 2;
        const points: number[] = [];

        // Orientación Pointy-topped (Punta hacia arriba / Math.PI / 6 offset)
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - (Math.PI / 6);
            const x = radius + radius * Math.cos(angle);
            const y = radius + radius * Math.sin(angle);
            points.push(x, y);
        }

        this.graphics.poly(points);
        this.graphics.fill({ color: colors.fill });
        this.graphics.stroke({ width: 0.8, color: colors.stroke, alpha: 0.8 });
    }

    public setState(newState: PolygonState): void {
        if (this.state === newState) return;
        this.state = newState;
        this.draw();
    }

    public getState(): PolygonState {
        return this.state;
    }

    public getOuterSize(): number {
        return this.size + this.gap;
    }

    /**
     * Retorna las coordenadas [row, col] del polígono.
     */
    public getCoords(): [number, number] {
        return [this.row, this.col];
    }

    /**
     * Retorna el identificador único en formato "row,col" (ej: "5,12").
     */
    public get id(): string {
        return `${this.row},${this.col}`;
    }
}
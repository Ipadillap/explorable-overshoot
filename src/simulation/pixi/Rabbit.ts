import * as PIXI from 'pixi.js';

export interface RabbitOptions {
    id: string;
    polygonSize?: number;
    texture?: PIXI.Texture;
    x?: number;
    y?: number;
}
export class Rabbit extends PIXI.Sprite {
    public readonly id: string;

    constructor(options: RabbitOptions) {
        // Pasa la textura cargada directamente a la GPU
        super(options.texture);

        this.id = options.id;
        this.x = options.x ?? 0;
        this.y = options.y ?? 0;

        // Escalado exacto según el tamaño del hexágono
        const polygonSize = options.polygonSize ?? 8;
        const targetWidth = polygonSize * 0.65;
        const scale = targetWidth / this.texture.width;

        this.scale.set(scale);
        this.anchor.set(0.5, 0.5); // Centrado automático
    }

    public positionOnPolygon(polygonX: number, polygonY: number): void {
        this.x = polygonX;
        this.y = polygonY;
    }
}

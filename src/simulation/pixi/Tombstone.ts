import * as PIXI from 'pixi.js';

export interface TombstoneOptions {
    id: string;
    polygonSize?: number;
    texture?: PIXI.Texture;
    x?: number;
    y?: number;
}

// Sprite 10x12 (columnas x filas) - Fallback si no hay PNG externo
const TOMBSTONE_PIXEL_MAP: number[][] = [
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], // Tope curvo
    [0, 0, 1, 2, 2, 2, 2, 1, 0, 0],
    [0, 1, 2, 2, 3, 3, 2, 2, 1, 0], // Cruz
    [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
    [0, 1, 2, 2, 3, 3, 2, 2, 1, 0],
    [0, 1, 2, 2, 3, 3, 2, 2, 1, 0],
    [0, 1, 2, 2, 3, 3, 2, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 1, 0], // Cuerpo
    [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Base
];

const PALETTE: Record<number, string> = {
    1: '#000000',
    2: '#B5B5B5',
    3: '#6E6E6E',
};

let cachedTombstoneTexture: PIXI.Texture | null = null;

export class Tombstone extends PIXI.Sprite {
    public readonly id: string;

    constructor(options: TombstoneOptions) {
        // Usa la textura inyectada o recurre a la textura generada en caché
        const texture = options.texture ?? Tombstone.getFallbackTexture();
        super(texture);

        this.id = options.id;
        this.x = options.x ?? 0;
        this.y = options.y ?? 0;

        // Escalar proporcionalmente al tamaño del hexágono objetivo (~60% de cobertura)
        const polygonSize = options.polygonSize ?? 8;
        const targetWidth = polygonSize * 0.6;
        const scale = targetWidth / this.texture.width;

        this.scale.set(scale);
        this.anchor.set(0.5, 0.5); // Centrado geométrico automático
    }

    /**
     * Posiciona la lápida centrada sobre las coordenadas del polígono.
     */
    public positionOnPolygon(polygonX: number, polygonY: number): void {
        this.x = polygonX;
        this.y = polygonY;
    }

    /**
     * Genera la textura dinámicamente si no se suministra un PNG precargado.
     */
    private static getFallbackTexture(): PIXI.Texture {
        if (cachedTombstoneTexture) {
            return cachedTombstoneTexture;
        }

        const rows = TOMBSTONE_PIXEL_MAP.length;
        const cols = TOMBSTONE_PIXEL_MAP[0].length;
        const baseSize = 4; // Renderizado HD base para evitar deformaciones

        const canvas = document.createElement('canvas');
        canvas.width = cols * baseSize;
        canvas.height = rows * baseSize;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.imageSmoothingEnabled = false;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const pixelType = TOMBSTONE_PIXEL_MAP[r][c];
                    if (pixelType === 0) continue;

                    ctx.fillStyle = PALETTE[pixelType];
                    ctx.fillRect(c * baseSize, r * baseSize, baseSize, baseSize);
                }
            }
        }

        cachedTombstoneTexture = PIXI.Texture.from(canvas);
        cachedTombstoneTexture.source.scaleMode = 'nearest'; // Forzar nitidez Pixel-Perfect
        return cachedTombstoneTexture;
    }
}

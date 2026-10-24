// src/simulation/pixi/IslandShapeBuilder.ts
import { Polygon } from './Polygon';
import { MAP_600 } from './IslandCoordinates.ts';

export interface IslandGridData {
    polygons: Polygon[];
    totalWidth: number;
    totalHeight: number;
}

export class IslandShapeBuilder {
    /**
     * Construye la grilla hexagonal entrelazada estandarizada a 600 bloques,
     * asignando la coordenada [row, col] a cada polígono como identificador.
     */
    public static buildGrid(gap: number = 0.5): IslandGridData {
        const coords = MAP_600;
        const polygonSize = 8; // Tamaño ajustado para 600 celdas
        const radius = polygonSize / 2;

        // Distancias matemáticas exactas para hexágonos Pointy-topped
        const hexWidth = Math.sqrt(3) * radius;
        const horizontalSpacing = hexWidth + gap;
        const verticalSpacing = (1.5 * radius) + gap;

        const polygons: Polygon[] = [];

        // Obtener límites para normalizar el pivote y centrado
        const minRow = Math.min(...coords.map(c => c[0]));
        const maxRow = Math.max(...coords.map(c => c[0]));
        const minCol = Math.min(...coords.map(c => c[1]));
        const maxCol = Math.max(...coords.map(c => c[1]));

        coords.forEach(([row, col]) => {
            // Instanciar el polígono pasando sus coordenadas de identificación
            const polygon = new Polygon({
                row: row,
                col: col,
                size: polygonSize,
                gap: gap,
                initialState: 3
            });

            const normalizedRow = row - minRow;
            const normalizedCol = col - minCol;

            // Desfase horizontal en filas impares (medio hexágono a la derecha)
            const xOffset = (normalizedRow % 2 !== 0) ? (horizontalSpacing / 2) : 0;

            polygon.x = normalizedCol * horizontalSpacing + xOffset;
            polygon.y = normalizedRow * verticalSpacing;

            polygons.push(polygon);
        });

        // Dimensiones envolventes exactas para el centrado dinámico en el canvas
        const totalWidth = (maxCol - minCol + 1) * horizontalSpacing + (horizontalSpacing / 2);
        const totalHeight = (maxRow - minRow + 1) * verticalSpacing + (radius * 0.5);

        return { polygons, totalWidth, totalHeight };
    }

    /**
     * Retorna un arreglo con los IDs ("row,col") de los polígonos en Estado 1 (Pasto activo).
     */
    public static getGrassIds(polygons: Polygon[]): string[] {
        return polygons
            .filter(polygon => polygon.getState() === 1)
            .map(polygon => polygon.id);
    }

    /**
     * Retorna un arreglo con los IDs ("row,col") de los polígonos en Estado 2 (Biocapacidad/Recargando).
     */
    public static getBiocapacityIds(polygons: Polygon[]): string[] {
        return polygons
            .filter(polygon => polygon.getState() === 2)
            .map(polygon => polygon.id);
    }

    /**
     * Retorna un arreglo con los IDs ("row,col") de los polígonos en Estado 3 (Agotado/Vacío).
     */
    public static getEmptyIds(polygons: Polygon[]): string[] {
        return polygons
            .filter(polygon => polygon.getState() === 3)
            .map(polygon => polygon.id);
    }

    /**
     * Actualiza a Estado 1 (Pasto activo) todos los polígonos cuyo ID esté en la lista enviada.
     */
    public static setGrassByIds(polygons: Polygon[], ids: string[]): void {
        const idSet = new Set(ids);
        polygons.forEach(polygon => {
            if (idSet.has(polygon.id)) {
                polygon.setState(1);
            }
        });
    }

    /**
     * Actualiza a Estado 2 (Biocapacidad/Recargando) todos los polígonos cuyo ID esté en la lista enviada.
     */
    public static setBiocapacityByIds(polygons: Polygon[], ids: string[]): void {
        const idSet = new Set(ids);
        polygons.forEach(polygon => {
            if (idSet.has(polygon.id)) {
                polygon.setState(2);
            }
        });
    }

    /**
     * Actualiza a Estado 3 (Agotado/Vacío) todos los polígonos cuyo ID esté en la lista enviada.
     */
    public static setEmptyByIds(polygons: Polygon[], ids: string[]): void {
        const idSet = new Set(ids);
        polygons.forEach(polygon => {
            if (idSet.has(polygon.id)) {
                polygon.setState(3);
            }
        });
    }

    /**
     * Transforma todos los polígonos de la lista enviada a Estado 1 (Pasto activo).
     */
    public static setAllToGrass(polygons: Polygon[]): void {
        polygons.forEach(polygon => polygon.setState(1));
    }

    /**
     * Selecciona aleatoriamente 'count' elementos de una lista de IDs sin repetición.
     */
    public static getRandomSubarray(array: string[], count: number): string[] {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, array.length));
    }


    /**
     * Define el estado inicial de la grilla:
     * Los primeros 'count' polígonos pasan a Estado 1 (Pasto activo)
     * y el resto pasa a Estado 3 (Agotado/Vacío).
     */
    public static setInitialGrassCount(polygons: Polygon[], count: number): void {
        const targetCount = Math.min(count, polygons.length);

        polygons.forEach((polygon, index) => {
            if (index < targetCount) {
                polygon.setState(1); // 🟩 Pasto activo
            } else {
                polygon.setState(3); // ⬜ Vacío / Sin recurso
            }
        });
    }
}

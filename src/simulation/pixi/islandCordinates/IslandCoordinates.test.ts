import { describe, it, expect } from 'vitest'; // si usas Jest, elimina esta línea
import { MAP_600, ISLAND_MAPS } from './IslandCoordinates';

describe('IslandCoordinates', () => {
    it('tiene exactamente 600 polígonos', () => {
        expect(MAP_600).toHaveLength(600);
        expect(ISLAND_MAPS[600]).toHaveLength(600);
    });

    it('no tiene coordenadas duplicadas', () => {
        const unique = new Set(MAP_600.map(([r, c]) => `${r},${c}`));
        expect(unique.size).toBe(600);
    });
});
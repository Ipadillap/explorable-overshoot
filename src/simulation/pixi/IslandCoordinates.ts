// src/simulation/pixi/IslandCoordinates.ts

export type IslandCapacityOption = 600;

// Generador programático que asegura exactamente 600 celdas formando la silueta de la isla
function create600Map(): Array<[number, number]> {
    const coordsSet = new Set<string>();
    const result: Array<[number, number]> = [];

    const addCoord = (r: number, c: number) => {
        const key = `${r},${c}`;
        if (!coordsSet.has(key) && result.length < 600) {
            coordsSet.add(key);
            result.push([r, c]);
        }
    };

    // 1. Núcleo central y silueta base (Ancho/Alto proporcional a 804x540)
    for (let r = 0; r <= 24; r++) {
        let minC = 10, maxC = 18;

        if (r < 6) { minC = 12 - r; maxC = 16 + r; } // Cúpula Norte
        else if (r <= 14) { minC = 4; maxC = 24; }   // Macizo Central
        else if (r <= 19) { minC = 6; maxC = 20; }   // Costa Sur / Suroeste
        else { minC = 9; maxC = 15; }               // Península Rano Kau

        for (let c = minC; c <= maxC; c++) {
            addCoord(r, c);
        }
    }

    // 2. Extensión Este (Península Poike)
    for (let r = 9; r <= 13; r++) {
        for (let c = 25; c <= 30; c++) {
            addCoord(r, c);
        }
    }

    // 3. Relleno concéntrico hacia afuera hasta completar los 600 exactos
    let layer = 1;
    while (result.length < 600) {
        const currentLength = result.length;
        for (let i = 0; i < currentLength && result.length < 600; i++) {
            const [r, c] = result[i];
            const neighbors: Array<[number, number]> = [
                [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1],
                [r - 1, c + 1], [r + 1, c - 1]
            ];
            for (const [nr, nc] of neighbors) {
                addCoord(nr, nc);
            }
        }
        layer++;
    }

    return result;
}

export const MAP_600: Array<[number, number]> = create600Map();

export const ISLAND_MAPS: Record<IslandCapacityOption, Array<[number, number]>> = {
    600: MAP_600
};
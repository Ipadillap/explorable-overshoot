// src/simulation/pixi/IslandCoordinates.ts

export type IslandCapacityOption = 600;

// Silueta de Rapa Nui (norte arriba). '#' = celda, '.' = mar. Total: exactamente 600 '#'.
// Layout "odd-q" (hexágonos flat-top, columnas impares desplazadas media celda hacia abajo),
// igual que en la imagen de referencia. Coordenadas devueltas como [fila, columna].
const ISLAND_600_ROWS: string[] = [
    '.............#.#...................',
    '..........########.................',
    '.........##############............',
    '........################...........',
    '.......#################.###.......',
    '.....#########################.....',
    '....##########################.....',
    '....##########################.....',
    '....##########################.....',
    '...###########################.....',
    '...#############################.#.',
    '...################################',
    '...################################',
    '...################################',
    '.##################################',
    '.##############################.#..',
    '#############################......',
    '###########################........',
    '###########################........',
    '##########################.........',
    '..#####################.##.........',
    '...##################..............',
    '.###################...............',
    '..##################...............',
    '...############.###................',
    '....###########....................',
    '......#####...#....................'
];

// Si tu renderer usa coordenadas AXIALES (q = c, r = fila - floor(c/2)), pon esto en true.
const OFFSET_TO_AXIAL = false;

function create600Map(): Array<[number, number]> {
    const result: Array<[number, number]> = [];
    ISLAND_600_ROWS.forEach((line, r) => {
        for (let c = 0; c < line.length; c++) {
            if (line[c] === '#') {
                result.push(OFFSET_TO_AXIAL ? [r - Math.floor(c / 2), c] : [r, c]);
            }
        }
    });
    if (result.length !== 600) {
        throw new Error(`Island map must have 600 cells, got ${result.length}`);
    }
    return result;
}

export const MAP_600: Array<[number, number]> = create600Map();

export const ISLAND_MAPS: Record<IslandCapacityOption, Array<[number, number]>> = {
    600: MAP_600
};

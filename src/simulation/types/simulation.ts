// Los 3 estados posibles de un bloque/hexágono en la isla
export type TileState = 'grass' | 'degraded' | 'barren';

export interface TileBlock {
    id: string;
    state: TileState;
    resourceLevel: number;
}
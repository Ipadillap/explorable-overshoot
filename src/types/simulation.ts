export type SimulationColor = 'green' | 'red';

export interface SimulationState {
    color: SimulationColor;
}

export type SimulationListener = (state: SimulationState) => void;
import type {SimulationColor, SimulationListener, SimulationState} from '../types/simulation';

export class SimulationEngine {
    private color: SimulationColor = 'green';
    private listeners: Set<SimulationListener> = new Set();

    public getState(): SimulationState {
        return { color: this.color };
    }

    public toggleColor(): void {
        this.color = this.color === 'green' ? 'red' : 'green';
        this.notify();
    }

    // Patrón Suscriptor/Observador
    public subscribe(listener: SimulationListener): () => void {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }

    private notify(): void {
        const state = this.getState();
        this.listeners.forEach((listener) => listener(state));
    }
}

// Instancia singleton para compartir entre el motor visual y React
export const simulationEngine = new SimulationEngine();
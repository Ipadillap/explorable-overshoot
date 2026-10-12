import { useState, useEffect } from 'react';
import { simulationEngine } from '../simulation/SimulationEngine';
import type {SimulationColor} from '../types/simulation';

export function useSimulation() {
  const [color, setColor] = useState<SimulationColor>(
    () => simulationEngine.getState().color
  );

  useEffect(() => {
    // React se suscribe solo para actualizar su botón/UI
    const unsubscribe = simulationEngine.subscribe((state) => {
      setColor(state.color);
    });

    return unsubscribe;
  }, []);

  const toggleColor = () => {
    simulationEngine.toggleColor();
  };

  return {
    color,
    toggleColor,
  };
}